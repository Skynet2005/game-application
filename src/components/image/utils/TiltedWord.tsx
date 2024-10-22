import { useMemo } from 'react';
import Tilt from 'react-parallax-tilt';

const TiltedWord: React.FC<{ word: string }> = ({ word }) => {
  const colors = useMemo(() => ['text-red-700', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-indigo-500', 'text-orange-500', 'text-teal-500', 'text-lime-500', 'text-rose-500', 'text-cyan-500',], []);

  return (
    <Tilt>
      <div className="text-center items-center flex flex-row bg-neutral-700 border-2 border-neutral-400 rounded-lg pl-2 pr-2 m-2 ml-2 mr-2 mt-1 mb-1">
        {word.split('').map((char, j) => (
          <div className="font-bold text-6xl" key={j}>
            <span
              className={char === ' ' ? '' : colors[j % colors.length]}
              style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
            >
              {char}
            </span>
          </div>
        ))}
      </div>
    </Tilt>
  );
};

export default TiltedWord;
