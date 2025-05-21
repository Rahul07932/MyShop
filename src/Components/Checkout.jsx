
import { cartdata } from '../redux/reducer';
 // public key only

const handleCheckout = async () => {
  const stripe = await stripePromise;

  const response = await fetch('http://localhost:5000/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItems: cartdata }),
  });

  const session = await response.json();

  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    console.error(result.error.message);
  }
};
export default handleCheckout
