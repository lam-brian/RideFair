"use client";

import { useState } from "react";
import { useFormStatus, useFormState } from "react-dom";

type PropTypes = {
  createUser: (
    prevState: any,
    formData: FormData
  ) => Promise<{ message: string }>;
};

const initialState = {
  message: "",
};

export default function SignUpForm({ createUser }: PropTypes) {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [firstNameActive, setFirstNameActive] = useState(false);
  const [lastNameActive, setLastNameActive] = useState(false);
  const [state, formAction] = useFormState(createUser, initialState);

  const buttonIsActive = !!enteredFirstName && !!enteredLastName;

  return (
    <form action={formAction} className="flex-1 flex flex-col gap-6">
      <div className="relative w-full">
        <label
          htmlFor="first-name"
          className={`label ${firstNameActive ? "label--active" : ""}`}
        >
          First Name
        </label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          required
          className={`input ${firstNameActive ? "input--active" : ""}`}
          onFocus={() => {
            setFirstNameActive(true);
          }}
          onBlur={() => {
            if (enteredFirstName) return;
            setFirstNameActive(false);
          }}
          onChange={(e) => setEnteredFirstName(e.target.value.trim())}
        />
      </div>
      <div className="relative w-full">
        <label
          htmlFor="last-name"
          className={`label ${lastNameActive ? "label--active" : ""}`}
        >
          Last Name
        </label>
        <input
          type="text"
          name="last-name"
          id="last-name"
          required
          className={`input ${lastNameActive ? "input--active" : ""}`}
          onFocus={() => {
            setLastNameActive(true);
          }}
          onBlur={() => {
            if (enteredLastName) return;
            setLastNameActive(false);
          }}
          onChange={(e) => setEnteredLastName(e.target.value.trim())}
        />
      </div>

      {state.message ? (
        <p className="pl-4 text-red-500">{state.message}</p>
      ) : (
        ""
      )}

      <p className="text-neutrals-100 mb-4 mt-auto">
        By selecting Agree and continue, I agree to RideFair’s
        <a href="#" className="text-blue-300">
          {" "}
          Terms of Service
        </a>
        ,
        <a href="#" className="text-blue-300">
          {" "}
          Payments Terms of Service
        </a>
        , and
        <a href="#" className="text-blue-300">
          {" "}
          Notification Policy{" "}
        </a>
        and acknowledge the Privacy Policy.
      </p>
      <SubmitBtn isActive={buttonIsActive} />
    </form>
  );
}

function SubmitBtn({ isActive }: { isActive: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`font-semibold py-4 px-6 rounded-lg transition ease-out${
        isActive && !pending
          ? " bg-blue-200 text-neutrals-900"
          : " bg-neutrals-800 text-neutrals-700"
      }`}
    >
      {pending ? "Submitting..." : "Agree and Continue"}
    </button>
  );
}
