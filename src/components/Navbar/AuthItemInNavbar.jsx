import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router";

const AuthItemInNavbar = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="navbar-end ">
      {!loading ? (
        user ? (
          <div className="flex  items-center gap-2">
            <div className="badge badge-ghost">Welcome back, {user?.name}</div>
            <div className="avatar relative">
              <div
                className="w-12 rounded-full"
                onClick={() => setIsDropdown((prev) => !prev)}
              >
                <img
                  src={user?.photoURL}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <ul
                className={` ${
                  isDropdown ? "absolute" : "hidden"
                }  w-32 top-15 right-1 py-4 flex flex-col bg-base-200 border border-slate-200`}
              >
                <li
                  className="btn btn-sm btn-ghost"
                  onClick={() => navigate(`/auth/profile/${user.id}`)}
                >
                  Profile
                </li>
                <li
                  className="btn btn-sm btn-error btn-soft"
                  onClick={() => logOut()}
                >
                  Logout
                </li>
                <li
                  className="btn btn-sm btn-ghost"
                  onClick={() => setIsDropdown((prev) => !prev)}
                >
                  Close
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Link className="btn btn-error btn-soft" to={"/auth/login"}>
              Login
            </Link>
          </div>
        )
      ) : (
        <span className="loading loading-ring loading-sm mr-24"></span>
      )}
    </div>
  );
};

export default AuthItemInNavbar;
