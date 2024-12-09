import React from "react";
import { cn } from "utils/cn";

const defaultIcons = {
  first: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
      />
    </svg>
  ),
  previous: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  ),
  next: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),
  last: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5l7 7-7 7M5 5l7 7-7 7"
      />
    </svg>
  ),
};

export function Pagination({
  children,
  className,
  listClassName,
  size = "md",
  tag: Tag = "nav",
  listTag: ListTag = "ul",
  ariaLabel = "pagination",
  ...props
}) {
  return (
    <Tag
      aria-label={ariaLabel}
      className={cn("flex justify-center", className)}
      {...props}
    >
      <ListTag
        className={cn(
          "inline-flex items-center border rounded divide-x",
          listClassName
        )}
      >
        {children}
      </ListTag>
    </Tag>
  );
}

export function PaginationItem({
  active = false,
  disabled = false,
  className,
  children,
  tag: Tag = "li",
  ...props
}) {
  return (
    <Tag
      className={cn(
        "flex items-center justify-center w-10 h-10 cursor-pointer",
        active && "bg-blue-100 text-blue-600 font-bold",
        disabled && "opacity-50 cursor-not-allowed",
        !active && !disabled && "hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function PaginationLink({
  className,
  next = false,
  previous = false,
  first = false,
  last = false,
  children,
  tag: Tag = "a",
  ...props
}) {
  const getIcon = () => {
    if (first) return defaultIcons.first;
    if (previous) return defaultIcons.previous;
    if (next) return defaultIcons.next;
    if (last) return defaultIcons.last;
    return children;
  };

  const extraClasses = first
    ? "rounded-l-md bg-white"
    : last
    ? "rounded-r-md bg-white"
    : "bg-white";

  return (
    <Tag
      className={cn(
        "text-blue-600 flex items-center justify-center w-10 h-10",
        extraClasses,
        className
      )}
      {...props}
    >
      {getIcon()}
    </Tag>
  );
}
