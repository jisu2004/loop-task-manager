import {
  ListTodo,
  Clock3,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";

interface Props {
  total: number;
  todo: number;
  progress: number;
  done: number;
}

export default function StatsCards({
  total,
  todo,
  progress,
  done,
}: Props) {
  const cards = [
    {
      title: "Total Tasks",
      value: total,
      color: "bg-blue-500",
      icon: <ClipboardList size={28} />,
    },
    {
      title: "Todo",
      value: todo,
      color: "bg-red-500",
      icon: <ListTodo size={28} />,
    },
    {
      title: "In Progress",
      value: progress,
      color: "bg-amber-500",
      icon: <Clock3 size={28} />,
    },
    {
      title: "Completed",
      value: done,
      color: "bg-green-500",
      icon: <CheckCircle2 size={28} />,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-gray-800">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.color} rounded-2xl p-4 text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}