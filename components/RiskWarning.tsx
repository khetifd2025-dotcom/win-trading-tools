export default function RiskWarning({ compact = false }: { compact?: boolean }) {
  return (
    <section className="rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
      <strong className="text-red-50">Risk warning:</strong>{" "}
      {compact
        ? "Trading involves significant risk. This content is educational only and is not financial advice."
        : "Trading involves significant risk. This website is for educational and informational purposes only. Nothing on this website is financial advice, investment advice, or a guarantee of results. Users are responsible for their own trading decisions."}
    </section>
  );
}
