import React from 'react'
import { useParams } from 'react-router-dom'
import Shipping from '../components/Shipping';
import Summary from '../components/Summary';

const Checkout = (props) => {
  const param = useParams();

  return (
    <div>
      <Shipping />
      <div>
        <Summary />
      </div>
    </div>
  )
}

export default Checkout