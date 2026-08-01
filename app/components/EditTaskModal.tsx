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
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">
          Edit Task
        </h2>

        <input
          className="mb-4 w-full rounded-lg border p-3"
          value={form.title}
          onChange={(e) =>
            updateField("title", e.target.value)
          }
        />

        <textarea
          rows={4}
          className="mb-4 w-full rounded-lg border p-3"
          value={form.description ?? ""}
          onChange={(e) =>
            updateField("description", e.target.value)
          }
        />

        <div className="mb-5 grid grid-cols-2 gap-4">
          <select
            className="rounded-lg border p-3"
            value={form.priority}
            onChange={(e) =>
              updateField(
                "priority",
                e.target.value as Task["priority"]
              )
            }
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <select
            className="rounded-lg border p-3"
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as Task["status"]
              )
            }
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">
              In Progress
            </option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}