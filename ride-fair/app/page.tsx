import SplashScreen from "./ui/splash-screen";
import { cookies } from "next/headers";
import { UserData } from "./lib/definitions";
import { redirect } from "next/navigation";

export default function Home() {
  const setUser = async (userData: UserData | {}) => {
    "use server";

    // cookies().set("isLoggedIn", "true");
    console.log(userData);
    if (!Object.entries(userData).length) {
      redirect("/onboarding");
      return;
    }
  };

  return (
    <section className="w-full h-full">
      <SplashScreen setUser={setUser} />
    </section>
  );
}
