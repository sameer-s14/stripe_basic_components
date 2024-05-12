import { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISH_KEY } from "../../config";
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const stripe = loadStripe(STRIPE_PUBLISH_KEY);

function CardForm() {
    const stripe = useStripe();
    const elements = useElements();
    
    async function addCard() {
        try {
            const { error, token } = await stripe.createToken(elements.getElement(CardElement));
            if (error) {
                console.log(error);
            } else {
                const response = await axios.post('http://localhost:3000/api/add-card', {
                    token
                });
                console.log({ response });
            }
        } catch (err) {
            console.log({ err })
        }
    }
    return <>
        <CardElement />

        <button onClick={addCard}>Add Card</button>
    </>
}


export default () => <Elements stripe={stripe} >
    <CardForm />
</Elements>