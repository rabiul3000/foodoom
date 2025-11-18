import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router";

const AuthItemInNavbar = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar-end">
      {loading ? (
        <span className="loading loading-ring loading-sm"></span>
      ) : user ? (
        <div className="flex items-center gap-3">
          <span className="badge badge-secondary badge-soft  hidden md:flex">
            Welcome, {user?.name}
          </span>

          {/* DaisyUI Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full">
                <img
                  src={user?.photoURL}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  alt="User"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-xl shadow-lg w-48 p-2"
            >
              <li>
                <button
                  className="hover:bg-base-300"
                  onClick={() => navigate(`/auth/profile/${user.id}`)}
                >
                  Profile
                </button>
              </li>

              <li>
                <button
                  className="hover:bg-base-300 text-error font-semibold"
                  onClick={() => logOut()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link className="btn btn-error btn-soft" to="/auth/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthItemInNavbar;
