import Image from "next/image";
import logo from "../assets/RideFair.svg";

export default function SplashScreen() {
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
