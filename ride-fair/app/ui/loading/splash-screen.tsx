import Image from "next/image";
import logo from "@/app/assets/RideFair.svg";
import Spinner from "./spinner";

export default function SplashScreen() {
  return (
    <div className="bg-neutrals-900 w-full h-full flex flex-col items-center justify-center gap-12">
      <Image src={logo} alt="Logo" priority={true} className="flex w-[19rem]" />

      <Spinner />
    </div>
  );
}
