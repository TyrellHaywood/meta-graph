export interface NodeMetadata {
    type: string[];
    parent: string;
    child: string;
  }
  
  export interface GraphNode {
    id: string;
    name: string;
    metadata: NodeMetadata;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
  }
  
  export interface GraphLink {
    source: string;
    target: string;
    id: string;
  }
  
  export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
  }
  
  export interface TypeColorMap {
    [key: string]: string;
  }