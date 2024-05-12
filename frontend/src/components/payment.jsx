import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISH_KEY } from "../../config";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";

const stripe = loadStripe(STRIPE_PUBLISH_KEY);

function PaymentFormElement({ clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);

    async function handlePayment() {
        try {
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: 'pm_1PFbLtRtfFKiaX9VVOLduVtR', // Replace with your saved payment method ID
            });
            if (error) {
                setPaymentError(error.message);
            } else {
                console.log({
                    Success: 'Success'
                })
                // Payment successful
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setPaymentError('Failed to process payment');
        }
    }

    return (
        <>
            <CardElement />
            <button onClick={handlePayment}>Pay Now</button>
            {paymentError && <div>{paymentError}</div>}
        </>
    );
}



export default ({ clientSecret }) => {

    return < Elements stripe={stripe} options={{ clientSecret }}>
        
        <PaymentFormElement clientSecret={clientSecret}/>
    </Elements >

}