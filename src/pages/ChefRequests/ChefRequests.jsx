import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../axios/axiosSecure";
import { errorAlert } from "../../utils/alert";
import LoadingState from "../../components/Loadings/LoadingState";
import { format } from "date-fns";

const ChefRequests = () => {
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users", "chef_requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/chef_requests");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingState />;
  if (error) return errorAlert(error.message);

  console.log(data);

  const handleApprove = async (userId) => {
    try {
      setApproveLoading(true);
      const { data } = await axiosSecure.patch("/users/chef_accept", {
        userId,
      });
      if(data) refetch()
    } catch (error) {
      errorAlert(error.message);
    } finally {
      setApproveLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setRejectLoading(true);
      const { data } = await axiosSecure.patch("/users/chef_reject");
      console.log(data);
    } catch (error) {
      errorAlert(error.message);
    } finally {
      setRejectLoading(true);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Chef Requests</h2>

      {/* If no requests */}
      {data?.length === 0 && (
        <p className="text-gray-500">No pending chef requests.</p>
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
                  <span className="font-semibold">Chef Status:</span>
                  {user.chefStatus === "pending" && (
                    <span className="badge badge-warning capitalize">
                      {user.chefStatus}{" "}
                    </span>
                  )}
                  {user.chefStatus === "approved" && (
                    <span className="badge badge-success capitalize">
                      {user?.chefStatus}{" "}
                    </span>
                  )}
                </p>

                {user.chefRequestAt && (
                  <p className="text-sm">
                    <span className="font-semibold">
                      Request time:{" "}
                      {format(parseInt(user?.chefRequestAt), "PPPP")}
                    </span>
                  </p>
                )}

                {user.chefApprovedAt && (
                  <p className="text-sm">
                    <span className="font-semibold">
                      Approve time:{" "}
                      {format(parseInt(user?.chefApprovedAt), "PPPP")}
                    </span>
                  </p>
                )}
              </div>

              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-success btn-sm text-white"
                  onClick={() => handleApprove(user._id)}
                  disabled={user.chefStatus === "approved"}
                >
                  {approveLoading ? "Loading..." : "Approve"}
                </button>
                <button
                  className="btn btn-error btn-sm text-white"
                  onClick={() => handleReject}
                  disabled={rejectLoading}
                >
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

export default ChefRequests;
