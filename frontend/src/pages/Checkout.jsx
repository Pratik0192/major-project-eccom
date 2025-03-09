import React from 'react'
import { useParams } from 'react-router-dom'
import Shipping from '../components/Shipping';

const Checkout = (props) => {
  const param = useParams();

  return (
    <div>
      <Shipping />
      <div></div>
    </div>
  )
}

export default Checkout