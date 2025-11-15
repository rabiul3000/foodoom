import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router.jsx";
import { RouterProvider } from "react-router";
import CartProvider from "./providers/CartProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </AuthProvider>
);
