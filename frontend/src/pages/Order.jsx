import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from "../context/ShopContext"
import axios from 'axios';

const Order = () => {

  const { currency, backendUrl, token } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async() => {
    try {
      if(!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {token}})
      if(response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div>Order</div>
  )
}

export default Order