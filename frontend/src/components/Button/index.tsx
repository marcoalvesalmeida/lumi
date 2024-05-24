import React from "react";
import clsx from "clsx";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "bg-blue-500 hover:bg-blue-600 text-white font-semibold",
        "py-2 px-12 rounded-lg",
        "focus:outline-none focus:ring-2 focus:ring-lumi-yellow focus:ring-opacity-50",
        {
          "disabled:bg-blue-300 disabled:cursor-not-allowed": disabled,
        },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
