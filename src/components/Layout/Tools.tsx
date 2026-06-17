import {
    Database,
    Server,
    Boxes,
    Box,
    Network,
    Bug,
  } from "lucide-react";
  
  interface ToolsProps {
    theme: "dark" | "light";
    createServiceNode: (
      service: "postgres" | "redis" | "mongodb" | "generic"
    ) => void;
  }
  
  export const Tools = ({
    theme,
    createServiceNode,
  }: ToolsProps) => {
    const isDark = theme === "dark";
  
    const tools = [
      {
        id: "github",
        icon: Bug,
        color: "text-white",
        action: () => createServiceNode("generic"),
      },
      {
        id: "postgres",
        icon: Database,
        color: "text-sky-400",
        action: () => createServiceNode("postgres"),
      },
      {
        id: "redis",
        icon: Server,
        color: "text-red-500",
        action: () => createServiceNode("redis"),
      },
      {
        id: "mongodb",
        icon: Boxes,
        color: "text-green-500",
        action: () => createServiceNode("mongodb"),
      },
      {
        id: "container",
        icon: Box,
        color: "text-zinc-300",
        action: () => createServiceNode("generic"),
      },
      {
        id: "network",
        icon: Network,
        color: "text-yellow-400",
        action: () => createServiceNode("generic"),
      },
    ];
  
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 p-1 mb-48 rounded-xl border
          ${
            isDark
              ? "bg-[#04142e] border-zinc-800"
              : "bg-white border-gray-300"
          }`}
      >
        {tools.map((tool) => {
          const Icon = tool.icon;
  
          return (
            <button
              key={tool.id}
              onClick={tool.action}
              className={`w-10 h-10 rounded-lg flex items-center justify-center
                transition-all duration-200
                ${
                  isDark
                    ? "hover:bg-[#0b2248]"
                    : "hover:bg-gray-100"
                }`}
            >
              <Icon
                size={20}
                className={tool.color}
              />
            </button>
          );
        })}
      </div>
    );
  };