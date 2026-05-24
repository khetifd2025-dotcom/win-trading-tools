import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell py-20">
      <section className="card mx-auto max-w-xl rounded-lg p-8 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          The page may have moved or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black"
        >
          Back home
        </Link>
      </section>
    </div>
  );
}
