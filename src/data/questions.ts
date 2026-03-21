import { Question } from '../types/Question';

export const questions: Question[] = [
  {
    id: 'q1',
    category: 'React',
    tag: 'useState & batching',
    type: 'predict-output',
    question: 'What does the component log when the button is clicked once?',
    code: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  // renders: <button onClick={handleClick}>...</button>
}`,
    options: [
      'Logs 3, count becomes 9',
      'Logs 0, count becomes 1',
      'Logs 0, count becomes 3',
      'Logs 3, count becomes 3'
    ],
    correctAnswer: 1,
    explanation: 'count is captured as 0 in the closure when the handler runs. All three setCount(count + 1) calls see the same stale value — they all enqueue setCount(1), not 3 separate increments. The log also captures the stale closure value, so it prints 0. Fix: use the updater form setCount(c => c + 1).'
  },
  {
    id: 'q2',
    category: 'React',
    tag: 'stale closures',
    type: 'predict-output',
    question: 'What happens when the timer callback runs after 3 seconds?',
    code: `function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Timer:', count);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // User clicks increment button twice before timer fires
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}`,
    options: [
      'Logs "Timer: 2"',
      'Logs "Timer: 0"',
      'Logs "Timer: 1"',
      'Timer never runs'
    ],
    correctAnswer: 1,
    explanation: 'The useEffect runs only once (empty dependency array), so the timer callback captures the initial value of count (0). Even though count updates to 2, the timer still logs the stale closure value.'
  },
  {
    id: 'q3',
    category: 'React',
    tag: 'useEffect dependencies',
    type: 'multiple-choice',
    question: 'Which dependency array will cause this effect to run only when userId changes?',
    code: `function UserProfile({ userId, theme }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData(userId).then(setUserData);
  }, /* dependency array */);

  return <div className={theme}>...</div>;
}`,
    options: [
      '[userId, theme]',
      '[userId]',
      '[]',
      '[userData]'
    ],
    correctAnswer: 1,
    explanation: 'Only userId should be in the dependency array since the effect only uses userId. Including theme would cause unnecessary re-runs, [] would create stale closures, and userData would create an infinite loop.'
  },
  {
    id: 'q4',
    category: 'React',
    tag: 'useState batching',
    type: 'predict-output',
    question: 'How many times does this component render when the button is clicked?',
    code: `function BatchTest() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  console.log('Rendering');

  const handleClick = () => {
    setA(1);
    setB(2);
    setA(3);
  };

  return <button onClick={handleClick}>Click</button>;
}`,
    options: [
      '4 times (initial + 3 updates)',
      '2 times (initial + 1 batched update)',
      '1 time (only initial)',
      '3 times (initial + 2 updates)'
    ],
    correctAnswer: 1,
    explanation: 'React batches multiple setState calls in event handlers into a single re-render for performance. All three setState calls are batched together into one update.'
  },
  {
    id: 'q5',
    category: 'JavaScript',
    tag: 'closures',
    type: 'predict-output',
    question: 'What does this code log?',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}`,
    options: [
      '0, 1, 2',
      '3, 3, 3',
      '0, 0, 0',
      'undefined, undefined, undefined'
    ],
    correctAnswer: 1,
    explanation: 'var has function scope, so all setTimeout callbacks share the same i variable. By the time they execute, the loop has finished and i is 3. Fix: use let instead of var, or capture i in a closure.'
  },
  {
    id: 'q6',
    category: 'React',
    tag: 'stale closures',
    type: 'predict-output',
    question: 'What does the interval log every second?',
    code: `function IntervalExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count);
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{count}</div>;
}`,
    options: [
      'Logs 0, 1, 2, 3, ...',
      'Logs 0, 0, 0, 0, ...',
      'Logs 1, 2, 3, 4, ...',
      'Component crashes'
    ],
    correctAnswer: 1,
    explanation: 'The effect captures the initial count (0) and never updates because of empty dependencies. The interval always logs 0 and calls setCount(0 + 1), so count increments but the interval callback always sees the stale value.'
  },
  {
    id: 'q7',
    category: 'React',
    tag: 'useEffect dependencies',
    type: 'multiple-choice',
    question: 'What happens if you omit the dependency array entirely?',
    code: `useEffect(() => {
  console.log('Effect runs');
  fetchData();
});`,
    options: [
      'Effect runs once on mount',
      'Effect runs on every render',
      'Effect never runs',
      'React throws an error'
    ],
    correctAnswer: 1,
    explanation: 'No dependency array means the effect runs after every render. This is usually not what you want and can cause performance issues or infinite loops.'
  },
  {
    id: 'q8',
    category: 'JavaScript',
    tag: 'closures',
    type: 'predict-output',
    question: 'What gets logged when all functions are called?',
    code: `function createFunctions() {
  const funcs = [];
  for (let i = 0; i < 3; i++) {
    funcs.push(() => console.log(i));
  }
  return funcs;
}

const functions = createFunctions();
functions[0](); functions[1](); functions[2]();`,
    options: [
      '0, 1, 2',
      '3, 3, 3',
      '0, 0, 0',
      'Error: i is not defined'
    ],
    correctAnswer: 0,
    explanation: 'let has block scope, so each iteration creates a new binding for i. Each function captures its own copy of i with the correct value.'
  },
  {
    id: 'q9',
    category: 'React',
    tag: 'useState batching',
    type: 'predict-output',
    question: 'What is the final value of count after all operations?',
    code: `function BatchingExample() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(prev => prev + 1);
    setCount(count + 1);
  };

  // handleClick is called once
}`,
    options: [
      'count = 1',
      'count = 2',
      'count = 3',
      'count = 0'
    ],
    correctAnswer: 1,
    explanation: 'First and third setCount use the stale value (0), so they both set count to 1. The middle setCount uses the updater function, which sees the most recent value and adds 1. Final result: 2.'
  },
  {
    id: 'q10',
    category: 'React',
    tag: 'useEffect dependencies',
    type: 'multiple-choice',
    question: 'Which effect will create an infinite loop?',
    code: `const [data, setData] = useState([]);`,
    options: [
      'useEffect(() => setData([]), [data])',
      'useEffect(() => setData([]), [])',
      'useEffect(() => setData([]), [data.length])',
      'useEffect(() => setData(prev => [...prev]), [data])'
    ],
    correctAnswer: 0,
    explanation: 'Setting data to a new array [] changes the data reference, which triggers the effect again because data is in the dependency array, creating an infinite loop.'
  },
  {
    id: 'q11',
    category: 'JavaScript',
    tag: 'closures',
    type: 'predict-output',
    question: 'What does this immediately invoked function return?',
    code: `const result = (function() {
  let count = 0;
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    value() { return count; }
  };
})();

console.log(result.increment());
console.log(result.increment());
console.log(result.value());`,
    options: [
      '1, 2, 2',
      '1, 1, 1',
      '0, 1, 2',
      'undefined, undefined, 0'
    ],
    correctAnswer: 0,
    explanation: 'The IIFE creates a closure that captures count. First increment returns 1, second returns 2, and value returns the current count (2).'
  },
  {
    id: 'q12',
    category: 'React',
    tag: 'stale closures',
    type: 'multiple-choice',
    question: 'How do you fix the stale closure in this interval?',
    code: `useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(interval);
}, []);`,
    options: [
      'Add count to dependency array',
      'Use setCount(prev => prev + 1)',
      'Use useCallback',
      'Use useMemo'
    ],
    correctAnswer: 1,
    explanation: 'Using the updater function setCount(prev => prev + 1) ensures you always get the latest count value without needing to add count to dependencies.'
  },
  {
    id: 'q13',
    category: 'React',
    tag: 'useEffect dependencies',
    type: 'predict-output',
    question: 'How many times does this effect run when props.id changes from 1 to 2?',
    code: `function Component({ id, name }) {
  useEffect(() => {
    console.log('Effect running');
  }, [id, name]);

  return <div>{name}</div>;
}

// Parent changes props from { id: 1, name: 'John' } to { id: 2, name: 'John' }`,
    options: [
      'Once (only id changed)',
      'Twice (both id and name)',
      'Zero times (name is the same)',
      'Three times (mount + both changes)'
    ],
    correctAnswer: 0,
    explanation: 'The effect runs once because only id changed. Even though name is in the dependency array, its value remained the same, so it doesnt trigger an additional run.'
  },
  {
    id: 'q14',
    category: 'JavaScript',
    tag: 'closures',
    type: 'predict-output',
    question: 'What happens when outer is called?',
    code: `function outer(x) {
  function inner(y) {
    console.log(x + y);
  }
  return inner;
}

const addFive = outer(5);
addFive(3);`,
    options: [
      'Logs 8',
      'Logs 5',
      'Logs 3',
      'Error: x is not defined'
    ],
    correctAnswer: 0,
    explanation: 'inner function forms a closure over x from outer function. When outer(5) returns inner, x is captured as 5. When addFive(3) is called, it logs 5 + 3 = 8.'
  },
  {
    id: 'q15',
    category: 'React',
    tag: 'useState batching',
    type: 'multiple-choice',
    question: 'In React 18, which scenario does NOT batch state updates?',
    options: [
      'Updates in event handlers',
      'Updates in setTimeout',
      'Updates in promises',
      'All scenarios batch in React 18'
    ],
    correctAnswer: 3,
    explanation: 'React 18 introduced automatic batching for all updates, including those in timeouts, promises, and other async operations. All state updates are batched by default.'
  },
  {
    id: 'q16',
    category: 'React',
    tag: 'stale closures',
    type: 'predict-output',
    question: 'What does the async function log?',
    code: `function AsyncExample() {
  const [count, setCount] = useState(0);

  const handleClick = async () => {
    console.log('Before:', count);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('After:', count);
  };

  // User clicks button, then immediately clicks increment button (setCount(1))
  return (
    <>
      <button onClick={handleClick}>Async</button>
      <button onClick={() => setCount(1)}>Increment</button>
    </>
  );
}`,
    options: [
      'Before: 0, After: 1',
      'Before: 0, After: 0',
      'Before: 1, After: 1',
      'Before: 1, After: 0'
    ],
    correctAnswer: 1,
    explanation: 'The async function captures count when it starts (0). Even though count changes to 1 while the promise is pending, the captured value remains 0.'
  },
  {
    id: 'q17',
    category: 'React',
    tag: 'useEffect dependencies',
    type: 'multiple-choice',
    question: 'What is the correct way to use an object in useEffect dependencies?',
    code: `const user = { id: userId, name: userName };

useEffect(() => {
  fetchUser(user);
}, /* dependency array */);`,
    options: [
      '[user]',
      '[user.id, user.name]',
      '[userId, userName]',
      'useMemo for user object, then [user]'
    ],
    correctAnswer: 2,
    explanation: 'Objects are recreated on every render, causing infinite re-runs. Use primitive values [userId, userName] or memoize the object with useMemo.'
  },
  {
    id: 'q18',
    category: 'JavaScript',
    tag: 'closures',
    type: 'predict-output',
    question: 'What does the returned function log?',
    code: `function createCounter() {
  let count = 0;
  
  return function() {
    return ++count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1());
console.log(counter2());
console.log(counter1());`,
    options: [
      '1, 2, 3',
      '1, 1, 2',
      '0, 0, 1',
      '1, 2, 2'
    ],
    correctAnswer: 1,
    explanation: 'Each call to createCounter creates a new closure with its own count variable. counter1 and counter2 have separate count variables.'
  },
  {
    id: 'q19',
    category: 'React',
    tag: 'useState batching',
    type: 'predict-output',
    question: 'How many renders occur when this effect runs?',
    code: `function BatchingInEffect() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  console.log('Rendering');

  useEffect(() => {
    setA(1);
    setB(2);
    setA(3);
  }, []);

  return <div>{a + b}</div>;
}`,
    options: [
      '2 renders (mount + batch)',
      '4 renders (mount + 3 updates)',
      '1 render (mount only)',
      '3 renders (mount + 2 updates)'
    ],
    correctAnswer: 0,
    explanation: 'Effects also batch state updates. The component renders once on mount, then once more after all the setState calls in the effect are batched together.'
  },
  {
    id: 'q20',
    category: 'React',
    tag: 'stale closures',
    type: 'multiple-choice',
    question: 'Which pattern avoids stale closures in this event handler?',
    code: `function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    // Which implementation avoids stale closures?
  };
}`,
    options: [
      'setTodos([...todos, newTodo])',
      'setTodos(prev => [...prev, newTodo])',
      'setTodos(todos.concat(newTodo))',
      'All avoid stale closures'
    ],
    correctAnswer: 1,
    explanation: 'Using the updater function setTodos(prev => [...prev, newTodo]) ensures you always work with the latest state, avoiding stale closure issues.'
  }
];