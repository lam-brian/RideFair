"use client";

import { useState, useContext, FormEvent } from "react";
import { Context } from "@/app/lib/store";
import { useFormStatus } from "react-dom";
import { UserData } from "@/app/lib/definitions";

type PropTypes = {
  login: () => void;
};

export default function SignUpForm({ login }: PropTypes) {
  const ctx = useContext(Context);
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [firstNameActive, setFirstNameActive] = useState(false);
  const [lastNameActive, setLastNameActive] = useState(false);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newUser: UserData = {
        firstName: enteredFirstName.trim(),
        lastName: enteredLastName.trim(),
      };

      const res = await ctx.createUser(newUser);

      if (res?.message) {
        login();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const buttonIsActive = !!enteredFirstName && !!enteredLastName;

  return (
    <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col gap-6">
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
        and acknowledge the
        <a href="#" className="text-blue-300">
          {" "}
          Privacy Policy
        </a>
        .
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
      className={`button${
        isActive && !pending ? " button-primary" : " button-disabled"
      }`}
    >
      {pending ? "Submitting..." : "Agree and Continue"}
    </button>
  );
}
