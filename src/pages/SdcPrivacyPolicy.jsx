function SdcPrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Spin + Dice + Coin Privacy Policy
          </h1>
          <p className="mt-2 text-base text-gray-600">Published by Kwagoo</p>
          <p className="mt-1 text-sm text-gray-500">
            Last updated: March 8, 2026
          </p>
        </header>

        <div className="space-y-8 text-base leading-7 text-gray-700">

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy explains how <strong>Spin + Dice + Coin</strong>
              {" "}("the App") handles information when you use it.
            </p>
            <p className="mt-3">
              Spin + Dice + Coin is developed and published by{" "}
              <strong>Kwagoo</strong>. This Privacy Policy applies only to this
              application and does not apply to other apps or services published
              by Kwagoo unless stated otherwise.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              2. Information Collection and Use
            </h2>

            <p>
              Spin + Dice + Coin does <strong>not directly collect personal
              information</strong> from users. The App does not require account
              registration and does not request personal information such as
              your name, email address, or phone number.
            </p>

            <p className="mt-3">
              The App allows users to create custom content such as groups,
              lists, and items. This content is stored <strong>locally on your
              device</strong> to enable the App’s functionality.
            </p>

            <p className="mt-3">
              This data remains on your device and is not transmitted to
              Kwagoo's servers. We do not have access to this locally stored
              information.
            </p>

          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              3. Advertising and Third-Party Services
            </h2>

            <p>
              The App uses <strong>Google AdMob</strong> to display
              advertisements.
            </p>

            <p className="mt-3">
              To provide advertisements, Google AdMob may automatically collect
              certain technical data including:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Device identifiers (such as Android Advertising ID or iOS IDFA)</li>
              <li>IP address</li>
              <li>Device and app interaction information</li>
              <li>Diagnostic and performance data</li>
            </ul>

            <p className="mt-3">
              This information is collected and processed by Google according to
              its own privacy policies. Spin + Dice + Coin does not control how
              this data is used by Google.
            </p>

            <p className="mt-3">
              Learn more about how Google uses information from apps that use
              its services:
            </p>

            <div className="mt-3 flex flex-col space-y-2">
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noreferrer"
                className="break-all text-indigo-600 hover:underline"
              >
                https://policies.google.com/technologies/ads
              </a>

              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noreferrer"
                className="break-all text-indigo-600 hover:underline"
              >
                https://policies.google.com/technologies/partner-sites
              </a>
            </div>

          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              4. Data Security and Retention
            </h2>

            <p>
              Because Spin + Dice + Coin does not store user data on external
              servers, most app data remains only on your device.
            </p>

            <p className="mt-3">
              Any data transmitted by third-party services such as Google AdMob
              is protected using secure technologies such as encrypted network
              connections.
            </p>

            <p className="mt-3">
              Your locally stored content remains on your device until you
              delete it, clear the App’s storage through your device settings,
              or uninstall the App.
            </p>

          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              5. Data Deletion Rights
            </h2>

            <p>
              Because user-created content is stored locally on your device,
              you have full control over its removal.
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>You can delete items or groups directly within the App.</li>
              <li>You can clear the App’s storage through your device settings.</li>
              <li>Uninstalling the App will remove all locally stored data.</li>
            </ul>

            <p className="mt-3">
              For data handled by Google AdMob, you may manage advertising
              preferences or reset your advertising identifier through your
              device’s privacy settings or your Google account.
            </p>

          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              6. Children&apos;s Privacy
            </h2>

            <p>
              Spin + Dice + Coin is intended for a general audience and may be
              used by people of all ages.
            </p>

            <p className="mt-3">
              The App itself does not directly collect personal information
              from children.
            </p>

            <p className="mt-3">
              However, the App displays advertisements through third-party
              services such as Google AdMob, which may automatically collect
              limited technical information such as device identifiers or IP
              addresses to provide advertising functionality.
            </p>

            <p className="mt-3">
              Parents or guardians who have concerns about their child's use of
              the App may contact us using the information below.
            </p>

          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              7. Contact Us
            </h2>

            <p>
              If you have any questions about this Privacy Policy, please
              contact:
            </p>

            <p className="mt-3 font-medium text-gray-900">Kwagoo</p>
            <p className="mt-1 break-all">emc.ai.studio@gmail.com</p>
            <p className="mt-1 break-all text-gray-600">
              https://www.kwagoo.com/sdcprivacypolicy
            </p>

          </section>

        </div>
      </div>
    </main>
  );
}

export default SdcPrivacyPolicy;