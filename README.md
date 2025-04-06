# [MetaGraph]

A React-based network visualization tool that automatically generates, clusters, and displays relationships between nodes based on their metadata.

## Overview

[MetaGraph] implements [react-force-graph](https://github.com/vasturiano/react-force-graph) to show connections between data points on a canvas. It features:

- Automatic generation of implicit edges based on metadata similarity
- Customizable node clustering by metadata attributes
- Interactive filtering capabilities
- Custom node and edge styling options
- Dynamic highlighting of connected nodes

## Installation

### Clone the repository

```bash
git clone https://github.com/TyrellHaywood/[meta-graph].git
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
