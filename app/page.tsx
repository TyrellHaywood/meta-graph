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
    <div className="mx-auto w-screen h-screen text-black bg-red-200">
      <div className="">
        {selectedNodeId && (
          <button
            className="mt-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => setSelectedNodeId(undefined)}
          >
            Clear Selection
          </button>
        )}
      </div>

      <div className="h-screen w-screen">
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
