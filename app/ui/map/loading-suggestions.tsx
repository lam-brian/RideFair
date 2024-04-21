export default function LoadingSuggestions() {
  const renderedList = new Array(4).fill(0).map((item, i) => (
    <li className="flex basis-20 gap-3 items-center" key={i}>
      <div className="w-9 h-9 rounded-full bg-neutrals-800"></div>
      <div className="flex-1 flex items-center h-full border-b border-neutrals-800">
        <div className="bg-neutrals-800 h-4/6 w-full rounded-lg"></div>
      </div>
    </li>
  ));

  return <>{renderedList}</>;
}
