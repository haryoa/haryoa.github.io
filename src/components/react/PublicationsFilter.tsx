// src/components/react/PublicationsFilter.tsx
import React from "react";

export const PublicationsFilter: React.FC<{
  types: string[];
  activeType: string;
  onChange: (type: string) => void;
}> = ({ types, activeType, onChange }) => {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          activeType === "all"
            ? "bg-sage text-white"
            : "bg-white/50 text-sage hover:bg-sage/10"
        }`}
      >
        All
      </button>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeType === type
              ? "bg-sage text-white"
              : "bg-white/50 text-sage hover:bg-sage/10"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};
