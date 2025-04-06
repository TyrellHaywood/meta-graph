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
    <div className="absolute top-4 left-0 w-full z-10 px-8">
      <div className="flex gap-2 items-center">
        {availableTypes.map((type) => {
          const isSelected = selectedTypes.includes(type);

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
