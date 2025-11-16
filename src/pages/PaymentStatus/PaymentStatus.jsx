import { useParams, useSearchParams } from "react-router";

const PaymentStatus = () => {
  const { status } = useParams();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  let message = "";
  let color = "";

  if (status === "success") {
    message = "🎉 Payment Successful!";
    color = "green";
  } else if (status === "fail") {
    message = "❌ Payment Failed. Please try again.";
    color = "red";
  } else if (status === "cancel") {
    message = "⚠️ Payment Cancelled.";
    color = "orange";
  } else {
    message = "Unknown payment status.";
    color = "gray";
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2 style={{ color }}>{message}</h2>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default PaymentStatus;
