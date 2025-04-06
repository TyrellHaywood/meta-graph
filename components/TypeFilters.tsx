import React from "react";

interface TypeFiltersProps {
  availableTypes: string[];
  selectedTypes: string[];
  nodeColors: Record<string, string>;
  onTypeToggle: (type: string) => void;
}

const TypeFilters: React.FC<TypeFiltersProps> = ({
  availableTypes,
  selectedTypes,
  nodeColors,
  onTypeToggle,
}) => {
  return (
    <div className="mb-4">
      <h3 className="">Filter by type:</h3>
      <div className="flex gap-2 flex-wrap">
        {availableTypes.map((type) => {
          const isSelected = selectedTypes.includes(type);
          const bgColor = isSelected ? nodeColors[type] || "#ccc" : "#eee";
          const textColor = isSelected ? "white" : "#333";

          return (
            <label
              key={type}
              className="inline-flex items-center px-3 py-1.5 rounded-full mb-1.5 cursor-pointer bg-[#424242]"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onTypeToggle(type)}
                className="mr-1.5"
              />
              <span>{type}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default TypeFilters;
