import { useSearchParams } from "react-router";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  let message = "";
  let color = "";

  if (status === "success") {
    message = "🎉 Payment Successful!";
    color = "green";
  } else if (status === "fail") {
    message = "❌ Payment Failed. Please try again.";
    color = "red";
  } else if (status === "cancel") {
    message = "⚠️ Payment Cancelled by user.";
    color = "orange";
  } else {
    message = "Unknown payment status.";
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ color }}>{message}</h2>
      <a href="/" style={{ textDecoration: "underline", color: "blue" }}>
        Go back to home
      </a>
    </div>
  );
};

export default PaymentStatus;
