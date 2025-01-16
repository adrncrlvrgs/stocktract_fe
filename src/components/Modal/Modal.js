import React, { useEffect, useRef } from "react";
import { cn } from "utils/cn";

export const Modal = ({
  isOpen,
  toggle,
  children,
  autoFocus = true, // Focus modal on open
  backdrop = true, // Show backdrop
  backdropClassName = "", // Custom class for backdrop
  fade = true, // Enable/Disable fade animation
  fullscreen = false, // Fullscreen modal
  centered = false, // Vertically center modal
  scrollable = false, // Scrollable body
  unmountOnClose = true, // Unmount when closed
  keyboard = true, // Close on 'Escape' key
  size = "md", // Modal size: sm, md, lg, xl
  modalClassName = "", // Custom class for modal
  onClosed = () => {}, // On close callback
  onOpened = () => {}, // On open callback
  label = "", // aria-labelledby
  returnFocusAfterClose = true, // Return focus after close
  zIndex = "1050", // z-index of modal
  ...props // Allow other props (e.g., custom className)
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (autoFocus) {
        modalRef.current?.focus();
      }
      onOpened();
    } else {
      onClosed();
    }

    const handleKeyDown = (e) => {
      if (keyboard && e.key === "Escape" && isOpen) {
        toggle();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, autoFocus, keyboard, onOpened, onClosed]);

  if (!isOpen && unmountOnClose) return null;

  const modalSizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    fullscreen: "w-full h-full",
  };

  const modalContentClasses = cn(
    "relative bg-white rounded-lg shadow-lg overflow-hidden",
    fullscreen ? "w-full h-full" : "w-full", // Fullscreen or width-based sizing
    modalSizeClasses[size],
    centered ? "flex items-center justify-center" : "",
    scrollable ? "overflow-y-auto max-h-screen" : "",
    modalClassName
  );

  return (
    <div
      className={cn(
        "fixed inset-0 z-50  flex items-center justify-center",
        fade ? "transition-opacity duration-300 ease-in-out" : "",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      style={{ zIndex }}
      {...props} // Spread other props to the container div
    >
      {backdrop && (
        <div
          className={cn("absolute inset-0 bg-black", backdropClassName, {
            "opacity-50": fade,
            "opacity-0": !isOpen,
          })}
          onClick={toggle}
        ></div>
      )}
      <div
        ref={modalRef}
        role="dialog"
        aria-labelledby={label}
        className={modalContentClasses}
        tabIndex="-1"
        {...props} // Spread other props to the modal content
      >
        {children}
      </div>
    </div>
  );
};

// Modal Header Component
export const ModalHeader = ({
  toggle,
  children,
  className = "",
  closeAriaLabel = "Close",
  ...props
}) => (
  <div
    className={cn("flex justify-between items-center p-4 border-b", className)}
    {...props}
  >
    <h5 className="text-xl font-semibold">{children}</h5>
    <button
      onClick={toggle}
      className="text-gray-500 hover:text-red-700"
      aria-label={closeAriaLabel}
    >
      &#x2715;
    </button>
  </div>
);

// Modal Body Component
export const ModalBody = ({ children, className = "", ...props }) => (
  <div className={cn("p-4", className)} {...props}>
    {children}
  </div>
);

// Modal Footer Component
export const ModalFooter = ({ children, className = "", ...props }) => (
  <div
    className={cn("flex justify-end items-center p-4 border-t", className)}
    {...props}
  >
    {children}
  </div>
);
