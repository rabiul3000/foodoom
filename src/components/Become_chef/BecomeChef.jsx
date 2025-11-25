import React, { useContext, useState } from "react";
import {
  FaArrowLeft,
  FaIdCard,
  FaPhone,
  FaHome,
  FaUser,
  FaFileSignature,
  FaUtensils,
  FaStore,
  FaCertificate,
} from "react-icons/fa";
import AuthContext from "../../contexts/AuthContext";
import { axiosSecure } from "../../axios/axiosSecure";
import { errorAlert, successAlert } from "../../utils/alert";
import { useLocation, useNavigate } from "react-router";

const BecomeChef = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    state: { name, email },
  } = useLocation();

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      setLoading(true);
      const form = e.target;
      const formData = new FormData(form);
      const userData = Object.fromEntries(formData);

      const { data } = await axiosSecure.put(`/users/become_chef/${user.id}`, {
        userData,
      });

      if (data) {
        console.log(data);
        successAlert("Chef Application Submitted. Wait for Admin review!");
        navigate("/");
      }
    } catch ({response: {data}}) {
      setErrorMsg(data.message);
      errorAlert(data.message);
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
          Become a Chef 👨‍🍳
        </h2>

        <p className="text-center mb-6 text-gray-600">
          Fill in the details to register as a Chef on RelishGo.
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
              defaultValue={name}
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
              defaultValue={email}
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

          {/* Restaurant Name */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaStore /> Restaurant / Kitchen Name
            </span>
            <input
              type="text"
              name="restaurantName"
              required
              className="input input-bordered w-full"
              placeholder="Your restaurant or kitchen name"
            />
          </label>

          {/* Cuisine Type */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaUtensils /> Cuisine Type
            </span>
            <select
              name="cuisineType"
              required
              className="select select-bordered w-full"
            >
              <option value="">Select cuisine type</option>
              <option value="bangladeshi">Bangladeshi</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="thai">Thai</option>
              <option value="fast_food">Fast Food</option>
              <option value="continental">Continental</option>
              <option value="bakery">Bakery</option>
              <option value="mixed">Mixed</option>
            </select>
          </label>

          {/* Experience */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaIdCard /> Years of Experience
            </span>
            <input
              type="number"
              name="experience"
              min="0"
              required
              className="input input-bordered w-full"
              placeholder="e.g. 3"
            />
          </label>

          {/* Food Safety Certificate */}
          <label className="form-control">
            <span className="label-text font-medium flex items-center gap-2">
              <FaCertificate /> Food Safety Certificate No.
            </span>
            <input
              type="text"
              name="certificateNumber"
              className="input input-bordered w-full"
              placeholder="Certificate number (if any)"
            />
          </label>

          {/* Submit */}
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

export default BecomeChef;
