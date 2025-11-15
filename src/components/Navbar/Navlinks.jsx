import { Link } from "react-router";

const Navlinks = () => {
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

  return (
    <div>
      {links.map(({ path, name }) => (
        <Link to={path} key={name} className="btn btn-primary btn-soft mx-2">
          {" "}
          {name}{" "}
        </Link>
      ))}
    </div>
  );
};
export default Navlinks;
