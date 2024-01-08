import { HomeIcon, QueueListIcon, UserIcon } from "@heroicons/react/24/outline";

const MenuBar = () => {
  return (
    <div className="flex justify-center items-center w-full h-16">
      <button className="menuButton">
        <HomeIcon className="w-7" />
        Home
      </button>
      <button className="menuButton">
        <QueueListIcon className="w-7" />
        Activity
      </button>
      <button className="menuButton">
        <UserIcon className="w-7" />
        Profile
      </button>
    </div>
  );
};

export default MenuBar;
