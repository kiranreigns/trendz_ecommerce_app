export const getOrderConfirmationTemplate = (order, user) => {
  const items = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.productId && typeof item.productId === 'object' && item.productId.name}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.size}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.price.toFixed(2)}
      </td>
    </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Order Confirmation</h2>
          <p>Dear ${user && user.name ? user.name : order.shippingAddress.name},</p>
          <p>Thank you for your order! We're pleased to confirm that your order has been successfully placed.</p>
          
          <div style="margin: 20px 0;">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${order._id}</p>
            <p><strong>Order Date:</strong> ${new Date(
              order.orderedAt
            ).toLocaleString()}</p>
            <p><strong>Payment Method:</strong> ${
              order.payment.paymentMethod
            }</p>
            <p><strong>Payment Status:</strong> ${
              order.payment.paymentStatus
            }</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Items Ordered</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 10px; text-align: left;">Product</th>
                  <th style="padding: 10px; text-align: left;">Size</th>
                  <th style="padding: 10px; text-align: left;">Quantity</th>
                  <th style="padding: 10px; text-align: left;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${items}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
                  <td style="padding: 10px;"><strong>$${order.total.toFixed(
                    2
                  )}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3>Shipping Address</h3>
            <p>
              ${order.shippingAddress.name}<br>
              ${order.shippingAddress.street}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${
    order.shippingAddress.zipCode
  }<br>
              ${order.shippingAddress.country}<br>
              Phone: ${order.shippingAddress.phone}
            </p>
          </div>

          <p>We'll send you another email when your order ships.</p>
          <p>If you have any questions about your order, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>Your TrendZ Team</p>
        </div>
      </body>
    </html>
  `;
};

export const getOrderFailedTemplate = (order, user) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Order Transaction Failed</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Transaction Failed</h2>
          <p>Dear ${user && user.name ? user.name : order.shippingAddress.name},</p>
          <p>We regret to inform you that your recent order transaction has failed.</p>
          
          <div style="margin: 20px 0;">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${order._id}</p>
            <p><strong>Order Date:</strong> ${new Date(
              order.orderedAt
            ).toLocaleString()}</p>
            <p><strong>Payment Method:</strong> ${
              order.payment.paymentMethod
            }</p>
          </div>

          <div style="margin: 20px 0; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeeba; border-radius: 4px;">
            <p style="margin: 0;"><strong>Reason for Failure:</strong> The payment transaction could not be completed.</p>
          </div>

          <p>Please try the following:</p>
          <ul>
            <li>Check your payment details and ensure they are correct</li>
            <li>Ensure you have sufficient funds in your account</li>
            <li>Try using a different payment method</li>
            <li>Contact your bank if the issue persists</li>
          </ul>

          <p>You can try placing your order again by visiting our website.</p>
          
          <p>If you need any assistance or have questions, please don't hesitate to contact our customer support team.</p>
          
          <p>Best regards,<br>Your TrendZ Team</p>
        </div>
      </body>
    </html>
  `;
};
