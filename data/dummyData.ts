import { GraphData } from '../components/graph';
const dummyData: GraphData = {
  nodes: [
    {
      id: "1",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag2", "tag3"],
        createdAt: "2025-03-10",
      },
      size: 8,
      color: "#4287f5",
      group: ""
    },
    {
      id: "2",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag2", "tag4", "tag5"],
        createdAt: "2025-03-12",
      },
      size: 7,
      color: "#f54242",
      group: ""
    },
    {
      id: "3",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag3", "tag6"],
        createdAt: "2025-03-14",
      },
      size: 6,
      color: "#42f59e",
      group: ""
    },
    {
      id: "4",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag2", "tag3", "tag7"],
        createdAt: "2025-03-15",
      },
      size: 9,
      color: "#9e42f5",
      group: ""
    },
    {
      id: "5",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag4", "tag5"],
        createdAt: "2025-03-16",
      },
      size: 7,
      color: "#f5d442",
      group: ""
    },
    {
      id: "6",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag3", "tag6", "tag7"],
        createdAt: "2025-03-17",
      },
      size: 10,
      color: "#42f5cb",
      group: ""
    },
    {
      id: "7",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag2", "tag4"],
        createdAt: "2025-03-18",
      },
      size: 6,
      color: "#4287f5",
      group: ""
    },
    {
      id: "8",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag5", "tag6", "tag7"],
        createdAt: "2025-03-19",
      },
      size: 5,
      color: "#6bf542",
      group: ""
    },
    {
      id: "9",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag3", "tag5"],
        createdAt: "2025-03-20",
      },
      size: 8,
      color: "#4287f5",
      group: ""
    },
    {
      id: "10",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag2", "tag4", "tag6"],
        createdAt: "2025-03-21",
      },
      size: 7,
      color: "#f54242",
      group: ""
    },
    {
      id: "11",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag3", "tag5", "tag7"],
        createdAt: "2025-03-22",
      },
      size: 6,
      color: "#42f59e",
      group: ""
    },
    {
      id: "12",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag2", "tag6"],
        createdAt: "2025-03-23",
      },
      size: 9,
      color: "#9e42f5",
      group: ""
    },
    {
      id: "13",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag4", "tag5", "tag7"],
        createdAt: "2025-03-24",
      },
      size: 7,
      color: "#f5d442",
      group: ""
    },
    {
      id: "14",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag2", "tag3", "tag6"],
        createdAt: "2025-03-25",
      },
      size: 10,
      color: "#42f5cb",
      group: ""
    },
    {
      id: "15",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag4", "tag7"],
        createdAt: "2025-03-26",
      },
      size: 6,
      color: "#4287f5",
      group: ""
    },
    {
      id: "16",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag2", "tag5", "tag6"],
        createdAt: "2025-03-27",
      },
      size: 5,
      color: "#6bf542",
      group: ""
    },
    {
      id: "17",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag3", "tag4", "tag7"],
        createdAt: "2025-03-28",
      },
      size: 8,
      color: "#4287f5",
      group: ""
    },
    {
      id: "18",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag2", "tag5"],
        createdAt: "2025-03-29",
      },
      size: 7,
      color: "#f54242",
      group: ""
    },
    {
      id: "19",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag3", "tag6", "tag7"],
        createdAt: "2025-03-30",
      },
      size: 6,
      color: "#42f59e",
      group: ""
    },
    {
      id: "20",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag4", "tag5"],
        createdAt: "2025-03-31",
      },
      size: 9,
      color: "#9e42f5",
      group: ""
    },
    {
      id: "21",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag2", "tag3", "tag6"],
        createdAt: "2025-04-01",
      },
      size: 7,
      color: "#f5d442",
      group: ""
    },
    {
      id: "22",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag5", "tag7"],
        createdAt: "2025-04-02",
      },
      size: 10,
      color: "#42f5cb",
      group: ""
    },
    {
      id: "23",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag2", "tag4", "tag6"],
        createdAt: "2025-04-03",
      },
      size: 6,
      color: "#4287f5",
      group: ""
    },
    {
      id: "24",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag3", "tag5", "tag7"],
        createdAt: "2025-04-04",
      },
      size: 5,
      color: "#6bf542",
      group: ""
    },
    {
      id: "25",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag2", "tag4"],
        createdAt: "2025-04-05",
      },
      size: 8,
      color: "#4287f5",
      group: ""
    },
    {
      id: "26",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag5", "tag6", "tag7"],
        createdAt: "2025-04-06",
      },
      size: 7,
      color: "#f54242",
      group: ""
    },
    {
      id: "27",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag3", "tag6"],
        createdAt: "2025-04-07",
      },
      size: 6,
      color: "#42f59e",
      group: ""
    },
    {
      id: "28",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag2", "tag4", "tag7"],
        createdAt: "2025-04-08",
      },
      size: 9,
      color: "#9e42f5",
      group: ""
    },
    {
      id: "29",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag3", "tag5", "tag6"],
        createdAt: "2025-04-09",
      },
      size: 7,
      color: "#f5d442",
      group: ""
    },
    {
      id: "30",
      title: "*",
      author: "",
      description: "",
      metadata: {
        tags: ["tag1", "tag2", "tag7"],
        createdAt: "2025-04-10",
      },
      size: 10,
      color: "#42f5cb",
      group: ""
    }
  ],
  edges: [
    {
      source: "1",
      target: "4",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "2",
      target: "4",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "1",
      target: "7",
      type: "",
      weight: 1.0,
    },
    {
      source: "3",
      target: "6",
      type: "",
      weight: 1.0,
    },
    {
      source: "4",
      target: "6",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "5",
      target: "6",
      type: "parent-child",
      weight: 0.8,
    },
    // Additional edges
    {
      source: "8",
      target: "10",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "9",
      target: "12",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "11",
      target: "14",
      type: "",
      weight: 1.0,
    },
    {
      source: "13",
      target: "16",
      type: "",
      weight: 1.0,
    },
    {
      source: "15",
      target: "18",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "17",
      target: "20",
      type: "parent-child",
      weight: 0.8,
    },
    {
      source: "19",
      target: "22",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "21",
      target: "24",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "23",
      target: "26",
      type: "",
      weight: 1.0,
    },
    {
      source: "25",
      target: "28",
      type: "",
      weight: 1.0,
    },
    {
      source: "27",
      target: "30",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "29",
      target: "2",
      type: "parent-child",
      weight: 0.8,
    }
  ]
};

export default dummyData;