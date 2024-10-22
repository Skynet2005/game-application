// src/components/todo/lib/fetchSuggestion.ts
import formatTodosForAI from './formatTodosForAI';
import { Board } from '../utils/types';

const fetchSuggestion = async (board: Board, userName: string) => {
  const todos = formatTodosForAI(board);
  const response = await fetch('/api/generateSummary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todos, userName }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.message.content;
  } else {
    throw new Error('Failed to fetch suggestion');
  }
}

export default fetchSuggestion;
