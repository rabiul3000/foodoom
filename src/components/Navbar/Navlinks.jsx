import { useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../../contexts/AuthContext";

const Navlinks = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role;

  const links = [
    {
      path: "/foods",
      name: "Foods",
    },
    {
      path: "/orders",
      name: "Orders",
    },
  ];

  const adminLinks = [
    {
      path: "/foods",
      name: "Foods",
    },
    {
      path: "/orders",
      name: "Orders",
    },
    {
      path: "/admin/rider_requests",
      name: "Rider Requests",
    },
    {
      path: "/admin/chef_requests",
      name: "Chef Requests",
    },
    {
      path: "/admin/manage_orders",
      name: "Manage Orders",
    },
  ];

  return (
    <>
      {role !== "admin"
        ? links.map(({ path, name }) => (
            <li key={path}>
              {user ? (
                <Link to={path}>{name}</Link>
              ) : (
                <span className="loading loading-ring"></span>
              )}
            </li>
          ))
        : adminLinks.map(({ path, name }) => (
            <li key={path}>
              {user ? (
                <Link to={path}>{name}</Link>
              ) : (
                <span className="loading loading-ring"></span>
              )}
            </li>
          ))}
    </>
  );
};
export default Navlinks;
