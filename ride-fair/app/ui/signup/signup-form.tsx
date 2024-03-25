"use client";

import { useState } from "react";

export default function SignUpForm() {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [firstNameActive, setFirstNameActive] = useState(false);
  const [lastNameActive, setLastNameActive] = useState(false);

  return (
    <form action="" className="flex flex-col gap-6">
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
          className={`input ${firstNameActive ? "input--active" : ""}`}
          onFocus={() => {
            setFirstNameActive(true);
          }}
          onBlur={() => {
            if (enteredFirstName) return;
            setFirstNameActive(false);
          }}
          onChange={(e) => setEnteredFirstName(e.target.value)}
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
          className={`input ${lastNameActive ? "input--active" : ""}`}
          onFocus={() => {
            setLastNameActive(true);
          }}
          onBlur={() => {
            if (enteredLastName) return;
            setLastNameActive(false);
          }}
          onChange={(e) => setEnteredLastName(e.target.value)}
        />
      </div>
    </form>
  );
}
