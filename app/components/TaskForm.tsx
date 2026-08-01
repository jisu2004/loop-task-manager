"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

interface Props {
  onAddTask: (
    title: string,
    description: string,
    status: string,
    priority: string
  ) => void;
}

export default function TaskForm({ onAddTask }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    setError("");

    onAddTask(title.trim(), description.trim(), status, priority);

    setTitle("");
    setDescription("");
    setStatus("TODO");
    setPriority("MEDIUM");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-md space-y-5"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Add New Task
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Create a new task and manage your workflow.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Enter task title..."
        className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task description (optional)"
        rows={4}
        className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <select
          className="rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
                      <option value="LOW">🟢 Low</option>
          <option value="MEDIUM">🟡 Medium</option>
          <option value="HIGH">🔴 High</option>
        </select>

        <select
          className="rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="TODO">📋 Todo</option>
          <option value="IN_PROGRESS">⏳ In Progress</option>
          <option value="DONE">✅ Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <PlusCircle size={20} />
        Add Task
      </button>
    </form>
  );
}
         