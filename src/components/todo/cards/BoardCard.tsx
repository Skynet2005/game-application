// src/components/todo/cards/BoardCard.tsx
"use client";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { useBoardStore } from "@/components/todo/stores/BoardStore";
import ColumnCard from "./ColumnCard";

interface BoardCardProps {
  userId: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ userId }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    board,
    initializeStore,
    currentBoardId,
    loading,
    setLoading,
    moveColumnPosition,
    moveTask,
    moveTaskWithinColumn,
  } = useBoardStore();

  useEffect(() => {
    if (userId && !isInitialized) {
      if (currentBoardId) {
        initializeStore(userId, currentBoardId);
      } else {
        // Optionally handle board creation if no board exists
      }
      setIsInitialized(true);
    }
  }, [userId, isInitialized, initializeStore, currentBoardId]);

  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;
    setLoading(true);

    if (type === "column") {
      await moveColumnPosition(source.index, destination.index);
      setLoading(false);
      return;
    }

    const sourceColumnId = source.droppableId;
    const targetColumnId = destination.droppableId;

    if (sourceColumnId === targetColumnId) {
      await moveTaskWithinColumn(sourceColumnId, source.index, destination.index);
    } else {
      const taskId = board[sourceColumnId].todos[source.index].id;
      await moveTask(taskId, sourceColumnId, targetColumnId, destination.index);
    }

    setLoading(false);
  };

  return (
    <div aria-live="polite">
      {loading && <div>Loading...</div>}
      {Object.keys(board).length === 0 ? (
        <div>No Columns Available</div>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="column">
            {(provided, snapshot) => (
              <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-5 p-5 max-w-7xl mx-auto text-neutral-700 pb-2 ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                } p-2 rounded-2xl shadow-sm`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {Object.values(board).map((column: any, index: number) => (
                  <ColumnCard key={column.id} column={column} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default BoardCard;
