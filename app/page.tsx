"use client";

import React, { useState, useEffect } from "react";
import Graph from "../components/Graph";
import dummyData from "../data/dummyData";

const GraphTest: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(
    undefined
  );
  const [dimensions, setDimensions] = useState({
    width: 800, // Default values
    height: 600,
  });
  const [graphConfig, setGraphConfig] = useState({
    nodeSize: 6,
    linkDistance: 120,
    chargeStrength: -50,
    similarityThreshold: 0.3,
    clusteringStrength: 0.5,
    colorScheme: {
      "parent-child": "#ff6b6b",
      similarity: "#4ecdc4",
      default: "#aaaaaa",
    },
  });

  // Set window dimensions after mounting
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth - 50,
        height: window.innerHeight * 0.8,
      });
    };

    // Initial update
    updateDimensions();

    // Update on resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleNodeClick = (node: any) => {
    console.log("Node clicked:", node);
    setSelectedNodeId(node.id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sound Graph Visualization</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Selected Node: {selectedNodeId || "None"}
        </h2>
        {selectedNodeId && (
          <button
            className="mt-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => setSelectedNodeId(undefined)}
          >
            Clear Selection
          </button>
        )}
      </div>

      <div
        className="border rounded-lg shadow-lg overflow-hidden"
        style={{ height: "80vh" }}
      >
        <Graph
          data={dummyData}
          onNodeClick={handleNodeClick}
          selectedNodeId={selectedNodeId}
          width={dimensions.width}
          height={dimensions.height}
          config={graphConfig}
        />
      </div>
    </div>
  );
};

export default GraphTest;
