import { useState, useContext } from "react";
import { Web5Context } from "../../store/web5-context";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const web5Ctx = useContext(Web5Context);

  const createUserRecord = async (user) => {
    // const { records } = await web5Ctx.web5Instance.dwn.records.query({
    //   from: web5Ctx.userDid,
    //   filter: {
    //     schema: "https://schema.org/Playlist",
    //     dataFormat: "application/json",
    //   },
    // });

    // console.log(records);

    const { web5, userDid } = web5Ctx.web5Object;
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
    const { status } = await record.send(userDid);
    console.log(status);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    console.log(firstName, lastName);
    createUserRecord({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });
  };

  return (
    <div className="flex flex-col items-center w-11/12 h-screen mx-4">
      <div className="relative w-full text-center mt-3">
        <button className="absolute left-0 bottom-1/2 translate-y-1/2">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-2xl">Sign up</h1>
      </div>
      <form
        className="flex flex-col justify-between flex-1"
        onSubmit={handleSignUp}
      >
        <div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="border"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="border"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <p>
            By selecting Agree and continue, I agree to RideFair's
            <span className="text-sky-500">
              {" "}
              Terms of Service, Payments Terms of Service
            </span>{" "}
            and
            <span className="text-sky-500"> Notification Policy</span> and
            acknowledge the
            <span className="text-sky-500"> Privacy Policy.</span>
          </p>

          <button
            className="bg-cyan-100 text-sky-600 w-full mb-2 py-4 px-6 rounded-lg"
            type="submit"
          >
            Agree and continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
