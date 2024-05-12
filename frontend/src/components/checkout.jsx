import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { STRIPE_PUBLISH_KEY } from "../../config";
import { useState } from "react";

const stripe = loadStripe(STRIPE_PUBLISH_KEY);

// Customize the appearance of Elements using the Appearance API.
const appearance = {/* ... */ };

// Enable the skeleton loader UI for the optimal loading experience.
const loader = 'auto';
const options = {
  mode: 'setup',
  currency: 'usd',
};
export default ({ clientSecret }) => {

  return < Elements stripe={stripe} options={{ clientSecret, appearance, loader }}>
    <CheckoutForm />
  </Elements >

}


function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const {token,error} = await stripe.createToken('account',elements.getElement('payment')
  )
    console.log(error, paymentMethod)

    if (error) {
      setError(error.message);
    } else {
      try {
        // const { data } = await axios.post('/api/submit-payment', {
        //   paymentMethodId: paymentMethod.id,
        //   clientSecret: clientSecret,
        // });

        // Handle successful payment submission
        console.log(data);
      } catch (error) {
        // Handle error
        console.error('Error submitting payment:', error);
        setError("Failed to process payment. Please try again later.");
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h3>Payment</h3>
      <PaymentElement
        id="payment"
        // Optional prop for prefilling customer information
        options={{
          defaultValues: {
            billingDetails: {
              name: 'John Doe',
              phone: '888-888-8888',
            },
          },
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
