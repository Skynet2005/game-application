// app/dashboard/routes/dashboard/page.tsx
"use client";

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Row } from './components/Row';
import { Tool, rawTools } from './components/constants';

export default function HomePage() {
  const [numColumns, setNumColumns] = useState(4);
  const randomImageNumber = Math.floor(Math.random() * 6) + 1;
  const randomImage = `/backgrounds/CyberneticLandscape${randomImageNumber}.png`;

  useEffect(() => {
    const handleResize = () => {
      const newNumColumns = window.innerWidth <= 400 ? 2 : 4;
      setNumColumns(newNumColumns);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  const getColumns = useCallback((): Tool[][] => {
    const columns: Tool[][] = Array.from({ length: numColumns }, () => []);
    rawTools.forEach((tool, index) => { columns[index % numColumns].push(tool); });
    return columns;
  }, [numColumns]);

  useEffect(() => {
    setTools(getColumns());
    console.log('Current numColumns:', numColumns);  // Debugging line
  }, [numColumns, getColumns]);


  const [tools, setTools] = useState<Tool[][]>(getColumns());

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    const columnsCopy = Array.from(tools);
    const sourceColumn = columnsCopy[Number(source.droppableId)];
    const destinationColumn = columnsCopy[Number(destination.droppableId)];
    const [movedTool] = sourceColumn.splice(source.index, 1);
    destinationColumn.splice(destination.index, 0, movedTool);
    setTools(columnsCopy);
  };

  return (
    <div className="flex flex-col h-full pr-[30px]">
      <Image
        src={randomImage}
        alt="Background Image"
        fill={true}
        objectFit="cover"
        className="opacity-30"
        style={{ zIndex: -1 }}
      />
      <div className="flex items-start justify-center align-center w-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          {tools.map((column, colIndex) => (
            <Droppable key={colIndex} droppableId={String(colIndex)} direction="vertical" type="tool">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={{ flex: 1 }} className="rounded-full p-2">
                  {column.map((tool, rowIndex) => (
                    <Row key={rowIndex} tool={tool} rowIndex={rowIndex} colIndex={colIndex} className="rounded-full" />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
