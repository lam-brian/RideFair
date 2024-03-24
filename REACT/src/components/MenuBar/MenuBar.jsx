import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconActive,
  UserIcon as UserIconActive,
} from "@heroicons/react/24/solid";
import activityIcon from "../../assets/activity-icon.svg";
import activityActiveIcon from "../../assets/activity-active-icon.svg";

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
        {pathname === "/" ? (
          <HomeIconActive className="w-7" />
        ) : (
          <HomeIcon className="w-7" />
        )}
        Home
      </NavLink>
      <NavLink
        to="/activity"
        className={({ isActive }) =>
          isActive ? "menuButton text-blue-200" : "menuButton"
        }
      >
        <img
          src={pathname === "/activity" ? activityActiveIcon : activityIcon}
          alt=""
          className="w-7 h-7"
        />
        My Rides
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "menuButton text-blue-200" : "menuButton"
        }
      >
        {pathname === "/profile" ? (
          <UserIconActive className="w-7" />
        ) : (
          <UserIcon className="w-7" />
        )}
        Profile
      </NavLink>
    </div>
  );
};

export default MenuBar;
