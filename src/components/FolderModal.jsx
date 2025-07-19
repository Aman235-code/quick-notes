// components/FolderModal.jsx
import React, { useState } from "react";

const FolderModal = ({ closeModal, addFolder }) => {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = () => {
    if (folderName.trim()) {
      addFolder(folderName.trim());
      setFolderName("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-purple-700 text-center">
          Create New Folder
        </h2>
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-between">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderModal;
