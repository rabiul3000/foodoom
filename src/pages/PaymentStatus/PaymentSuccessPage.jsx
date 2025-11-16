import React from "react";
import { useParams, useSearchParams } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const order = searchParams.get("orderId") || orderId;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card shadow-xl bg-base-100 p-6 text-center animate-fadeIn">
          
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-green-500" size={70} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold mb-2 text-green-600">
            Payment Successful 🎉
          </h1>

          {/* Order ID */}
          <p className="text-base font-medium text-gray-600 mt-1">
            Your payment for Order:
          </p>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            #{order}
          </p>

          {/* Description */}
          <p className="text-gray-500 mb-6">
            Thank you for your purchase!  
            Your order is now being processed and will be delivered soon.
          </p>

          {/* Button */}
          <a href="/" className="btn btn-primary w-full gap-2">
            <IoMdHome size={22} />
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
