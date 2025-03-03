// components/home/GridToggle.tsx
import React from 'react';

import { AiOutlineAppstore, AiOutlineMenu } from 'react-icons/ai';

interface GridToggleProps {
  gridCols: number;
  setGridCols: (cols: number) => void;
}

const GridToggle: React.FC<GridToggleProps> = ({ gridCols, setGridCols }) => (
  <div className="flex justify-end gap-2">
    <button
      className={`cursor-pointer p-2 rounded border border-gray-200 ${
        gridCols === 1 ? 'bg-primary text-white' : 'bg-white text-gray-800'
      }`}
      onClick={() => setGridCols(1)}
    >
      <AiOutlineMenu size={20} />
    </button>
    <button
      className={`cursor-pointer p-2 rounded border border-gray-200 ${
        gridCols === 2 ? 'bg-primary text-white' : 'bg-white text-gray-800'
      }`}
      onClick={() => setGridCols(2)}
    >
      <AiOutlineAppstore size={20} />
    </button>
  </div>
);

export default GridToggle;
