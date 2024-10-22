// src/components/todo/utils/TodoCard.tsx
'use client';

import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
import { useState } from 'react';
import { XCircleIcon } from 'lucide-react';
import Image from 'next/image';

import { useBoardStore } from '@/components/todo/stores/BoardStore';
import { Button } from '@/components/ui/button';
import { Todo, TypedColumn } from './types';

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const TodoCard: React.FC<Props> = ({ todo, index, id, innerRef, draggableProps, dragHandleProps }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { deleteTask } = useBoardStore();

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <Button
          title="Delete Button"
          type="button"
          onClick={() => deleteTask(index.toString(), id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </Button>
      </div>
      {fileUrl && (
        <div className="relative h-full w-full rounded-b-md">
          <Image
            src={fileUrl}
            priority
            alt="Task_image"
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
