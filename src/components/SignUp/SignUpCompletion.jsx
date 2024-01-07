import { useContext } from "react";
import { Web5Context } from "../../store/web5-context";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const SignUpCompletion = ({ handleWriteUser }) => {
  const { userDid } = useContext(Web5Context).web5Instance;

  const didToClip = () => {
    navigator.clipboard.writeText(userDid);
  };

  return (
    <div className="flex flex-col justify-between flex-1 w-full">
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center gap-1">
          <p>Here's your DID </p>
          <QuestionMarkCircleIcon
            className="w-4"
            title="Decentralized Identifier"
          />
        </div>
        <button onClick={didToClip} className="border">
          copy DID
        </button>
        <a
          href="https://developer.tbd.website/docs/web5/learn/decentralized-identifiers"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more about DIDs.
        </a>
      </div>

      <button
        className="bg-cyan-100 text-sky-600 w-full mb-2 py-4 px-6 rounded-lg"
        type="submit"
        onClick={handleWriteUser}
      >
        Set up your profile
      </button>
    </div>
  );
};

export default SignUpCompletion;
