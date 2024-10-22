// components/quotes.tsx
'use client';
import { useEffect, useState } from 'react';
import { inspirationalQuotes } from './constants';

const Quote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const getQuote = () => {
      const randomQuote =
        inspirationalQuotes[
        Math.floor(Math.random() * inspirationalQuotes.length)
        ];
      setQuote(randomQuote);
    };
    getQuote();
    const intervalId = setInterval(getQuote, 30000); // Change quote every 30 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="rounded-xl pl-1 pr-1 pb-2 bg-transparent text-yellow-400 dark:text-green-600 text-center">
      &ldquo;{quote}&rdquo;
    </p>
  );
};

export default Quote;

