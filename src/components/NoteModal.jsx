// components/NoteModal.jsx
import React from "react";

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
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full md:w-[500px] mx-4 space-y-4">
      <h3 className="text-lg font-bold">
        {isEdit ? "Edit Note" : "Create New Note"}
      </h3>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Note description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={6}
        className="w-full p-2 border rounded"
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex justify-between items-center">
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {isEdit ? "Update Note" : "Add Note"}
        </button>
      </div>
    </div>
  </div>
);

export default NoteModal;
