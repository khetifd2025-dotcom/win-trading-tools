import type { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  helper,
  icon: Icon
}: {
  label: string;
  value: string | number;
  helper?: string;
  icon?: LucideIcon;
}) {
  return (
    <section className="card rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-400">{label}</p>
        {Icon ? <Icon className="text-gold-200" size={18} /> : null}
      </div>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      {helper ? <p className="mt-2 text-xs text-zinc-500">{helper}</p> : null}
    </section>
  );
}
