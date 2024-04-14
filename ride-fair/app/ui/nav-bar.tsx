"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconActive,
  UserIcon as UserIconActive,
} from "@heroicons/react/24/solid";
import CarIcon from "./svg-components/car-icon";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center w-full text-neutrals-300 mb-4 border-t border-neutrals-800">
      <Link
        href="/"
        className={`button button-nav${
          pathname === "/" ? " text-blue-300" : ""
        }`}
      >
        {pathname === "/" ? (
          <HomeIconActive className="w-7" />
        ) : (
          <HomeIcon className="w-7" />
        )}
        Home
      </Link>
      <Link
        href="/rides"
        className={`button button-nav${
          pathname === "/rides" ? " text-blue-300" : ""
        }`}
      >
        <CarIcon className="basis-1/2 w-7 translate-y-[15%] scale-110 fill-inherit" />
        Rides
      </Link>
      <Link
        href="/profile"
        className={`button button-nav${
          pathname === "/profile" ? " text-blue-300" : ""
        }`}
      >
        {pathname === "/profile" ? (
          <UserIconActive className="w-7" />
        ) : (
          <UserIcon className="w-7" />
        )}
        Profile
      </Link>
    </div>
  );
}
