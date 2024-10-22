"use client";

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Tool } from "./constants";

interface RowProps {
  tool: Tool;
  rowIndex: number;
  colIndex: number;
  className?: string;
}

export const Row: React.FC<RowProps> = ({ tool, rowIndex, colIndex }) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(tool.href);
  };

  return (
    <Draggable draggableId={`${tool.label}-${colIndex}-${rowIndex}`} index={rowIndex}>
      {(provided, snapshot) => (
        <div
          className={`${tool.bgColor} w-full flex flex-col justify-center items-center m-4 p-6 px-4  ${tool.color} ${snapshot.isDragging ? 'shadow-xl' : ''} flex-grow flex-shrink rounded-xl`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            onClick={handleNavigation}
            className={`cursor-pointer ${tool.bgColor} ${tool.color} p-2 mb-2 w-20 h-20 flex justify-center items-center border-2 border-neutral-300 rounded-xl`}
          >
            <Image
              src={tool.route}
              alt={tool.label}
              width={60}
              height={80}
              sizes="(max-width: 768px) 100vw, 48rem"
            />
          </div>

          <div className="mt-4 text-center font-lg break-words">
            <h3
              onClick={handleNavigation}
              className={`cursor-pointer font-bold ${tool.label.length > 20 ? "text-sm" : "text-lg"}`}
            >
              {tool.label}
            </h3>
          </div>
        </div>
      )}
    </Draggable>
  );
}
