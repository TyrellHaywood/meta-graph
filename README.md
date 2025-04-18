# MetaGraph

![MetaGraph](/public/images/MetaGraph.gif)

A React-based network visualization tool that automatically generates, clusters, and displays relationships between nodes based on their metadata.

## Overview

MetaGraph implements [react-force-graph](https://github.com/vasturiano/react-force-graph) to show connections between data points on a canvas. It features:

- Automatic generation of implicit edges based on metadata similarity
- Customizable node clustering by metadata attributes
- Interactive filtering capabilities
- Custom node and edge styling options
- Dynamic highlighting of connected nodes

## Installation

### Clone the repository

```bash
git clone https://github.com/TyrellHaywood/meta-graph.git
```

### Install dependencies

```bash
npm install
```

### Dependencies

```bash
npm install d3
npm install react-force-graph-2d
npm i --save-dev @types/d3
```

## Configuration Options

| Option                | Description                           | Description |
| --------------------- | ------------------------------------- | ----------- |
| `nodeSize`            | Base size for nodes                   | `5`         |
| `linkDistance`        | Distance between connected nodes      | `100`       |
| `chargeStrength`      | Strength of node repulsion            | `-30`       |
| `similarityThreshold` | Minimum similarity for implicit edges | `0.3`       |
| `clusteringStrength`  | How strongly nodes cluster by type    | `0.5`       |
| `colorScheme`         | Colors for different edge types       | `#aaa`      |

## Data Structure

This uses `DummyData.ts` to generate test data for visualization. This file:

- Creates nodes with different types (examples: instrument, voice, ambience, electronic, remix, effects)
- Defines parent-child relationships between nodes
- Generates links based on these relationships
- Defines node colors for different categories (optional)

### Node Structure

Each node has the following properties:

```typeScript
{
  id: string,                    // Unique identifier
  name: string,                  // Display name
  metadata: {
    type: string[],              // Array of categories
    parent: string,              // ID of parent node (if any exist)
    child: string                // ID of child node (if any exist)
  }
}
```
