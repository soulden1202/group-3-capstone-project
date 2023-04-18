import Stripe from "stripe";

export async function CreateCustomerPortal(stripeId) {
  const stripe = new Stripe(process.env.REACT_APP_STRIPE_API_KEY);

  if (stripeId) {
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: window.location.origin,
    });

    window.location = session.url;
  }
}
