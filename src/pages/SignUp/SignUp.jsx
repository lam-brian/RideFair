import { useState, useContext } from "react";
import { Web5Context } from "../../store/web5-context";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import SignUpForm from "../../components/SignUp/SignUpForm";
import SignUpCompletion from "../../components/SignUp/SignUpCompletion";

const SignUp = () => {
  const [user, setUser] = useState();
  const [isCompleted, setIsCompleted] = useState(false);
  const web5Ctx = useContext(Web5Context);

  const writeUserToDWN = async (user) => {
    const { web5, userDid } = web5Ctx.web5Instance;
    const { record } = await web5.dwn.records.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
      },

      message: {
        schema: "http://ridefair.com/user",
        dataFormat: "application/json",
      },
    });

    web5Ctx.initUser(user);
    record.send(userDid);
  };

  return (
    <div className="flex flex-col items-center w-11/12 h-screen mx-4">
      <div className="relative w-full text-center mt-3">
        {!isCompleted && (
          <button className="absolute left-0 bottom-1/2 translate-y-1/2">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-2xl">
          {!isCompleted ? "Sign up" : "Thanks for signing up!"}
        </h1>
      </div>
      {!isCompleted ? (
        <SignUpForm
          handleSetUser={(user) => {
            setUser(user);
            setIsCompleted(true);
          }}
        />
      ) : (
        <SignUpCompletion handleWriteUser={writeUserToDWN.bind(null, user)} />
      )}
    </div>
  );
};

export default SignUp;
