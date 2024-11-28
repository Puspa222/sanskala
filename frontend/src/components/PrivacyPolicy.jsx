import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-600 text-white p-8">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 shadow-xl rounded-lg p-6 md:p-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
          Privacy Policy
        </h1>
        <p className="mb-6 text-gray-700 text-lg">
          **Effective Date: [2024]
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We(Team of Sanskala) collect information to provide and improve our services,
            personalize user experiences, and ensure a secure browsing
            environment. This includes:
          </p>
          <h3 className="text-xl font-semibold">a. Personal Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Registration data: Name, email address, username, and password.</li>
            <li>Contact information: Email address and phone number.</li>
            <li>
              Location data: Region-specific cultural resources and event
              suggestions.
            </li>
            <li>Feedback and queries submitted through forms or surveys.</li>
          </ul>
          <h3 className="text-xl font-semibold">b. Non-Personal Information</h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>IP address and geographic location</li>
            <li>Website activity and interaction data</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Personalize content based on preferences and location.</li>
            <li>
              Monitor website performance and improve user experience.
            </li>
            <li>
              Communicate updates, respond to inquiries, and offer support.
            </li>
            <li>Ensure security and prevent fraudulent activities.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 mb-4">
            Cookies are small text files that improve website functionality and
            user experience. Types of cookies we use:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Essential Cookies: Necessary for basic website functions.</li>
            <li>Analytical Cookies: Monitor and improve website performance.</li>
            <li>Preference Cookies: Save custom settings like language.</li>
            <li>Marketing Cookies: Display relevant cultural content or ads.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement measures like SSL encryption and regular audits to
            protect your data. However, users are encouraged to protect their
            account credentials and report any suspicious activity.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-gray-700 mb-4">
            Users have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Access and request a copy of their personal data.</li>
            <li>Request corrections to inaccurate information.</li>
            <li>Opt-out of promotional communications.</li>
            <li>Request the deletion of data, subject to legal obligations.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">6. Children’s Privacy</h2>
          <p className="text-gray-700">
            Our website is not intended for children under 13. If you believe
            we have collected data from a child, contact us immediately, and
            we will take steps to delete it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-gray-700">
            For questions or concerns, reach out to us at:
          </p>
          <ul className="list-none pl-0 text-gray-700">
            <li>Email:hamrosanskala@gmail.com </li>
            <li>Phone:98678483474</li>
            <li> </li>
          </ul>
        </section>

        <p className="text-gray-700 text-sm text-center mt-8">
          Thank you for trusting [Hamro Sanskala] to preserve and
          celebrate cultural heritage.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
