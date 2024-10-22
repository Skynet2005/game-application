// src/components/todo/actions/board.actions.ts
'use server';
import { connectToDB } from '@/lib/mongoose';
import BoardModel, { BoardDocument } from '../../models/board.model';
import ColumnModel from '../../models/column.model';

export async function fetchBoard(userId: string, boardId: string): Promise<BoardDocument | null> {
  try {
    await connectToDB();
    const board = await BoardModel.findOne({ userId, _id: boardId }).populate('columns');
    return board;
  } catch (error: any) {
    console.error('Failed to fetch board:', error.message);
    throw new Error(`Failed to fetch board: ${error.message}`);
  }
}

export async function createNewBoard(userId: string): Promise<BoardDocument> {
  try {
    await connectToDB();
    const defaultColumns = [
      { id: 'todo', todos: [] },
      { id: 'inprogress', todos: [] },
      { id: 'done', todos: [] }
    ];

    const columnDocs = await ColumnModel.insertMany(defaultColumns);
    const newBoard = new BoardModel({ userId, columns: columnDocs.map((col) => col._id) });
    const savedBoard = await newBoard.save();
    await BoardModel.populate(savedBoard, { path: 'columns' });
    return savedBoard;
  } catch (error: any) {
    console.error('Failed to create new board:', error.message);
    throw new Error(`Failed to create new board: ${error.message}`);
  }
}

export async function renameBoard(userId: string, newBoardName: string): Promise<BoardDocument | null> {
  try {
    await connectToDB();
    const board = await BoardModel.findOne({ userId });
    if (!board) throw new Error('Board not found');

    board.name = newBoardName;
    await board.save();

    return board;
  } catch (error: any) {
    console.error('Failed to rename board:', error.message);
    throw new Error(`Failed to rename board: ${error.message}`);
  }
}

export async function moveColumnPosition(userId: string, sourceIndex: number, destinationIndex: number): Promise<BoardDocument | null> {
  try {
    await connectToDB();
    const board = await BoardModel.findOne({ userId }).populate('columns');
    if (!board) throw new Error('Board not found');

    const updatedColumns = Array.from(board.columns);
    const [movedColumn] = updatedColumns.splice(sourceIndex, 1);
    updatedColumns.splice(destinationIndex, 0, movedColumn);
    board.columns = updatedColumns;

    await board.save();
    return board;
  } catch (error: any) {
    console.error('Failed to move column position:', error.message);
    throw new Error(`Failed to move column position: ${error.message}`);
  }
}
