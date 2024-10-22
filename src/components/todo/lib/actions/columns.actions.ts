// src/components/todo/lib/actions/columns.actions.ts
'use server';
import mongoose from 'mongoose';
import { connectToDB } from '@/lib/mongoose';
import BoardModel from '../../models/board.model';
import ColumnModel, { ColumnDocument } from '../../models/column.model';
import { TypedColumn } from '../../utils/types';

export interface ColumnData {
  id: TypedColumn | string;
  todos?: string[];
  defaultStatus?: 'todo' | 'inprogress' | 'done';
}

export async function addTodoToColumn(boardId: string, columnData: ColumnData) {
  try {
    await connectToDB();
    const newColumn: ColumnDocument = new ColumnModel(columnData);
    await newColumn.save();

    const boardInstance = await BoardModel.findById(boardId);
    if (!boardInstance) throw new Error('Board not found');

    boardInstance.columns.push(newColumn._id as mongoose.Types.ObjectId);
    await boardInstance.save();
  } catch (error: any) {
    console.error('Failed to add column:', error.message);
    throw new Error(`Failed to add column: ${error.message}`);
  }
}
