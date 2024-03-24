import { useContext, useState } from "react";
import { Web5Context } from "../../store/web5-context";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const SignUpCompletion = ({ handleWriteUser }) => {
  const { userDid } = useContext(Web5Context).web5Instance;
  const [isCopied, setIsCopied] = useState(false);

  const didToClip = () => {
    navigator.clipboard.writeText(userDid);
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col justify-between flex-1 w-full">
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center gap-1">
          <p className="text-neutrals-50 text- ">Your DID</p>
          <QuestionMarkCircleIcon
            className="w-4 text-blue-200"
            title="Decentralized Identifier"
          />
        </div>

        <div className="flex items-center bg-blue-400 text-white text-lg rounded-full p-3 m-4 w-full">
          <div className="flex items-center justify-between w-full">
            <input
              type="text"
              value={userDid}
              readOnly
              className="w-full max-w-xs overflow-hidden whitespace-nowrap bg-transparent font-medium px-4 border-none text-white"
            />
            <button
              onClick={didToClip}
              className="ml-2 bg-blue-200 text-blue-900 font-semibold px-4 py-2 rounded-full"
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <p className="text-neutrals-50 text-center">
          Your DID can be found in your profile settings.{" "}
          <a
            href="https://developer.tbd.website/docs/web5/learn/decentralized-identifiers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 underline"
          >
            Read more about DIDs.
          </a>
        </p>
      </div>

      <button
        className="text-base font-semibold bg-blue-200 text-blue-900 py-4 mt-8 w-full rounded-lg mb-8"
        type="submit"
        onClick={handleWriteUser}
      >
        Let's ride
      </button>
    </div>
  );
};

export default SignUpCompletion;
