import { axiosSecure } from "./../../axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import OrderItemForAdmin from "./OrderItemForAdmin";
import TableRowForAdmin from "./TableRowForAdmin";

const OrdersForAdmin = () => {
  const { error, isLoading, isFetching, data } = useQuery({
    queryKey: ["admin_orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("orders/all_orders_admin");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  isLoading ||
    (isFetching && (
      <center>
        <span className="loading loading-bars"></span>
      </center>
    ));

  if (error) {
    console.log(error);
  }

  const tableHeaderArray = [
    "User",
    "OrderId",
    "Payment Status",
    "Time",
    "Order Status",
    "Action",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {tableHeaderArray.map((item, index) => (
              <th key={index}> {item} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <TableRowForAdmin key={item._id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersForAdmin;
