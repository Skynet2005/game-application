// src/models/todo.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface TodoDocument extends Document {
  title: string;
  status: 'todo' | 'inprogress' | 'done';
  fileUrl?: string;
  position?: number;
}

const todoSchema = new Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['todo', 'inprogress', 'done'], required: true },
  fileUrl: { type: String, default: null },
  position: { type: Number, default: 0 },
});

const TodoModel = mongoose.models.Todo || mongoose.model<TodoDocument>('Todo', todoSchema);
export default TodoModel;
