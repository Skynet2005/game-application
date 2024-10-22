// // src/components/todo/utils/Board.tsx

// import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
// import { useBoardStore } from '@/components/todo/stores/BoardStore';
// import { Board as BoardInterface, Column as ColumnInterface, Todo, TypedColumn } from './types';
// import ColumnComponent from './Column';

// function isTypedColumn(id: string): id is TypedColumn {
//   return ['todo', 'inprogress', 'done'].includes(id);
// }

// type BoardProps = {
//   onAddTask: () => void;
//   user: any;
// };

// function Board({ onAddTask, user }: BoardProps) {
//   const [board, setBoardState, getBoard, updateTodoInDB] = useBoardStore(
//     state => [
//       state.board,
//       state.setBoardState,
//       state.getBoard,
//       state.updateTodoInDB,
//     ],
//   );

//   const handleOnDragEnd = (result: DropResult) => {
//     const { destination, source, type } = result;
//     if (!destination) return;

//     if (type === 'column') {
//       const entries = Array.from(board.columns.entries());
//       const [removed] = entries.splice(source.index, 1);
//       entries.splice(destination.index, 0, removed);
//       const rearrangedColumns = new Map(entries);
//       setBoardState({ ...board, columns: rearrangedColumns });
//       return;
//     }

//     const columns = Array.from(board.columns) as [string, ColumnInterface][];
//     const startColIndex = columns[Number(source.droppableId)];
//     const finishColIndex = columns[Number(destination.droppableId)];
//     const startCol: ColumnInterface = { id: startColIndex[0] as TypedColumn, todos: startColIndex[1].todos as Todo[], };
//     const finishCol: ColumnInterface = { id: finishColIndex[0] as TypedColumn, todos: finishColIndex[1].todos as Todo[], };

//     if (!startCol || !finishCol) return;
//     if (source.index === destination.index && startCol === finishCol) return;
//     const newTodos = startCol.todos;
//     const [todoMoved] = newTodos.splice(source.index, 1);
//     if (startCol.id === finishCol.id) {
//       newTodos.splice(destination.index, 0, todoMoved);
//       const newCol = { id: startCol.id, todos: newTodos };
//       const newColumns = new Map(board.columns);
//       newColumns.set(startCol.id, newCol);
//       setBoardState({ ...board, columns: newColumns });
//     } else {
//       const finishTodos = Array.from(finishCol.todos);
//       finishTodos.splice(destination.index, 0, todoMoved);
//       const newColumns = new Map(board.columns);
//       const newCol = { id: startCol.id, todos: newTodos };
//       newColumns.set(startCol.id, newCol);
//       newColumns.set(finishCol.id, { id: finishCol.id, todos: finishTodos });
//       updateTodoInDB(todoMoved, finishCol.id);
//       setBoardState({ ...board, columns: newColumns });
//     }
//   };

//   return (
//     <DragDropContext onDragEnd={handleOnDragEnd}>
//       <Droppable droppableId="board" direction="horizontal" type="column">
//         {provided => (
//           <div
//             className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 max-w-7xl mx-auto text-neutral-700"
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {Array.from(board.columns.entries()).map(([id, column], index) => {
//               if (isTypedColumn(id)) {
//                 return (
//                   <ColumnComponent
//                     key={id}
//                     id={id}
//                     todos={column.todos as Todo[]}
//                     index={index}
//                     onAddTask={onAddTask}
//                   />
//                 );
//               }
//               return null;
//             })}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

// export default Board;
