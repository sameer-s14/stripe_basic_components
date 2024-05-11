
const express = require('express');
const app = express();
const { resolve } = require('path');
require('dotenv').config({
    path: resolve(__dirname, '../../.env')
})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');


app.use(cors({ origin: '*' }));

app.get('/secret', async (req, res) => {
    const intent = await stripe.paymentIntents.create({
        currency: 'USD',
        amount: 1999,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: { enabled: true }
    });// ... Fetch or create the PaymentIntent
    res.json({ client_secret: intent.client_secret });
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});