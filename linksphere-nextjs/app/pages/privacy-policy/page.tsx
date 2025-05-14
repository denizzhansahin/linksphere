// app/privacy-policy/page.tsx
// Or if using Pages Router: pages/privacy-policy.tsx

import Link from 'next/link';
import Head from 'next/head'; // For Pages Router, for App Router use metadata export

// For App Router (Next.js 13.4+)
export const metadata = {
  title: 'Privacy Policy - LinkSphere by Space Teknopoli',
  description: 'Understand how LinkSphere by Space Teknopoli collects, uses, and protects your personal information.',
};

const PrivacyPolicyPage = () => {
  const lastUpdated = "May 9, 2025"; // CHANGE THIS TO THE CURRENT DATE
  const companyName = "Space Teknopoli";
  const appName = "LinkSphere"; // Or your app's actual name
  const support = "https://spaceteknopoliweb.vercel.app/iletisim"; // CHANGE THIS
  const websiteUrl = "http://linksphere.tr"; // CHANGE THIS

  return (
    <>
      {/* For Pages Router, uncomment Head */}
      {/*
      <Head>
        <title>Privacy Policy - {appName} by {companyName}</title>
        <meta name="description" content={`Understand how ${appName} by ${companyName} collects, uses, and protects your personal information.`} />
      </Head>
      */}
      <div className="bg-slate-50 dark:bg-slate-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
              Privacy Policy
            </h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
              For {appName} by {companyName}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
              Last Updated: {lastUpdated}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-slate-800/50 p-6 sm:p-10 rounded-xl shadow-xl">
            <p>
              Welcome to {appName} (the "Service"), operated by {companyName} ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service, which includes link shortening, personal profile management (social media and other links), and corporate profile management.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.
            </p>

            <h2 id="information-collection">1. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect via the Service depends on the content and materials you use, and includes:
            </p>
            <h3>a. Personal Data You Provide to Us</h3>
            <ul>
              <li>
                <strong>Account Registration:</strong> When you register for an account, we may collect personal information, such as your name, email address, password, nickname/username, country, and profile photograph.
              </li>
              <li>
                <strong>Profile Information:</strong> For your personal or corporate profiles, you may provide us with links to your social media accounts (e.g., Instagram, Facebook, Twitter, LinkedIn), personal websites, online stores, portfolios, and other URLs. For corporate profiles, this may include company name, business email, business website, office address, phone numbers, and links to corporate-specific pages (e.g., LinkedIn, careers page, product catalog).
              </li>
              <li>
                <strong>Link Shortening:</strong> When you shorten a link, we collect the original long URL and associate the shortened link with your account if you are logged in.
              </li>
              <li>
                <strong>Communications:</strong> If you contact us directly (e.g., via email for support), we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </li>
            </ul>

            <h3>b. Data We Collect Automatically</h3>
            <ul>
              <li>
                <strong>Usage Data:</strong> We may automatically collect information about how you access and use the Service. This may include your IP address, browser type, browser version, operating system, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
              </li>
              <li>
                <strong>Link Analytics:</strong> For shortened links, we collect analytics data such as the number of clicks, referral sources, geographic location of clicks (derived from IP address), and browser/device types of those who click on your links. This information is provided to you (if you are the link owner) to track the performance of your links.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies (like web beacons and pixels) to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be ableable to use some portions of our Service. For more details, please see our.
              </li>
            </ul>

            <h2 id="how-we-use-information">2. How We Use Your Information</h2>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul>
              <li>Provide, operate, and maintain our Service;</li>
              <li>Improve, personalize, and expand our Service;</li>
              <li>Understand and analyze how you use our Service;</li>
              <li>Develop new products, services, features, and functionality;</li>
              <li>Process your transactions (e.g., for premium features, if any);</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes (where permitted by law and with your consent where required);</li>
              <li>Send you emails and other notifications;</li>
              <li>Create and manage your account;</li>
              <li>Display your personal and corporate profiles as configured by you;</li>
              <li>Provide analytics for your shortened links;</li>
              <li>Find and prevent fraud and abuse;</li>
              <li>Comply with legal obligations.</li>
            </ul>

            <h2 id="sharing-information">3. How We Share Your Information</h2>
            <p>
              We may share the information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <ul>
              <li>
                <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., hosting services, email delivery, analytics providers, payment processors - if applicable). These third parties are obligated to protect your data and use it only for the purposes for which it was disclosed.
              </li>
              <li>
                <strong>Publicly Displayed Information:</strong> Information you choose to include in your public profiles (personal or corporate), such as your name, nickname, profile picture, social media links, and other links, will be publicly accessible. Shortened links, by their nature, are also accessible if the link is shared.
              </li>
              <li>
                <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.
              </li>
              <li>
                <strong>Aggregated or De-Identified Data:</strong> We may share aggregated or de-identified information, which cannot reasonably be used to identify you, for various purposes, including research, analytics, or to improve our Service.
              </li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>

            <h2 id="data-security">4. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
            </p>

            <h2 id="data-retention">5. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
            </p>
            <p>
              For shortened links, associated analytics data may be retained as long as the link is active or as per our data retention policies for inactive accounts/links.
            </p>

            <h2 id="your-data-protection-rights">6. Your Data Protection Rights</h2>
            <p>
              Depending on your location and applicable law, you may have certain rights regarding your personal information. These may include the right to:
            </p>
            <ul>
              <li>Access, update, or delete the information we have on you.</li>
              <li>Rectify any information that is inaccurate or incomplete.</li>
              <li>Object to our processing of your personal data.</li>
              <li>Request that we restrict the processing of your personal information.</li>
              <li>Request the portability of your personal information (i.e., to receive it in a structured, commonly used, and machine-readable format).</li>
              <li>Withdraw your consent at any time where {companyName} relied on your consent to process your personal information.</li>
            </ul>
            <p>
              If you wish to exercise any of these rights, please contact us at <a href={support}>{support}</a>. We may need to verify your identity before responding to such requests. Please note that we may not be able to provide the Service without some necessary data.
            </p>
            <p>
              If you are a resident of the European Economic Area (EEA) or the UK, you have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority.
            </p>
            <p>
              If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA) / California Privacy Rights Act (CPRA).
            </p>

            <h2 id="childrens-privacy">7. Children's Privacy</h2>
            <p>
              Our Service is not intended for use by children under the age of 13 (or a higher age threshold if applicable in your jurisdiction). We do not knowingly collect personally identifiable information from children under 13. If we become aware that we have collected Personal Data from a child under the age of 13 without verification of parental consent, we will take steps to remove that information from our servers.
            </p>

            <h2 id="third-party-websites">8. Links to Other Websites</h2>
            <p>
              Our Service may contain links to other websites that are not operated by us. If you click on a third-party link (including links you or others shorten or add to profiles), you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>

            <h2 id="policy-changes">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            <p>
              For significant changes, we may also provide a more prominent notice (such as by adding a statement to our homepage or sending you a notification).
            </p>

            <h2 id="contact-us">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>By support page: <a href={support}>{support}</a></li>
              <li>By visiting this page on our website: <Link href="/">{websiteUrl}</Link></li>
              {/* You can add a physical address if applicable */}
              {/* <li>By mail: [Your Company's Physical Address]</li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;