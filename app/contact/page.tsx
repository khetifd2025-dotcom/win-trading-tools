import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import RiskWarning from "@/components/RiskWarning";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact WIN Trading Tools for support, product questions, and business inquiries.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="container-shell py-12">
      <section className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Support</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Contact WIN Trading Tools.</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          Use this form structure for v1 support requests. A backend handler can be connected later through Resend or another email provider.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <ContactForm />

        <aside className="card h-fit rounded-lg p-6">
          <Mail className="text-gold-200" />
          <h2 className="mt-4 text-lg font-semibold text-white">Email</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">support@example.com</p>
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Product support, partnership inquiries, and correction requests are welcome.
          </p>
        </aside>
      </section>

      <div className="mt-10">
        <RiskWarning compact />
      </div>
    </div>
  );
}
