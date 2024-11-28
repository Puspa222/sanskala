import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import Logo from "./Logo";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },

    {
      name: "Policies",
      slug: "/policies",
      active: true,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ];
  return (
    <header className="bg-orange-400 p-3 flex rounded-xl">
      <nav className="flex justify-between">
        <div className="mr-4">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>
        <div>
          <ul className="flex ml-auto gap-3">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block px-6 py-2 duration-200 hover:bg-blue-500 text-white rounded-xl font-bold ${
                        isActive ? "bg-blue-600" : null
                      }
                        ${!isActive ? "bg-gray-500" : null}
                        `
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}{" "}
            {authStatus && (
              <li
                key="logout"
                className="hover:bg-blue-500 px-6 py-2 rounded-xl"
              >
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
