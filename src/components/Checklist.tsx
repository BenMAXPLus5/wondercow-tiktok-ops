import React from 'react';

interface ChecklistItem {
  id: string;
  text: string;
}

interface ChecklistProps {
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onChange: (id: string, val: boolean) => void;
}

const Checklist: React.FC<ChecklistProps> = ({ items, checked, onChange }) => {
  return (
    <div className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
      {items.map((item) => {
        const isChecked = !!checked[item.id];

        return (
          <label
            key={item.id}
            className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onChange(item.id, e.target.checked)}
              className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span
              className={`text-sm ${
                isChecked
                  ? 'text-gray-400 line-through'
                  : 'text-gray-700'
              }`}
            >
              {item.text}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default Checklist;
