import React from 'react';

interface FilterBarProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function FilterBar({ filter, setFilter }: FilterBarProps) {
  return (
    <div className="mb-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${
            filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          All Sources
        </button>
        <button
          onClick={() => setFilter('available')}
          className={`px-4 py-2 rounded-md ${
            filter === 'available'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Available Only
        </button>
      </div>
    </div>
  );
}