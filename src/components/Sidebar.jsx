/* eslint-disable no-unused-vars */
// Sidebar.jsx
import React, { useState } from "react";
import { Folder, Plus, Trash } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Sidebar = ({
  folderOrder,
  activeFolder,
  setActiveFolder,
  sidebarPinned,
  togglePin,
  setShowFolderModal,
  handleDeleteFolder,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const confirmDelete = (folderName) => {
    setSelectedFolder(folderName);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (handleDeleteFolder && selectedFolder) {
      handleDeleteFolder(selectedFolder);
    }
    setShowDeleteModal(false);
    setSelectedFolder(null);
  };

  return (
    <>
      <aside
        className={`fixed md:relative z-50 w-64 bg-gray-900 p-4 shadow-xl h-full border-r border-gray-700 overflow-y-auto scrollbar-hide transition-transform duration-300 ${
          isCollapsed ? "-translate-x-64" : "translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">📁 Folders</h2>
          <div className="flex items-center gap-3">
            <Plus
              className="text-yellow-400 hover:text-yellow-500 cursor-pointer"
              onClick={() => setShowFolderModal(true)}
              data-tooltip-id="addTip"
              size={18}
            />
          </div>
        </div>

        {/* Folder List */}
        <div className="space-y-2">
          {folderOrder.map((folder) => (
            <div
              key={folder}
              className={`p-3 rounded-lg flex items-center justify-between gap-3 cursor-pointer border mb-2 transition duration-200 ${
                activeFolder === folder
                  ? "bg-yellow-100 text-yellow-900 font-semibold border-yellow-400 shadow"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200"
              }`}
            >
              <div
                onClick={() => setActiveFolder(folder)}
                className="flex items-center gap-3 flex-1"
              >
                <Folder className="text-yellow-400" />
                <span className="truncate">{folder}</span>
              </div>
              <Trash
                size={16}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete(folder);
                }}
                data-tooltip-id="deleteTip"
              />
            </div>
          ))}
        </div>

        <Tooltip id="deleteTip" content="Delete Folder" />
        <Tooltip id="addTip" content="Add Folder" />
      </aside>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-xl w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Delete Folder</h3>
            <p className="mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-500">{selectedFolder}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
