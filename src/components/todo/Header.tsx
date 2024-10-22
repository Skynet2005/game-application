// 'use client';
// import { useUser } from '@clerk/nextjs';
// import { useEffect, useState } from 'react';
// import { SearchCheck } from 'lucide-react';

// import { useBoardStore } from '@/components/todo/stores/BoardStore';
// import fetchSuggestion from './lib/fetchSuggestion';
// import { UserAvatar } from './custom-ui/user-avatar';

// function Header() {
//   const { user } = useUser();
//   const userName = user ? `${user.firstName} ${user.lastName}` : 'Guest';
//   const [board, searchString, setSearchString] = useBoardStore(state => [
//     state.board,
//     state.searchString,
//     state.setSearchString,
//   ]);

//   const [suggestion, setSuggestion] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (board.columns.size === 0) return;
//     setLoading(true);

//     const fetchSuggestionFunc = async () => {
//       try {
//         const suggestion = await fetchSuggestion(board, userName);
//         setSuggestion(suggestion);
//       } catch (error) {
//         console.error('Failed to fetch suggestion:', error);
//       }
//       setLoading(false);
//     };

//     fetchSuggestionFunc();
//   }, [board, userName]);

//   const renderMessageWithNewLines = (message: string) => {
//     return message.split('\n').map((str: string, index: number, array: string[]) =>
//       array.length - 1 !== index ? (
//         <>
//           {str}
//           <br />
//         </>
//       ) : (
//         str
//       )
//     );
//   };

//   const handleSearchStringChange = (e) => {
//     setSearchString(e.target.value);
//   };

//   return (
//     <header>
//       <div
//         className={`absolute top-0 left-0 w-full h-96 rounded-md filter blur-3xl opacity-50 -z-50 gradientBackgroundGlobal`}
//       />
//       {/* User Icon */}
//       <div className="flex items-center justify-center px-5 py-2 md:py-5">
//         <p className="flex items-center p-5 text-sm font-bold pr-5 shadow-xl rounded-xl w-fit bg-neutral-700 dark:bg-neutral-300 dark:text-neutral-700 italic max-w-3xl text-black">
//           <UserAvatar className={`inline-block text-blue-950 mr-1 ${loading && 'animate-spin'}`} />
//           {/* GPT Response */}
//           {suggestion && !loading ? renderMessageWithNewLines(suggestion) : 'GPT is summarizing your tasks for the day...'}
//         </p>
//       </div>
//       <div className="flex flex-col md:flex-row justify-end items-start p-5 bg-transp">
//         <div className="sl:hidden flex justify-center rounded-xl ml-15 w-3-4">
//           <form className="flex items-center space-x-5 bg-neutral-700 text-neutral-700 dark:bg-neutral-300 dark:text-neutral-300 rounded p-2 shadow-md">
//             <SearchCheck className="flex h-6 w-6 justify-end text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchString}
//               onChange={handleSearchStringChange}
//               className="flex-1 rounded outline-none p-2"
//             />
//             <button type="submit" hidden>
//               Search
//             </button>
//           </form>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;
