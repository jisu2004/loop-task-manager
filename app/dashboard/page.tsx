"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import StatsCards from "@/app/components/StatsCards";
import TaskForm from "@/app/components/TaskForm";
import TaskList from "@/app/components/TaskList";
import SearchBar from "@/app/components/SearchBar";
import FilterBar from "@/app/components/FilterBar";
import EditTaskModal from "@/app/components/EditTaskModal";
interface User {
  id: string;
  name: string;
  email: string;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
}
export default function DashboardPage() {
      const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "TODO" | "IN_PROGRESS" | "DONE"
  >("ALL");

  const [priorityFilter, setPriorityFilter] = useState<
    "ALL" | "LOW" | "MEDIUM" | "HIGH"
  >("ALL");

  const [editingTask, setEditingTask] = useState<Task | null>(null);
    const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/profile");

      if (!res.ok) {
        router.push("/auth/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error(error);
      router.push("/auth/login");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");

      if (!res.ok) return;

      const data = await res.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    }
  };
    useEffect(() => {
    const loadData = async () => {
      await fetchProfile();
      await fetchTasks();
      setLoading(false);
    };

    loadData();
  }, []);
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        searchText === "" ||
        task.title.toLowerCase().includes(searchText) ||
        (task.description ?? "")
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "TODO"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }
    const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskCreated = async () => {
    await fetchTasks();
  };

  const handleTaskUpdated = async () => {
    setEditingTask(null);
    await fetchTasks();
  };

  const handleTaskDeleted = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete task");
      return;
    }

    await fetchTasks();
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
  userName={user?.name ?? "User"}
  onLogout={handleLogout}
/>
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">

        <StatsCards
  total={totalTasks}
  todo={todoTasks}
  progress={inProgressTasks}
  done={completedTasks}
/>

        <div className="grid gap-4 md:grid-cols-2">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />

        </div>
<TaskForm
  onAddTask={async (
    title,
    description,
    status,
    priority
  ) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
        priority,
      }),
    });

    if (res.ok) {
      await handleTaskCreated();
    } else {
      alert("Failed to create task");
    }
  }}
/>
        
        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleTaskDeleted}
        />

        {editingTask && (
  <EditTaskModal
    task={editingTask}
    open={true}
    onClose={() => setEditingTask(null)}
    onSave={async (updatedTask) => {
      const res = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (res.ok) {
        await handleTaskUpdated();
      } else {
        alert("Failed to update task");
      }
    }}
  />
)}

      </div>
    </div>
  );
}