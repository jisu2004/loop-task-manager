"use client";

import { Pencil, Trash2, CalendarDays } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
}

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({
  task,
  onDelete,
  onEdit,
}: Props) {
  const priorityStyle = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  const statusStyle = {
    Todo: "bg-gray-100 text-gray-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">
            {task.title}
          </h3>

          <p className="mt-2 text-gray-600">
            {task.description || "No description provided."}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                priorityStyle[
                  task.priority as keyof typeof priorityStyle
                ] || "bg-gray-100 text-gray-700"
              }`}
            >
              {task.priority}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyle[
                  task.status as keyof typeof statusStyle
                ] || "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays size={16} />
            <span>Task Item</span>
          </div>
        </div>

        <div className="ml-4 flex flex-col gap-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
            title="Edit Task"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
            title="Delete Task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}