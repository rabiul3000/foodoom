import { FaGripLines } from "react-icons/fa";
import Navlinks from "./Navlinks";
import { Link } from "react-router";
import AuthItemInNavbar from "./AuthItemInNavbar";
import CartIndicatorInNavbar from "./CartIndicatorInNavbar";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 w-full z-50 px-4">
      {/* LEFT SECTION */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaGripLines className="text-xl" />
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-lg dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-72 flex flex-col gap-2"
            onClick={() => document.activeElement.blur()}
          >
            <Navlinks />
          </ul>
        </div>

        <Link className="btn btn-ghost text-2xl font-bold" to="/">
          Relish
        </Link>
      </div>

      {/* CENTER LINKS (Desktop only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Navlinks />
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end flex items-center gap-2">
        <CartIndicatorInNavbar />
        <AuthItemInNavbar />
      </div>
    </div>
  );
};

export default Navbar;
