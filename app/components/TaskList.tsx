"use client";

import { ClipboardList } from "lucide-react";
import TaskCard, { Task } from "./TaskCard";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
}: Props) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <ClipboardList className="text-blue-600" size={32} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          No Tasks Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first task to start managing your work.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}