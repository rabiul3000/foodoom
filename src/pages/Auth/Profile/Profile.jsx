import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { axiosPublic } from "../../../axios/axiosPublic";
import {
  FaUserCircle,
  FaEnvelope,
  FaIdBadge,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserProfile = useCallback(async (id) => {
    try {
      setLoading(true);
      const { data } = await axiosPublic.get(`/users/${id}`);
      setProfile(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfile(id);
  }, [id, getUserProfile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <FaSpinner className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">No profile found</p>
      </div>
    );
  }

  console.log(profile);

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-10 px-4 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 btn btn-primary btn-soft"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Profile Card */}
      <div className="bg-base-100 shadow-xl rounded-2xl max-w-md w-full p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          {/* Profile Photo */}
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {profile.photoURL ? (
                <img src={profile.photoURL} alt={profile.name} />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>
          </div>

          {/* Name + Email */}
          <h2 className="text-2xl font-semibold text-primary mb-1">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <FaEnvelope /> {profile.email}
          </p>

          {/* Role */}
          <div className="mt-4 px-3 py-1 rounded-full bg-primary/10 text-error font-medium text-sm capitalize">
            {profile.role}
          </div>

          <div className="divider my-6"></div>

          {/* User ID */}
          <div className="w-full text-left flex items-center gap-2">
            <FaIdBadge className="text-primary" />
            <p className="text-gray-600 break-all text-sm">
              <span className="font-semibold text-base-content">User ID:</span>{" "}
              {profile._id}
            </p>
          </div>

          {/* Button */}
          <button className="btn btn-primary btn-block mt-6">
            Edit Profile
          </button>
          <div className="w-full flex justify-start items-start">
            <p className="text-sm text-bold text-gray-500 py-2">
              I want to become a{" "}
              <Link
                className="text-sm text-blue-800 underline"
                to={"/auth/become_rider"}
              >
                {" "}
                rider{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
