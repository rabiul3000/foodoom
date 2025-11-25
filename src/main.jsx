import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router.jsx";
import { RouterProvider } from "react-router";
import CartProvider from "./providers/CartProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);
