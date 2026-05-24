import Link from "next/link";
import EmailCaptureForm from "@/components/EmailCaptureForm";

export default function CTASection() {
  return (
    <section className="card grid gap-6 rounded-lg p-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Free checklist</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Plan trades before emotions take over.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
          Get the free trading checklist for risk, session timing, confirmation, and review prompts.
        </p>
        <Link href="/free-checklist" className="mt-5 inline-flex rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-900">
          View checklist page
        </Link>
      </div>
      <EmailCaptureForm />
    </section>
  );
}
