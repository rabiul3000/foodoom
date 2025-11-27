import { createBrowserRouter } from "react-router";
import Foods from "./pages/Foods/Foods";
import Rootlayout from "./layouts/Rootlayout";
import FoodDetail from "./pages/FoodDetail/FoodDetail";
import CartPage from "./pages/Cart/CartPage";
import Register from "./pages/Auth/Register/Register";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Login from "./pages/Auth/Login/Login";
import Orders from "./pages/orders/Orders";
import OrderDetail from "./pages/orders/OrderDetail";
import Profile from "./pages/Auth/Profile/Profile";
import BecomeRider from "./components/Become_rider/BecomeRider";
import PaymentSuccessPage from "./pages/PaymentStatus/PaymentSuccessPage";
import PaymentFailPage from "./pages/PaymentStatus/PaymentFailPage";
import PaymentCancelPage from "./pages/PaymentStatus/PaymentCancelPage";
import OrdersForAdmin from "./pages/OrdersForAdmin/OrdersForAdmin";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminRoute from "./middlewares/AdminRoute";
import BecomeChef from "./components/Become_chef/BecomeChef";
import ChefRequests from "./pages/chefRequests/ChefRequests";
import RiderRequests from "./pages/RiderRequests/RiderRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        path: "foods",
        element: <Foods />,
      },
      {
        path: "foods/:id",
        element: <FoodDetail />,
      },
      {
        path: "/payment/success/:orderId",
        element: <PaymentSuccessPage />,
      },
      {
        path: "/payment/fail/:orderId",
        element: <PaymentFailPage />,
      },
      {
        path: "/payment/cancel/:orderId",
        element: <PaymentCancelPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/:id",
        element: <OrderDetail />,
      },
      {
        path: "/orders_for_admin",
        element: <OrdersForAdmin />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "become_rider",
        element: <BecomeRider />,
      },
      {
        path: "become_chef",
        element: <BecomeChef />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "manage_orders",
        element: (
          <AdminRoute>
            <OrdersForAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "chef_requests",
        element: (
          <AdminRoute>
            <ChefRequests />
          </AdminRoute>
        ),
      },
      {
        path: "rider_requests",
        element: (
          <AdminRoute>
            <RiderRequests />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
