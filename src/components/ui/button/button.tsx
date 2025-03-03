import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => Promise<void>;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, ...props }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setLoading(true);
      try {
        await onClick();
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={loading || props.disabled}
      className={`px-4 py-2 text-white bg-primary flex items-center gap-2 hover:bg-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed ${
        props.className || ''
      }`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M4 12a8 8 0 018-8" strokeOpacity="0.75" />
        </svg>
      )}
      {label}
    </button>
  );
};

export default Button;
