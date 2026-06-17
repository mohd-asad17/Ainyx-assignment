import { Moon, Share2, Sun } from "lucide-react";

interface TopRightbarProps {
  theme: "dark" | "light";
  setTheme: React.Dispatch<
    React.SetStateAction<"dark" | "light">
  >;
}

export const TopRightbar = ({
  theme,
  setTheme,
}: TopRightbarProps) => {
  const isDark = theme === "dark";

  return (
    <div className="mr-10">
      <div
        className={`flex items-center gap-2 border rounded-lg p-1 backdrop-blur-md
        ${
          isDark
            ? "bg-[#111] border-zinc-800"
            : "bg-gray-200 border-gray-400"
        }`}
      >
        {/* Share */}
        <button
          className={`p-2 rounded-md transition-colors
          ${
            isDark
              ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
              : "text-zinc-600 hover:text-black hover:bg-gray-300"
          }`}
        >
          <Share2 size={18} />
        </button>

        {/* Dark Theme */}
        <button
          onClick={() => setTheme("dark")}
          className={`p-2 rounded-md transition-all
          ${
            isDark
              ? "bg-zinc-800 text-white"
              : "text-zinc-600 hover:text-black"
          }`}
        >
          <Moon size={18} />
        </button>

        {/* Light Theme */}
        <button
          onClick={() => setTheme("light")}
          className={`p-2 rounded-md transition-all
          ${
            !isDark
              ? "bg-white text-black shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Sun size={18} />
        </button>

        {/* Avatar */}
        <img
          src="https://github.com/shadcn.png"
          alt="avatar"
          className="w-8 h-8 rounded-full border border-zinc-500"
        />
      </div>
    </div>
  );
};