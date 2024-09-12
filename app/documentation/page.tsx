"use client";
import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import data from "../data.json";
import NavBar from "@/app/components/NavBar";
import useOnClickOutside from "@/app/hook/useOnClickOutside";

const Documentation: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));

  // State to hold search items
  const [searchItems, setSearchItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const data = [
      "Overview",
      "Getting Started",
      "Installation",
      "Configuration",
      "Deployment",
      "API Reference",
      "Authentication",
      "Authorization",
      "Error Handling",
      "Best Practices",
      "FAQ",
      "Troubleshooting",
      "Installation",
      "Configuration",
      "Deployment",
      "API Reference",
      "Authentication",
      "Authorization",
      "Error Handling",
      "Best Practices",
      "FAQ",
      "Troubleshooting",
      "Installation",
      "Configuration",
      "Deployment",
      "API Reference",
      "Authentication",
      "Authorization",
      "Error Handling",
      "Best Practices",
      "FAQ",
      "Troubleshooting",
    ];
    setSearchItems(data);
  }, []);

  const filteredItems = searchItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-2">
      <div className="md:px-12 lg:px-16">
        <NavBar />
      </div>
      <div className="flex w-full h-full">
        {/* Left side scrollable search section */}
        <div className="hidden sm:block relative p-4 border-r-[0.08px] border-t-[0.08px] border-gray-300 rounded-tr-2xl w-2/6 sm:w-3/12 lg:w-2/12  h-screen overflow-hidden">
          <div className="relative">
            <input
              className="appearance-none bg-transparent border-2 border-gray-400 rounded-md w-full py-2 pl-4 pr-10 text-white leading-tight focus:outline-none focus:ring-gray-600 focus:border-gray-400 mb-4"
              id="search"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch className="absolute top-3 right-3 text-white" />
          </div>
          {/* Render search items */}
          <div className="h-full overflow-y-auto">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-700 text-sm md:text-base"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right side content section */}
        <div className=" w-full sm:w-9/12 lg:w-10/12 h-fit bg-customBlack2 ml-4 mr-4 sm:mr-12 rounded-xl">
          <div className="p-6 py-6 sm:py-12  sm:px-12 md:px-20">
            <h2 className="mb-4 sm:mb-8 text-2xl sm:text-3xl">Overview</h2>
            <div className="flex flex-col gap-8 text-sm sm:text-md leading-5 sm:leading-7">
              <p>{data.documentation}</p>
              <p>{data.documentation}</p>
              <p>{data.documentation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
