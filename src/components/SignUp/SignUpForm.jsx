import { useState } from "react";

const SignUpForm = ({ handleSetUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) return;

    handleSetUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });
  };

  return (
    <form className="flex flex-col flex-1" onSubmit={handleSignUp}>
      <div className="mb-4 relative">
        <input
          type="text"
          id="firstName"
          className="w-full border border-neutrals-300 mt-1 p-4 rounded-lg bg-blue-900 text-white placeholder-neutrals-300::placeholder focus:outline-none"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        {/* <label
          htmlFor="firstName"
          className={`absolute top-2 left-4 ${
            firstName ? "text-sm text-white" : "text-base text-neutrals-300"
          } ${firstName && "hidden"}`}
        >
          First Name
        </label> */}
      </div>
      <div className="mb-auto relative">
        <input
          type="text"
          id="lastName"
          className="w-full border border-neutrals-300 mt-1 p-4 rounded-lg bg-blue-900 text-white placeholder-neutrals-300::placeholder focus:outline-none"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        {/* <label
          htmlFor="lastName"
          className={`absolute top-2 left-4 ${
            lastName ? "text-sm text-white" : "text-base text-neutrals-300"
          } ${lastName && "hidden"}`}
        >
          Last Name
        </label> */}
      </div>

      <div>
        <p className="text-neutrals-50 text-sm">
          By selecting Agree and continue, I agree to RideFair's{" "}
          <span className="text-blue-200">
            Terms of Service, Payments Terms of Service
          </span>{" "}
          and <span className="text-sky-500">Notification Policy</span> and
          acknowledge the <span className="text-sky-500">Privacy Policy.</span>
        </p>

        <button
          className="text-base font-semibold bg-blue-200 text-blue-900 py-4 my-4 w-full rounded-lg"
          type="submit"
        >
          Agree and continue
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
