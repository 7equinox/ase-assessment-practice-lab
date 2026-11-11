import { Question, Difficulty } from '../types';

let engCounter = 4000;

export function generateEnglishQuestion(
  topicFilter?: string,
  difficultyFilter?: Difficulty
): Question {
  engCounter++;
  const topics = ['subject-verb', 'verb-tenses', 'reading-comprehension', 'vocabulary-context'];
  const topic = topicFilter && topics.includes(topicFilter) 
    ? topicFilter 
    : topics[Math.floor(Math.random() * topics.length)];
  const difficulty: Difficulty = difficultyFilter || 'intermediate';

  if (topic === 'subject-verb') {
    return generateSubjectVerbAgreement();
  } else if (topic === 'reading-comprehension') {
    return generateReadingComprehension();
  } else if (topic === 'vocabulary-context') {
    return generateVocabularyQuestion();
  } else {
    return generateTensesQuestion();
  }
}

function generateSubjectVerbAgreement(): Question {
  const templates = [
    {
      prompt: "Identify the grammatically correct sentence regarding team updates:",
      correct: "The manager, along with three senior analysts, has approved the release schedule.",
      distractors: [
        "The manager, along with three senior analysts, have approved the release schedule.",
        "The manager, along with three senior analysts, are approving the release schedule yesterday.",
        "The manager, along with three senior analysts, were approved the release schedule."
      ],
      rule: "Parenthetical or intervening prepositional phrases (e.g., 'along with...', 'as well as...') do not alter the grammatical number of the primary subject ('The manager', singular). Therefore, the singular auxiliary verb 'has' is required."
    },
    {
      prompt: "Select the sentence with impeccable subject-verb agreement:",
      correct: "Neither the database administrator nor the systems engineers were aware of the failover outage.",
      distractors: [
        "Neither the database administrator nor the systems engineers was aware of the failover outage.",
        "Neither the database administrator nor the systems engineers is aware of the failover outage.",
        "Neither the database administrator or the systems engineers was aware of the failover outage."
      ],
      rule: "With correlative conjunctions 'neither... nor...', the verb agrees in number with the closer subject entity ('the systems engineers', plural -> 'were')."
    }
  ];

  const t = templates[Math.floor(Math.random() * templates.length)];
  const choices = [
    { id: 'a', text: t.correct },
    { id: 'b', text: t.distractors[0] },
    { id: 'c', text: t.distractors[1] },
    { id: 'd', text: t.distractors[2] }
  ].sort(() => Math.random() - 0.5);

  return {
    id: `eng-sva-${engCounter}`,
    part: 'english',
    topic: 'Subject-Verb Agreement',
    difficulty: 'intermediate',
    prompt: t.prompt,
    choices,
    correctAnswerId: choices.find(c => c.text === t.correct)!.id,
    explanation: t.rule,
    keyConcept: 'Syntactic proximity and compound subjects with intervening modifiers.',
    sourceIds: ['purdue-owl-subject-verb'],
    isGenerated: true
  };
}

function generateReadingComprehension(): Question {
  const passage = "Continuous Integration (CI) is a software engineering practice where developers frequently merge code commits into a central branch, triggering automated build and test runs. Rather than accumulating discrepancies across isolated feature branches for weeks, CI surfaces integration defects early in the software lifecycle. While CI increases pipeline computing overhead and requires rigorous unit test maintenance, industry studies demonstrate an overall reduction in mean-time-to-repair (MTTR) and customer-facing regression incidents.";

  return {
    id: `eng-rc-${engCounter}`,
    part: 'english',
    topic: 'Reading Comprehension',
    difficulty: 'intermediate',
    prompt: "According to the passage, what is a primary engineering benefit of Continuous Integration?",
    passage,
    choices: [
      { id: 'a', text: 'It identifies integration defects earlier in the software development lifecycle.' },
      { id: 'b', text: 'It completely eliminates the necessity for engineers to write automated unit tests.' },
      { id: 'c', text: 'It guarantees zero computing pipeline infrastructure cost.' },
      { id: 'd', text: 'It prevents developers from merging code frequently into central branches.' }
    ],
    correctAnswerId: 'a',
    explanation: "The passage explicitly notes: 'Rather than accumulating discrepancies across isolated feature branches for weeks, CI surfaces integration defects early in the software lifecycle.' Choices B, C, and D contradict the explicit text.",
    keyConcept: 'Direct contextual extraction and avoidance of unsubstantiated inferences.',
    sourceIds: ['purdue-owl-subject-verb'],
    isGenerated: true
  };
}

function generateVocabularyQuestion(): Question {
  return {
    id: `eng-voc-${engCounter}`,
    part: 'english',
    topic: 'Professional Technical Vocabulary in Context',
    difficulty: 'intermediate',
    prompt: "Choose the word that best completes the sentence:\n'The cloud team implemented an automated failover mechanism to ensure the system remains ________ even during server hardware faults.'",
    choices: [
      { id: 'a', text: 'resilient' },
      { id: 'b', text: 'transient' },
      { id: 'c', text: 'obsolete' },
      { id: 'd', text: 'ambivalent' }
    ],
    correctAnswerId: 'a',
    explanation: "'Resilient' means able to withstand or recover quickly from difficult conditions. 'Transient' means lasting only a short time; 'obsolete' means out of date; 'ambivalent' means having mixed feelings.",
    keyConcept: 'Technical vocabulary alignment with fault tolerance.',
    sourceIds: ['cambridge-grammar-tenses'],
    isGenerated: true
  };
}

function generateTensesQuestion(): Question {
  return {
    id: `eng-ten-${engCounter}`,
    part: 'english',
    topic: 'Verb Tense Consistency',
    difficulty: 'intermediate',
    prompt: "Select the sentence with correct verb tense sequence:",
    choices: [
      { id: 'a', text: 'By the time the client reviewed the demo, the development team had resolved the issue.' },
      { id: 'b', text: 'By the time the client reviewed the demo, the development team has resolved the issue.' },
      { id: 'c', text: 'By the time the client will review the demo, the development team had resolved the issue.' },
      { id: 'd', text: 'By the time the client reviews the demo, the development team had resolved the issue.' }
    ],
    correctAnswerId: 'a',
    explanation: "When describing an action completed prior to another past action, standard English grammar calls for the past perfect ('had resolved') paired with the simple past ('reviewed') for the later event.",
    keyConcept: 'Past perfect aspect for anteriority in temporal clauses.',
    sourceIds: ['cambridge-grammar-tenses'],
    isGenerated: true
  };
}