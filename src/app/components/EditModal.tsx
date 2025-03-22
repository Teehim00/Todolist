import React, { useState, useEffect } from "react";

interface EditModalProps {
  todoId: number | null;
  todoText: string;
  onSave: (id: number, newText: string) => void;
  onCancel: () => void;
}

const EditModal = ({ todoId, todoText, onSave, onCancel }: EditModalProps) => {
  const [editText, setEditText] = useState<string>(todoText);

  useEffect(() => {
    setEditText(todoText);
  }, [todoText]);

  const handleSave = () => {
    if (editText.trim()) {
      onSave(todoId!, editText);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-1/3">
        <h2 className="text-xl mb-4">Edit Todo</h2>
        <input
          type="text"
          className="border p-2 w-full"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white py-1 px-3 rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
