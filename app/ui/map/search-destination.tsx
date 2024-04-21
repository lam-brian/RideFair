import { useState, useContext, FormEvent, useId } from "react";
import { Context } from "@/app/lib/store";
import {
  RideLocations,
  SearchSuggestions,
  Suggestion,
} from "@/app/lib/definitions";
import SearchInput from "./search-input";
import { BookmarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Suggestions from "./search-suggestions";
import LoadingSuggestions from "./loading-suggestions";

type PropTypes = {
  isExpanded: boolean;
  expandTab: (state: boolean) => void;
  onSearch: (locations: RideLocations) => void;
};

const initSuggestionsState = { for: undefined, suggestions: [] };

export default function SearchDestination({
  isExpanded,
  expandTab,
  onSearch,
}: PropTypes) {
  const { user, userLocation } = useContext(Context);
  const [pickupLocation, setPickupLocation] = useState("My Location");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [searchSuggestions, setSearchSuggestions] =
    useState<SearchSuggestions>(initSuggestionsState);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const sessionId = useId();

  const handleSearching = (e: FormEvent) => {
    e.preventDefault();
    if (!pickupLocation.trim() || !dropOffLocation.trim()) return;

    onSearch({
      pickup: pickupLocation.trim(),
      dropOff: dropOffLocation.trim(),
    });
  };

  const handlePickupChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;

    setPickupLocation(value);

    if (!value.trim()) {
      setSearchSuggestions(initSuggestionsState);
      return;
    }

    setIsLoading(true);
    debounce(getSearchSuggestions.bind(null, value.trim(), "pickup"), 1000);
  };

  const handleDropOffChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;

    setDropOffLocation(value);

    if (!value.trim()) {
      setSearchSuggestions(initSuggestionsState);
      return;
    }

    setIsLoading(true);
    debounce(getSearchSuggestions.bind(null, value.trim(), "dropOff"), 1000);
  };

  const handleUseSuggestion = (
    target: SearchSuggestions["for"],
    suggestion: Suggestion["address"] | Suggestion["name"]
  ) => {
    if (target === "pickup") {
      setPickupLocation(suggestion);
    }

    if (target === "dropOff") {
      setDropOffLocation(suggestion);
    }
  };

  const debounce = (method: Function, delay: number) => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        method();
        setTimer(undefined);
      }, delay)
    );
  };

  const getSearchSuggestions = async (
    query: string,
    location: "pickup" | "dropOff"
  ) => {
    try {
      const res = await fetch(
        "https://api.mapbox.com/search/searchbox/v1/suggest?" +
          new URLSearchParams({
            q: query,
            access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY as string,
            session_token: sessionId,
            proximity: `${userLocation.longitude},${userLocation.latitude}`,
            limit: "4",
          })
      );
      const { suggestions: suggestionData } = await res.json();

      const suggestions = suggestionData.map(
        (suggestion: {
          mapbox_id: string;
          name: string;
          full_address?: string;
        }) => {
          return {
            id: suggestion.mapbox_id,
            name: suggestion.name,
            address: suggestion.full_address,
          };
        }
      );
      setSearchSuggestions({
        for: location,
        suggestions,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-6 flex-1">
      <h1 className="text-xl mb-4 font-semibold">Hello, {user?.firstName}</h1>

      <form className="flex items-center gap-4" onSubmit={handleSearching}>
        <div className="flex-1">
          {isExpanded && (
            <SearchInput
              value={pickupLocation}
              onChange={handlePickupChange}
              onClick={expandTab.bind(null, true)}
              isActive={isExpanded}
              label={"Pickup Location"}
            />
          )}

          <SearchInput
            value={dropOffLocation}
            onChange={handleDropOffChange}
            onClick={expandTab.bind(null, true)}
            isActive={isExpanded}
            label={"Search Destination"}
          />
        </div>

        {isExpanded && (
          <button className="w-9 h-9 bg-neutrals-800 flex items-center justify-center rounded-full transition-all hover:opacity-80">
            <PaperAirplaneIcon className="w-5 h-5 text-blue-300" />
          </button>
        )}
      </form>

      <div className="flex flex-col">
        {isExpanded &&
          (isLoading ? (
            <LoadingSuggestions />
          ) : (
            <Suggestions
              suggestions={searchSuggestions}
              onUseSuggestion={handleUseSuggestion}
            />
          ))}
        <button className="w-full basis-20 flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-neutrals-800 flex items-center justify-center">
            <BookmarkIcon className="w-4 text-neutrals-300" />
          </div>
          Saved places
        </button>
      </div>
    </div>
  );
}
