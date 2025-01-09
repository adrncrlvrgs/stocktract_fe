import React, { useState } from "react";
import Input from "../Input";

const AvatarUpload = ({
  name,
  initialImage = "",
  size = "w-24 h-24",
  className = "",
}) => {
  const [image, setImage] = useState(initialImage);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  return (
    <div
      className={`relative flex items-center justify-center ${size} ${className}`}
    >
      <div
        className={`w-full h-full rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 transition-all duration-300`}
      >
        {image ? (
          <img
            src={image}
            alt="Avatar Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-sm">Upload Photo</span>
        )}
      </div>

      {image && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
          style={{ transform: "translate(25%, -25%)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <Input
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default AvatarUpload;
