import SignUpForm from "@/app/ui/signup/signup-form";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { UserData } from "@/app/lib/definitions";

export default function SignUp() {
  const createUser = async (prevState: any, formData: FormData) => {
    "use server";
    try {
      const firstName = formData.get("first-name");
      const lastName = formData.get("last-name");

      if (!firstName || !lastName) {
        throw new Error("Please fill in all required fields.");
      }

      return { message: "User created successfully!" };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { message: err.message };
      }

      return { message: "Something went wrong" };
    }
  };

  return (
    <div className="page-padding h-full flex flex-col">
      <div className="text-center mt-12 mb-6 relative">
        <Link
          href="/onboarding"
          className="w-6 absolute left-0 top-1/2 -translate-y-1/2"
          aria-label="Go back"
        >
          <ChevronLeftIcon />
        </Link>
        <h1 className="text-2xl">Sign up</h1>
      </div>
      <SignUpForm createUser={createUser} />
    </div>
  );
}
