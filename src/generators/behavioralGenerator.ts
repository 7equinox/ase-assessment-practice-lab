import { Question } from '../types';

let behCounter = 3000;

interface Scenario {
  competency: string;
  prompt: string;
  choices: { id: string; text: string }[];
  correctId: string;
  strongestReason: string;
  caveat: string;
}

export function generateBehavioralQuestion(): Question {
  behCounter++;
  const scenarios: Scenario[] = [
    {
      competency: 'Accountability and Blameless Root-Cause Analysis',
      prompt: "Two hours before a scheduled client presentation, you notice that an edge-case bug in your recent pull request causes user session timeouts under heavy load. Your team lead has not noticed yet. What is the MOST appropriate action?",
      choices: [
        { id: 'a', text: 'Immediately inform your team lead, explain the technical root cause and risk clearly, and propose an interim mitigation or fast rollback plan.' },
        { id: 'b', text: 'Quietly push an untested hotfix directly to the deployment branch without alerting anyone.' },
        { id: 'c', text: 'Wait to see if the issue manifests during the live demo; if it does, attribute it to third-party network instability.' },
        { id: 'd', text: 'Postpone your response until the next sprint retrospective so as not to cause stress before the client call.' }
      ],
      correctId: 'a',
      strongestReason: 'Proactive ownership ensures transparency, minimizes enterprise client risk, and allows the team to coordinate an orderly response.',
      caveat: 'If a pre-agreed hotfix protocol exists with automated regression checks, follow the established team incident checklist alongside notification.'
    },
    {
      competency: 'Learning Agility and Adaptability',
      prompt: "You are assigned to an active project utilizing a modern backend language and cloud orchestration framework you have never used before. The first sprint ticket is due in five days. How should you approach this situation?",
      choices: [
        { id: 'a', text: 'Review existing repository pull requests and documentation to understand patterns, break the ticket into small functional goals, and proactively request a 15-minute alignment check with a senior peer when blocked.' },
        { id: 'b', text: 'Ask the project manager to reassign the task to an experienced teammate and wait for a project that matches your existing university skillset.' },
        { id: 'c', text: 'Attempt to rewrite the assigned module using a language you are already comfortable with without informing the architecture team.' },
        { id: 'd', text: 'Spend the entire five days reading general books without writing code, then declare an impediment on the final day.' }
      ],
      correctId: 'a',
      strongestReason: 'Demonstrates self-directed learning agility, pragmatic scoping, and efficient, targeted escalation.',
      caveat: 'Ensure team leads are aware early during daily standups of your onboarding progress so estimates can be calibrated.'
    },
    {
      competency: 'Constructive Code Review Collaboration',
      prompt: "During your first code review, a senior software engineer leaves several critical comments highlighting architectural inefficiencies and code formatting issues in your solution. What is the MOST constructive reaction?",
      choices: [
        { id: 'a', text: 'View the review comments as an educational mentorship opportunity, calmly ask clarifying questions on the architectural suggestions, and implement the requested improvements.' },
        { id: 'b', text: 'Defend your code vigorously by stating that it compiled and ran successfully on your personal development laptop.' },
        { id: 'c', text: 'Approve your own pull request to bypass the senior review restrictions.' },
        { id: 'd', text: 'Privately complain to your manager that the reviewer is being overly critical about non-functional details.' }
      ],
      correctId: 'a',
      strongestReason: 'Code reviews are quality gates and collaborative learning experiences, not personal evaluations. Embracing technical feedback accelerates professional growth.',
      caveat: 'If requirements contradict between reviewers, schedule a brief sync meeting to build consensus constructively.'
    }
  ];

  const item = scenarios[Math.floor(Math.random() * scenarios.length)];
  const matchedChoice = item.choices.find(c => c.id === item.correctId);
  const correctText = matchedChoice ? matchedChoice.text : item.choices[0].text;

  return {
    id: `beh-sjt-${behCounter}`,
    part: 'behavioral',
    topic: item.competency,
    difficulty: 'intermediate',
    prompt: item.prompt,
    choices: item.choices,
    correctAnswerId: item.correctId,
    explanation: `Evaluation Rubric:\n- Most Constructive Response: ${correctText}\n\n- Why this is the strongest approach: ${item.strongestReason}\n\n- Practical Workplace Note: ${item.caveat}`,
    keyConcept: item.competency,
    behavioralRubric: {
      competency: item.competency,
      whyStrongest: item.strongestReason,
      contextualCaveat: item.caveat
    },
    sourceIds: ['opm-workplace-competencies'],
    isGenerated: true
  };
}
