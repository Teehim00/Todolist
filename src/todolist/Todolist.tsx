"use client";

import EditModal from "@/app/components/EditModal";
import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, newText: string) => {
    if (newText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    }
    setEditTodoId(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditTodoId(null);
    setEditText("");
  };

  return (
    <div className="flex items-center flex-col justify-center pt-5">
      <div className="flex-col flex gap-3 p-5">
        <h1 className="text-3xl font-semibold text-blue-700 text-center">
          ToDo List
        </h1>

        <div className="flex flex-col gap-4">
          <input
            className="border rounded-lg p-2 text-lg"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new Todo"
          />
          <button
            className="bg-blue-500 text-white py-2 rounded-lg"
            onClick={addTodo}
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="w-full max-w-md">
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompletion(todo.id)}
                />
                {editTodoId === todo.id ? (
                  <input
                    className="border p-1 rounded"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && editTodo(todo.id, editText)
                    }
                    autoFocus
                  />
                ) : (
                  <span
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {todo.text}
                  </span>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                {editTodoId !== todo.id && (
                  <button
                    className="bg-green-500 text-white py-1 px-3 rounded-lg"
                    onClick={() => {
                      setEditTodoId(todo.id);
                      setEditText(todo.text);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-600 text-white py-1 px-3 rounded-lg"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editTodoId && (
        <EditModal
          todoId={editTodoId}
          todoText={editText}
          onSave={editTodo}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default TodoList;
