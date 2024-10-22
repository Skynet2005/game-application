// // src/components/todo/utils/Column.tsx
// 'use client';

// import { Draggable, Droppable } from 'react-beautiful-dnd';
// import { PlusCircleIcon } from 'lucide-react';
// import { useBoardStore } from '@/components/todo/stores/BoardStore';
// import TodoCard from './TodoCard';
// import { Todo, TypedColumn } from './types';

// type Props = {
//   id: TypedColumn;
//   todos: Todo[];
//   index: number;
//   onAddTask?: () => void;
// };

// const idToColumnText: { [key in TypedColumn]: string } = {
//   todo: 'To Do',
//   inprogress: 'In Progress',
//   done: 'Done',
// };

// function Column({ id, todos, index, onAddTask }: Props) {
//   const [setNewTaskType, searchString] = useBoardStore(state => [
//     state.setNewTaskType,
//     state.searchString,
//   ]);

//   const handleAddTodo = () => {
//     setNewTaskType(id);
//     if (typeof onAddTask === 'function') {
//       onAddTask();
//     }
//   };

//   return (
//     <>
//       <Draggable draggableId={id} index={index}>
//         {provided => (
//           <div
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             ref={provided.innerRef}
//           >
//             <Droppable droppableId={index.toString()} type="card">
//               {(provided, snapshot) => (
//                 <div {...provided.droppableProps} ref={provided.innerRef} className={`pb-2 ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'} p-2 rounded-2xl shadow-sm`}>
//                   <h2 className="p-2 text-xl font-bold flex justify-between items-start">
//                     {idToColumnText[id]}{' '}
//                     <span className="text-gray-500 bg-neutral-300 rounded-full font-normal px-2 py-1 text-sm">
//                       {!searchString
//                         ? todos.length
//                         : todos.filter(todo =>
//                           todo.title
//                             .toLowerCase()
//                             .includes(searchString.toLowerCase()),
//                         ).length}
//                     </span>
//                   </h2>
//                   <div className="space-y-2">
//                     <div className="flex justify-center items-center">
//                       <button
//                         title="Create Todo"
//                         type="button"
//                         onClick={handleAddTodo}
//                         className="text-green-500 hover:text-green-600 bg-neutral-400 rounded-lg flex items-center justify-center p-2"
//                       >
//                         <PlusCircleIcon className="h-7 w-7" />
//                         <span className="pl-2 border-solid border-white font-bold text-neutral-700">
//                           Add Task
//                         </span>
//                       </button>
//                     </div>
//                     {todos.map((todo, index) => {
//                       if (
//                         searchString &&
//                         !todo.title
//                           .toLowerCase()
//                           .includes(searchString.toLocaleLowerCase())
//                       ) {
//                         return null;
//                       }

//                       return (
//                         <Draggable
//                           key={todo.$id}
//                           draggableId={todo.$id}
//                           index={index}
//                         >
//                           {provided => (
//                             <TodoCard
//                               todo={todo}
//                               index={index}
//                               id={id}
//                               innerRef={provided.innerRef}
//                               draggableProps={provided.draggableProps}
//                               dragHandleProps={provided.dragHandleProps}
//                             />
//                           )}
//                         </Draggable>
//                       );
//                     })}
//                     {provided.placeholder}
//                   </div>
//                 </div>
//               )}
//             </Droppable>
//           </div>
//         )}
//       </Draggable>
//     </>
//   );
// }

// export default Column;
