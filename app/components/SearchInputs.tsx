"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CUISINES = [
  "African",
  "Asian",
  "American",
  "Brithish",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

export const SearchInputs = () => {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [neededTime, setNeededTime] = useState(0);
  const [isDisable, setIsDisable] = useState(true);

  const handleSelect = (cuisine: string) => {
    setCuisine(cuisine);
    setIsOpen(false);
  };

  const getLink = () => {
    let link = '/recipes?'

    if (query.length > 0) {
      link += `query=${query}`;
    }

    if (CUISINES.find(cus => cus === cuisine)) {
      if (link[-1] !== '?') {
        link += `&cuisine=${cuisine}`
      } else {
        link += `cuisine=${cuisine}`
      }
    }

    if (neededTime > 0) {
      if (link[-1] !== '?') {
        link += `&time=${neededTime}`
      } else {
        link += `time=${neededTime}`
      }
    }

    return link;
  }

  useEffect(() => {
    if (query.length > 0 || CUISINES.find(cus => cus === cuisine) || neededTime > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [query, cuisine, neededTime])

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor="query" className="text-lg cursor-pointer">
          Entery your query
        </label>

        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query (e.g. 'pasta')"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2"
        />
      </div>

      <div className="relative w-full">
        <label htmlFor="cuisine" className="text-lg cursor-pointer">
          Select cuisine
        </label>

        <input
          id="cuisine"
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)} // Delay for click
          placeholder="Select Cuisine"
        />

        <div
          className={` flex flex-wrap absolute w-full z-10 mt-1.5 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto transition-all duration-300 ease-in-out transform ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {CUISINES
            .map((cus) => (
              <div
                key={cus}
                onMouseDown={() => handleSelect(cus)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {cus}
              </div>
            ))}
        </div>
      </div>

      <div>
        <label htmlFor="time" className="text-lg cursor-pointer">
          Enter maximum preparation time in minutes
        </label>
        <input
          type="number"
          id="time"
          onChange={(e) => setNeededTime(+e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2"
          placeholder="Max preparaion time"
        />
      </div>

      <Link href={getLink()} className={`${isDisable ? 'pointer-events-none opacity-50' : ''} block bg-blue-500 rounded-md w-fit py-2 px-10 text-white font-semibold`} >Next</Link>
    </div>
  );
};
