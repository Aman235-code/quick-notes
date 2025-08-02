/* eslint-disable no-unused-vars */
// components/SearchBar.jsx
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const SearchBar = ({ setSearchQuery }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);
    setSearchQuery(value.trim().toLowerCase());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative w-full max-w-2xl"
    >
      <FiSearch className="absolute top-3.5 left-4 text-gray-400 text-lg transition duration-300 group-hover:text-purple-500" />
      <motion.input
        type="text"
        value={input}
        onChange={handleSearch}
        placeholder="Search notes by title, description or tags..."
        whileFocus={{ scale: 1.01 }}
        className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm transition-all duration-300 placeholder:text-gray-400 hover:shadow-md"
      />
    </motion.div>
  );
};

export default SearchBar;
