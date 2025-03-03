import React from 'react';

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip text-gray-700 p-2 shadow-md">
        <p className="">{label}</p>
        {payload.map((entry, _) => (
          <p
            key={entry.value}
            className="text-sm"
          >{`${entry.name}: ${entry.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default Tooltip;
