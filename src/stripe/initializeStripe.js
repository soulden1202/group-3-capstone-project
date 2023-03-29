import { loadStripe } from "@stripe/stripe-js";

const initializeStripe = async () => {
  const stripePromise = await loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  return stripePromise;
};
export default initializeStripe;
