import { cookies } from "next/headers";
import { UserData } from "./lib/definitions";
import { redirect } from "next/navigation";
import SplashScreen from "./ui/splash-screen";

export default function HomePage() {
  return (
    <section className="w-full h-full">
      <h1>Hello</h1>
    </section>
  );
}
