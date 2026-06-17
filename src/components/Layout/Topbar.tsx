import { useState } from "react";

import {
  Lightbulb,
  Settings,
  Rocket,
  Package,
  Puzzle,
  ChevronDown,
  MoreHorizontal,
  Search,
  ChevronRight,
} from "lucide-react";

import type { AppSummary } from "../../lib/mock-api";

interface TopbarProps {
  theme: "dark" | "light";
  apps: AppSummary[];
  selectedApp: AppSummary | null;
  setSelectedApp: (app: AppSummary) => void;
}

const iconMap = {
  lightbulb: Lightbulb,
  settings: Settings,
  rocket: Rocket,
  clipboard: Package,
  puzzle: Puzzle,
};

export const Topbar = ({
  theme,
  apps,
  selectedApp,
  setSelectedApp,
}: TopbarProps) => {
  const isDark = theme === "dark";

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredApplications = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase()),
  );

  const SelectedIcon = selectedApp && iconMap[selectedApp.icon];

  return (
    <div className="relative ml-10">
      {/* Top Bar */}
      <div
        className={`flex items-center border rounded-lg overflow-hidden transition-all
        ${
          isDark ? "bg-[#111] border-zinc-800" : "bg-gray-200 border-gray-400"
        }`}
      >
        {/* Logo */}
        <div
          className={`w-10 h-10 flex items-center justify-center border-r
          ${isDark ? "border-zinc-800" : "border-gray-400"}`}
        >
          <div
            className={`w-5 h-5 rounded-sm ${isDark ? "bg-white" : "bg-black"}`}
          />
        </div>

        {/* Selected Application */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex items-center gap-3 px-4 h-12
          ${isDark ? "text-white" : "text-black"}`}
        >
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{
              backgroundColor: selectedApp?.color,
            }}
          >
            {SelectedIcon && <SelectedIcon size={16} className="text-white" />}
          </div>

          <span className="font-medium whitespace-nowrap">
            {selectedApp?.name ?? "Select App"}
          </span>

          <ChevronDown
            size={16}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* More */}
        <button
          className={`px-3
          ${
            isDark
              ? "text-zinc-400 hover:text-white"
              : "text-zinc-600 hover:text-black"
          }`}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className={`absolute top-full left-0 mt-3 w-[300px]
          border rounded-xl shadow-2xl z-50 p-2
          ${isDark ? "bg-black border-zinc-800" : "bg-white border-gray-300"}`}
        >
          {/* Title */}
          <h2
            className={`text-xl font-semibold mb-5
            ${isDark ? "text-white" : "text-black"}`}
          >
            Applications
          </h2>

          {/* Search */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className={`flex items-center flex-1 rounded-md px-3
              ${isDark ? "bg-zinc-900" : "bg-gray-100"}`}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className={`flex-1 py-2 bg-transparent outline-none
                ${
                  isDark
                    ? "text-white placeholder:text-zinc-500"
                    : "text-black placeholder:text-gray-500"
                }`}
              />

              <Search
                size={18}
                className={isDark ? "text-zinc-500" : "text-gray-500"}
              />
            </div>

            <button
              className="w-10 h-10 rounded-md bg-blue-600 text-white text-xl hover:bg-blue-700"
              onClick={() => alert("Create Application Modal")}
            >
              +
            </button>
          </div>

          {/* Applications */}
          <div className="max-h-[280px] overflow-y-auto pr-1">
            {filteredApplications.map((app) => {
              const Icon = iconMap[app.icon];

              return (
                <div
                  key={app.id}
                  onClick={() => {
                    setSelectedApp(app);

                    setOpen(false);
                  }}
                  className={`flex items-center justify-between
                    p-3 rounded-xl cursor-pointer mb-2 transition-all
                    ${
                      selectedApp?.id === app.id
                        ? isDark
                          ? "bg-zinc-900"
                          : "bg-gray-100"
                        : isDark
                          ? "hover:bg-zinc-900"
                          : "hover:bg-gray-100"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: app.color,
                      }}
                    >
                      <Icon size={18} className="text-white" />
                    </div>

                    <span
                      className={`font-medium
                        ${isDark ? "text-white" : "text-black"}`}
                    >
                      {app.name}
                    </span>
                  </div>

                  <ChevronRight
                    size={18}
                    className={isDark ? "text-zinc-500" : "text-gray-500"}
                  />
                </div>
              );
            })}

            {filteredApplications.length === 0 && (
              <div
                className={`text-center py-6
                ${isDark ? "text-zinc-500" : "text-gray-500"}`}
              >
                No applications found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
