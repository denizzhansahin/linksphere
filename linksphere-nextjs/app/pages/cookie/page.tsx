// app/cookie-policy/page.tsx
// Or if using Pages Router: pages/cookie-policy.tsx


import Link from 'next/link';
import Head from 'next/head'; // For Pages Router, for App Router use metadata export

// For App Router (Next.js 13.4+)
export const metadata = {
  title: 'Cookie Policy - LinkSphere by Space Teknopoli',
  description: 'Learn about how LinkSphere by Space Teknopoli uses cookies and similar technologies to enhance your experience.',
};

const CookiePolicyPage = () => {
  const lastUpdated = "May 9, 2025"; // CHANGE THIS TO THE CURRENT DATE
  const companyName = "Space Teknopoli";
  const appName = "LinkSphere"; // Or your app's actual name
  const supportWeb = "https://spaceteknopoliweb.vercel.app/iletisim"; // CHANGE THIS (Same as Privacy Policy or a dedicated one)
  const websiteUrl = "http://linksphere.tr"; // CHANGE THIS
  const privacyPolicyUrl = "/privacy-policy"; // Link to your Privacy Policy

  return (
    <>
      {/* For Pages Router, uncomment Head */}
      {/*
      <Head>
        <title>Cookie Policy - {appName} by {companyName}</title>
        <meta name="description" content={`Learn about how ${appName} by ${companyName} uses cookies.`} />
      </Head>
      */}
      <div className="bg-slate-50 dark:bg-slate-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
              Cookie Policy
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
              This Cookie Policy explains how {companyName} ("we," "us," or "our") uses cookies and similar tracking technologies on our {appName} website and service (the "Service"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            <p>
              By using our Service, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to the use of cookies in this way, you should set your browser settings accordingly or not use the Service.
            </p>

            <h2 id="what-are-cookies">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
            <p>
              Cookies can be "session" cookies or "persistent" cookies. Session cookies are deleted from your computer or device when you close your web browser. Persistent cookies remain stored on your computer or device until deleted or until they reach their expiry date.
            </p>
            <p>
              We also use other similar tracking technologies like web beacons (sometimes called "tracking pixels" or "clear gifs") and scripts. These technologies are used for similar purposes as cookies, to help us understand how users interact with our Service and to help us improve it. For simplicity, in this policy, we refer to all these technologies as "cookies."
            </p>

            <h2 id="how-we-use-cookies">2. How We Use Cookies</h2>
            <p>
              We use cookies for a variety of reasons detailed below:
            </p>
            <ul>
              <li>
                <strong>Strictly Necessary Cookies:</strong> These cookies are essential for you to browse the Service and use its features, such as accessing secure areas of the site (e.g., your account dashboard). Without these cookies, services like user authentication and account management cannot be provided.
                
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These cookies allow our Service to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personal features. For example, these cookies can be used to remember your theme preference (dark/light mode).
             
              </li>
              <li>
                <strong>Performance and Analytics Cookies:</strong> These cookies collect information about how you use our Service, for instance, which pages you go to most often, and if you get error messages from web pages. These cookies don't collect information that identifies you. All information these cookies collect is aggregated and therefore anonymous. It is only used to improve how our Service works.
              
              </li>
              <li>
                <strong>Targeting or Advertising Cookies (If Applicable):</strong>
                {/* If you DON'T use advertising cookies, state that clearly.
                    If you DO, explain their purpose. */}
                <p>
                  Currently, {appName} primarily uses cookies for essential functionality and analytics. We do not extensively use targeting or advertising cookies from third-party ad networks to display targeted advertisements. If this changes in the future, this policy will be updated.
                </p>
                {/*
                // Example if you DO use them:
                // These cookies are used to deliver adverts more relevant to you and your interests.
                // They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaign.
                // They are usually placed by advertising networks with the website operator’s permission.
                // They remember that you have visited a website and this information is shared with other organisations such as advertisers.
                */}
              </li>
            </ul>

            <h2 id="cookies-we-use">3. Specific Cookies We Use</h2>
            <p>
              Below is a list of some of the main cookies we use on our Service. This list is not exhaustive but aims to provide transparency.
            </p>
            {/*
              THIS SECTION IS CRUCIAL AND NEEDS TO BE ACCURATE.
              You need to audit your website to identify all cookies being set.
              Tools like browser developer tools (Application -> Cookies) or online cookie scanners can help.
            */}
            <table className="table-auto w-full my-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Cookie Name</th>
                  <th className="px-4 py-2 text-left">Provider</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Purpose</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2"><code>Auth Bareer Token</code></td>
                  <td className="border px-4 py-2">{appName} (First-party)</td>
                  <td className="border px-4 py-2">Strictly Necessary</td>
                  <td className="border px-4 py-2">Authenticates your session and keeps you logged in.</td>
                  <td className="border px-4 py-2">1 hours</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2"><code>user</code></td>
                  <td className="border px-4 py-2">{appName} (First-party)</td>
                  <td className="border px-4 py-2">Functionality</td>
                  <td className="border px-4 py-2">Stores basic user preferences or non-sensitive user data for UI purposes.</td>
                  <td className="border px-4 py-2">1 hours</td>
                </tr>

              </tbody>
            </table>
            <p>
              Please note that third parties (including, for example, advertising networks and providers of external services like web traffic analysis services) may also use cookies, over which we have no control. These cookies are likely to be analytical/performance cookies or targeting cookies.
            </p>

            <h2 id="managing-cookies">4. How to Control and Delete Cookies</h2>
            <p>
              Most web browsers allow some control of most cookies through the browser settings. You can set your browser to block or alert you about these cookies, but some parts of the site may not then work.
            </p>
            <p>
              To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a> or <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a>.
            </p>
            <p>
              You can also manage your cookie preferences for our Service through any cookie consent banner or tool we may provide. 
            </p>
            <p>
              For Google Analytics cookies, you can opt-out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.
            </p>

            <h2 id="changes-to-policy">5. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>

            <h2 id="more-information">6. More Information</h2>
            <p>
              For more information about how we use your personal information, please see our <Link href={privacyPolicyUrl}>Privacy Policy</Link>.
            </p>
            <p>
              If you have any questions about our use of cookies or other technologies, please this page us at <a href={supportWeb}>{supportWeb}</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicyPage;