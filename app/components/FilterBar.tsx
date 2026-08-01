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
    <div className="flex flex-col md:flex-row gap-4">
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
        className="border rounded-lg px-4 py-2"
      >
        <option value="ALL">All Status</option>
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
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
        className="border rounded-lg px-4 py-2"
      >
        <option value="ALL">All Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
    </div>
  );
}