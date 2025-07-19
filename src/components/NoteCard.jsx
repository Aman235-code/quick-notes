/* eslint-disable no-unused-vars */
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const tagColors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-700",
  "bg-pink-100 text-pink-700",
  "bg-purple-100 text-purple-700",
  "bg-red-100 text-red-700",
];

const NoteCard = ({ note, onEdit, onDelete }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 shadow-lg rounded-2xl p-6 relative transition duration-300 hover:shadow-2xl"
  >
    {/* Title */}
    <h3 className="font-bold text-xl text-center text-purple-700 mb-4">
      {note.title}
    </h3>

    {/* Description */}
    <ReactMarkdown
      components={{
        p: (props) => (
          <p
            className="text-gray-800 mb-3 text-justify whitespace-pre-line leading-relaxed"
            {...props}
          />
        ),
      }}
    >
      {note.description}
    </ReactMarkdown>

    {/* Blank line */}
    <div className="my-4" />

    {/* Tags */}
    <div className="flex justify-center flex-wrap gap-3 mb-4">
      {note.tags?.map((tag, idx) => {
        const color = tagColors[idx % tagColors.length];
        return (
          <span
            key={idx}
            className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}
          >
            #{tag}
          </span>
        );
      })}
    </div>

    {/* Date */}
    <div className="text-xs text-center text-gray-500 mb-2">{note.date}</div>

    {/* Actions */}
    <div className="absolute top-3 right-3 flex gap-3">
      <FaEdit
        className="text-blue-600 hover:text-blue-800 cursor-pointer"
        onClick={onEdit}
      />
      <MdDelete
        className="text-red-500 hover:text-red-700 cursor-pointer"
        onClick={onDelete}
      />
    </div>
  </motion.div>
);

export default NoteCard;
