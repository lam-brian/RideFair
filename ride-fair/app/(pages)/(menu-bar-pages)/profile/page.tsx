import ProfileInfo from "@/app/ui/profile/profile-info";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import QuestionIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import CogIcon from "@heroicons/react/24/outline/Cog8ToothIcon";

export default function ProfilePage() {
  return (
    <div>
      <ProfileInfo />

      <nav className="bg-neutrals-800 flex flex-col gap-[1px] mt-8">
        <button className="w-full bg-neutrals-900 text-neutrals-50 py-4 flex gap-2 transition-all hover:text-neutrals-300">
          <CreditCardIcon className="w-6 text-neutrals-300" /> Wallet
        </button>
        <button className="w-full bg-neutrals-900 text-neutrals-50 py-4 flex gap-2 transition-all hover:text-neutrals-300">
          <KeyIcon className="w-6 text-neutrals-300" /> DID Keys
        </button>
        <button className="w-full bg-neutrals-900 text-neutrals-50 py-4 flex gap-2 transition-all hover:text-neutrals-300">
          <QuestionIcon className="w-6 text-neutrals-300" /> Legal
        </button>
        <button className="w-full bg-neutrals-900 text-neutrals-50 py-4 flex gap-2 transition-all hover:text-neutrals-300">
          <CogIcon className="w-6 text-neutrals-300" /> Settings
        </button>
      </nav>
    </div>
  );
}
