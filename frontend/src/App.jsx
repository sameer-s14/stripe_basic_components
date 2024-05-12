import { useEffect, useState } from 'react'
import './App.css'
import CheckoutPage from './components/checkout'
import axios from 'axios';
import CardForm from './components/addCard';
import PaymentFormElement from './components/payment';

function App() {
  const [clientSecret, setSecret] = useState();
  useEffect(() => {
    // axios.get('http://localhost:3000/secret').then(({ data }) => {
    //   setSecret(data?.client_secret)
    // }).catch(err => console.log({ err }))

    axios.post('http://localhost:3000/api/create-payment-intent', {
      amount: 123000, customerId: 'cus_Q50I4arkz3cyHS', paymentId: 'pm_1PFbLtRtfFKiaX9VVOLduVtR',
    }).then(({ data }) => {
      setSecret(data?.client_secret)
    }).catch(err => console.log({ err }))

  }, [])

  return (
    <>
      {/* <CardForm /> */}
      {/* {clientSecret && <CheckoutPage clientSecret={clientSecret} />} */}
      {clientSecret && <PaymentFormElement clientSecret={clientSecret} />}

    </>
  )
}

export default App
