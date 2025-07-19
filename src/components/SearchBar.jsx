// components/SearchBar.jsx
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ setSearchQuery }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);
    setSearchQuery(value.trim().toLowerCase());
  };

  return (
    <div className="relative w-full max-w-2xl">
      <FiSearch className="absolute top-3.5 left-4 text-gray-400 text-lg" />
      <input
        type="text"
        value={input}
        onChange={handleSearch}
        placeholder="Search notes by title, description or tags..."
        className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
};

export default SearchBar;
