import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type PropTypes = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const SearchInput = ({
  label,
  isActive,
  onClick,
  value,
  onChange,
}: PropTypes) => {
  return (
    <div className="border border-neutrals-500 rounded-md p-4 mb-4 flex items-center gap-2 text-neutrals-50">
      {isActive ? "" : <MagnifyingGlassIcon className="w-6" />}
      <input
        value={value}
        onChange={onChange}
        onClick={onClick}
        type="text"
        id={"search-" + label.split(" ").join("")}
        className="bg-transparent w-full"
        placeholder={label}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchInput;
