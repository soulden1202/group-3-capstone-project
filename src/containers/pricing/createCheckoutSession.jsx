import getStripe from "../../stripe/initializeStripe.js";
import { db } from "../../firebase/firebaseClient.jsx";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

export async function createCheckoutSession(uid, tier) {
  const checkoutSessionRef = collection(db, "users", uid, "checkout_sessions");

  const sessionRef = await addDoc(checkoutSessionRef, {
    price: tier,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  onSnapshot(
    doc(db, "users", uid, "checkout_sessions", sessionRef.id),
    async (snap) => {
      const { sessionId } = snap.data();
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await getStripe();
        stripe.redirectToCheckout({ sessionId });
      }
    }
  );

  // Wait for the CheckoutSession to get attached by the extension
}
