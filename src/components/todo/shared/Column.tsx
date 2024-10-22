// src/components/todo/shared/Column.tsx
'use client';

import { PlusCircleIcon } from 'lucide-react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TodoCard from './Todo';
import { TypedColumn } from '../utils/types';
import { useBoardStore } from '../stores/BoardStore';
import { Button } from '@/components/ui/button';

interface ColumnProps {
  columnId: TypedColumn;
  todos: any[];
  index: number;
}

const Column: React.FC<ColumnProps> = ({ columnId, todos, index }) => {
  const {
    deleteTask,
    searchString,
    addTask,
    newTaskType,
  } = useBoardStore();

  // Handle adding new task
  const handleAddTask = () => {
    const taskName = prompt("Enter the task name:");
    if (!taskName) return;
    addTask(taskName, columnId, newTaskType, undefined); // Add task with current task type and no file attachment
  };

  return (
    <div className="column">
      <Droppable droppableId={columnId} type="task">
        {(provided, snapshot) => (
          <div
            className={`pb-2 ${
              snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'
            } p-2 rounded-2xl shadow-sm`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="p-2 text-xl font-bold flex justify-between items-start">
              {columnId}{' '}
              <span className="text-gray-500 bg-neutral-300 rounded-full font-normal px-2 py-1 text-sm">
                {!searchString
                  ? todos.length
                  : todos.filter((todo) =>
                      todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    ).length}
              </span>
            </h2>
            <div className="space-y-2">
              <div className="flex justify-center items-center">
                <Button
                  title="Create Todo"
                  type="button"
                  onClick={handleAddTask}
                  className="text-green-500 hover:text-green-600 bg-neutral-400 rounded-lg flex items-center justify-center p-2"
                >
                  <PlusCircleIcon className="h-7 w-7" />
                  <span className="pl-2 border-solid border-white font-bold text-neutral-700">
                    Add Task
                  </span>
                </Button>
              </div>

              {todos.map((todo, index) => {
                if (
                  searchString &&
                  !todo.title
                    .toLowerCase()
                    .includes(searchString.toLowerCase())
                ) {
                  return null;
                }
                return (
                  <Draggable
                    key={todo._id}
                    draggableId={todo._id}
                    index={index}
                  >
                    {(provided) => (
                      <TodoCard
                        key={todo._id}
                        todo={todo}
                        index={index}
                        id={columnId}
                        innerRef={provided.innerRef}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        deleteTask={deleteTask}
                        fileUrl={todo.fileUrl ? todo.fileUrl : null}
                      />
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
