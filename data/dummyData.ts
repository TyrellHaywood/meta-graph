import { GraphData } from './types';

export const generateDummyData = (): GraphData => {
  const nodes = [
    // Instruments
    { id: 'inst1', name: 'Piano1', metadata: { type: ['instrument'], parent: '', child: 'inst2' } },
    { id: 'inst2', name: 'Piano2', metadata: { type: ['instrument', 'remix'], parent: 'inst1', child: '' } },
    { id: 'inst3', name: 'Guitar1', metadata: { type: ['instrument'], parent: '', child: 'inst4' } },
    { id: 'inst4', name: 'Guitar2', metadata: { type: ['instrument', 'electronic'], parent: 'inst3', child: '' } },
    { id: 'inst5', name: 'Violin1', metadata: { type: ['instrument'], parent: '', child: '' } },
    { id: 'inst6', name: 'Drums1', metadata: { type: ['instrument'], parent: '', child: 'inst7' } },
    { id: 'inst7', name: 'Drums2', metadata: { type: ['instrument', 'electronic'], parent: 'inst6', child: '' } },
    { id: 'inst8', name: 'Bass1', metadata: { type: ['instrument'], parent: '', child: '' } },
    
    // Voice recordings
    { id: 'vocal1', name: 'Vocal1', metadata: { type: ['voice'], parent: '', child: 'vocal2' } },
    { id: 'vocal2', name: 'Vocal2', metadata: { type: ['voice', 'effects'], parent: 'vocal1', child: '' } },
    { id: 'vocal3', name: 'Spoken1', metadata: { type: ['voice'], parent: '', child: '' } },
    { id: 'vocal4', name: 'Spoken2', metadata: { type: ['voice'], parent: '', child: 'vocal5' } },
    { id: 'vocal5', name: 'Spoken3', metadata: { type: ['voice', 'remix'], parent: 'vocal4', child: '' } },
    { id: 'vocal6', name: 'Chorus1', metadata: { type: ['voice'], parent: '', child: '' } },
    
    // Ambience
    { id: 'amb1', name: 'Wind1', metadata: { type: ['ambience'], parent: '', child: 'amb2' } },
    { id: 'amb2', name: 'Wind2', metadata: { type: ['ambience', 'remix'], parent: 'amb1', child: '' } },
    { id: 'amb3', name: 'Rain1', metadata: { type: ['ambience'], parent: '', child: '' } },
    { id: 'amb4', name: 'Forest1', metadata: { type: ['ambience'], parent: '', child: 'amb5' } },
    { id: 'amb5', name: 'Forest2', metadata: { type: ['ambience', 'effects'], parent: 'amb4', child: '' } },
    { id: 'amb6', name: 'Ocean1', metadata: { type: ['ambience'], parent: '', child: '' } },
    { id: 'amb7', name: 'City1', metadata: { type: ['ambience'], parent: '', child: '' } },
    
    // Electronic
    { id: 'elec1', name: 'Synth1', metadata: { type: ['electronic'], parent: '', child: 'elec2' } },
    { id: 'elec2', name: 'Synth2', metadata: { type: ['electronic', 'remix'], parent: 'elec1', child: '' } },
    { id: 'elec3', name: 'Bass1', metadata: { type: ['electronic'], parent: '', child: '' } },
    { id: 'elec4', name: 'Beat1', metadata: { type: ['electronic'], parent: '', child: 'elec5' } },
    { id: 'elec5', name: 'Beat2', metadata: { type: ['electronic', 'effects'], parent: 'elec4', child: '' } },
    
    // Remix / Effects (these are mainly secondary types, but can be primary too)
    { id: 'fx1', name: 'Effect1', metadata: { type: ['effects'], parent: '', child: '' } },
    { id: 'fx2', name: 'Effect2', metadata: { type: ['effects', 'electronic'], parent: '', child: '' } },
    { id: 'rmx1', name: 'Remix1', metadata: { type: ['remix'], parent: '', child: '' } },
    
    // Mixed types
    { id: 'mix1', name: 'Piano+Vocal1', metadata: { type: ['instrument', 'voice'], parent: '', child: '' } },
    { id: 'mix2', name: 'Ambient+Synth1', metadata: { type: ['ambience', 'electronic'], parent: '', child: '' } },
    { id: 'mix3', name: 'Drums+FX1', metadata: { type: ['instrument', 'effects'], parent: '', child: '' } },
    { id: 'mix4', name: 'Vocal+FX1', metadata: { type: ['voice', 'effects'], parent: '', child: '' } },
    { id: 'mix5', name: 'Ambient+Voice1', metadata: { type: ['ambience', 'voice'], parent: '', child: '' } },
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