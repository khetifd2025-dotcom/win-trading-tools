import AdminSetupNotice from "@/components/AdminSetupNotice";
import AdminSidebar from "@/components/AdminSidebar";
import { products } from "@/lib/products";
import { createAdminMetadata } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export const metadata = createAdminMetadata({
  title: "Admin Products",
  description: "Admin product list and checkout status for WIN Trading Tools.",
  path: "/admin/products"
});

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

  return (
    <div className="container-shell grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Products.</h1>
        <AdminSetupNotice />

        <div className="card mt-8 overflow-x-auto rounded-lg">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-zinc-800 text-xs uppercase tracking-[0.18em] text-zinc-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Checkout status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {products.map((product) => (
                <tr key={product.slug}>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-3">{product.productType}</td>
                  <td className="px-4 py-3">{product.active ? "Active" : "Inactive"}</td>
                  <td className="px-4 py-3">{stripeConfigured ? "Stripe ready" : "Checkout not configured"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
