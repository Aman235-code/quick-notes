/* eslint-disable no-unused-vars */
// components/FolderModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderPlus, X } from "lucide-react";
import toast from "react-hot-toast";

const FolderModal = ({ closeModal, addFolder }) => {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") handleSubmit();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = () => {
    if (folderName.trim()) {
      addFolder(folderName.trim());
      setFolderName("");
      setError(false);
      toast.success("Folder added successfully!");
      setTimeout(() => closeModal(), 800);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-gray-900 text-gray-100 rounded-xl p-6 w-full max-w-md shadow-2xl relative"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <FolderPlus className="text-purple-400" />
            <h2 className="text-xl font-semibold text-purple-400">
              Create New Folder
            </h2>
          </div>

          {/* Input */}
          <motion.input
            ref={inputRef}
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            animate={error ? { x: [0, -8, 8, -6, 6, -4, 4, 0] } : false}
            className={`w-full p-3 border rounded-lg text-sm bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-700 focus:ring-purple-400"
            } mb-2`}
          />

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 mb-4">
              Folder name cannot be empty.
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              className="px-4 py-2 hover:cursor-pointer text-sm rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="px-4 py-2 hover:cursor-pointer text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
              onClick={handleSubmit}
            >
              Add
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FolderModal;
