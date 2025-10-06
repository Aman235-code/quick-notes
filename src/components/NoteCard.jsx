/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaEdit, FaTags, FaCopy, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const tagColors = [
  "bg-blue-800 text-blue-100",
  "bg-green-800 text-green-100",
  "bg-yellow-700 text-yellow-100",
  "bg-pink-800 text-pink-100",
  "bg-purple-800 text-purple-100",
  "bg-red-800 text-red-100",
];

const NoteCard = ({ note, onEdit, onDelete, onTagClick }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleReadMore = () => setShowFullText(!showFullText);

  const truncate = (text, maxLen = 200) =>
    text.length <= maxLen ? text : text.slice(0, maxLen) + "...";

  const handleCopy = () => {
    navigator.clipboard.writeText(note.description || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="relative border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl bg-gray-800 text-gray-100 transition-all duration-300"
    >
      {/* Title */}
      <h3 className="font-bold text-xl text-center mb-4">{note?.title || "Untitled Note"}</h3>

      {/* Description */}
      <div className="relative text-justify whitespace-pre-line leading-relaxed mb-3 text-sm">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-medium mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-2">{children}</p>,
          }}
        >
          {showFullText ? note.description : truncate(note.description)}
        </ReactMarkdown>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-0 right-0 text-gray-400 hover:text-gray-200 p-1"
          title="Copy description"
        >
          {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
        </button>

        {note.description.length > 200 && (
          <button
            onClick={toggleReadMore}
            className="text-sm hover:cursor-pointer text-indigo-400 hover:underline mt-2 block"
          >
            {showFullText ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="flex justify-center flex-wrap gap-3 mb-4">
        {note.tags?.map((tag, idx) => {
          const color = tagColors[idx % tagColors.length];
          return (
            <button
              key={idx}
              onClick={() => onTagClick?.(tag)}
              className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${color} shadow-sm`}
            >
              <FaTags className="mr-1" /> #{tag}
            </button>
          );
        })}
      </div>

      {/* Date */}
      <div className="text-xs text-center text-gray-400 italic mb-2">{note.date}</div>

      {/* Edit/Delete Actions */}
      <div className="absolute top-3 right-3 flex gap-3">
        <FaEdit
          className="text-gray-400 hover:text-gray-200 cursor-pointer"
          onClick={onEdit}
        />
        <MdDelete
          className="text-red-500 hover:text-red-600 cursor-pointer"
          onClick={onDelete}
        />
      </div>
    </motion.div>
  );
};

export default NoteCard;
