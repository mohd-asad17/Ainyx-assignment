import {
    ZoomIn,
    ZoomOut,
    Maximize,
    RotateCcw,
  } from "lucide-react";
  
  import { useReactFlow } from "@xyflow/react";
  
  interface CustomControlsProps {
    theme: "dark" | "light";
  }
  
  export const CustomControls = ({
    theme,
  }: CustomControlsProps) => {
    const isDark = theme === "dark";
  
    const { zoomIn, zoomOut, fitView, setViewport } =
      useReactFlow();
  
    const buttonClass = `
      w-10 h-10
      flex items-center justify-center
      rounded-lg
      transition-all
    `;
  
    return (
      <div
        className={`flex flex-col gap-2 p-2 rounded-xl border shadow-xl
        ${
          isDark
            ? "bg-[#111] border-zinc-800"
            : "bg-white border-gray-300"
        }`}
      >
        {/* Zoom In */}
        <button
          onClick={() => zoomIn()}
          className={`${buttonClass}
          ${
            isDark
              ? "hover:bg-zinc-800 text-white"
              : "hover:bg-gray-100 text-black"
          }`}
        >
          <ZoomIn size={18} />
          
        </button>
  
        {/* Zoom Out */}
        <button
          onClick={() => zoomOut()}
          className={`${buttonClass}
          ${
            isDark
              ? "hover:bg-zinc-800 text-white"
              : "hover:bg-gray-100 text-black"
          }`}
        >
          <ZoomOut size={18} />
        </button>
  
        {/* Fit View */}
        <button
          onClick={() =>
            fitView({
              duration: 500,
              padding: 0.2,
            })
          }
          className={`${buttonClass}
          ${
            isDark
              ? "hover:bg-zinc-800 text-white"
              : "hover:bg-gray-100 text-black"
          }`}
        >
          <Maximize size={18} />
        </button>
  
        {/* Reset View */}
        <button
          onClick={() =>
            setViewport({
              x: 0,
              y: 0,
              zoom: 1,
            })
          }
          className={`${buttonClass}
          ${
            isDark
              ? "hover:bg-zinc-800 text-white"
              : "hover:bg-gray-100 text-black"
          }`}
        >
          <RotateCcw size={18} />
        </button>
      </div>
    );
  };