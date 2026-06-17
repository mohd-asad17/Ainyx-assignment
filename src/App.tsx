import { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
  type Node,
  type Edge,
  addEdge,
  type Connection,
} from "@xyflow/react";
import type { NodeTypes } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { getApps, getAppGraph, type AppSummary } from "./lib/mock-api";

import { Topbar } from "./components/Layout/Topbar";
import { TopRightbar } from "./components/Layout/TopRightbar";
import { Tools } from "./components/Layout/Tools";

import { ServiceNode } from "./components/Canvas/ServiceNode";

const nodeTypes: NodeTypes = {
  service: ServiceNode,
};

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [apps, setApps] = useState<AppSummary[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppSummary | null>(null);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    async function loadApps() {
      try {
        const data = await getApps();

        setApps(data);

        if (data.length > 0) {
          setSelectedApp(data[0]);
        }
      } catch (err: any) {
        console.error(err);
      }
    }

    loadApps();
  }, []);

  
  useEffect(() => {
    if (!selectedApp) return;
  
    const appId = selectedApp.id;
  
    async function loadGraph() {
      try {
        setLoading(true);
  
        await getAppGraph(appId);
  
        setNodes([]);
setEdges([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    loadGraph();
  }, [selectedApp]);


  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    []
  );


  const createServiceNode = (
    service: "postgres" | "redis" | "mongodb" | "generic"
  ) => {
    const id = crypto.randomUUID();

    const labels = {
      postgres: "Postgres",
      redis: "Redis",
      mongodb: "MongoDB",
      generic: "Service",
    };

    setNodes((prev) => [
      ...prev,
      {
        id,
        type: "service",

        position: {
          x: Math.random() * 600 + 100,
          y: Math.random() * 400 + 100,
        },

        data: {
          label: labels[service],
          service,
          status: "Success",
          value: 32,
          resource: "CPU",
          pricePerHour: 0.03,
          description: `${labels[service]} instance`,
        },
      },
    ]);
  };

  return (
    <div
      className={`w-screen h-screen ${
        theme === "dark"
          ? "bg-black"
          : "bg-slate-100"
      }`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineStyle={{
          strokeWidth: 2,
        }}
        defaultViewport={{
          x: 0,
          y: 0,
          zoom: 0.7,
        }}
        minZoom={0.3}
        maxZoom={2}
        fitViewOptions={{
          maxZoom: 1,
          padding: 0.2,
        }}
        fitView
        colorMode={theme}
      >
        <Background />

        
        <Panel position="top-left">
          <Topbar
            theme={theme}
            apps={apps}
            selectedApp={selectedApp}
            setSelectedApp={setSelectedApp}
          />
        </Panel>

        <Panel position="top-right">
          <TopRightbar
            theme={theme}
            setTheme={setTheme}
          />
        </Panel>

      
        <Panel position="bottom-left">
          <Tools
            theme={theme}
            createServiceNode={createServiceNode}
          />
        </Panel>

        <Controls />
      </ReactFlow>

      {loading && (
        <div className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-zinc-900 text-white">
          Loading...
        </div>
      )}
    </div>
  );
}
