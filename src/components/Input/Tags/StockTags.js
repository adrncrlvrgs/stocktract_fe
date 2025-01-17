import React, { useState, useEffect } from "react";
import Input from "../Input";

const StockTags = ({
  name,
  value = [],
  onChange,
  error,
  maxTags = 8,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    onChange(value);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() && value.length < maxTags) {
      e.preventDefault();
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  return (
    <div>
      <Input
        name={name}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Add a tag and press Enter"
        className="w-full p-2 border rounded"
        disabled={value.length >= maxTags}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    
      <div className="flex flex-wrap gap-2 mb-2 pt-2">
        {value.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-blue-800 hover:text-blue-900"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTags;
