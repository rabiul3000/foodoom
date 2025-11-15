import React, { useContext, useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaIdCard,
  FaPhone,
  FaHome,
  FaMotorcycle,
  FaUser,
  FaFileSignature,
} from "react-icons/fa";
import AuthContext from "../../contexts/AuthContext";
import { axiosPublic } from "../../axios/axiosPublic";
import { axiosSecure } from "../../axios/axiosSecure";
import { errorAlert, successAlert } from "../../utils/alert";
import { useNavigate } from "react-router";

const BecomeRider = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axiosPublic.get(`/users/${user.id}`);
      setUserData(data);
    };

    getUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    try {
      setLoading(true);
      const form = e.target;
      const formData = new FormData(form);
      const userData = Object.fromEntries(formData);

      const { data } = await axiosSecure.put(`/users/become_rider/${user.id}`, {
        userData,
      });
      if (data) {
        successAlert("Form Submitted. Wait for Admin review");
        navigate("/");
      }
    } catch ({ response }) {
      setErrorMsg(response?.data?.message);
      errorAlert(response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-24 px-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 btn btn-primary btn-soft"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="bg-base-100 shadow-xl rounded-xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Become a Rider 🛵
        </h2>

        <p className="text-center mb-6 text-gray-600">
          Fill in the required information to apply as a delivery rider.
        </p>

        {successMsg && (
          <div className="alert alert-success mb-4">{successMsg}</div>
        )}
        {errorMsg && <div className="alert alert-error mb-4">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaUser /> Full Name
            </span>
            <input
              type="text"
              name="name"
              disabled
              defaultValue={userData?.name}
              className="input input-bordered w-full"
            />
          </label>

          {/* Email */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaFileSignature /> Email
            </span>
            <input
              type="email"
              name="email"
              disabled
              defaultValue={userData?.email}
              className="input input-bordered w-full"
            />
          </label>

          {/* Phone */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaPhone /> Phone Number
            </span>
            <input
              type="text"
              name="phone"
              required
              className="input input-bordered w-full"
              placeholder="e.g. 017XXXXXXXX"
            />
          </label>

          {/* Address */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaHome /> Address
            </span>
            <input
              type="text"
              name="address"
              required
              className="input input-bordered w-full"
              placeholder="Enter your full address"
            />
          </label>

          {/* NID */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaIdCard /> NID Number
            </span>
            <input
              type="text"
              name="nidNumber"
              required
              className="input input-bordered w-full"
              placeholder="Your National ID number"
            />
          </label>

          {/* License */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaIdCard /> Driving License Number
            </span>
            <input
              type="text"
              name="licenseNumber"
              required
              className="input input-bordered w-full"
              placeholder="Driving license number"
            />
          </label>

          {/* Vehicle Type */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaMotorcycle /> Vehicle Type
            </span>
            <select
              name="vehicleType"
              required
              className="select select-bordered w-full"
            >
              <option value="">Select vehicle type</option>
              <option value="bike">Bike</option>
              <option value="bicycle">Bicycle</option>
              <option value="scooter">Scooter</option>
              <option value="car">Car</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block mt-4"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeRider;
