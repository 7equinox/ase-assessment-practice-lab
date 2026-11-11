import { Question, Difficulty } from '../types';

let cppCounter = 2000;

export function generateCppQuestion(
  topicFilter?: string,
  difficultyFilter?: Difficulty
): Question {
  cppCounter++;
  const topics = ['pointers-addresses', 'oop-polymorphism', 'loops-tracing', 'pass-by-ref'];
  const topic = topicFilter && topics.includes(topicFilter) 
    ? topicFilter 
    : topics[Math.floor(Math.random() * topics.length)];
  const difficulty: Difficulty = difficultyFilter || (['easy', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as Difficulty);

  if (topic === 'pointers-addresses') {
    return generatePointerQuestion(difficulty);
  } else if (topic === 'oop-polymorphism') {
    return generateOopQuestion(difficulty);
  } else if (topic === 'pass-by-ref') {
    return generateReferenceQuestion(difficulty);
  } else {
    return generateLoopTraceQuestion(difficulty);
  }
}

function generatePointerQuestion(difficulty: Difficulty): Question {
  const initialVal = (Math.floor(Math.random() * 5) + 1) * 10;
  const updateVal = initialVal + 25;

  const code = `#include <iostream>

int main() {
    int value = ${initialVal};
    int* ptr = &value;

    *ptr = ${updateVal};

    std::cout << value << " " << *ptr;
    return 0;
}`;

  const expectedOutput = `${updateVal} ${updateVal}`;
  const wrong1 = `${initialVal} ${updateVal}`;
  const wrong2 = `${initialVal} ${initialVal}`;
  const wrong3 = `Compilation error: invalid lvalue assignment`;

  const choices = [
    { id: 'a', text: expectedOutput },
    { id: 'b', text: wrong1 },
    { id: 'c', text: wrong2 },
    { id: 'd', text: wrong3 },
  ].sort(() => Math.random() - 0.5);

  return {
    id: `cpp-ptr-${cppCounter}`,
    part: 'cpp',
    topic: 'Pointers and Memory Addresses',
    difficulty,
    prompt: 'Predict the exact output of this compliant C++17 program:',
    codeSnippet: code,
    choices,
    correctAnswerId: choices.find(c => c.text === expectedOutput)!.id,
    explanation: `Step-by-step execution:\n1. 'int value = ${initialVal};' allocates stack memory for 'value'.\n2. 'int* ptr = &value;' initializes pointer 'ptr' to hold the memory address of 'value'.\n3. '*ptr = ${updateVal};' dereferences 'ptr', writing '${updateVal}' directly into the memory location occupied by 'value'.\n4. Therefore, 'value' is now ${updateVal}, and '*ptr' reads that same location, printing "${updateVal} ${updateVal}".`,
    distractorExplanations: [
      { choiceId: 'b', explanation: 'Incorrect because *ptr modifies the underlying variable memory directly; value does not remain unchanged.' },
      { choiceId: 'd', explanation: 'Incorrect because assigning through a dereferenced typed pointer (*ptr = val) is valid C++ syntax.' }
    ],
    keyConcept: 'Pointer dereferencing modifies the original variable residing at that memory address.',
    sourceIds: ['cpp-pointers-learncpp', 'cppreference-pointers'],
    isGenerated: true
  };
}

function generateOopQuestion(difficulty: Difficulty): Question {
  const code = `#include <iostream>

class Base {
public:
    virtual void show() { std::cout << "Base "; }
};

class Derived : public Base {
public:
    void show() override { std::cout << "Derived "; }
};

int main() {
    Base* obj = new Derived();
    obj->show();
    delete obj;
    return 0;
}`;

  return {
    id: `cpp-oop-${cppCounter}`,
    part: 'cpp',
    topic: 'Object-Oriented Programming & Virtual Functions',
    difficulty,
    prompt: 'What will be printed to standard output upon executing the following C++17 code?',
    codeSnippet: code,
    choices: [
      { id: 'a', text: 'Derived ' },
      { id: 'b', text: 'Base ' },
      { id: 'c', text: 'Base Derived ' },
      { id: 'd', text: 'Undefined runtime behavior' }
    ],
    correctAnswerId: 'a',
    explanation: `Polymorphism analysis:\n- 'Base::show()' is declared as 'virtual'.\n- 'Derived' overrides 'show()'.\n- Because the method is virtual, C++ resolves the call at runtime via the virtual method table (vtable) based on the actual runtime object type ('Derived'), not the pointer type ('Base*').\nThus, "Derived " is emitted.`,
    keyConcept: 'Dynamic dispatch via virtual function overriding in class hierarchies.',
    sourceIds: ['cppreference-oop'],
    isGenerated: true
  };
}

function generateReferenceQuestion(difficulty: Difficulty): Question {
  const val = 15;
  const code = `#include <iostream>

void modifyValues(int normal, int& ref) {
    normal += 10;
    ref += 20;
}

int main() {
    int a = ${val};
    int b = ${val};
    modifyValues(a, b);
    std::cout << a << " " << b;
    return 0;
}`;

  const expected = `${val} ${val + 20}`;
  const wrong1 = `${val + 10} ${val + 20}`;
  const wrong2 = `${val} ${val}`;

  const choices = [
    { id: 'a', text: expected },
    { id: 'b', text: wrong1 },
    { id: 'c', text: wrong2 },
    { id: 'd', text: `${val + 10} ${val}` }
  ].sort(() => Math.random() - 0.5);

  return {
    id: `cpp-ref-${cppCounter}`,
    part: 'cpp',
    topic: 'Functions: Pass by Value vs Pass by Reference',
    difficulty,
    prompt: 'Trace the parameter passing behavior in this program:',
    codeSnippet: code,
    choices,
    correctAnswerId: choices.find(c => c.text === expected)!.id,
    explanation: `'a' is passed by value (a copy is created inside 'modifyValues', leaving the caller's 'a' equal to ${val}). 'b' is passed by reference ('int& ref'), meaning 'ref' acts as an alias to 'b'. Modifying 'ref += 20' directly increments 'b' to ${val + 20}.`,
    keyConcept: 'Pass-by-reference enables in-place mutation of caller arguments without copying.',
    sourceIds: ['cpp-pointers-learncpp'],
    isGenerated: true
  };
}

function generateLoopTraceQuestion(difficulty: Difficulty): Question {
  const code = `#include <iostream>

int main() {
    int sum = 0;
    for (int i = 1; i <= 4; ++i) {
        if (i == 3) continue;
        sum += i;
    }
    std::cout << sum;
    return 0;
}`;

  return {
    id: `cpp-loop-${cppCounter}`,
    part: 'cpp',
    topic: 'Control Flow and Loop Tracing',
    difficulty,
    prompt: 'What is the exact output of this loop tracing execution?',
    codeSnippet: code,
    choices: [
      { id: 'a', text: '7' },
      { id: 'b', text: '10' },
      { id: 'c', text: '3' },
      { id: 'd', text: '6' }
    ],
    correctAnswerId: 'a',
    explanation: `Step-by-step iteration:\n- i = 1: sum = 0 + 1 = 1\n- i = 2: sum = 1 + 2 = 3\n- i = 3: 'continue' is executed; skips the rest of the loop body\n- i = 4: sum = 3 + 4 = 7\nFinal output is 7.`,
    keyConcept: 'Loop control statements: "continue" skips subsequent statements in the current iteration.',
    sourceIds: ['cppreference-pointers'],
    isGenerated: true
  };
}