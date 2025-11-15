import { FaGripLines } from "react-icons/fa";
import Navlinks from "./Navlinks";
import { Link } from "react-router";
import AuthItemInNavbar from "./AuthItemInNavbar";
import CartIndicatorInNavbar from "./CartIndicatorInNavbar";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm fixed z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden flex flex-col"
          >
            <FaGripLines />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Navlinks />
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" to={"/"}>
          Rolish
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Navlinks />
        </ul>
      </div>
      <CartIndicatorInNavbar />
      <AuthItemInNavbar />
    </div>
  );
};

export default Navbar;
