// src/models/column.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ColumnDocument extends Document {
  id: 'todo' | 'inprogress' | 'done';
  todos: mongoose.Types.ObjectId[];
}

const columnSchema = new Schema({
  id: { type: String, enum: ['todo', 'inprogress', 'done'], required: true },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

const ColumnModel = mongoose.models.Column || mongoose.model<ColumnDocument>('Column', columnSchema);
export default ColumnModel;
