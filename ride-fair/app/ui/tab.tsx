export default function Tab({
  children,
  isExpanded,
  expandTab,
}: {
  children: React.ReactNode;
  isExpanded: boolean;
  expandTab: () => void;
}) {
  return (
    <div
      className={`flex flex-col transition-all bg-neutrals-900 absolute z-10 w-full bottom-0 rounded-t-xl pt-9${
        isExpanded ? " min-h-full" : " min-h-[40%]"
      }`}
    >
      <button
        onClick={expandTab}
        className="absolute top-4 left-1/2 -translate-x-1/2 py-1 px-2"
        aria-label={isExpanded ? "minify tab" : "expand tab"}
      >
        <span className="block w-20 h-[5px] bg-neutrals-800 rounded-lg"></span>
      </button>
      {children}
    </div>
  );
}
