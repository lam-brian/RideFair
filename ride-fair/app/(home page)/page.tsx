"use client";

import { useState } from "react";
import Map from "../ui/home/map";
import SearchForm from "../ui/home/search/search-form";
import Tab from "../ui/home/tab";

export default function HomePage() {
  const [tabExpanded, setTabExpanded] = useState(false);

  const handleTabExpand = (state: boolean) => {
    setTabExpanded(state);
  };

  return (
    <section className="w-full h-full relative">
      <Map />

      <Tab
        isExpanded={tabExpanded}
        expandTab={handleTabExpand.bind(null, !tabExpanded)}
      >
        <SearchForm isExpanded={tabExpanded} expandTab={handleTabExpand} />
      </Tab>
    </section>
  );
}
