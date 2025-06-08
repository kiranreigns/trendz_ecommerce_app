# TrendZ - A Modern E-commerce Platform with Admin Dashboard

![Desktop mock img](/readme%20images/desktop_mock.png)
![Desktop mock img](/readme%20images/mobile_mock.png)
![Desktop mock img](/readme%20images/admin.png)

TrendZ is a full-stack e-commerce platform that provides a seamless shopping experience with integrated payment processing, order management, and an administrative dashboard. It features real-time inventory management, multi-payment gateway support, and a responsive user interface.

The platform comes with a customer-facing storefront and an admin panel, enabling businesses to manage products and update orders. Built with React and Node.js, TrendZ offers features like wishlist management, shopping bag functionality, multiple payment options (Stripe, Razorpay, COD), and automated order confirmation emails.

## Repository Structure

```
.
├── admin/                 # Admin dashboard application
│   ├── src/              # Admin source code with React components
│   └── vite.config.js    # Vite configuration for admin panel
├── backend/              # Server-side application
│   ├── app.js           # Express application entry point
│   ├── controllers/     # Business logic handlers
│   ├── models/         # MongoDB schemas and models
│   ├── routes/         # API route definitions
│   └── services/       # External service integrations (email, payment)
└── frontend/           # Customer-facing application
    ├── src/           # Frontend source code
    │   ├── components/ # Reusable UI components
    │   ├── context/   # React context providers
    │   ├── hooks/     # Custom React hooks
    │   └── services/  # API service integrations
    └── vite.config.js # Vite configuration for frontend
```

## Usage Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Stripe and Razorpay accounts for payment processing
- Cloudinary account for image hosting

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kiranreigns/trendz_ecommerce_app.git or
git clone git@github.com:kiranreigns/trendz_ecommerce_app.git
```

2. Install dependencies for all applications:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install

# Install admin dependencies
cd admin
npm install
```

3. Configure environment variables:

Create `.env.development.local` files in each directory (backend, frontend, admin) with the following variables:

Backend:

```env
PORT=5000
NODE_ENV=development
DB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
MAILTRAP_USER='your_mailtrap_user'
MAILTRAP_PASS='your_mailtrap_password'
```

Frontend:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Admin:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Quick Start

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend application:

```bash
cd frontend
npm run dev
```

3. Start the admin dashboard:

```bash
cd admin
npm run dev
```

### Troubleshooting

1. MongoDB Connection Issues:

- Error: "MongoServerError: Authentication failed"
  - Check if MongoDB is running: `sudo systemctl status mongodb`
  - Verify DB_URI in environment variables
  - Ensure MongoDB user has correct permissions

2. Payment Gateway Integration:

- Error: "Invalid API key provided"
  - Verify Stripe/Razorpay API keys in environment variables
  - Check if keys are for test/production environment
  - Ensure proper initialization of payment SDKs

3. Image Upload Issues:

- Error: "Error uploading to Cloudinary"
  - Verify Cloudinary credentials
  - Check file size limits
  - Ensure proper CORS configuration

## Data Flow

The application follows a client-server architecture with RESTful API communication.

```ascii
[Frontend/Admin] <-> [Express Backend] <-> [MongoDB]
      ↑                    ↑
      |                    |
[Payment Gateways]    [Cloudinary]
```

Key interactions:

1. Frontend/Admin apps make API requests to Express backend
2. Backend authenticates requests using JWT
3. Backend processes business logic and interacts with MongoDB
4. Payment processing handled through Stripe/Razorpay integration
5. Image storage managed through Cloudinary
6. Real-time order updates sent via email notifications
7. Shopping cart/wishlist sync between local storage and database

### To simulate payments use these test cards:

For Stripe test card visit [Stripe](https://docs.stripe.com/testing)
![Desktop mock img](/readme%20images/stripe.jpeg)

For Razorpay test card visit [Razorpay](https://razorpay.com/docs/payments/payments/test-card-details)
![Desktop mock img](/readme%20images/razorpay.jpeg)
