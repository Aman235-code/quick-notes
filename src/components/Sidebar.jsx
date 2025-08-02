/* eslint-disable no-unused-vars */
// Sidebar.jsx
import React, { useState } from "react";
import {
  Folder,
  Plus,
  Pin,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Sidebar = ({
  folderOrder,
  activeFolder,
  setActiveFolder,
  sidebarPinned,
  togglePin,
  setShowFolderModal,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isCollapsed ? -300 : 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed md:relative z-50 w-64 bg-white p-4 shadow-xl h-full border-r overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📁 Folders</h2>
        <div className="flex items-center gap-3">
          <Pin
            className={`cursor-pointer ${sidebarPinned ? "text-green-600" : "text-gray-400"}`}
            onClick={togglePin}
            data-tooltip-id="pinTip"
            size={18}
          />
          <Plus
            className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
            onClick={() => setShowFolderModal(true)}
            data-tooltip-id="addTip"
            size={18}
          />
          <X
            className="text-red-500 hover:text-red-600 cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
            data-tooltip-id="closeTip"
            size={18}
          />
        </div>
      </div>

      {/* Tooltips */}
      <Tooltip id="pinTip" content="Pin Sidebar" />
      <Tooltip id="addTip" content="Add Folder" />
      <Tooltip id="closeTip" content="Collapse Sidebar" />

      {/* Folder List */}
      <div className="space-y-2">
        {folderOrder.map((folder) => (
          <motion.div
            key={folder}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveFolder(folder)}
            className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer group transition duration-200 border mb-2 ${
              activeFolder === folder
                ? "bg-yellow-100 border-yellow-400 text-yellow-800 font-semibold shadow"
                : "bg-white border-transparent hover:bg-gray-100 hover:shadow"
            }`}
          >
            <Folder className="text-yellow-500 group-hover:text-yellow-600 transition" />
            <span className="truncate">{folder}</span>
          </motion.div>
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;