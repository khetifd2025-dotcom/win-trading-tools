import "server-only";
import Stripe from "stripe";
import { SITE_URL } from "@/lib/constants";
import { getProductBySlug, getProductUnitAmount } from "@/lib/products";

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  return new Stripe(secretKey);
}

export async function createCheckoutSession(productSlug: string) {
  const stripe = getStripeClient();
  const product = getProductBySlug(productSlug);

  if (!product) {
    return {
      ok: false,
      error: "Product not found.",
      status: 404
    };
  }

  if (!product.active) {
    return {
      ok: false,
      error: "This product is not available right now.",
      status: 400
    };
  }

  if (!stripe) {
    return {
      ok: false,
      error: "Checkout is not configured yet.",
      status: 503
    };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: product.currency,
          unit_amount: getProductUnitAmount(product),
          product_data: {
            name: product.name,
            description: product.description
          }
        }
      }
    ],
    metadata: {
      productSlug: product.slug
    },
    success_url: `${SITE_URL}/products/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/products/cancel`
  });

  if (!session.url) {
    return {
      ok: false,
      error: "Stripe did not return a checkout URL.",
      status: 502
    };
  }

  return {
    ok: true,
    url: session.url,
    id: session.id
  };
}
