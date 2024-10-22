// src/components/todo/cards/ColumnCard.tsx
"use client";

import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import TodoModal from "../modals/TaskModal";
import { useBoardStore } from "@/components/todo/stores/BoardStore";

interface ColumnCardProps {
  column: any;
  index: number;
}

const ColumnCard: React.FC<ColumnCardProps> = ({ column, index }) => {
  const { moveTaskWithinColumn, addTask, newTaskType } = useBoardStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <button onClick={() => setModalOpen(true)}>Add Task</button>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {column.todos.map((todo: any, taskIndex: number) => (
                  <TodoCard todo={todo} index={taskIndex} key={todo.id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* TodoModal */}
          <TodoModal
            addTask={(taskName, columnId, fileUrl) => addTask(taskName, columnId, newTaskType, fileUrl ?? undefined)}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        </div>
      )}
    </Draggable>
  );
};

export default ColumnCard;

