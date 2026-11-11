import { Question } from '../types';

let behCounter = 3000;

function randChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
      competency: 'Accountability & Incident Management',
      prompt: "Two hours before a client demonstration, you discover an edge-case bug in your recent pull request that causes session timeouts under load. The lead has not noticed yet. What is the MOST appropriate action?",
      choices: [
        { id: 'a', text: 'Immediately inform your team lead, explain the root cause and risk clearly, and propose an interim mitigation or fast rollback plan.' },
        { id: 'b', text: 'Quietly push an untested hotfix directly to the deployment branch without alerting anyone.' },
        { id: 'c', text: 'Wait to see if the issue manifests during the live demo; if it does, attribute it to third-party network instability.' },
        { id: 'd', text: 'Postpone your response until the next sprint retrospective so as not to cause stress before the client call.' }
      ],
      correctId: 'a',
      strongestReason: 'Proactive ownership ensures transparency, protects client relationships, and allows the team to coordinate an orderly response.',
      caveat: 'Follow your team incident checklist alongside prompt notification.'
    },
    {
      competency: 'Learning Agility & Rapid Onboarding',
      prompt: "You are assigned to an active project utilizing a modern cloud framework and language you have never used before. Your first sprint ticket is due in five days. How should you approach this situation?",
      choices: [
        { id: 'a', text: 'Study existing pull requests and docs, break the ticket into small milestones, and request a focused 15-minute alignment check with a senior peer when blocked.' },
        { id: 'b', text: 'Ask the project manager to reassign the task to an experienced teammate and wait for a project matching your university skillset.' },
        { id: 'c', text: 'Attempt to rewrite the module using an older language you know without informing the architecture team.' },
        { id: 'd', text: 'Spend all five days reading conceptual books without writing code, then declare an impediment on the final day.' }
      ],
      correctId: 'a',
      strongestReason: 'Demonstrates self-directed learning agility, practical scoping, and efficient, targeted escalation.',
      caveat: 'Ensure team leads are informed during daily standups of your onboarding progress so estimates stay calibrated.'
    },
    {
      competency: 'Constructive Code Review Collaboration',
      prompt: "During your first code review, a senior software engineer leaves several critical comments highlighting architectural inefficiencies and formatting issues in your solution. What is the MOST constructive reaction?",
      choices: [
        { id: 'a', text: 'View the review comments as an educational mentorship opportunity, ask clarifying questions on the architectural suggestions, and implement the requested improvements.' },
        { id: 'b', text: 'Defend your code vigorously by stating that it compiled and ran successfully on your personal development laptop.' },
        { id: 'c', text: 'Approve your own pull request to bypass the senior review restrictions.' },
        { id: 'd', text: 'Privately complain to your manager that the reviewer is being overly critical about non-functional details.' }
      ],
      correctId: 'a',
      strongestReason: 'Code reviews are quality gates and collaborative learning experiences, not personal evaluations.',
      caveat: 'If suggestions contradict project guidelines, schedule a brief sync meeting to build consensus.'
    },
    {
      competency: 'Deadline & Scope Negotiation',
      prompt: "Midway through a sprint, you realize an assigned feature is significantly more complex than estimated and cannot be completed without cutting automated testing. What should you do?",
      choices: [
        { id: 'a', text: 'Communicate the revised estimate early to your team lead, explain the technical risks of skipping tests, and negotiate splitting the ticket into core functionality first.' },
        { id: 'b', text: 'Silently skip writing unit tests to hit the arbitrary deadline, intending to write them in a future sprint.' },
        { id: 'c', text: 'Work 30 continuous hours without notifying anyone, submitting whatever is done at the deadline.' },
        { id: 'd', text: 'Blame the requirements analyst during the sprint review for poorly written acceptance criteria.' }
      ],
      correctId: 'a',
      strongestReason: 'Early communication enables scope negotiation and maintains software quality standards over hasty short-cuts.',
      caveat: 'Always present viable scope options (e.g. deliver sub-feature A now with tests, deliver sub-feature B next sprint).'
    },
    {
      competency: 'Team Collaboration & Mentorship',
      prompt: "A fellow associate engineer is struggling with Git merge conflicts and repeatedly asks for your assistance while you have your own deliverables due today. How do you handle this?",
      choices: [
        { id: 'a', text: 'Offer to spend 15 minutes guiding them through resolving one conflict so they learn the process, then share documentation before returning to your deliverables.' },
        { id: 'b', text: 'Take their laptop and fix all their merge conflicts for them so they stop interrupting you.' },
        { id: 'c', text: 'Ignore their messages completely until your personal sprint work is 100% finished.' },
        { id: 'd', text: 'Tell them they are not qualified for software engineering if they cannot resolve a merge conflict.' }
      ],
      correctId: 'a',
      strongestReason: 'Teaches self-sufficiency while maintaining personal boundary commitments and respectful teamwork.',
      caveat: 'If the teammate requires deep remediation, notify your Scrum Master or team lead so formal mentorship can be scheduled.'
    },
    {
      competency: 'Professional Integrity & Information Security',
      prompt: "While inspecting an open-source library used by your application, you uncover hardcoded test credentials that could grant administrative access to a staging environment. What should you do?",
      choices: [
        { id: 'a', text: 'Follow your organization security disclosure policy immediately by reporting the credential exposure to the security officer and project lead.' },
        { id: 'b', text: 'Log in with the credentials to see what confidential files you can access before saying anything.' },
        { id: 'c', text: 'Share the credentials in a public developer forum to ask if anyone else has seen them.' },
        { id: 'd', text: 'Ignore it because it is only a staging environment, not production.' }
      ],
      correctId: 'a',
      strongestReason: 'Professional integrity requires safeguarding company and customer infrastructure according to established security protocols.',
      caveat: 'Never exploit or probe exposed credentials beyond confirming their context.'
    }
  ];

  const item = randChoice(scenarios);
  const matchedChoice = item.choices.find(c => c.id === item.correctId);
  const correctText = matchedChoice ? matchedChoice.text : item.choices[0].text;

  return {
    id: `beh-${behCounter}`,
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
