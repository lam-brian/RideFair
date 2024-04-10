import SignUpForm from "@/app/ui/registration/signup-form";
import SignUpCompletion from "@/app/ui/registration/signup-completion";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { revalidatePath } from "next/cache";
import { clearNewUserCookie } from "@/app/lib/server-actions";
import { cookies } from "next/headers";

export default function SignUp() {
  const isNewUser = cookies().get("newUser")?.value;

  const login = async () => {
    "use server";

    revalidatePath("/signup");
    clearNewUserCookie();
  };

  return (
    <div className="page-padding h-full flex flex-col">
      <div className="text-center mt-12 mb-6 relative text-neutrals-50">
        {isNewUser && (
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
        {!isNewUser && <h1 className="text-2xl">Thanks for signing up</h1>}
      </div>

      {isNewUser && <SignUpForm login={login} />}
      {!isNewUser && <SignUpCompletion />}
    </div>
  );
}
