"use client";

import { useContext, useEffect } from "react";
import { Web5Context } from "../lib/store";
import Image from "next/image";
import logo from "../assets/RideFair.svg";
import { UserData } from "../lib/definitions";

type PropTypes = {
  setUser: (userData: UserData | {}) => Promise<void>;
};

export default function LoadingScreen({ setUser }: PropTypes) {
  const ctx = useContext(Web5Context);

  useEffect(() => {
    const userData = ctx.user;
    setUser(userData);
  }, [ctx.user, setUser]);

  return (
    <div className="page-padding bg-blue-900 w-full h-full flex items-center justify-center">
      <div className="bg-blue-200 h"></div>
      <Image
        src={logo}
        alt="Logo"
        priority={true}
        className="flex basis-[19rem]"
      />
    </div>
  );
}
