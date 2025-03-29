import { GraphData } from './types';

export const generateDummyData = (): GraphData => {
  const nodes = [
    // Instruments
    { id: 'node1', name: 'Piano Solo', metadata: { type: ['instrument'], parent: '', child: 'node6' } },
    { id: 'node2', name: 'Guitar Riff', metadata: { type: ['instrument'], parent: '', child: 'node7' } },
    { id: 'node3', name: 'Violin Concerto', metadata: { type: ['instrument'], parent: '', child: '' } },
    
    // Voice recordings
    { id: 'node4', name: 'Vocal Sample', metadata: { type: ['voice'], parent: '', child: 'node8' } },
    { id: 'node5', name: 'Spoken Word', metadata: { type: ['voice'], parent: '', child: '' } },
    
    // Child nodes (remixes)
    { id: 'node6', name: 'Piano Remix', metadata: { type: ['instrument', 'remix'], parent: 'node1', child: '' } },
    { id: 'node7', name: 'Electronic Guitar', metadata: { type: ['instrument', 'electronic'], parent: 'node2', child: '' } },
    { id: 'node8', name: 'Voice with FX', metadata: { type: ['voice', 'effects'], parent: 'node4', child: '' } },
    
    // Ambience
    { id: 'node9', name: 'Wind Recording', metadata: { type: ['ambience'], parent: '', child: 'node10' } },
    { id: 'node10', name: 'Wind + Synth', metadata: { type: ['ambience', 'remix'], parent: 'node9', child: '' } },
    
    // Mixed types
    { id: 'node11', name: 'Vocal with Piano', metadata: { type: ['instrument', 'voice'], parent: '', child: '' } },
    { id: 'node12', name: 'Nature with Drums', metadata: { type: ['ambience', 'instrument'], parent: '', child: '' } },
  ];

  // Generate links based on parent-child relationships
  const links = nodes
    .filter(node => node.metadata.parent !== '')
    .map(node => ({
      source: node.metadata.parent,
      target: node.id,
      id: `${node.metadata.parent}-${node.id}`
    }));

  return { nodes, links };
};

export const nodeColors: Record<string, string> = {
  'instrument': '#4285F4', // blue
  'voice': '#EA4335',      // red
  'ambience': '#34A853',   // green
  'electronic': '#FBBC05', // yellow
  'remix': '#8e44ad',      // purple
  'effects': '#e67e22'     // orange
};