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
}

export interface Edge {
  source: string;
  target: string;
  type: string;
  weight: number;
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
