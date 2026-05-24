import { cn } from "@/lib/utils";

type AdSize = "banner" | "rectangle" | "sidebar" | "inArticle";

const sizeClasses: Record<AdSize, string> = {
  banner: "min-h-24",
  rectangle: "min-h-64",
  sidebar: "min-h-80",
  inArticle: "min-h-36"
};

export default function AdPlaceholder({ size = "banner" }: { size?: AdSize }) {
  return (
    <aside
      className={cn(
        "grid place-items-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950/70 p-4 text-center",
        sizeClasses[size]
      )}
      aria-label="Advertisement placeholder"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Ad placement</p>
        <p className="mt-2 text-xs text-zinc-600">
          Development placeholder. Add ad network code here after approval.
        </p>
      </div>
    </aside>
  );
}
