"use client";

import { useEffect } from "react";
import { initWeb5 } from "../lib/web5";
import Image from "next/image";
import logo from "../assets/RideFair.svg";
import { UserData } from "../lib/definitions";

type PropTypes = {
  setUser: (userData: UserData | undefined) => Promise<void>;
};

export default function LoadingScreen({ setUser }: PropTypes) {
  useEffect(() => {
    const init = async () => {
      const userData = await initWeb5();

      setUser(userData);
    };

    init();
  }, [setUser]);

  return (
    <div className="bg-blue-900 w-full h-full flex items-center justify-center">
      <div className="bg-blue-200 h"></div>
      <Image src={logo} alt="Logo" width={300} height={300} />
    </div>
  );
}
