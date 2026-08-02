"use client";

import { useEffect, useState } from "react";
import { Task } from "./TaskCard";

interface Props {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export default function EditTaskModal({
  task,
  open,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setForm({ ...task });
    }
  }, [task]);

  if (!open || !form) return null;

  function updateField<K extends keyof Task>(
    key: K,
    value: Task[K]
  ) {
    setForm((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [key]: value,
      };
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Edit Task
        </h2>

        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            updateField("title", e.target.value)
          }
          className="mb-4 w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <textarea
          rows={4}
          value={form.description ?? ""}
          onChange={(e) =>
            updateField("description", e.target.value)
          }
          className="mb-4 w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <div className="mb-6 grid grid-cols-2 gap-4">

          <select
            value={form.priority}
            onChange={(e) =>
              updateField(
                "priority",
                e.target.value as Task["priority"]
              )
            }
            className="rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="LOW">🟢 Low</option>
            <option value="MEDIUM">🟡 Medium</option>
            <option value="HIGH">🔴 High</option>
          </select>

          <select
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as Task["status"]
              )
            }
            className="rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="TODO">📋 Todo</option>
            <option value="IN_PROGRESS">
              ⏳ In Progress
            </option>
            <option value="DONE">
              ✅ Completed
            </option>
          </select>

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}