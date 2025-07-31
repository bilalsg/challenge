type FilterTabsProps = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export default function FilterTabs({ options, selected, onChange }: FilterTabsProps) {
  return (
    <div className="flex space-x-2 mb-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 rounded ${
            selected === option
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
