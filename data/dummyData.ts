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
    { id: 'inst9', name: 'Piano3', metadata: { type: ['instrument'], parent: 'inst2', child: '' } },
    { id: 'inst10', name: 'Guitar3', metadata: { type: ['instrument', 'effects'], parent: 'inst4', child: '' } },
    { id: 'inst11', name: 'Violin2', metadata: { type: ['instrument'], parent: 'inst5', child: 'inst12' } },
    { id: 'inst12', name: 'Violin3', metadata: { type: ['instrument', 'remix'], parent: 'inst11', child: '' } },
    { id: 'inst13', name: 'Drums3', metadata: { type: ['instrument'], parent: 'inst7', child: '' } },
    { id: 'inst14', name: 'Bass2', metadata: { type: ['instrument', 'electronic'], parent: 'inst8', child: '' } },
    { id: 'inst15', name: 'Cello1', metadata: { type: ['instrument'], parent: '', child: '' } },
    { id: 'inst16', name: 'Flute1', metadata: { type: ['instrument'], parent: '', child: 'inst17' } },
    { id: 'inst17', name: 'Flute2', metadata: { type: ['instrument', 'effects'], parent: 'inst16', child: '' } },
    
    // Voice recordings
    { id: 'vocal1', name: 'Vocal1', metadata: { type: ['voice'], parent: '', child: 'vocal2' } },
    { id: 'vocal2', name: 'Vocal2', metadata: { type: ['voice', 'effects'], parent: 'vocal1', child: '' } },
    { id: 'vocal3', name: 'Spoken1', metadata: { type: ['voice'], parent: '', child: '' } },
    { id: 'vocal4', name: 'Spoken2', metadata: { type: ['voice'], parent: '', child: 'vocal5' } },
    { id: 'vocal5', name: 'Spoken3', metadata: { type: ['voice', 'remix'], parent: 'vocal4', child: '' } },
    { id: 'vocal6', name: 'Chorus1', metadata: { type: ['voice'], parent: '', child: '' } },
    { id: 'vocal7', name: 'Vocal3', metadata: { type: ['voice'], parent: 'vocal2', child: 'vocal8' } },
    { id: 'vocal8', name: 'Vocal4', metadata: { type: ['voice', 'electronic'], parent: 'vocal7', child: '' } },
    { id: 'vocal9', name: 'Spoken4', metadata: { type: ['voice'], parent: 'vocal5', child: '' } },
    { id: 'vocal10', name: 'Chorus2', metadata: { type: ['voice', 'effects'], parent: 'vocal6', child: '' } },
    { id: 'vocal11', name: 'Whisper1', metadata: { type: ['voice'], parent: '', child: 'vocal12' } },
    { id: 'vocal12', name: 'Whisper2', metadata: { type: ['voice', 'ambience'], parent: 'vocal11', child: '' } },
    
    // Ambience
    { id: 'amb1', name: 'Wind1', metadata: { type: ['ambience'], parent: '', child: 'amb2' } },
    { id: 'amb2', name: 'Wind2', metadata: { type: ['ambience', 'remix'], parent: 'amb1', child: '' } },
    { id: 'amb3', name: 'Rain1', metadata: { type: ['ambience'], parent: '', child: '' } },
    { id: 'amb4', name: 'Forest1', metadata: { type: ['ambience'], parent: '', child: 'amb5' } },
    { id: 'amb5', name: 'Forest2', metadata: { type: ['ambience', 'effects'], parent: 'amb4', child: '' } },
    { id: 'amb6', name: 'Ocean1', metadata: { type: ['ambience'], parent: '', child: '' } },
    { id: 'amb7', name: 'City1', metadata: { type: ['ambience'], parent: '', child: '' } },
    { id: 'amb8', name: 'Wind3', metadata: { type: ['ambience'], parent: 'amb2', child: '' } },
    { id: 'amb9', name: 'Rain2', metadata: { type: ['ambience', 'electronic'], parent: 'amb3', child: '' } },
    { id: 'amb10', name: 'Forest3', metadata: { type: ['ambience'], parent: 'amb5', child: '' } },
    { id: 'amb11', name: 'Ocean2', metadata: { type: ['ambience', 'effects'], parent: 'amb6', child: '' } },
    { id: 'amb12', name: 'City2', metadata: { type: ['ambience'], parent: 'amb7', child: 'amb13' } },
    { id: 'amb13', name: 'City3', metadata: { type: ['ambience', 'remix'], parent: 'amb12', child: '' } },
    { id: 'amb14', name: 'Cave1', metadata: { type: ['ambience'], parent: '', child: '' } },
    { id: 'amb15', name: 'Mountain1', metadata: { type: ['ambience'], parent: '', child: '' } },
    
    // Electronic
    { id: 'elec1', name: 'Synth1', metadata: { type: ['electronic'], parent: '', child: 'elec2' } },
    { id: 'elec2', name: 'Synth2', metadata: { type: ['electronic', 'remix'], parent: 'elec1', child: '' } },
    { id: 'elec3', name: 'Bass1', metadata: { type: ['electronic'], parent: '', child: '' } },
    { id: 'elec4', name: 'Beat1', metadata: { type: ['electronic'], parent: '', child: 'elec5' } },
    { id: 'elec5', name: 'Beat2', metadata: { type: ['electronic', 'effects'], parent: 'elec4', child: '' } },
    { id: 'elec6', name: 'Synth3', metadata: { type: ['electronic'], parent: 'elec2', child: '' } },
    { id: 'elec7', name: 'Bass2', metadata: { type: ['electronic', 'instrument'], parent: 'elec3', child: '' } },
    { id: 'elec8', name: 'Beat3', metadata: { type: ['electronic'], parent: 'elec5', child: 'elec9' } },
    { id: 'elec9', name: 'Beat4', metadata: { type: ['electronic', 'remix'], parent: 'elec8', child: '' } },
    { id: 'elec10', name: 'Arpeggio1', metadata: { type: ['electronic'], parent: '', child: 'elec11' } },
    { id: 'elec11', name: 'Arpeggio2', metadata: { type: ['electronic', 'effects'], parent: 'elec10', child: '' } },
    { id: 'elec12', name: 'Drone1', metadata: { type: ['electronic', 'ambience'], parent: '', child: '' } },
    
    // Remix / Effects (these are mainly secondary types, but can be primary too)
    { id: 'fx1', name: 'Effect1', metadata: { type: ['effects'], parent: '', child: '' } },
    { id: 'fx2', name: 'Effect2', metadata: { type: ['effects', 'electronic'], parent: '', child: '' } },
    { id: 'rmx1', name: 'Remix1', metadata: { type: ['remix'], parent: '', child: '' } },
    { id: 'fx3', name: 'Effect3', metadata: { type: ['effects'], parent: 'fx1', child: 'fx4' } },
    { id: 'fx4', name: 'Effect4', metadata: { type: ['effects', 'voice'], parent: 'fx3', child: '' } },
    { id: 'fx5', name: 'Effect5', metadata: { type: ['effects', 'ambience'], parent: 'fx2', child: '' } },
    { id: 'rmx2', name: 'Remix2', metadata: { type: ['remix', 'instrument'], parent: 'rmx1', child: '' } },
    { id: 'rmx3', name: 'Remix3', metadata: { type: ['remix', 'electronic'], parent: '', child: 'rmx4' } },
    { id: 'rmx4', name: 'Remix4', metadata: { type: ['remix', 'voice'], parent: 'rmx3', child: '' } },
    
    // Mixed types
    { id: 'mix1', name: 'Piano+Vocal1', metadata: { type: ['instrument', 'voice'], parent: '', child: '' } },
    { id: 'mix2', name: 'Ambient+Synth1', metadata: { type: ['ambience', 'electronic'], parent: '', child: '' } },
    { id: 'mix3', name: 'Drums+FX1', metadata: { type: ['instrument', 'effects'], parent: '', child: '' } },
    { id: 'mix4', name: 'Vocal+FX1', metadata: { type: ['voice', 'effects'], parent: '', child: '' } },
    { id: 'mix5', name: 'Ambient+Voice1', metadata: { type: ['ambience', 'voice'], parent: '', child: '' } },
    { id: 'mix6', name: 'Piano+Vocal2', metadata: { type: ['instrument', 'voice'], parent: 'mix1', child: '' } },
    { id: 'mix7', name: 'Ambient+Synth2', metadata: { type: ['ambience', 'electronic'], parent: 'mix2', child: 'mix8' } },
    { id: 'mix8', name: 'Ambient+Synth3', metadata: { type: ['ambience', 'electronic', 'remix'], parent: 'mix7', child: '' } },
    { id: 'mix9', name: 'Drums+FX2', metadata: { type: ['instrument', 'effects'], parent: 'mix3', child: '' } },
    { id: 'mix10', name: 'Vocal+FX2', metadata: { type: ['voice', 'effects', 'electronic'], parent: 'mix4', child: '' } },
    { id: 'mix11', name: 'Guitar+Synth1', metadata: { type: ['instrument', 'electronic'], parent: '', child: '' } },
    { id: 'mix12', name: 'Violin+Rain1', metadata: { type: ['instrument', 'ambience'], parent: '', child: '' } },
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
  'instrument': '#FF6D33',
  'voice': '#FF6D33',      
  'ambience': '#FF6D33',  
  'electronic': '#FF6D33', 
  'remix': '#FF6D33',      
  'effects': '#FF6D33'   
};