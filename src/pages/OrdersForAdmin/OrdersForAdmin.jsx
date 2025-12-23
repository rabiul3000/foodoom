import { axiosSecure } from "./../../axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import OrderItemForAdmin from "./OrderItemForAdmin";
import TableRowForAdmin from "./TableRowForAdmin";
import { useMemo, useState } from "react";

const OrdersForAdmin = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [pageNumber, setpageNumber] = useState(0);

  const { error, isLoading, isFetching, refetch, data } = useQuery({
    queryKey: ["admin_orders", pageNumber],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `orders/all_orders_admin/${pageNumber}`
      );
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
    "TransId",
    "Payment method",
    "Payment Status",
    "Time",
    "Order Status",
    "Action",
  ];

  const filterKeywords = [
    "all",
    "today",
    "yesterday",
    "pending",
    "confirmed",
    "paid",
    "unpaid",
  ];

  const filteredOrders = useMemo(() => {
    if (!data) return [];

    if (activeFilter === "all") return data.orders;

    // status filters
    if (["pending", "confirmed"].includes(activeFilter)) {
      return data.orders.filter((item) => item.orderStatus === activeFilter);
    }

    // payment filters
    if (["paid", "unpaid"].includes(activeFilter)) {
      return data.orders.filter((item) => item.paymentStatus === activeFilter);
    }

    // date filters
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (activeFilter === "today") {
      return data.orders.filter(
        (item) => new Date(item.createdAt).toDateString() === today
      );
    }

    if (activeFilter === "yesterday") {
      return data.orders.filter(
        (item) => new Date(item.createdAt).toDateString() === yesterday
      );
    }

    return data.orders;
  }, [data, activeFilter]);

  const handleFilter = (filterKey) => {
    setActiveFilter(filterKey);
  };

  const handlePagination = (pageNum) => {
    setpageNumber(pageNum);
  };

  console.log(pageNumber);

  return (
    <div className="flex flex-col w-11/12 mx-auto py-8">
      <div className=" flex justify-between">
        <div className="flex gap-2">
          {filterKeywords.map((filterKeyword) => (
            <button
              key={filterKeyword}
              onClick={() => handleFilter(filterKeyword)}
              className={`btn btn-sm capitalize ${
                activeFilter === filterKeyword ? "btn-primary" : "btn-outline"
              }`}
            >
              {filterKeyword}
            </button>
          ))}
        </div>
        <div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              refetch();
              setActiveFilter("all");
              setpageNumber(1);
            }}
          >
            {isFetching ? "Loading" : "Refresh"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full border border-gray-300 rounded-lg mt-12 mb-6">
        <table className="table table-zebra min-w-[900px]">
          {/* head */}
          <thead>
            <tr>
              {tableHeaderArray.map((item, index) => (
                <th key={index}> {item} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((item) => (
              <TableRowForAdmin key={item._id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination  */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: Math.ceil(data?.totalPages) }).map((_, index) => (
          <button
            key={index}
            className={`btn btn-sm  btn-neutral  ${
              pageNumber === index + 1 ? "btn-neutral" : "btn-soft"
            }   `}
            onClick={() => {
              handlePagination(index + 1);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersForAdmin;
