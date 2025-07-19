// components/Sidebar.jsx
import React from "react";
import { FaFolder, FaPlus, FaThumbtack } from "react-icons/fa";

const Sidebar = ({
  folderOrder,
  activeFolder,
  setActiveFolder,
  sidebarPinned,
  togglePin,
  setShowFolderModal,
}) => (
  <aside className="fixed md:relative z-50 w-64 bg-white p-4 shadow-lg h-full overflow-y-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Folders</h2>
      <div className="flex items-center gap-2">
        <FaThumbtack
          className={`cursor-pointer ${
            sidebarPinned ? "text-green-600" : "text-gray-500"
          }`}
          onClick={togglePin}
        />
        <FaPlus
          className="cursor-pointer text-yellow-500 hover:text-yellow-600"
          onClick={() => setShowFolderModal(true)} // ✅ this opens folder modal
        />
      </div>
    </div>
    {folderOrder.map((folder) => (
      <div
        key={folder}
        onClick={() => setActiveFolder(folder)}
        className={`p-2 mb-2 rounded flex items-center gap-2 cursor-pointer transition hover:shadow-md ${
          activeFolder === folder
            ? "bg-yellow-100 text-yellow-800 font-semibold"
            : "hover:bg-gray-100"
        }`}
      >
        <FaFolder className="text-yellow-500" /> {folder}
      </div>
    ))}
  </aside>
);

export default Sidebar;
