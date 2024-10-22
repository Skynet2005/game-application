// src/components/todo/actions/todo.actions.ts
'use server';
import { connectToDB } from '@/lib/mongoose';
import mongoose from 'mongoose';
import ColumnModel from '../../models/column.model';
import TodoModel, { TodoDocument } from '../../models/todo.model';
import { TypedColumn } from '../../utils/types';

interface TodoData {
  title: string;
  status: TypedColumn | string;
  fileUrl: string | null | undefined;
}

export async function addTodoToColumn(columnId: string, todoData: TodoData, newTaskType: string) {
  try {
    await connectToDB();
    const newTodo: TodoDocument = new TodoModel(todoData);
    await newTodo.save();

    const column = await ColumnModel.findById(columnId);
    if (!column) throw new Error('Column not found');

    column.todos.push(newTodo._id as mongoose.Types.ObjectId);
    await column.save();
  } catch (error: any) {
    console.error('Failed to add todo:', error.message);
    throw new Error(`Failed to add todo: ${error.message}`);
  }
}

export async function getTodosByColumn(columnId: string) {
  try {
    await connectToDB();
    const column = await ColumnModel.findById(columnId).populate('todos');
    return column?.todos || [];
  } catch (error: any) {
    console.error('Failed to get todos:', error.message);
    throw new Error(`Failed to get todos: ${error.message}`);
  }
}

export async function moveTodoToColumn(todoId: string, sourceColumnId: string, targetColumnId: string, newPosition: number) {
  try {
    await connectToDB();

    const sourceColumn = await ColumnModel.findById(sourceColumnId);
    const targetColumn = await ColumnModel.findById(targetColumnId);
    if (!sourceColumn || !targetColumn) {
      throw new Error('Source or target column not found');
    }

    const todoIndex = sourceColumn.todos.indexOf(todoId);
    if (todoIndex === -1) {
      throw new Error('Todo not found in source column');
    }

    sourceColumn.todos.splice(todoIndex, 1);
    targetColumn.todos.splice(newPosition, 0, todoId);
    await Promise.all([sourceColumn.save(), targetColumn.save()]);

    const todo = await TodoModel.findById(todoId);
    if (todo) {
      todo.position = newPosition;
      await todo.save();
    }
  } catch (error: any) {
    console.error('Failed to move todo:', error.message);
    throw new Error(`Failed to move todo: ${error.message}`);
  }
}

export async function deleteTodoFromColumn(todoId: string, columnId: string) {
  try {
    await connectToDB();
    await TodoModel.findByIdAndDelete(todoId);

    const column = await ColumnModel.findById(columnId);
    if (!column) throw new Error('Column not found');

    const todoIndex = column.todos.indexOf(todoId);
    if (todoIndex === -1) {
      throw new Error('Todo not found in column');
    }

    column.todos.splice(todoIndex, 1);
    await column.save();
  } catch (error: any) {
    console.error('Failed to delete todo:', error.message);
    throw new Error(`Failed to delete todo: ${error.message}`);
  }
}
