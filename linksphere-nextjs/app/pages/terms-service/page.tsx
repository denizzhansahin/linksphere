// app/terms-of-service/page.tsx
// Or if using Pages Router: pages/terms-of-service.tsx

import Link from 'next/link';
import Head from 'next/head'; // For Pages Router, for App Router use metadata export

// For App Router (Next.js 13.4+)
export const metadata = {
  title: 'Terms of Service - LinkSphere by Space Teknopoli',
  description: 'Read the Terms of Service for using LinkSphere by Space Teknopoli.',
};

const TermsOfServicePage = () => {
  const lastUpdated = "May 9, 2025"; // CHANGE THIS TO THE CURRENT DATE
  const companyName = "Space Teknopoli";
  const appName = "LinkSphere"; // Or your app's actual name
  const websiteUrl ="https://spaceteknopoliweb.vercel.app/iletisim"; // CHANGE THIS
  const jurisdiction = "(Istanbul, Turkey)"; // CHANGE THIS - Where disputes will be handled

  return (
    <>
      {/* For Pages Router, uncomment Head */}
      {/*
      <Head>
        <title>Terms of Service - {appName} by {companyName}</title>
        <meta name="description" content={`Read the Terms of Service for using ${appName} by ${companyName}.`} />
      </Head>
      */}
      <div className="bg-slate-50 dark:bg-slate-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
              Terms of Service
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
              Welcome to {appName} (the "Service"), a link management platform provided by {companyName} ("we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our Service, including our website, applications, and any related services (collectively, the "Service").
            </p>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms and our <Link href="/privacy-policy">Privacy Policy</Link>. If you do not agree to these Terms, you may not access or use the Service.
            </p>

            <h2 id="account-registration">1. Account Registration and Use</h2>
            <p>
              <strong>a. Eligibility:</strong> You must be at least 13 years old (or the minimum age required in your country to use our services without parental consent) to create an account and use the Service. If you are using the Service on behalf of an organization or entity, you represent and warrant that you have the authority to bind that entity to these Terms.
            </p>
            <p>
              <strong>b. Account Creation:</strong> To access certain features of the Service, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p>
              <strong>c. Account Security:</strong> You are responsible for safeguarding your account password and for any activities or actions under your account. We encourage you to use a strong password (a combination of upper and lower case letters, numbers, and symbols) with your account. {companyName} cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
            <p>
              <strong>d. Account Usage:</strong> You agree to use the Service only for lawful purposes and in accordance with these Terms.
            </p>

            <h2 id="service-description">2. Service Description</h2>
            <p>
              {appName} provides users with the ability to:
            </p>
            <ul>
              <li>Shorten URLs (Uniform Resource Locators).</li>
              <li>Create and manage personal profiles to consolidate social media links and other personal web links.</li>
              <li>Create and manage corporate profiles to consolidate business-related links, contact information, and other corporate web presences.</li>
              <li>Track analytics related to shortened links.</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue the Service (or any part or content thereof) at any time with or without notice to you.
            </p>

            <h2 id="user-content-and-conduct">3. User Content and Conduct</h2>
            <p>
              <strong>a. Your Content:</strong> You are solely responsible for all information, data, text, links, or other materials ("User Content") that you submit, post, display, or otherwise make available through the Service. This includes the original URLs you shorten and the links and information you add to your personal or corporate profiles.
            </p>
            <p>
              <strong>b. Prohibited Content and Activities:</strong> You agree not to use the Service to:
            </p>
            <ul>
              <li>Create shortened links or profiles that point to, promote, or contain:
                <ul>
                  <li>Illegal activities or content.</li>
                  <li>Malware, viruses, phishing scams, or any malicious code.</li>
                  <li>Hate speech, harassment, or discriminatory content.</li>
                  <li>Pornographic or sexually explicit material (unless specifically permitted by {appName} for appropriate contexts, which is generally not the case for a public link shortener).</li>
                  <li>Content that infringes upon the intellectual property rights of others (copyright, trademark, etc.).</li>
                  <li>Spam, unsolicited commercial communications, or pyramid schemes.</li>
                  <li>Content that is fraudulent, deceptive, or misleading.</li>
                </ul>
              </li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
              <li>Attempt to gain unauthorized access to any portion of the Service, other accounts, computer systems, or networks connected to the Service.</li>
              <li>Use the Service for any abusive purpose, including but not limited to generating an excessive number of clicks artificially or engaging in click fraud.</li>
              <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
              <li>Violate any applicable local, state, national, or international law or regulation.</li>
            </ul>
            <p>
              <strong>c. Our Right to Remove Content:</strong> We reserve the right, but are not obligated, to review, screen, or monitor User Content. We may, in our sole discretion, remove or disable access to any User Content that violates these Terms or is otherwise objectionable, without prior notice.
            </p>

            <h2 id="intellectual-property">4. Intellectual Property Rights</h2>
            <p>
              <strong>a. Our Service:</strong> The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of {companyName} and its licensors. The Service is protected by copyright, trademark, and other laws of both {jurisdiction.split(',')[1] || jurisdiction.split(',')[0]} and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of {companyName}.
            </p>
            <p>
              <strong>b. Your Content:</strong> You retain all of your ownership rights in your User Content. However, by submitting User Content to the Service, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with the Service and {companyName}'s (and its successors' and affiliates') business, including for promoting and redistributing part or all of the Service.
            </p>
            <p>
              <strong>c. Feedback:</strong> If you provide us with any feedback, suggestions, or ideas regarding the Service ("Feedback"), you grant us the right to use such Feedback for any purpose without any restriction or compensation to you.
            </p>

            <h2 id="link-shortening-and-profiles">5. Link Shortening and Profiles</h2>
            <p>
              <strong>a. Link Responsibility:</strong> You are responsible for the content of the original URLs that you shorten. We do not endorse and are not responsible for the content of any third-party websites linked to via our Service.
            </p>
            <p>
              <strong>b. Link Availability:</strong> While we strive for high availability, we do not guarantee that shortened links or profiles will be accessible at all times.
            </p>
            <p>
              <strong>c. Link Deactivation:</strong> We reserve the right to deactivate or redirect any shortened link or profile that violates these Terms, is reported as abusive, or for any other reason at our sole discretion.
            </p>

            <h2 id="termination">6. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of these Terms.
            </p>
            <p>
              If you wish to terminate your account, you may do so by following the instructions on the Service or by contacting us at {websiteUrl}.
            </p>
            <p>
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h2 id="disclaimer-of-warranties">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. {companyName} MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.
            </p>
            <p>
              NEITHER {companyName} NOR ANY PERSON ASSOCIATED WITH {companyName} MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER {companyName} NOR ANYONE ASSOCIATED WITH {companyName} REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
            </p>

            <h2 id="limitation-of-liability">8. Limitation of Liability</h2>
            <p>
              EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS' FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF {companyName} HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF {companyName}, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
            </p>

            <h2 id="indemnification">9. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless {companyName}, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service, including, but not limited to, your User Content, any use of the Service's content, services, and products other than as expressly authorized in these Terms.
            </p>

            <h2 id="governing-law">10. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of {jurisdiction}, without regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.
            </p>

            <h2 id="changes-to-terms">11. Changes to These Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice (or a reasonable notice period) prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>

            <h2 id="contact-us">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul>
              
              <li>By visiting this page on our website: <a href={websiteUrl}>{websiteUrl}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;