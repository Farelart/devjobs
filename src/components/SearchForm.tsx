"use client";

import { BsSearch } from "react-icons/bs";
import { BiSolidEditLocation } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

type Location = {
  value: string;
  label: string;
};

export default function SearchForm({ locations }: { locations: Location[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString();
    const location = formData.get("location")?.toString();
    const isFullTime = formData.get("isFullTime") === "on";

    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (location) params.set("location", location);
    if (isFullTime) params.set("isFullTime", "true");

    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {/* Desktop Version (md and above) */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex relative mx-auto items-stretch gap-1 md:gap-15 border-none rounded-md px-2 max-w-xs md:max-w-2xl md:-top-15 lg:max-w-6xl lg:-top-15 text-xs bg-white"
      >
        <div className="flex items-center gap-2 flex-1 px-1">
          <BsSearch className="text-[#5964E0] font-extrabold" size={18} />
          <input
            name="title"
            type="text"
            defaultValue={searchParams.get("title") || ""}
            placeholder="Filter by title, companies, expertise..."
            className="w-full outline-none text-gray-700 py-4"
          />
        </div>

        <div className="flex items-center gap-2 flex-1 px-2 border-l border-gray-300">
          <BiSolidEditLocation
            className="text-[#5964E0] font-extrabold"
            size={18}
          />
          <Select
            name="location"
            options={locations}
            defaultValue={locations.find(
              (opt) => opt.value === searchParams.get("location")
            )}
            className="w-full"
            placeholder="Filter by location..."
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                border: "none",
                boxShadow: "none",
                "&:hover": {
                  border: "none",
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: "#9CA3AF",
                fontSize: "0.75rem",
              }),
              input: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
              }),
            }}
          />
        </div>

        <div className="flex items-center gap-2 px-2 border-l border-gray-300">
          <input
            type="checkbox"
            id="full-time"
            name="isFullTime"
            defaultChecked={searchParams.get("isFullTime") === "true"}
            className="w-4 h-4"
          />
          <label htmlFor="full-time" className="text-gray-700 text-xs">
            Full Time
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#5964E0] self-center text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
        >
          Search
        </button>
      </form>

      {/* Mobile version with similar form handling */}
      <form
        onSubmit={handleSearch}
        className="md:hidden relative mx-auto flex items-center gap-4 border-none rounded-md px-4 py-2 max-w-xs bg-white"
      >
        <input
          name="title"
          type="text"
          defaultValue={searchParams.get("title") || ""}
          placeholder="Filter by title..."
          className="flex-1 outline-none text-gray-700 text-sm"
        />
        <button type="button" onClick={() => setIsModalOpen(true)}>
          <FiFilter className="text-[#5964E0]" size={20} />
        </button>
        <button
          type="submit"
          className="bg-[#5964E0] text-white px-4 py-2 rounded-lg"
        >
          <BsSearch size={18} />
        </button>
      </form>

      {isModalOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40" />
          <div className="md:hidden fixed inset-0 z-50">
            <form
              onSubmit={(e) => {
                handleSearch(e);
                setIsModalOpen(false);
              }}
              className="bg-white rounded-md p-6 w-[90%] max-w-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <BiSolidEditLocation className="text-[#5964E0]" size={18} />
                  <span className="text-gray-700 font-medium">Location</span>
                </div>
                <Select
                  name="location"
                  options={locations}
                  defaultValue={locations.find(
                    (opt) => opt.value === searchParams.get("location")
                  )}
                  placeholder="Filter by location..."
                  isClearable
                />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="full-time-mobile"
                  name="isFullTime"
                  defaultChecked={searchParams.get("isFullTime") === "true"}
                  className="w-4 h-4"
                />
                <label htmlFor="full-time-mobile" className="text-gray-700">
                  Full Time Only
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5964E0] text-white py-3 rounded-lg font-medium"
              >
                Search
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
