import type { Edge, Node } from "@xyflow/react";

export type AppStatus = "Success" | "degraded" | "Error";

export interface AppSummary {
  id: string;
  name: string;
  icon: "lightbulb" | "settings" | "rocket" | "clipboard" | "puzzle";
  color: string;
}

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  service: "postgres" | "redis" | "mongodb" | "generic";
  status: AppStatus;
  value: number;
  resource: "CPU" | "Memory" | "Disk" | "Region";
  pricePerHour: number;
  description: string;
}

export type ServiceNode = Node<ServiceNodeData>;

export interface AppGraph {
  nodes: ServiceNode[];
  edges: Edge[];
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const APPS: AppSummary[] = [
  { id: "golang", name: "supertokens-golang", icon: "lightbulb", color: "#7c5cff" },
  { id: "java", name: "supertokens-java", icon: "settings", color: "#3aa0ff" },
  { id: "python", name: "supertokens-python", icon: "rocket", color: "#ff5a4d" },
  { id: "ruby", name: "supertokens-ruby", icon: "clipboard", color: "#ffb547" },
  { id: "go", name: "supertokens-go", icon: "puzzle", color: "#26d99f" },
];

function seedGraph(appId: string): AppGraph {
  const nodes: ServiceNode[] = [
    {
      id: `${appId}-postgres`,
      type: "service",
      position: { x: 80, y: 200 },
      data: {
        label: "Postgres",
        service: "postgres",
        status: "Success",
        value: 0.00,
        resource: "CPU",
        pricePerHour: 0.03,
        description: "Primary relational store.",
      },
    },
    {
      id: `${appId}-redis`,
      type: "service",
      position: { x: 300, y: -200 },
      data: {
        label: "Redis",
        service: "redis",
        status: "Error",
        value: 10,
        resource: "CPU",
        pricePerHour: 0.03,
        description: "Cache and pub/sub.",
      },
    },
    {
      id: `${appId}-mongo`,
      type: "service",
      position: { x: 520, y: 220 },
      data: {
        label: "Mongodb",
        service: "mongodb",
        status: "degraded",
        value: 64,
        resource: "Memory",
        pricePerHour: 0.03,
        description: "Document store for sessions.",
      },
    },
  ];
  const edges: Edge[] = [
    { id: `${appId}-e1`, source: `${appId}-postgres`, target: `${appId}-mongo`, animated: true },
    { id: `${appId}-e2`, source: `${appId}-redis`, target: `${appId}-mongo`, animated: true },
  ];
  return { nodes, edges };
}

export async function getApps(opts: { shouldFail?: boolean } = {}): Promise<AppSummary[]> {
  await delay(400);
  if (opts.shouldFail) throw new Error("Failed to load apps");
  return APPS;
}

export async function getAppGraph(
  appId: string,
  opts: { shouldFail?: boolean } = {},
): Promise<AppGraph> {
  await delay(500);
  if (opts.shouldFail) throw new Error("Failed to load graph");
  return seedGraph(appId);
}
