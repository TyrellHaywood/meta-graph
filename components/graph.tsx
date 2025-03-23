import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import dynamic from "next/dynamic";

// Dynamically import ForceGraph2D with ssr disabled
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export interface Node {
  id: string;

  // General info
  title: string;
  author: string;
  description: string;

  // Metadata for filtering
  metadata: {
    tags?: string[];
    createdAt?: string | Date;
  };

  // Visual properties
  size?: number;
  color?: string;
  group?: string;
  x?: number;
  y?: number;
  __highlighted?: boolean;
}

export interface Edge {
  source: string | Node;
  target: string | Node;
  type: string;
  weight: number;
  color?: string;
  width?: number;
  __highlighted?: boolean;
}

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

interface GraphProps {
  data: GraphData;
  onNodeClick?: (node: Node) => void;
  width?: number;
  height?: number;
  selectedNodeId?: string;

  // Configuration options
  config?: {
    nodeSize?: number;
    linkDistance?: number;
    chargeStrength?: number;
    similarityThreshold?: number;
    clusteringStrength?: number;
    colorScheme?: Record<string, string>;
  };
}

// Helper function to calculate similarity
// Compares metadata between two nodes
// Handles both scalar and array values

// Arrays: calculates intersecetion size relative to larger array
// Scalar: checks for exact match

// Returns: similarity score between 0 and 1
export function calculateSimilarity(nodeA: Node, nodeB: Node): number {
  let similarityScore = 0;
  let totalAttributes = 0;

  // Compare each metadata attribute
  Object.keys(nodeA.metadata).forEach((key) => {
    if (nodeB.metadata[key as keyof typeof nodeB.metadata]) {
      // For array values (like tags)
      if (
        // Type assertion needed because TypeScript doesn't know that the key is a key of metadata
        Array.isArray(nodeA.metadata[key as keyof typeof nodeA.metadata]) &&
        Array.isArray(nodeB.metadata[key as keyof typeof nodeB.metadata])
      ) {
        const intersection = (
          nodeA.metadata[key as keyof typeof nodeA.metadata] as string[]
        ).filter((value) =>
          (
            nodeB.metadata[key as keyof typeof nodeB.metadata] as string[]
          ).includes(value)
        );
        similarityScore +=
          intersection.length /
          Math.max(
            (nodeA.metadata[key as keyof typeof nodeA.metadata] as string[])
              .length,
            (nodeB.metadata[key as keyof typeof nodeB.metadata] as string[])
              .length
          );
      }
      // For scalar values
      else if (
        nodeA.metadata[key as keyof typeof nodeA.metadata] ===
        nodeB.metadata[key as keyof typeof nodeB.metadata]
      ) {
        similarityScore += 1;
      }
      totalAttributes++;
    }
  });

  return totalAttributes > 0 ? similarityScore / totalAttributes : 0;
}

// Helper function to generate implicit edges
// Takes an array of nodes and a similarity threshold
// Compares every possible pair of nodes (Currently O(n^2) operation)
// Creates edge objects for pairs that exceed the similarity threshold
// Sets visual properties based on similarity score

// Returns: array of edge objects
export function generateImplicitEdges(
  nodes: Node[],
  similarityThreshold: number = 0.3
): Edge[] {
  const implicitEdges: Edge[] = [];

  // Compare each pair of nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const similarity = calculateSimilarity(nodes[i], nodes[j]);

      if (similarity >= similarityThreshold) {
        implicitEdges.push({
          source: nodes[i].id,
          target: nodes[j].id,
          type: "similarity",
          weight: similarity,
          color: "rgba(150, 150, 150, 0.5)",
          width: similarity * 3,
        });
      }
    }
  }

  return implicitEdges;
}

const Graph: React.FC<GraphProps> = ({
  data,
  onNodeClick,
  width = 800,
  height = 600,
  selectedNodeId,
  config = {},
}) => {
  const graphRef = useRef<any>(null);

  // States
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: [],
  });

  // Default configuration with fallbacks
  const {
    nodeSize = 5,
    linkDistance = 100,
    chargeStrength = -30,
    similarityThreshold = 0.3,
    clusteringStrength = 0.5,
    colorScheme = {
      "parent-child": "#ff6b6b",
      similarity: "#4ecdc4",
      default: "#aaa",
    },
  } = config;

  // Initialize graph data
  useEffect(() => {
    setGraphData({
      nodes: data.nodes.map((node) => ({
        ...node,
        val: node.size || nodeSize,
      })),
      links: [
        ...data.edges,
        ...generateImplicitEdges(data.nodes, similarityThreshold),
      ].map((edge) => ({
        source: edge.source,
        target: edge.target,
        type: edge.type,
        weight: edge.weight,
        color: edge.color || colorScheme[edge.type] || colorScheme.default,
        width: edge.width || edge.weight * 2,
        __highlighted: false,
      })),
    });
  }, [data, nodeSize, similarityThreshold, colorScheme]);

  // Process data to work with force-graph
  const processedData = useRef({
    nodes: data.nodes.map((node) => ({
      ...node,
      val: node.size || nodeSize,
    })),
    links: [
      ...data.edges,
      ...generateImplicitEdges(data.nodes, similarityThreshold),
    ].map((edge) => ({
      source: edge.source,
      target: edge.target,
      type: edge.type,
      weight: edge.weight,
      color: edge.color || colorScheme[edge.type] || colorScheme.default,
      width: edge.width || edge.weight * 2,
      __highlighted: false,
    })),
  });

  // Paint nodes on canvas
  // Custom rendering function for nodes
  const paintNode = (
    node: any,
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) => {
    const { x, y, val, color, id, __highlighted } = node;
    const size = val || nodeSize;

    // Apply highlight effects
    ctx.beginPath();
    ctx.arc(
      x,
      y,
      (size * (id === selectedNodeId ? 1.4 : 1)) / globalScale,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = color || "#888";
    ctx.globalAlpha = __highlighted === undefined || __highlighted ? 1 : 0.3;
    ctx.fill();

    // Add border for selected node
    if (id === selectedNodeId) {
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2 / globalScale;
      ctx.stroke();
    }

    // Reset alpha
    ctx.globalAlpha = 1;

    // Add label for nodes
    if (node.title && (globalScale > 0.7 || id === selectedNodeId)) {
      ctx.font = `${12 / globalScale}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000000";
      ctx.fillText(node.title, x, y + (size * 1.5) / globalScale);
    }
  };

  // Highlight connections when a node is selected, runs whenever selectedNodeId changes
  // Centers the view on the selected node
  // Identifies all nodes connected to the selected node
  // Adds a __highlighted property to nodes and links
  // Forces a refresh of graph visualization state
  useEffect(() => {
    if (selectedNodeId && graphRef.current) {
      const selectedNode = processedData.current.nodes.find(
        (node) => node.id === selectedNodeId
      );

      if (selectedNode) {
        // Center view on the selected node
        graphRef.current.centerAt(selectedNode.x, selectedNode.y, 1000);

        // Highlight the node and its connections
        const connectedNodeIds = processedData.current.links
          .filter(
            (link) =>
              (typeof link.source === "object" &&
                "id" in link.source &&
                link.source.id === selectedNodeId) ||
              (typeof link.target === "object" &&
                "id" in link.target &&
                link.target.id === selectedNodeId)
          )

          .flatMap((link) => [
            typeof link.source === "object" ? link.source.id : link.source,
            typeof link.target === "object" ? link.target.id : link.target,
          ]);

        processedData.current.nodes.forEach((node) => {
          // Dim unconnected nodes
          node.__highlighted =
            node.id === selectedNodeId || connectedNodeIds.includes(node.id);
        });

        processedData.current.links.forEach((link) => {
          const sourceId =
            typeof link.source === "object" ? link.source.id : link.source;
          const targetId =
            typeof link.target === "object" ? link.target.id : link.target;

          // Highlight direct connections
          link.__highlighted =
            sourceId === selectedNodeId || targetId === selectedNodeId;
        });

        // Trigger re-render
        graphRef.current.refresh();
      }
    }
  }, [selectedNodeId]);

  // Render custom nodes
  // Defines how each node is rendered
  // Applies highlighting effects
  // Uses the node's color and size properties

  // NOTE: This can be replaced with any custom component that you're using this graph for
  const NodeComponent = ({ node }: { node: Node }) => {
    return (
      <div
        className="graph-node"
        style={{
          opacity:
            node.__highlighted === undefined || node.__highlighted ? 1 : 0.3,
          backgroundColor: node.color || "#888",
          width: (node.size || nodeSize) * 2,
          height: (node.size || nodeSize) * 2,
          borderRadius: "50%",
          border: node.id === selectedNodeId ? "2px solid #000000" : "none",
          boxShadow: node.id === selectedNodeId ? "0 0 8px #000000" : "none",
        }}
      />
    );
  };

  return (
    <div
      className="graph-container"
      style={{ width, height, position: "relative" }}
    >
      {/* 
        Renders ForceGraph2D component
        Configures visual properties 
        Sets up event handlers
        Customize d3 force simulations
      */}
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeCanvasObject={paintNode}
        linkDirectionalArrowLength={(link: any) =>
          link.type === "parent-child" ? 3 : 0
        }
        linkWidth={(link: any) =>
          link.__highlighted ? (link.width || 2) * 2 : link.width || 2
        }
        linkColor={(link: any) => link.color}
        // linkOpacity={0.6}
        nodeRelSize={nodeSize}
        linkDirectionalParticles={(link: any) =>
          link.__highlighted && link.type === "parent-child" ? 3 : 0
        }
        linkDirectionalParticleSpeed={0.005}
        // Custom forces
        d3VelocityDecay={0.3}
        cooldownTicks={100}
        onNodeClick={(node: any) => onNodeClick && onNodeClick(node)}
        width={width}
        height={height}
        // Configure force simulation
        dagMode={undefined}
        dagLevelDistance={undefined}
        // linkDistance={linkDistance}
        onEngineStop={() => console.log("Force simulation completed")}
      />
    </div>
  );
};

export default Graph;
