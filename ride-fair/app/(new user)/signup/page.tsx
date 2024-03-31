import SignUpForm from "@/app/ui/signup/signup-form";
import SignUpCompletion from "@/app/ui/signup/signup-completion";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { UserData } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

let completed = false;

export default function SignUp() {
  const createUser = async (prevState: any, formData: FormData) => {
    "use server";
    try {
      const firstName = formData.get("first-name")?.toString();
      const lastName = formData.get("last-name")?.toString();

      if (!firstName || !lastName) {
        throw new Error("Please fill in all required fields.");
      }

      const newUser: UserData = {
        firstName,
        lastName,
      };

      cookies().set("isLoggedIn", "true");

      completed = true;
      revalidatePath("/signup");

      return {
        message: "User created successfully!",
        user: newUser,
      };
    } catch (err: unknown) {
      const response = { message: "Something went wrong", user: null };

      if (err instanceof Error) {
        response.message = err.message;
      }

      return response;
    }
  };

  return (
    <div className="page-padding h-full flex flex-col">
      <div className="text-center mt-12 mb-6 relative">
        {!completed && (
          <>
            <Link
              href="/onboarding"
              className="w-6 absolute left-0 top-1/2 -translate-y-1/2"
              aria-label="Go back"
            >
              <ChevronLeftIcon />
            </Link>
            <h1 className="text-2xl">Sign up</h1>
          </>
        )}
        {completed && <h1 className="text-2xl">Thanks for signing up</h1>}
      </div>

      {!completed && <SignUpForm createUser={createUser} />}
      {completed && <SignUpCompletion />}
    </div>
  );
}
