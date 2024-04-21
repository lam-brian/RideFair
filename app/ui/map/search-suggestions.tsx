import MapPinIcon from "@heroicons/react/24/solid/MapPinIcon";
import { SearchSuggestions, Suggestion } from "@/app/lib/definitions";

type SuggestionProps = {
  suggestions: SearchSuggestions;
  onUseSuggestion: (
    target: SearchSuggestions["for"],
    suggestion: Suggestion["address"] | Suggestion["name"]
  ) => void;
};

export default function Suggestions({
  suggestions,
  onUseSuggestion,
}: SuggestionProps) {
  const handleClick = (suggestion: Suggestion) => {
    onUseSuggestion(
      suggestions.for,
      suggestion.address ? suggestion.address : suggestion.name
    );
  };

  return (
    <>
      {suggestions.for === "pickup" && (
        <button
          className="basis-20 flex items-center gap-4 h-full transition-all hover:bg-neutrals-800 hover:opacity-80"
          onClick={handleClick.bind(null, {
            id: "myLocation",
            name: "My Location",
            address: "",
          })}
        >
          <div className="shrink-0 w-9 h-9 rounded-full bg-neutrals-800 flex items-center justify-center">
            <MapPinIcon className="w-4 text-neutrals-300" />
          </div>

          <div className="flex justify-start items-center border-b border-neutrals-800 py-4 w-full h-full">
            <strong className="text-neutrals-50">My Location</strong>
          </div>
        </button>
      )}
      {suggestions.suggestions.map((s) => (
        <button
          key={s.id}
          className="basis-20 flex items-center gap-4 h-full transition-all hover:bg-neutrals-800 hover:opacity-80"
          onClick={handleClick.bind(null, s)}
        >
          <div className="shrink-0 w-9 h-9 rounded-full bg-neutrals-800 flex items-center justify-center">
            <MapPinIcon className="w-4 text-neutrals-300" />
          </div>

          <div className="flex flex-col items-start justify-center border-b border-neutrals-800 py-4 w-full h-full">
            <strong className="text-neutrals-50">{s.name}</strong>
            <p className="text-neutrals-100 text-sm w-full text-left">
              {s.address ? s.address : ""}
            </p>
          </div>
        </button>
      ))}
    </>
  );
}
