import { SourceReference } from '../types';

export const VERIFIED_SOURCES: Record<string, SourceReference> = {
  'cpp-pointers-learncpp': {
    id: 'cpp-pointers-learncpp',
    title: 'Introduction to Pointers (Lesson 12.7)',
    publisher: 'LearnCpp.com',
    url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-pointers/',
    concept: 'C++ Pointers, Address-of operator (&), and Dereferencing (*)',
    notes: 'Covers memory addresses, pointer declaration syntax, and modifying values indirectly.'
  },
  'cppreference-pointers': {
    id: 'cppreference-pointers',
    title: 'Pointer Declaration & Operators',
    publisher: 'CppReference.com',
    url: 'https://en.cppreference.com/w/cpp/language/pointer',
    concept: 'Pointer Semantics in C++17',
    notes: 'Reference documentation detailing object pointers, nullptr, and dereferencing rules.'
  },
  'cppreference-oop': {
    id: 'cppreference-oop',
    title: 'Derived Classes and Virtual Functions',
    publisher: 'CppReference.com',
    url: 'https://en.cppreference.com/w/cpp/language/virtual',
    concept: 'Object-Oriented Polymorphism & Virtual Dispatch',
    notes: 'Explains dynamic dispatch, vtables, and inheritance overrides in standard C++.'
  },
  'purdue-owl-subject-verb': {
    id: 'purdue-owl-subject-verb',
    title: 'Making Subjects and Verbs Agree',
    publisher: 'Purdue University Online Writing Lab (OWL)',
    url: 'https://owl.purdue.edu/owl/general_writing/grammar/subject_verb_agreement.html',
    concept: 'Subject-Verb Agreement Rules',
    notes: 'Standard guidelines on compound subjects, intervening prepositional phrases, and indefinite pronouns.'
  },
  'cambridge-grammar-tenses': {
    id: 'cambridge-grammar-tenses',
    title: 'Tenses and Time',
    publisher: 'Cambridge Dictionary English Grammar',
    url: 'https://dictionary.cambridge.org/grammar/british-grammar/tenses-and-time',
    concept: 'English Verb Tenses and Consistency',
    notes: 'Authoritative rules on simple past, present perfect, and conditional sequences.'
  },
  'shl-inductive-framework': {
    id: 'shl-inductive-framework',
    title: 'Inductive & Diagrammatic Reasoning Assessment Methodology',
    publisher: 'SHL Practice Resources & Assessment Preparation',
    url: 'https://www.shl.com/shldirect/en/assessment-advice/example-questions/inductive-reasoning',
    concept: 'Matrix and Series Visual Pattern Transformations',
    notes: 'Details cyclical rotations, progressive shape addition, and parity-based symbol logic.'
  },
  'opm-workplace-competencies': {
    id: 'opm-workplace-competencies',
    title: 'Assessment and Workplace Competencies Framework',
    publisher: 'U.S. Office of Personnel Management (OPM)',
    url: 'https://www.opm.gov/policy-data-oversight/assessment-and-selection/competencies/',
    concept: 'Behavioral Decision-Making & Accountability in Engineering Teams',
    notes: 'Defines constructive feedback receptivity, ownership, learning agility, and blameless postmortems.'
  }
};