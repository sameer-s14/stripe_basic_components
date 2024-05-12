
const express = require('express');
const app = express();
const { resolve } = require('path');
require('dotenv').config({
    path: resolve(__dirname, '../../.env')
})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');


app.use(cors({ origin: '*' }));
app.use(express.json())
app.get('/secret', async (req, res) => {
    const intent = await stripe.paymentIntents.create({
        currency: 'USD',
        amount: 1999,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: { enabled: true }
    });// ... Fetch or create the PaymentIntent
    res.json({ client_secret: intent.client_secret });
});

// Create card intent
app.get('/get-payment', async (req, res) => {
    const intent = await stripe.setupIntents.create({
        currency: 'USD',
        customer: 'cus_Q50I4arkz3cyHS',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: { enabled: true }
    });// ... Fetch or create the PaymentIntent
    res.json({ client_secret: intent.client_secret });
});

app.post('/api/add-card', async (req, res) => {
    try {
        const { token } = req.body;
        const customerId = "cus_Q50I4arkz3cyHS";
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: token?.id,
            },
        });
        // Attach Payment Method to Customer
        const attach = await stripe.paymentMethods.attach(paymentMethod.id, {
            customer: customerId,
        });

        res.json({ message: 'Card added successfully', paymentMethod, attach });
    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({ error: 'Failed to add card :: ' + error?.message });
    }
});

app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, customerId, paymentId } = req.body;

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customerId, // Customer ID associated with the saved card
            payment_method: paymentId, // Payment Method ID associated with the saved card
            // confirm: true, // Confirm the payment intent immediately,
            // return_url: 'http://localhost:3000/success',
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
        });

        res.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent :: ' + error.message });
    }
});


app.listen(3000, () => {
    console.log('Running on port 3000');
});
