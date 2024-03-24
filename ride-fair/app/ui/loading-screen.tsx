"use client";

import Image from "next/image";
import logo from "../assets/RideFair.svg";

export default function LoadingScreen() {
  return (
    <div className="bg-blue-900 w-full h-full flex items-center justify-center">
      <div className="bg-blue-200 h"></div>
      <Image src={logo} alt="Logo" width={300} height={300} />
    </div>
  );
}
