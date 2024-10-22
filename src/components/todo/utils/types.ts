export type Board = {
  columns: Map<TypedColumn, Column>;
}

export type TypedColumn = 'todo' | 'inprogress' | 'done';

export type Column = {
  id: TypedColumn;
  todos: Todo[];
}

export type Todo = {
  _id: string; // Added _id field
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  fileUrl?: string;
}
