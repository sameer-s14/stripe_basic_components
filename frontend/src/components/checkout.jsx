import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

const stripe = loadStripe('pk_test_51P0QFESDeBsltlDPDhGjWRCzzAKu0DAWIuYQ6Fj54AY5iunByTj7ZV0Edxjzvo0doSs9hpelTHYcfFp2NrUtM8Fd00BpGQGgo5');

// Customize the appearance of Elements using the Appearance API.
const appearance = {/* ... */ };

// Enable the skeleton loader UI for the optimal loading experience.
const loader = 'auto';

export default ({ clientSecret }) => {

  console.log({ clientSecret })
  return < Elements stripe={stripe} options={{ clientSecret, appearance, loader }}>
    <CheckoutForm />
  </Elements >

}

function CheckoutForm() {
  return (
    <form>
      <h3>Contact info</h3>
      <LinkAuthenticationElement
        // Optional prop for prefilling customer information
        options={{
          defaultValues: {
            email: 'foo@bar.com',
          },
        }}
      />
      <h3>Payment</h3>
      <PaymentElement
        // Optional prop for prefilling customer information
        options={{
          defaultValues: {
            billingDetails: {
              name: 'John Doe',
              phone: '888-888-8888',
            },
          },
        }}
      />;
      <button type="submit">Submit</button>
    </form>
  );
}