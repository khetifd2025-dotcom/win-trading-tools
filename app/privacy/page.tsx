import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for WIN Trading Tools, including collected data, email leads, cookies, analytics, Supabase, Stripe, and Resend.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <div className="container-shell py-12">
      <article className="card mx-auto max-w-3xl rounded-lg p-6">
        <h1 className="text-4xl font-semibold text-white">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">Last updated: May 23, 2026</p>
        <div className="mt-8 grid gap-6 text-sm leading-7 text-zinc-300">
          <section>
            <h2 className="text-xl font-semibold text-white">Information we collect</h2>
            <p className="mt-2">
              WIN Trading Tools may collect names, email addresses, trading level, main market preferences, form submissions, product checkout activity, and anonymous tool usage events.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Email leads</h2>
            <p className="mt-2">
              If you submit a checklist or email form, we may store your information to send the requested resource, educational updates, and product announcements. You can unsubscribe from marketing emails when email delivery is configured.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Cookies and analytics</h2>
            <p className="mt-2">
              This site is prepared for analytics and advertising tools such as Google Analytics, Google AdSense, or other ad networks. These services may use cookies or similar technologies after they are enabled.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Third-party services</h2>
            <p className="mt-2">
              The platform is structured to use Supabase for database/auth, Stripe for checkout, Resend for email, and analytics providers for measurement. These providers process data according to their own policies.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Data protection</h2>
            <p className="mt-2">
              We aim to store only useful operational data and protect secret service keys on the server. No website can guarantee absolute security.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-2">
              For privacy questions or deletion requests, contact support@example.com.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
