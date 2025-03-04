// elements/dropdown.tsx (unchanged)
import { useState, useEffect, useRef } from 'react';
import { capitalizeFirstLetter } from '@/utils/';

interface DropdownItem<T> {
  label: string;
  value: T;
}

interface DropdownProps<T> {
  label: string;
  selectedItem: string;
  onSelect: (value: T) => void;
  items: DropdownItem<T>[];
}

const Dropdown = <T,>({
  label,
  selectedItem,
  onSelect,
  items,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedItemLabel = (() => {
    if (selectedItem === null) {
      /* eslint-disable no-console */
      const nullItem = items.find((item) => item.value === null);
      return nullItem ? nullItem.label : label;
    }
    /* eslint-disable no-console */
    const matchedItem = items.find((item) => item.value === selectedItem);
    return matchedItem ? matchedItem.label : selectedItem || label;
  })();

  return (
    <div className="relative inline-flex min-w-[120px]" ref={dropdownRef}>
      <button
        type="button"
        className="w-full py-2 px-4 flex justify-between items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {capitalizeFirstLetter(selectedItemLabel)}
        <svg
          className={`size-4 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-60 max-h-60 overflow-y-auto bg-white shadow-md z-10 border border-gray-200 rounded-lg"
          role="listbox"
        >
          <div className="p-1 space-y-0.5">
            {items.length > 0 ? (
              items.map((item, _) => (
                <button
                  key={String(item.value || item.label)}
                  className={`flex w-full text-left items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 focus:outline-none ${
                    selectedItem === item.value ? 'bg-gray-200' : ''
                  } hover:bg-gray-100`}
                  onClick={() => {
                    console.log('🚀 ~ item:', item);
                    onSelect(item.value);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedItem === item.value}
                >
                  {capitalizeFirstLetter(item.label)}
                </button>
              ))
            ) : (
              <div className="py-2 px-3 text-sm text-gray-500 italic">
                No data available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
