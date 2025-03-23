import React, { useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import * as d3 from "d3";

export interface Node {
  id: string;

  // general info
  title: string;
  author: string;
  description: string;

  // metadata for filtering
  tags?: string[];
  createdAt?: string | Date;
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
