# Email Service Documentation

This service handles order confirmation and transaction failure emails using Mailtrap.io for testing purposes.

## Setup

1. Create a free account at [Mailtrap.io](https://mailtrap.io)
2. Get your SMTP credentials from the Mailtrap dashboard
3. Add the following environment variables to your `.env.development.local` file:

```env
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
```

## Features

### Order Confirmation Email
- Sent when an order is successfully placed
- Includes:
  - Order number
  - Order date
  - Payment method and status
  - Detailed list of ordered items
  - Shipping address
  - Total amount

### Transaction Failed Email
- Sent when a payment transaction fails
- Includes:
  - Order number
  - Order date
  - Payment method
  - Troubleshooting steps for customers

## Usage

The email service is automatically integrated with the order processing system. Emails are sent at the following points:

1. When a new order is created (`createOrder`)
2. When a Stripe payment is completed (webhook handler)
3. When a Stripe session is converted to an order

## Templates

Email templates are located in the `templates` directory:
- `orderConfirmation.js`
  - `getOrderConfirmationTemplate()`: Generates HTML for successful orders
  - `getOrderFailedTemplate()`: Generates HTML for failed transactions

## Testing

To test the email service:
1. Ensure your Mailtrap credentials are correctly set in the environment variables
2. Place a test order through the application
3. Check your Mailtrap inbox for the confirmation email
4. For testing failed transactions, you can use Stripe's test cards that trigger specific responses

## Production Deployment

Before deploying to production:
1. Replace Mailtrap with your production email service provider
2. Update the SMTP configuration in `emailService.js`
3. Test thoroughly with the production email service
4. Consider implementing email queuing for better performance