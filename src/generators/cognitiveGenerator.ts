import { Question, Difficulty } from '../types';

let idCounter = 1000;

export function generateCognitiveQuestion(
  topicFilter?: string,
  difficultyFilter?: Difficulty
): Question {
  idCounter++;
  const topics = ['abstract-patterns', 'numerical-sequences', 'verbal-deductive', 'map-directions', 'experiment-discovery'];
  const topic = topicFilter && topics.includes(topicFilter) 
    ? topicFilter 
    : topics[Math.floor(Math.random() * topics.length)];
  const difficulty: Difficulty = difficultyFilter || (['easy', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as Difficulty);

  if (topic === 'numerical-sequences') {
    return generateNumericalSequence(difficulty);
  } else if (topic === 'abstract-patterns') {
    return generateAbstractPattern(difficulty);
  } else if (topic === 'map-directions') {
    return generateMapRoute(difficulty);
  } else if (topic === 'experiment-discovery') {
    return generateExperimentPuzzle(difficulty);
  } else {
    return generateVerbalDeductive(difficulty);
  }
}

function generateNumericalSequence(difficulty: Difficulty): Question {
  const step = Math.floor(Math.random() * 4) + 2;
  const start = Math.floor(Math.random() * 10) + 1;
  let seq: number[] = [];
  let nextVal = 0;
  let ruleDesc = '';

  if (difficulty === 'easy') {
    // Arithmetic sequence
    seq = [start, start + step, start + 2 * step, start + 3 * step];
    nextVal = start + 4 * step;
    ruleDesc = `Each number increases by adding a constant difference of +${step}.`;
  } else if (difficulty === 'intermediate') {
    // Alternating addition and multiplication
    seq = [start, start + step, (start + step) * 2, (start + step) * 2 + step];
    nextVal = seq[3] * 2;
    ruleDesc = `The sequence alternates between adding ${step} and multiplying by 2.`;
  } else {
    // Second-order differences (e.g. +2, +4, +6, +8)
    const dStart = 2;
    let curr = start;
    seq.push(curr);
    for (let i = 0; i < 4; i++) {
      curr += dStart + i * 2;
      seq.push(curr);
    }
    nextVal = curr + (dStart + 4 * 2);
    seq.pop(); // keep 4 items visible
    ruleDesc = `The differences between consecutive terms increase by 2 at each step (+2, +4, +6, +8, etc.).`;
  }

  const distractors = [
    nextVal - 2,
    nextVal + step,
    nextVal + 4
  ].filter(v => v !== nextVal);

  const choices = [
    { id: 'a', text: `${nextVal}` },
    { id: 'b', text: `${distractors[0] || nextVal + 3}` },
    { id: 'c', text: `${distractors[1] || nextVal - 5}` },
    { id: 'd', text: `${distractors[2] || nextVal + 7}` },
  ].sort(() => Math.random() - 0.5);

  const correctChoice = choices.find(c => c.text === `${nextVal}`)!;

  return {
    id: `cog-num-${idCounter}`,
    part: 'cognitive',
    topic: 'Numerical Reasoning',
    difficulty,
    prompt: `What number logically completes the series: ${seq.join(', ')}, [ ? ] ?`,
    choices,
    correctAnswerId: correctChoice.id,
    explanation: `Step-by-step calculation: The terms are ${seq.join(', ')}. ${ruleDesc} Following this rule, the next term is ${nextVal}.`,
    keyConcept: 'Pattern extrapolation using first and second-order differences.',
    sourceIds: ['shl-inductive-framework'],
    isGenerated: true
  };
}

function generateAbstractPattern(difficulty: Difficulty): Question {
  const shapes = ['▲ Triangle', '■ Square', '⬟ Pentagon', '⬢ Hexagon'];
  const rotations = ['0°', '90° Clockwise', '180°', '270° Clockwise'];
  const baseIndex = Math.floor(Math.random() * 2);

  const seq = [
    `${shapes[baseIndex]} (${rotations[0]})`,
    `${shapes[baseIndex + 1]} (${rotations[1]})`,
    `${shapes[baseIndex + 2]} (${rotations[2]})`,
  ];
  const correct = `${shapes[(baseIndex + 3) % shapes.length]} (${rotations[3]})`;
  const wrong1 = `${shapes[(baseIndex + 2) % shapes.length]} (${rotations[3]})`;
  const wrong2 = `${shapes[(baseIndex + 3) % shapes.length]} (${rotations[1]})`;
  const wrong3 = `${shapes[baseIndex]} (${rotations[2]})`;

  const choices = [
    { id: 'a', text: correct },
    { id: 'b', text: wrong1 },
    { id: 'c', text: wrong2 },
    { id: 'd', text: wrong3 }
  ].sort(() => Math.random() - 0.5);

  return {
    id: `cog-abs-${idCounter}`,
    part: 'cognitive',
    topic: 'Abstract & Inductive Reasoning',
    difficulty,
    prompt: `Observe the progressive transformation rule: [ ${seq.join('  ➔  ')}  ➔  ? ]\nWhich figure completes the progression?`,
    choices,
    correctAnswerId: choices.find(c => c.text === correct)!.id,
    explanation: `Two simultaneous deterministic rules are applied:\n1. Shape vertex count increases by 1 each step (3-sided -> 4-sided -> 5-sided -> 6-sided).\n2. The figure rotates 90° clockwise in each consecutive frame.`,
    keyConcept: 'Dual-attribute inductive reasoning (Geometric topology and spatial rotation).',
    sourceIds: ['shl-inductive-framework'],
    isGenerated: true
  };
}

function generateMapRoute(difficulty: Difficulty): Question {
  const directions = [
    { move: 'Walk 3 blocks North', dx: 0, dy: 3 },
    { move: 'Turn right and walk 4 blocks East', dx: 4, dy: 0 },
    { move: 'Turn right and walk 1 block South', dx: 0, dy: -1 },
  ];

  const netX = 4;
  const netY = 2; // North 2, East 4

  const choices = [
    { id: 'a', text: '4 blocks East, 2 blocks North of start' },
    { id: 'b', text: '3 blocks East, 3 blocks North of start' },
    { id: 'c', text: '4 blocks West, 2 blocks South of start' },
    { id: 'd', text: '2 blocks East, 4 blocks North of start' },
  ].sort(() => Math.random() - 0.5);

  return {
    id: `cog-map-${idCounter}`,
    part: 'cognitive',
    topic: 'Map, Route & Directional Reasoning',
    difficulty,
    prompt: `An engineer starts at Origin Depot [0,0]. They execute the following itinerary:\n- ${directions[0].move}\n- ${directions[1].move}\n- ${directions[2].move}\nWhat is the engineer's final coordinate relative to the start?`,
    choices,
    correctAnswerId: choices.find(c => c.text.includes('4 blocks East, 2 blocks North'))!.id,
    interactive: {
      kind: 'route-map',
      data: { steps: directions, targetX: netX, targetY: netY }
    },
    explanation: `Coordinate tracing:\n- Start: (0, 0)\n- North +3: (0, 3)\n- Turn right (facing East) and +4 East: (4, 3)\n- Turn right (facing South) and -1 South: (4, 2).\nThe final location is exactly 4 blocks East and 2 blocks North.`,
    keyConcept: 'Cartesian vector accumulation and cardinal orientation.',
    sourceIds: ['shl-inductive-framework'],
    isGenerated: true
  };
}

function generateExperimentPuzzle(difficulty: Difficulty): Question {
  return {
    id: `cog-exp-${idCounter}`,
    part: 'cognitive',
    topic: 'Rule Discovery & System Experimentation',
    difficulty,
    prompt: `Use the interactive Experiment Workbench to discover the gate logic rule, then solve for Output Z.`,
    interactive: {
      kind: 'experiment-puzzle',
      data: {
        inputs: ['A', 'B'],
        hiddenRule: 'XOR', // Output is 1 if inputs differ
      }
    },
    choices: [
      { id: 'a', text: 'Output is Active (1) when exactly one input is Active' },
      { id: 'b', text: 'Output is Active (1) only when both inputs are Active' },
      { id: 'c', text: 'Output is Inactive (0) when both inputs are different' },
      { id: 'd', text: 'Output is always Active regardless of inputs' },
    ],
    correctAnswerId: 'a',
    explanation: `By testing [A=1, B=0] -> Output 1, [A=0, B=1] -> Output 1, and [A=1, B=1] -> Output 0, the deterministic behavior corresponds to an Exclusive OR (XOR) relationship: the signal triggers only when inputs differ.`,
    keyConcept: 'Scientific hypothesis formulation and black-box verification.',
    sourceIds: ['shl-inductive-framework'],
    isGenerated: true
  };
}

function generateVerbalDeductive(difficulty: Difficulty): Question {
  return {
    id: `cog-ded-${idCounter}`,
    part: 'cognitive',
    topic: 'Verbal & Deductive Reasoning',
    difficulty,
    prompt: `Premises:\n1. All production deployments must pass automated unit tests.\n2. Module 'Checkout-Service' bypassed automated unit tests because of an emergency patch.\n\nWhich conclusion is strictly logically sound based solely on the statements?`,
    choices: [
      { id: 'a', text: "Module 'Checkout-Service' cannot be classified as a valid production deployment according to the rule." },
      { id: 'b', text: "Emergency patches are never allowed to deploy to production under any company policy." },
      { id: 'c', text: "Module 'Checkout-Service' has zero syntax bugs." },
      { id: 'd', text: "All automated unit tests always catch 100% of production errors." },
    ],
    correctAnswerId: 'a',
    explanation: `Deductive syllogism rule: If P (valid production deployment), then Q (passed automated unit tests). The contrapositive is logically identical: If not Q (did not pass automated unit tests), then not P (cannot be classified as a valid production deployment). Choices B, C, and D introduce assumptions not grounded in the stated premises.`,
    keyConcept: 'Modus tollens and formal propositional deduction.',
    sourceIds: ['shl-inductive-framework'],
    isGenerated: true
  };
}