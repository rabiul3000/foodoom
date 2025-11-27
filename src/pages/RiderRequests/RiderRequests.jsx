import React from "react";
import { axiosSecure } from "../../axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { errorAlert } from "../../utils/alert";
import LoadingState from "../../components/Loadings/LoadingState";

const RiderRequests = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users", "rider_requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/riders");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingState />;
  if (error) return errorAlert(error.message);

  console.log(data);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Rider Requests</h2>

      {/* If no requests */}
      {data?.length === 0 && (
        <p className="text-gray-500">No pending rider requests.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((user) => (
          <div
            key={user._id}
            className="card bg-base-100 shadow-xl border rounded-xl"
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img
                      src={user.photoURL}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">Phone:</span>
                  {user?.phone || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Address:</span>
                  {user?.address || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Status:</span>
                  <span className="badge badge-warning">Pending</span>
                </p>
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-success btn-sm text-white">
                  Approve
                </button>
                <button className="btn btn-error btn-sm text-white">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderRequests;
