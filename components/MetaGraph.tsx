// Dependencies
import React, { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

// Data and types
import { ForceGraphMethods } from "react-force-graph-2d";
import { generateDummyData, nodeColors } from "../data/dummyData";
import { GraphData, GraphNode } from "../data/types";

// Components
import TypeFilters from "./TypeFilters";

const MetaGraph: React.FC = () => {
  const fgRef = useRef<ForceGraphMethods>(undefined);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const data = generateDummyData();
    setGraphData(data);

    // Extract all unique types
    const types = new Set<string>();
    data.nodes.forEach((node) => {
      if (node.metadata.type) {
        node.metadata.type.forEach((type) => types.add(type));
      }
    });

    const typeArray = Array.from(types);
    setAvailableTypes(typeArray);
    setSelectedTypes(typeArray); // Default to showing all types
  }, []);

  // Get the color for a node based on its first type
  const getNodeColor = (node: GraphNode): string => {
    if (node.metadata.type && node.metadata.type.length > 0) {
      return nodeColors[node.metadata.type[0]] || "#ccc";
    }
    return "#ccc";
  };

  // Filter nodes based on selected types
  const filteredData = React.useMemo((): GraphData => {
    if (selectedTypes.length === 0) return graphData;

    const filteredNodes = graphData.nodes.filter(
      (node) =>
        node.metadata.type &&
        node.metadata.type.some((type) => selectedTypes.includes(type))
    );

    const nodeIds = new Set(filteredNodes.map((node) => node.id));

    const filteredLinks = graphData.links.filter((link) => {
      const sourceId =
        typeof link.source === "object" ? link.source.id : link.source;
      const targetId =
        typeof link.target === "object" ? link.target.id : link.target;
      return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });

    return { nodes: filteredNodes, links: filteredLinks };
  }, [graphData, selectedTypes]);

  useEffect(() => {
    // Apply clustering forces whenever filtered data changes
    if (fgRef.current && filteredData.nodes.length > 0) {
      // Group by type
      const typeGroups: Record<string, string[]> = {};
      filteredData.nodes.forEach((node) => {
        if (node.metadata.type && node.metadata.type.length > 0) {
          node.metadata.type.forEach((type) => {
            if (!typeGroups[type]) {
              typeGroups[type] = [];
            }
            typeGroups[type].push(node.id);
          });
        }
      });

      // Reset forces
      const chargeForce = fgRef.current.d3Force("charge");
      if (chargeForce) {
        chargeForce.strength(-150);
      }

      const linkForce = fgRef.current.d3Force("link");
      if (linkForce) {
        linkForce.distance(100);
      }

      // Clear existing custom forces
      availableTypes.forEach((type) => {
        fgRef.current?.d3Force(`cluster-${type}`, null);
      });

      // Add new cluster forces
      Object.keys(typeGroups).forEach((type, typeIndex) => {
        const theta =
          (2 * Math.PI * typeIndex) / Object.keys(typeGroups).length;
        const radius = 200;
        const centerX = radius * Math.cos(theta);
        const centerY = radius * Math.sin(theta);

        // Create a clustering force for this type
        fgRef.current?.d3Force(`cluster-${type}`, (alpha: number) => {
          for (let i = 0; i < filteredData.nodes.length; i++) {
            const node = filteredData.nodes[i];
            if (node.metadata.type && node.metadata.type.includes(type)) {
              const k = 0.1 * alpha;
              const dx = centerX - (node.x || 0);
              const dy = centerY - (node.y || 0);
              if (node.vx !== undefined) node.vx += dx * k;
              if (node.vy !== undefined) node.vy += dy * k;
            }
          }
        });
      });

      // Restart simulation
      fgRef.current.d3ReheatSimulation();
    }
  }, [filteredData, availableTypes]);

  // Handle type filter changes
  const handleTypeToggle = (type: string): void => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleNodeHover = (node: GraphNode | null): string => {
    if (!node) return ""; // Return empty string instead of null
    return `${node.name}\nTypes: ${node.metadata.type.join(", ")}${
      node.metadata.parent ? "\nParent: " + node.metadata.parent : ""
    }`;
  };

  return (
    <div>
      <TypeFilters
        availableTypes={availableTypes}
        selectedTypes={selectedTypes}
        nodeColors={nodeColors}
        onTypeToggle={handleTypeToggle}
      />

      <div className="w-auto h-full overflow-hidden">
        {filteredData.nodes.length > 0 && (
          <ForceGraph2D
            ref={fgRef}
            graphData={filteredData}
            nodeRelSize={8}
            nodeColor={(node) => getNodeColor(node as GraphNode)}
            nodeLabel={(node) => handleNodeHover(node as GraphNode)}
            linkColor={() => "rgba(100, 100, 100, 0.6)"}
            linkWidth={1}
            cooldownTicks={100}
            onEngineStop={() => fgRef.current?.zoomToFit(400)}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const typedNode = node as GraphNode;
              const label = typedNode.name;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;

              // Node circle
              ctx.beginPath();
              ctx.arc(node.x || 0, node.y || 0, 8, 0, 2 * Math.PI);
              ctx.fillStyle = getNodeColor(typedNode);
              ctx.fill();

              // Text below
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#FFFDFC";
              ctx.fillText(label, node.x || 0, (node.y || 0) + 15);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MetaGraph;
