import { useEffect, useState } from 'react'
import './App.css'
import CheckoutPage from './components/checkout'
import axios from 'axios';

function App() {
  const [clientSecret, setSecret] = useState();
  useEffect(() => {
    axios.get('http://localhost:3000/secret').then(({data}) => {
      setSecret(data?.client_secret)
    }).catch(err => console.log({ err }))
  }, [])
  return (
    <>
      {clientSecret && <CheckoutPage clientSecret={clientSecret} />}
    </>
  )
}

export default App
