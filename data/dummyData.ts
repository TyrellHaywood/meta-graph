import { GraphData } from '../components/Graph';
const dummyData: GraphData = {
  nodes: [
    {
      id: "sound1",
      title: "Deep Bass Loop",
      author: "user123",
      description: "Deep bass loop in C minor",
      metadata: {
        tags: ["bass", "loop", "electronic", "deep"],
        createdAt: "2025-03-10",
      },
      size: 8,
      color: "#4287f5",
      group: "bass"
    },
    {
      id: "sound2",
      title: "Drum Pattern",
      author: "drummer42",
      description: "808-inspired drum pattern",
      metadata: {
        tags: ["drums", "808", "electronic", "rhythm"],
        createdAt: "2025-03-12",
      },
      size: 7,
      color: "#f54242",
      group: "drums"
    },
    {
      id: "sound3",
      title: "Vocal Sample",
      author: "vocalist99",
      description: "Female vocal sample in F major",
      metadata: {
        tags: ["vocal", "sample", "female", "melodic"],
        createdAt: "2025-03-14",
      },
      size: 6,
      color: "#42f59e",
      group: "vocals"
    },
    {
      id: "sound4",
      title: "Bass + Drums Remix",
      author: "producer55",
      description: "Remix combining bass loop and drum pattern",
      metadata: {
        tags: ["bass", "drums", "remix", "electronic"],
        createdAt: "2025-03-15",
      },
      size: 9,
      color: "#9e42f5",
      group: "remix"
    },
    {
      id: "sound5",
      title: "Synth Lead",
      author: "synthmaster",
      description: "Aggressive synth lead",
      metadata: {
        tags: ["synth", "lead", "electronic", "aggressive"],
        createdAt: "2025-03-16",
      },
      size: 7,
      color: "#f5d442",
      group: "synth"
    },
    {
      id: "sound6",
      title: "Full Track Demo",
      author: "producer55",
      description: "Full track using bass, drums and vocals",
      metadata: {
        tags: ["full", "track", "electronic", "complete"],
        createdAt: "2025-03-17",
      },
      size: 10,
      color: "#42f5cb",
      group: "full"
    },
    {
      id: "sound7",
      title: "Bass Variation",
      author: "bassguy",
      description: "Variation on the deep bass loop",
      metadata: {
        tags: ["bass", "variation", "electronic", "deep"],
        createdAt: "2025-03-18",
      },
      size: 6,
      color: "#4287f5",
      group: "bass"
    },
    {
      id: "sound8",
      title: "Ambient Pad",
      author: "ambient_creator",
      description: "Ethereal ambient pad",
      metadata: {
        tags: ["ambient", "pad", "atmospheric", "slow"],
        createdAt: "2025-03-19",
      },
      size: 5,
      color: "#6bf542",
      group: "ambient"
    }
  ],
  edges: [
    {
      source: "sound1",
      target: "sound4",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "sound2",
      target: "sound4",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "sound1",
      target: "sound7",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "sound3",
      target: "sound6",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "sound4",
      target: "sound6",
      type: "parent-child",
      weight: 1.0,
    },
    {
      source: "sound5",
      target: "sound6",
      type: "parent-child",
      weight: 0.8,
    }
  ]
};

export default dummyData;