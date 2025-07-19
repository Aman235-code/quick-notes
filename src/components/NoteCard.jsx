/* eslint-disable no-unused-vars */
// components/NoteCard.jsx
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const NoteCard = ({ note, onEdit, onDelete }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white shadow-md rounded-xl p-4 relative hover:shadow-xl cursor-pointer transition"
  >
    {/* Title */}
    <h3 className="font-semibold text-lg text-center text-red-600 mb-3">
      {note.title}
    </h3>

    {/* Description (Markdown supported) */}
    <ReactMarkdown
      components={{
        p: (props) => (
          <p
            className="text-gray-700 mb-2 text-justify whitespace-pre-line"
            {...props}
          />
        ),
      }}
    >
      {note.description}
    </ReactMarkdown>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 text-sm text-blue-500 mb-2">
      {note.tags?.map((tag, idx) => (
        <span key={idx} className="bg-blue-100 px-2 py-1 rounded-full">
          #{tag}
        </span>
      ))}
    </div>

    {/* Date */}
    <span className="text-sm text-purple-500">{note.date}</span>

    {/* Edit/Delete Buttons */}
    <div className="absolute top-2 right-2 flex gap-2">
      <FaEdit
        className="text-blue-500 hover:text-blue-700 cursor-pointer"
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
