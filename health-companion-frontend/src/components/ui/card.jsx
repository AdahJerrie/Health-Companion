// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-4 sm:p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}
