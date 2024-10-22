// src/models/board.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface BoardDocument extends Document {
  userId: string;
  columns: mongoose.Types.ObjectId[];
  name?: string;
}

const boardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
  name: { type: String, default: 'Untitled Board' },
});

const BoardModel = mongoose.models.Board || mongoose.model<BoardDocument>('Board', boardSchema);
export default BoardModel;
