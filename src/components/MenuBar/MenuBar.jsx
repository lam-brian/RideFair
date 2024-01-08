import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { HomeIcon, QueueListIcon, UserIcon } from "@heroicons/react/24/outline";

const MenuBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center items-center w-full h-16 text-neutrals-300">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "menuButton text-blue-200" : "menuButton"
        }
      >
        <HomeIcon className="w-7" />
        Home
      </NavLink>
      <NavLink
        to="/activity"
        className={({ isActive }) =>
          isActive ? "menuButton text-blue-200" : "menuButton"
        }
      >
        <QueueListIcon className="w-7" />
        Activity
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "menuButton text-blue-200" : "menuButton"
        }
      >
        <UserIcon className="w-7" />
        Profile
      </NavLink>
    </div>
  );
};

export default MenuBar;
