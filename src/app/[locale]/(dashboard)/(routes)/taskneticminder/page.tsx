// src/app/[locale]/(dashboard)/(route)/taskneticminder/page.tsx

import { currentUser } from '@clerk/nextjs';
// import Header from '@/components/todo/Header';
import BoardCard from '@/components/todo/cards/BoardCard';
import ColumnCard from '@/components/todo/cards/ColumnCard';
import TodoCard from '@/components/todo/cards/TodoCard';

export async function TaskneticMinder() {
  const user = await currentUser();
  if (!user) return null;
  const userIdString = user.id;

  return (
    <div>
      <div className={`absolute top-0 left-0 w-full h-96 rounded-md filter blur-3xl opacity-50 -z-50 gradientBackgroundGlobal`} />
      <div className="h-full p-4 pt-[30px] space-y-2 rounded-xl">
        {/* <Header /> */}
        <BoardCard userId={userIdString} />
        {/* Example usage of ColumnCard and TodoCard */}
        <ColumnCard column={{ id: 'column-1', todos: [] }} index={0} />
        <TodoCard todo={{ id: 'todo-1', title: 'Sample Todo', status: 'todo' }} index={0} />
      </div>
    </div>
  );
}

export default TaskneticMinder;
