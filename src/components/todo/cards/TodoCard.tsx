// src/components/todo/cards/TodoCard.tsx
"use client"

import { useBoardStore } from '@/components/todo/stores/BoardStore';
import { Draggable } from 'react-beautiful-dnd';
import Image from 'next/image';

interface TodoCardProps {
  todo: {
    id: string;
    title: string;
    status: 'todo' | 'inprogress' | 'done';
    fileUrl?: string;
  };
  index: number;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, index }) => {
  const { deleteTask } = useBoardStore();

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="border rounded-md p-4">
            <h3 className="font-semibold">{todo.title}</h3>
            <p>Status: {todo.status}</p>
            {todo.fileUrl && (
              <div className="mt-2">
                <Image alt="Uploaded Image" src={todo.fileUrl} width={100} height={100} />
              </div>
            )}
            <button className="mt-2 text-red-500" onClick={() => deleteTask(todo.id, todo.status)}>Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoCard;
