"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit3, Trash2, CheckSquare } from "lucide-react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: "Your task has been added.",
      showConfirmButton: false,
      timer: 1500,
      background: "#065f46",
      color: "#fff",
      customClass: {
        popup: "max-w-[90%] sm:max-w-md",
        title: "text-lg sm:text-xl",
        htmlContainer: "text-sm sm:text-base",
      },
    });
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Your task has been deleted.",
      showConfirmButton: false,
      timer: 1500,
      background: "#7f1d1d",
      color: "#fff",
      customClass: {
        popup: "max-w-[90%] sm:max-w-md",
        title: "text-lg sm:text-xl",
        htmlContainer: "text-sm sm:text-base",
      },
    });
  };


const toggleTodo = (index) => {
  const updatedTodos = todos.map((todo, i) =>
    i === index ? { ...todo, completed: !todo.completed } : todo
  );

  const toggledTodo = updatedTodos[index];

  setTodos(updatedTodos);

  // Show popup based on completed state
  if (toggledTodo.completed) {
    Swal.fire({
      icon: 'success',
      title: '✅ Task Completed!',
      text: `"${toggledTodo.text}" marked as done.`,
      showConfirmButton: false,
      timer: 1500,
      background: '#065f46', // green
      color: '#fff',
      customClass: {
        popup: 'max-w-[90%] sm:max-w-md',
        title: 'text-lg sm:text-xl',
        htmlContainer: 'text-sm sm:text-base',
      },
    });
  } else {
    Swal.fire({
      icon: 'info',
      title: '🔁 Task Reopened!',
      text: `"${toggledTodo.text}" marked as incomplete.`,
      showConfirmButton: false,
      timer: 1500,
      background: '#1e293b', // slate-800
      color: '#fff',
      customClass: {
        popup: 'max-w-[90%] sm:max-w-md',
        title: 'text-lg sm:text-xl',
        htmlContainer: 'text-sm sm:text-base',
      },
    });
  }
};


  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-md mx-auto pt-4 pb-4 px-2 sm:px-0">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-pink-400 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">TODO</h1>
        </div>

        {/* Progress Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-semibold mb-1">
                Task Done
              </h2>
              <p className="text-white/70 text-sm">Keep it up</p>
            </div>
            <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {totalCount > 0 ? `${completedCount}/${totalCount}` : "0/0"}
              </span>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="flex flex-wrap gap-3 pb-5">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Plant dandelions in the garden"
          className="flex-1 min-w-[200px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          onKeyUp={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          onClick={addTodo}
          className="w-12 h-12 bg-pink-400 hover:bg-pink-500 rounded-xl flex items-center justify-center transition-colors"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>


        {/* Todo Items */}
        <div className="space-y-3">
          {[...todos].reverse().map((todo, reversedIndex) => {
            const originalIndex = todos.length - 1 - reversedIndex;

            return (
              <div
                key={todo.id ?? originalIndex}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4"
              >
                <button
                  onClick={() => toggleTodo(originalIndex)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? "bg-pink-400 border-pink-400"
                      : "border-white/40 hover:border-pink-400"
                  }`}
                >
                  {todo.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                </button>

                <span
                  className={`flex-1 text-white ${
                    todo.completed ? "line-through opacity-60" : ""
                  }`}
                >
                  {todo.text}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => deleteTodo(originalIndex)}
                    className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-pink-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>


        {todos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/50">No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
