import React from 'react';

type ProgressBarProps = {
  progress: number;
  color?: string;
  message?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  message = '',
  color = 'bg-primary',
}) => {
  return (
    <div className="w-full text-center">
      <div className="text-xs mb-2 text-gray-600">
        {message} - {progress}%
      </div>

      <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden border border-gray-200">
        <div
          className={`h-full ${color} transition-all duration-300 ease-in-out`}
          style={{ width: `${progress}%` }}
        ></div>

        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            className="h-full w-full opacity-50 mix-blend-overlay animate-striped"
            style={{
              backgroundSize: '35px 35px',
              backgroundImage:
                'linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.5) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.5) 75%)',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
