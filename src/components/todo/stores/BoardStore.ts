// components/todo/stores/BoardStore.ts
"use client";

import { create } from 'zustand';
import { fetchBoard, createNewBoard, renameBoard, moveColumnPosition } from '../lib/actions/board.actions';
import { addTodoToColumn as addTodo, getTodosByColumn, moveTodoToColumn, deleteTodoFromColumn } from '../lib/actions/todo.actions';

interface BoardState {
  board: any;
  currentBoardId: string | null;
  userId: string | null;
  loading: boolean;
  newTaskType: 'todo' | 'inprogress' | 'done';
  searchString: string;
  initializeStore: (userId: string, boardId: string) => void;
  createBoard: () => void;
  getBoard: () => void;
  setLoading: (isLoading: boolean) => void;
  setSearchString: (search: string) => void;
  getTodos: (columnId: string) => void;
  addTask: (taskName: string, columnId: string, newTaskType: 'todo' | 'inprogress' | 'done', fileUrl?: string) => void;
  moveTaskWithinColumn: (columnId: string, sourceIndex: number, destinationIndex: number) => void;
  moveTask: (todoId: string, sourceColumnId: string, targetColumnId: string, newPosition: number) => void;
  deleteTask: (todoId: string, columnId: string) => void;
  moveColumnPosition: (sourceIndex: number, destinationIndex: number) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {},
  currentBoardId: null,
  userId: null,
  loading: false,
  newTaskType: 'todo',
  searchString: '',
  initializeStore: async (initialUserId: string, initialBoardId: string | null) => {
    console.log('Initializing store with userId:', initialUserId, 'and boardId:', initialBoardId);
    set({ userId: initialUserId, currentBoardId: initialBoardId });

    let board = null;
    if (initialBoardId) {
      board = await fetchBoard(initialUserId, initialBoardId);
      console.log('Fetched board with existing boardId:', board);
    }

    if (!board) {
      board = await createNewBoard(initialUserId);
      console.log('Created new board:', board);
      set({ currentBoardId: board._id as string });
    }

    set({ board });
  },
  createBoard: async () => {
    const { userId } = get();
    if (!userId) return;
    const newBoard = await createNewBoard(userId);
    set({ board: newBoard });
  },
  getBoard: async () => {
    const { userId, currentBoardId } = get();
    if (!userId || !currentBoardId) return;
    const board = await fetchBoard(userId, currentBoardId);
    set({ board });
  },
  setLoading: isLoading => set({ loading: isLoading }),
  setSearchString: search => set({ searchString: search }),
  getTodos: async (columnId: string) => {
    const todos = await getTodosByColumn(columnId);
    set(state => {
      const updatedBoard = { ...state.board };
      updatedBoard[columnId] = todos;
      return { board: updatedBoard };
    });
  },
  addTask: async (taskName, columnId, newTaskType, fileUrl) => {
    const taskData = { title: taskName, status: newTaskType, fileUrl };
    await addTodo(columnId, taskData, newTaskType);
    const { userId, currentBoardId } = get();
    const updatedBoard = await fetchBoard(userId as string, currentBoardId as string);
    set({ board: updatedBoard });
  },
  moveTaskWithinColumn: (columnId: string, sourceIndex: number, destinationIndex: number) => {
    set((state) => {
      const updatedBoard = { ...state.board };
      const columnTodos = updatedBoard[columnId]?.todos || [];
      const [movedTodo] = columnTodos.splice(sourceIndex, 1);
      columnTodos.splice(destinationIndex, 0, movedTodo);
      updatedBoard[columnId].todos = columnTodos;
      return { board: updatedBoard };
    });
  },
  moveTask: async (todoId, sourceColumnId, targetColumnId, newPosition) => {
    await moveTodoToColumn(todoId, sourceColumnId, targetColumnId, newPosition);
    const { userId, currentBoardId } = get();
    const updatedBoard = await fetchBoard(userId as string, currentBoardId as string);
    set({ board: updatedBoard });
  },
  deleteTask: async (todoId, columnId) => {
    await deleteTodoFromColumn(todoId, columnId);
    const { userId, currentBoardId } = get();
    const updatedBoard = await fetchBoard(userId as string, currentBoardId as string);
    set({ board: updatedBoard });
  },
  moveColumnPosition: async (sourceIndex, destinationIndex) => {
    const { userId, currentBoardId } = get();
    await moveColumnPosition(userId as string, sourceIndex, destinationIndex);
    const updatedBoard = await fetchBoard(userId as string, currentBoardId as string);
    set({ board: updatedBoard });
  },
}));
