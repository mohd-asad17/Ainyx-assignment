import { useState } from "react";
import type { NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";

import {
  Cpu,
  HardDrive,
  MemoryStick,
  Database,
  Settings,
  Server,
  Boxes,
} from "lucide-react";



const serviceConfig = {
  postgres: {
    icon: Database,
    color: "text-sky-400",
  },

  redis: {
    icon: Server,
    color: "text-red-500",
  },

  mongodb: {
    icon: Boxes,
    color: "text-green-500",
  },

  generic: {
    icon: Database,
    color: "text-zinc-400",
  },
};

export function ServiceNode({
  data,
}: NodeProps<any>) {
  const [activeTab, setActiveTab] = useState<
    "CPU" | "Memory" | "Disk" | "Region"
  >(data.resource ?? "CPU");

  const [values, setValues] = useState({
    CPU: data.resource === "CPU" ? data.value : 0.02,
    Memory:
      data.resource === "Memory"
        ? data.value
        : 0.05,

    Disk:
      data.resource === "Disk"
        ? data.value
        : 10,

    Region:
      data.resource === "Region"
        ? data.value
        : 1,
  });

  const config =
    serviceConfig[data.service] ??
    serviceConfig.generic;

  const ServiceIcon = config.icon;

  const tabs = [
    {
      key: "CPU",
      icon: Cpu,
      max: 10,
      step: 1,
    },

    {
      key: "Memory",
      icon: MemoryStick,
      max: 128,
      step: 1,
    },

    {
      key: "Disk",
      icon: HardDrive,
      max: 1000,
      step: 10,
    },

    {
      key: "Region",
      icon: Database,
      max: 10,
      step: 1,
    },
  ];

  const currentTab = tabs.find(
    (tab) => tab.key === activeTab
  )!;

  const value = values[activeTab];


  const updateValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = Number(e.target.value);

    setValues((prev) => ({
      ...prev,
      [activeTab]: newValue,
    }));
  };

  const statusColor = {
    Success:
      "bg-green-900 text-green-400 border border-green-700",

    degraded:
      "bg-yellow-900 text-yellow-400 border border-yellow-700",

    Error:
      "bg-red-900 text-red-400 border border-red-700",
  };

  const percentage = Math.min(
  (value / currentTab.max) * 100,
  100
);

  return (
    <>
     
      <Handle
        type="target"
        position={Position.Left}
      />

      <div className="w-[360px] rounded-2xl bg-black border border-zinc-800 p-4 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
              <ServiceIcon
                size={18}
                className={config.color}
              />
            </div>

            <span className="font-semibold text-xl">
              {data.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="border border-green-700 text-green-500 px-3 py-1 rounded-lg text-sm">
              $
              {data.pricePerHour.toFixed(2)}
              /HR
            </div>

            <button className="w-9 h-9 rounded-lg bg-[#0b1630] flex items-center justify-center">
              <Settings size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 mt-6 text-center">
          <div>
            <p className="text-zinc-400 text-xs">
              CPU
            </p>

            <p className="mt-1 font-semibold">
              {values.CPU}
            </p>
          </div>

          <div>
            <p className="text-zinc-400 text-xs">
              Memory
            </p>

            <p className="mt-1 font-semibold">
              {values.Memory} GB
            </p>
          </div>

          <div>
            <p className="text-zinc-400 text-xs">
              Disk
            </p>

            <p className="mt-1 font-semibold">
              {values.Disk} GB
            </p>
          </div>

          <div>
            <p className="text-zinc-400 text-xs">
              Region
            </p>

            <p className="mt-1 font-semibold">
              {values.Region}
            </p>
          </div>
        </div>

     
        <div className="flex mt-6 bg-[#0b1630] rounded-xl p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(
                    tab.key as
                      | "CPU"
                      | "Memory"
                      | "Disk"
                      | "Region"
                  )
                }
                className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all
                  ${
                    activeTab === tab.key
                      ? "bg-white text-black"
                      : "text-zinc-300"
                  }`}
              >
                <Icon size={14} />

                {tab.key}
              </button>
            );
          })}
        </div>

        {/* SLIDER */}
        <div className="mt-6 flex items-center gap-3">
  <div className="relative flex-1 h-3">
    
    
    <div className="absolute inset-0 bg-zinc-700 rounded-full" />

    {/* Filled Track */}
    <div
      className="absolute left-0 top-0 h-full rounded-full"
      style={{
        width: `${percentage}%`,
        background:
          "linear-gradient(to right,#2563eb,#22c55e,#f97316,#ef4444)",
      }}
    />

    {/* Slider */}
    <input
      type="range"
      min={0}
      max={currentTab.max}
      step={currentTab.step}
      value={value}
      onChange={updateValue}
      className="slider absolute inset-0 w-full h-full"
    />
  </div>

  <div className="w-20 border border-zinc-700 rounded-lg py-2 text-center">
    {value}
  </div>
</div>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-6">
          <div
            className={`px-3 py-2 rounded-lg text-sm font-medium
              ${
                statusColor[
                  data.status
                ]
              }`}
          >
            {data.status}
          </div>

          <div className="text-orange-400 text-3xl font-bold">
            aws
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 text-xs text-zinc-500">
          {data.description}
        </div>
      </div>

      {/* OUTPUT */}
      <Handle
        type="source"
        position={Position.Right}
      />
    </>
  );
}