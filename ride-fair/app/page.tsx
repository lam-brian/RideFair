import LoadingScreen from "./ui/loading-screen";
import { cookies } from "next/headers";
import { UserData } from "./lib/definitions";
import { redirect } from "next/navigation";

export default function Home() {
  let user = undefined;

  const setUser = async (userData: UserData | undefined) => {
    "use server";

    // cookies().set("isLoggedIn", "true");
    console.log(userData);

    if (!userData) {
      redirect("/onboarding");
      return;
    }
  };

  return (
    <section className="w-full h-full">
      <LoadingScreen setUser={setUser} />
    </section>
  );
}
