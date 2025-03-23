import React, { useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import * as d3 from "d3";

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
          border: node.id === selectedNodeId ? "2px solid #fff" : "none",
          boxShadow: node.id === selectedNodeId ? "0 0 8px #fff" : "none",
        }}
      />
    );
  };

  return <></>;
};
