import React, { useState } from "react";
import { FaEdit, FaTags } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const tagColors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-pink-100 text-pink-800",
  "bg-purple-100 text-purple-800",
  "bg-red-100 text-red-800",
];

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleReadMore = () => setShowFullText(!showFullText);

  const truncate = (text, maxLen = 200) =>
    text.length <= maxLen ? text : text.slice(0, maxLen) + "...";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="text-black border border-indigo-500 rounded-2xl p-6 relative  hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] transition-all duration-300"
    >
      {/* Title */}
      <h3 className="font-bold text-xl text-center text-indigo-400 mb-4">
        {note.title}
      </h3>

      {/* Description */}
      <div className=" text-justify whitespace-pre-line leading-relaxed mb-3">
        <ReactMarkdown>
          {showFullText ? note.description : truncate(note.description)}
        </ReactMarkdown>
        {note.description.length > 200 && (
          <button
            onClick={toggleReadMore}
            className="text-sm text-indigo-400 hover:underline mt-2"
          >
            {showFullText ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Spacer */}
      <div className="my-4" />

      {/* Tags */}
      <div className="flex justify-center flex-wrap gap-3 mb-4">
        {note.tags?.map((tag, idx) => {
          const color = tagColors[idx % tagColors.length];
          return (
            <div
              key={idx}
              className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${color} shadow-md hover:scale-105 transition-transform duration-150`}
              title={`Tag: ${tag}`}
            >
              <FaTags className="mr-1" /> #{tag}
            </div>
          );
        })}
      </div>

      {/* Date */}
      <div className="text-xs text-center text-red-600 mb-2">{note.date}</div>

      {/* Edit/Delete Actions */}
      <div className="absolute top-3 right-3 flex gap-3">
        <FaEdit
          className="text-blue-400 hover:text-blue-600 cursor-pointer"
          onClick={onEdit}
        />
        <MdDelete
          className="text-red-400 hover:text-red-600 cursor-pointer"
          onClick={onDelete}
        />
      </div>
    </motion.div>
  );
};

export default NoteCard;
