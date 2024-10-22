// src/components/todo/shared/Todo.tsx
'use client';

import Image from 'next/image';
import { XCircleIcon } from 'lucide-react';
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
import { Todo, TypedColumn } from '../utils/types';
import { Button } from '@/components/ui/button';

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  fileUrl?: string | null;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  deleteTask: (todoId: string, columnId: string) => void;
};

const TodoCard: React.FC<Props> = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
  deleteTask,
  fileUrl,
}) => {
  const handleDelete = () => {
    deleteTask(todo._id, id);
  };

  return (
    <div
      className="bg-neutral-300 rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <Button
          title="Delete Button"
          type="button"
          onClick={handleDelete}
          className="text-red-900 hover:text-red-500"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </Button>
      </div>

      {fileUrl && (
        <div className="relative h-full w-full rounded-b-md">
          <Image
            src={fileUrl}
            priority
            alt="Task image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
