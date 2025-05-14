// popup.js (Önceki sağlam popup.js'yi temel alarak)
const API_URL = 'https://linksphere.tr/api/graphql';
const BASE_SHORT_LINK_URL = 'https://linksphere.tr/';

// DOM Elements
const currentUrlEl = document.getElementById('current-url');
const createLinkBtn = document.getElementById('create-link-btn');

const mainContent = document.getElementById('main-content'); // Ana içerik alanı
const initialView = document.getElementById('initial-view');
const loadingView = document.getElementById('loading-view');
const resultView = document.getElementById('result-view');
const errorView = document.getElementById('error-view');

const qrCodeCanvasEl = document.getElementById('qr-code-canvas');
const shortLinkInputEl = document.getElementById('short-link-input');
const copyLinkBtn = document.getElementById('copy-link-btn');
const goToLinkBtn = document.getElementById('go-to-link-btn');
const createAnotherBtn = document.getElementById('create-another-btn');
const retryBtn = document.getElementById('retry-btn');
const errorDetailsEl = document.getElementById('error-details');
const yearEl = document.getElementById('year');

let activeTabUrl = '';
let currentUserId = null;

const CREATE_SHORT_LINK_MUTATION = `
  mutation KisaLinkOlusturMutation($linkData: KisaLinkOlusturDto!) {
    kisaLinkOlustur(linkData: $linkData) {
      asilMetinAdi
      kisaltmaToken
    }
  }
`;

function showView(viewIdToShow) {
    const views = mainContent.querySelectorAll('.view');
    views.forEach(view => {
        if (view.id === viewIdToShow) {
            view.classList.add('active-view');
        } else {
            view.classList.remove('active-view');
        }
    });
}

async function getCurrentTabUrl() {
  try {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return (tab && tab.url && (tab.url.startsWith('http:') || tab.url.startsWith('https:'))) ? tab.url : null;
  } catch (error) { console.error("Error getting tab URL:", error); return null; }
}

async function generateQRCodeToCanvas(text, canvasElement) {
  if (!text || !canvasElement) {
    console.warn("QR: No text or canvas.");
    if (canvasElement) canvasElement.style.display = 'none';
    return false;
  }
  try {
    await QRCode.toCanvas(canvasElement, text, {
      width: 128, // QR kod boyutu
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: "#1f2937", light: "#ffffff" } // Koyu noktalar, beyaz arka plan
    });
    canvasElement.style.display = 'block';
    return true;
  } catch (err) {
    console.error('QR generation error:', err);
    canvasElement.style.display = 'none';
    return false;
  }
}

async function getUserId() { return null; } // Placeholder

document.addEventListener('DOMContentLoaded', async () => {
  yearEl.textContent = new Date().getFullYear();
  currentUserId = await getUserId();
  activeTabUrl = await getCurrentTabUrl();

  if (activeTabUrl) {
    currentUrlEl.textContent = activeTabUrl.length > 55 ? activeTabUrl.substring(0, 52) + '...' : activeTabUrl;
    currentUrlEl.title = activeTabUrl;
    createLinkBtn.disabled = false;
  } else {
    currentUrlEl.textContent = 'No valid page URL found.';
    currentUrlEl.title = 'Please open a web page to shorten its URL.';
    createLinkBtn.disabled = true;
  }
  showView('initial-view');
});

createLinkBtn.addEventListener('click', async () => {
  if (!activeTabUrl) { showError("No URL to shorten."); return; }
  showView('loading-view');

  const linkDataPayload = { asilMetinAdi: activeTabUrl };
  if (currentUserId) linkDataPayload.kullaniciId = currentUserId;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query: CREATE_SHORT_LINK_MUTATION, variables: { linkData: linkDataPayload }})
    });

    let responseBodyText = await response.text(); // Önce metin olarak al
    let result;
    try {
        result = JSON.parse(responseBodyText); // Sonra JSON'a çevirmeye çalış
    } catch (e) {
        console.error("Failed to parse server response as JSON:", responseBodyText);
        throw new Error(`Server returned non-JSON response (Status: ${response.status}).`);
    }


    if (!response.ok) {
      const errorMsg = result.errors ? result.errors.map(e => e.message).join('\n') : `HTTP error ${response.status}`;
      throw new Error(errorMsg);
    }

    const shortLinkData = result.data?.kisaLinkOlustur;
    if (shortLinkData && shortLinkData.kisaltmaToken) {
      const fullShortLink = `${BASE_SHORT_LINK_URL}${shortLinkData.kisaltmaToken}`;
      shortLinkInputEl.value = fullShortLink;
      await generateQRCodeToCanvas(fullShortLink, qrCodeCanvasEl);
      goToLinkBtn.dataset.url = fullShortLink;
      showView('result-view');
    } else {
      console.error("API data error:", result.data);
      throw new Error("Invalid data from API or 'kisaLinkOlustur' is missing.");
    }
  } catch (error) {
    console.error("Shorten link error:", error);
    showError(error.message || "An unknown server error occurred.");
  }
});

copyLinkBtn.addEventListener('click', () => {
  const textToCopy = shortLinkInputEl.value;
  if (!textToCopy) return;
  shortLinkInputEl.select();
  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalIcon = copyLinkBtn.innerHTML;
    const originalTitle = copyLinkBtn.title;
    copyLinkBtn.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`; // Checkmark
    copyLinkBtn.title = "Copied!";
    setTimeout(() => {
      copyLinkBtn.innerHTML = originalIcon;
      copyLinkBtn.title = originalTitle;
    }, 2000);
  }).catch(err => {
    console.error('Clipboard copy error:', err);
    showError('Failed to copy. Please copy manually.');
  });
});

goToLinkBtn.addEventListener('click', () => {
  const url = goToLinkBtn.dataset.url;
  if (url) chrome.tabs.create({ url });
});

createAnotherBtn.addEventListener('click', async () => {
  activeTabUrl = await getCurrentTabUrl(); // Refresh URL
  if (activeTabUrl) {
    currentUrlEl.textContent = activeTabUrl.length > 55 ? activeTabUrl.substring(0, 52) + '...' : activeTabUrl;
    currentUrlEl.title = activeTabUrl;
    createLinkBtn.disabled = false;
  } else {
    currentUrlEl.textContent = 'No valid page URL found.';
    currentUrlEl.title = 'Please open a web page to shorten its URL.';
    createLinkBtn.disabled = true;
  }
  showView('initial-view');
});

retryBtn.addEventListener('click', () => { createLinkBtn.click(); });

function showError(message) {
  errorDetailsEl.textContent = message;
  showView('error-view');
}

// Kütüphaneyi indirip lib/qrcode.min.js olarak kaydettiğinizden emin olun.