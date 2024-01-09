import { useContext } from "react";
import { Web5Context } from "../../store/web5-context";
import MenuBar from "../../components/MenuBar/MenuBar";
import { StarIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { WalletIcon, KeyIcon, CogIcon } from "@heroicons/react/24/outline";
import profilePic from "../../assets/profile-pic.png";

const Profile = () => {
  const web5Ctx = useContext(Web5Context);
  const user = web5Ctx.user;
  const options = [
    {
      label: "Wallet",
      icon: <WalletIcon className="w-6" />,
    },
    {
      label: "DID Keys",
      icon: <KeyIcon className="w-6" />,
    },
    {
      label: "Legal",
      icon: <QuestionMarkCircleIcon className="w-6" />,
    },
    {
      label: "Settings",
      icon: <CogIcon className="w-6" />,
    },
  ];

  const renderedOptions = options.map((option, i) => (
    <li className="bg-blue-900 w-full" key={i}>
      <button className="py-4 px-4 w-full flex items-center gap-3 text-lg hover:bg-blue-800">
        {option.icon}
        {option.label}
      </button>
    </li>
  ));

  const wordToUpperCase = (word) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  };

  const name =
    wordToUpperCase(user.firstName) + " " + wordToUpperCase(user.lastName);

  return (
    <div className="w-full h-screen bg-blue-900 text-white pt-5 pb-4 flex flex-col">
      <div className="flex items-center gap-5 mb-10 px-4">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={profilePic}
            alt="Profile picture"
            className="w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-4xl font-normal tracking-wide mb-2">{name}</h1>
          <div className="flex items-center justify-center bg-blue-800 text-neutrals-100 w-max py-1 px-2 text-lg rounded-3xl">
            <StarIcon className="w-4" />
            5.0
          </div>
        </div>
      </div>
      <div className="w-full h-24 flex items-center justify-between gap-6 text-xl mb-9 px-4">
        <div className="flex-1 flex flex-col items-center justify-center gap-3 h-full bg-blue-800 rounded-lg">
          <p>$1,470.03</p>
          <p>Wallet</p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-3 h-full bg-blue-800 rounded-lg">
          <p>01</p>
          <p>Total Rides</p>
        </div>
      </div>
      <ul className="flex flex-col gap-px bg-blue-800 mb-auto">
        {renderedOptions}
      </ul>
      <div className="px-4">
        <MenuBar />
      </div>
    </div>
  );
};

export default Profile;
