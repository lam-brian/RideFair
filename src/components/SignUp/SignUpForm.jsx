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
  );
};

export default SignUpForm;
