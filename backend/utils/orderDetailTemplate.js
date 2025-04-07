const orderDetailTemplate = ({orderId, items, amount, address, paymentMethod}) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
    <h2>Order Confirmation</h2>
    <p>Thank you for your order! Below are your order details:</p>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
    <p><strong>Total Amount:</strong> ₹${amount}</p>
    <h3>Shipping Address:</h3>
    <p>${address.street}, ${address.city}, ${address.state} - ${address.pincode}</p>
    <h3>Order Items:</h3>
    <ul>
      ${items
        .map(
          (item) =>
            `<li>${item.name} - ${item.quantity} x ₹${item.discounted_price}</li>`
        )
        .join("")}
    </ul>
    <p>We will notify you once your order is shipped.</p>
    <p>Thank you for shopping with us!</p>
  </div>
`;
}

export default orderDetailTemplate;