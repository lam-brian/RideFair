export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-900 px-6">
      <div className="relative w-full text-center mt-12 mb-6">
        {/* {!isCompleted && (
          <NavLink
            to={"/onboarding"}
            className="absolute left-0 bottom-1/2 translate-y-1/2"
          >
            <ChevronLeftIcon className="w-5 h-5 text-neutrals-50" />
          </NavLink>
        )} */}
        <h1 className="text-2xl font-semibold text-neutrals-50 ">
          {/* {!isCompleted ? "Sign up" : "Thanks for signing up!"} */}
          hi
        </h1>
      </div>
      {/* {!isCompleted ? (
        <SignUpForm
          handleSetUser={(user) => {
            setUser(user);
            setIsCompleted(true);
          }}
        />
      ) : (
        <SignUpCompletion handleWriteUser={writeUserToDWN.bind(null, user)} />
      )} */}
    </div>
  );
}
