import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInput = ({ label, isActive, onClick, value, onChange }) => {
  return (
    <div className="border border-neutrals-100 bg-blue-800 rounded-md py-2 px-3 mb-4 flex items-center gap-2">
      {isActive ? "" : <MagnifyingGlassIcon className="w-4" />}
      <input
        value={value}
        onChange={onChange}
        onClick={onClick}
        type="text"
        id={"search-" + label.split(" ").join("")}
        className="bg-transparent w-full"
        placeholder={label}
      />
    </div>
  );
};

export default SearchInput;
