import Link from "next/link";
import { BarChart3, FileText, Home, Package, Users } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: Home },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 }
];

export default function AdminSidebar() {
  return (
    <aside className="card rounded-lg p-4 lg:sticky lg:top-24 lg:h-fit">
      <p className="px-2 text-xs uppercase tracking-[0.24em] text-zinc-500">Admin</p>
      <nav className="mt-4 grid gap-1">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
