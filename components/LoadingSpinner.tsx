import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Cargando...", 
  size = "md",
  className = ""
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className={`flex min-h-[50dvh] items-center justify-center ${className}`}>
      <div className="text-gray-600">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-gray-900 mx-auto mb-4`}>
        </div>
        {message}
      </div>
    </div>
  );
};

export default LoadingSpinner; 