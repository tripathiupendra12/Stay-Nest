export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-8">
          Last Updated: June 2026
        </p>

        <p className="text-gray-700 leading-8 mb-8">
          At StayNest, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we
          collect, use, and safeguard your information when you use our
          platform.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Information We Collect
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Name and contact information.</li>
            <li>Email address and account credentials.</li>
            <li>Property listing information.</li>
            <li>Usage and browsing activity on our platform.</li>
            <li>Communication and support requests.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            How We Use Your Information
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>To provide and improve our services.</li>
            <li>To manage listings and user accounts.</li>
            <li>To communicate updates and notifications.</li>
            <li>To maintain security and prevent fraud.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Data Security
          </h2>

          <p className="text-gray-700 leading-8">
            We implement reasonable security measures to protect your personal
            information from unauthorized access, disclosure, alteration, or
            destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Third-Party Services
          </h2>

          <p className="text-gray-700 leading-8">
            StayNest may use trusted third-party services for hosting,
            authentication, analytics, and payment processing. These providers
            have their own privacy policies governing the use of your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Contact Us
          </h2>

          <p className="text-gray-700">
            If you have any questions regarding this Privacy Policy, please
            contact us at:
          </p>

          <p className="mt-2 font-medium text-indigo-600">
            support@staynest.com
          </p>
        </section>
      </div>
    </div>
  );
}