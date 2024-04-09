"use client";

import { useContext, useState } from "react";
import { Context } from "@/app/lib/store";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SignUpCompletion() {
  const { userDid } = useContext(Context).web5Instance;
  const [isCopied, setIsCopied] = useState(false);

  const didToClip = () => {
    navigator.clipboard.writeText(userDid);
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col text-center h-full">
      <p className="flex justify-center items-center gap-1 mb-4 text-neutrals-100">
        Here{"'"}s your DID
        <QuestionMarkCircleIcon className="text-blue-300 w-6" />
      </p>
      <div className="flex bg-neutrals-500 border-neutrals-500 border gap-[1px] rounded-lg w-full overflow-hidden mb-4">
        <input
          type="text"
          value={userDid}
          readOnly
          className="flex-1 p-4 bg-neutrals-900 text-neutrals-300 border-none"
        />

        <button
          onClick={didToClip}
          className="flex-grow-0 basis-1/5 py-4 bg-neutrals-800 text-neutrals-100 font-semibold transition ease-out hover:opacity-75"
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-neutrals-100">
        Your DID will be stored in your profile account.
      </p>
      <a
        href="https://developer.tbd.website/docs/web5/learn/decentralized-identifiers"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300"
      >
        Read more about DIDs.
      </a>

      <Link href={"/"} className="button button-primary mt-auto">
        Let{"'"}s Ride
      </Link>
    </div>
  );
}
