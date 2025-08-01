/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  MdArrowForwardIos,
  MdArrowBackIosNew,
  MdOutlineDeleteForever,
} from "react-icons/md";
import Sidebar from "./components/Sidebar";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import SearchBar from "./components/SearchBar";
import FolderModal from "./components/FolderModal";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [folders, setFolders] = useState(
    () => JSON.parse(localStorage.getItem("folders")) || { General: [] }
  );
  const [folderOrder, setFolderOrder] = useState(
    () => JSON.parse(localStorage.getItem("folderOrder")) || ["General"]
  );
  const [activeFolder, setActiveFolder] = useState("General");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
    localStorage.setItem("folderOrder", JSON.stringify(folderOrder));
  }, [folders, folderOrder]);

  const addOrUpdateNote = () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required.");
      return;
    }
    const newNote = {
      title,
      description,
      tags: tags ? tags.split(",").map((t) => t.trim()) : ["note"],
      date: new Date().toLocaleString(),
    };
    setFolders((prev) => {
      const updated = [...(prev[activeFolder] || [])];
      if (editIndex !== null) {
        updated[editIndex] = newNote;
      } else {
        updated.push(newNote);
      }
      return { ...prev, [activeFolder]: updated };
    });
    setTitle("");
    setDescription("");
    setTags("");
    setEditIndex(null);
    setShowModal(false);
    toast.success(editIndex !== null ? "Note updated!" : "Note added!");
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setFolders((prev) => {
      const updated = [...prev[activeFolder]];
      updated.splice(deleteIndex, 1);
      return { ...prev, [activeFolder]: updated };
    });
    setShowDeleteModal(false);
    toast.success("Note deleted!");
  };

  const editNote = (index) => {
    const note = folders[activeFolder][index];
    setTitle(note.title);
    setDescription(note.description);
    setTags(note.tags?.join(", ") || "");
    setEditIndex(index);
    setShowModal(true);
  };

  const filteredNotes = folders[activeFolder]?.filter((note) => {
    if (!searchQuery) return true;
    return (
      note.title?.toLowerCase().includes(searchQuery) ||
      note.description?.toLowerCase().includes(searchQuery) ||
      note.tags?.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
  });

  return (
    <div className="flex h-screen relative bg-gradient-to-br from-indigo-50 to-white">
      <Toaster position="top-center" />

      {showSidebar && (
        <Sidebar
          folderOrder={folderOrder}
          activeFolder={activeFolder}
          setActiveFolder={setActiveFolder}
          folders={folders}
          setFolders={setFolders}
          setFolderOrder={setFolderOrder}
          sidebarPinned={sidebarPinned}
          togglePin={() => setSidebarPinned(!sidebarPinned)}
          openModal={() => setShowModal(true)}
          setShowFolderModal={setShowFolderModal}
        />
      )}

      <motion.div
        className={`absolute top-1/2 z-40 -translate-y-1/2 text-xl bg-white p-2 rounded-full shadow-md cursor-pointer transition-all duration-300 ${
          showSidebar ? "left-64" : "left-2"
        }`}
        onClick={() => !sidebarPinned && setShowSidebar(!showSidebar)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {showSidebar ? <MdArrowBackIosNew /> : <MdArrowForwardIos />}
      </motion.div>

      <main className="flex-1 p-6 overflow-y-auto transition-all duration-300">
        <SearchBar setSearchQuery={setSearchQuery} folder={activeFolder} />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="mt-4 mb-6 bg-purple-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-purple-700 hover:shadow-xl transition-all"
        >
          + Add Note
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredNotes?.map((note, i) => (
              <NoteCard
                key={i}
                note={note}
                onEdit={() => editNote(i)}
                onDelete={() => confirmDelete(i)}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {showModal && (
        <NoteModal
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          tags={tags}
          setTags={setTags}
          closeModal={() => setShowModal(false)}
          onSave={addOrUpdateNote}
          isEdit={editIndex !== null}
        />
      )}

      {showFolderModal && (
        <FolderModal
          closeModal={() => setShowFolderModal(false)}
          addFolder={(name) => {
            if (!folders[name]) {
              const updated = { ...folders, [name]: [] };
              setFolders(updated);
              setFolderOrder((prev) => [...prev, name]);
              setActiveFolder(name);
            }
            setShowFolderModal(false);
          }}
        />
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl"
          >
            <h2 className="text-lg font-semibold text-red-600 mb-2 flex items-center gap-2">
              <MdOutlineDeleteForever className="text-2xl" /> Confirm Delete
            </h2>
            <p className="text-sm mb-4 text-gray-700">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default App;
