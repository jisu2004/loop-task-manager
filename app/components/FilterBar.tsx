"use client";

interface Props {
  statusFilter: "ALL" | "TODO" | "IN_PROGRESS" | "DONE";
  setStatusFilter: (
    value: "ALL" | "TODO" | "IN_PROGRESS" | "DONE"
  ) => void;

  priorityFilter: "ALL" | "LOW" | "MEDIUM" | "HIGH";
  setPriorityFilter: (
    value: "ALL" | "LOW" | "MEDIUM" | "HIGH"
  ) => void;
}

export default function FilterBar({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(
            e.target.value as
              | "ALL"
              | "TODO"
              | "IN_PROGRESS"
              | "DONE"
          )
        }
        className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="ALL">📋 All Status</option>
        <option value="TODO">📝 Todo</option>
        <option value="IN_PROGRESS">⏳ In Progress</option>
        <option value="DONE">✅ Completed</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(e) =>
          setPriorityFilter(
            e.target.value as
              | "ALL"
              | "LOW"
              | "MEDIUM"
              | "HIGH"
          )
        }
        className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="ALL">🎯 All Priority</option>
        <option value="LOW">🟢 Low</option>
        <option value="MEDIUM">🟡 Medium</option>
        <option value="HIGH">🔴 High</option>
      </select>

    </div>
  );
}