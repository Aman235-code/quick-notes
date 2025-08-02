/* eslint-disable no-unused-vars */
// components/NoteModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilePlus2, Pencil, X } from "lucide-react";
import toast from "react-hot-toast";

const NoteModal = ({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  setTags,
  closeModal,
  onSave,
  isEdit,
}) => {
  const [shake, setShake] = useState(false);

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Please fill in the title and description");
      return;
    }

    // Add default tag if none present
    const cleanedTags = tags.trim() ? tags : "#note";
    setTags(cleanedTags);

    onSave();
    toast.success(isEdit ? "Note updated" : "Note added successfully");
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`bg-white p-6 rounded-2xl w-full md:w-[500px] mx-4 space-y-4 shadow-2xl relative ${
            shake ? "animate-shake" : ""
          }`}
        >
          {/* Header with icon and title */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-lg">
              {isEdit ? <Pencil size={20} /> : <FilePlus2 size={20} />}
              {isEdit ? "Edit Note" : "Create New Note"}
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>

          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <textarea
            placeholder="Note description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          ></textarea>

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={closeModal}
              className="text-gray-500 hover:cursor-pointer hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 12px #9333ea" }}
              onClick={handleSave}
              className="bg-purple-600 hover:cursor-pointer text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 shadow-lg"
            >
              {isEdit ? "Update Note" : "Add Note"}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NoteModal;