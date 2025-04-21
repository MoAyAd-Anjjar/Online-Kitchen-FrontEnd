import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useUserContext } from '../../Provider/UserProvider';
import { useCartContext } from '../../Provider/CartProvider';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const { cart} = useCartContext();
  const { Amount}=useUserContext()

  // In a real app, you would fetch this from your backend
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
        if (!baseUrl) {
          throw new Error("Server URL is not defined.");
        }

        // Send cart and amount to backend
        const response = await axios.post(`${baseUrl}/create-payment-intent`, {
          amount: Amount * 100, // Convert to cents
          cartItems: cart.userList.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        });
        
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Failed to initialize payment");
      }
    };

    if (cart.userList.length > 0 && Amount > 0) {
      fetchClientSecret();
    }
  }, [cart, Amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
          billing_details: {
            name,
            email,
        
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setProcessing(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        alert('Payment successful!');
        // Redirect or show success message
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus-within:ring-indigo-500 focus-within:border-indigo-500">
                <CardNumberElement options={cardElementOptions} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Expiry */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiration Date
                </label>
                <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus-within:ring-indigo-500 focus-within:border-indigo-500">
                  <CardExpiryElement options={cardElementOptions} />
                </div>
              </div>

              {/* CVC */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus-within:ring-indigo-500 focus-within:border-indigo-500">
                  <CardCvcElement options={cardElementOptions} />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!stripe || processing || !clientSecret}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!stripe || processing || !clientSecret ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
              >
                {processing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Pay Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY || 'your_publishable_key');

const StripePaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripePaymentForm;