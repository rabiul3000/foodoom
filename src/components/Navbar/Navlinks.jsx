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
    <>
      {links.map(({ path, name }) => (
        <li key={path}>
          <Link to={path}>{name}</Link>
        </li>
      ))}
    </>
  );
};
export default Navlinks;
