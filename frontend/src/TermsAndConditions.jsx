export default function TermsAndConditions() {
  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-8">
          Last Updated: June 2026
        </p>

        <p className="text-gray-700 leading-8 mb-8">
          Welcome to StayNest. By accessing or using our platform, you agree to
          comply with these Terms & Conditions. Please read them carefully.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            User Responsibilities
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide accurate account information.</li>
            <li>Maintain the confidentiality of your account.</li>
            <li>Use the platform lawfully and responsibly.</li>
            <li>Respect other users and property owners.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Property Listings
          </h2>

          <p className="text-gray-700 leading-8">
            Hosts are responsible for ensuring that listing information,
            pricing, availability, and descriptions are accurate and up to
            date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Prohibited Activities
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Fraudulent activities or misrepresentation.</li>
            <li>Unauthorized access to user accounts.</li>
            <li>Posting misleading or harmful content.</li>
            <li>Violating applicable laws and regulations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Limitation of Liability
          </h2>

          <p className="text-gray-700 leading-8">
            StayNest acts as a platform connecting guests and hosts. We are not
            responsible for disputes, damages, losses, or issues arising from
            interactions between users.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Changes to Terms
          </h2>

          <p className="text-gray-700 leading-8">
            We reserve the right to update these Terms & Conditions at any
            time. Continued use of StayNest after changes constitutes acceptance
            of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Contact Information
          </h2>

          <p className="text-gray-700">
            For any questions regarding these Terms & Conditions:
          </p>

          <p className="mt-2 font-medium text-indigo-600">
            support@staynest.com
          </p>
        </section>
      </div>
    </div>
  );
}