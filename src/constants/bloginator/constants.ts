import * as z from 'zod';

export const formSchema = z.object({ prompt: z.string().min(1, { message: 'Prompt is required.', }), });

export const placeholderSentences = [
  'Create a simple form in Next.js.',
  'How to use React hooks in a component?',
  'Generate a bar chart using JavaScript.',
  'Creating a dynamic route in Next.js.',
  'Use TypeScript with React functional components.',
  'How to manage state with Redux in a Next.js app?',
  'Create a modal dialog box in React.',
  'How to use context API in React?',
  'Error handling in async functions in JavaScript.',
  'TypeScript interfaces vs. types - which should I use?',
  'How to fetch data from an API in a Next.js app?',
  'Optimizing performance of a React app.',
  'Design patterns in JavaScript.',
  'Functional programming in JavaScript.',
  'What are Python generators and how to use them?',
  "Explain Django's MVT architecture.",
  'Create a REST API with Node.js and Express.',
  'What is GraphQL and why would you use it?',
  'How to implement authentication in a React app?',
  'What is server-side rendering with Next.js?',
  'How to handle state management in large React applications?',
  'What are decorators in Python and how to use them?',
  'How to use async/await in JavaScript?',
  'What is the difference between SQL and NoSQL databases?',
  'How to use props in React?',
  'What is the virtual DOM in React?',
  'How to use Python for data analysis?',
  'What is the concept of middleware in Express.js?',
  'How to do error handling in a Python application?',
  'What is a Docker container?',
  'How to use WebSockets for real-time communication in JavaScript?',
  'What is the difference between a library and a framework?',
  "How to use Python's requests library to fetch data from an API?",
  'What is object-oriented programming in JavaScript?',
  'How to create a responsive layout with CSS Grid?',
  'What is recursion in JavaScript and when should you use it?',
  'How to use SVGs in a React application?',
  'How to manage dependencies in a Python project?',
  'What are higher-order functions in JavaScript?',
  'How to use the map, reduce, and filter methods in JavaScript?',
  'What is the purpose of a .gitignore file?',
  'What is semantic versioning?',
  'What are the benefits of TypeScript over JavaScript?',
  'How to use PropTypes in React?',
  'What is the concept of closures in JavaScript?',
  'How to use list comprehensions in Python?',
  'What is a binary search tree in computer science?',
  'How to implement pagination in a React app?',
  'What are the key features of ES6?',
  'What are the benefits and drawbacks of microservices architecture?',
];
