import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx"; // Importando clsx
import { FormikProps } from "formik";
import { HomeFormValues } from "@/pages/Home";

export type Option = {
  text: string;
  value: string;
  selected?: boolean;
};

interface Props {
  id: string;
  placeholder: string;
  label?: string;
  type: "text" | "email" | "number" | "select";
  options?: Option[];
  selectCallback?: (selected: string) => void;
  formik?: FormikProps<HomeFormValues>;
}

const Input: React.FC<Props> = ({
  id,
  placeholder,
  label,
  type,
  options,
  selectCallback,
  formik,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(
    options?.find((o) => o.selected)?.text || ""
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSelect(option: Option) {
    setIsOpen(false);
    setSelected(option.text);
    selectCallback?.(option.value);
    formik?.setFieldValue(id, option.value);
  }

  return (
    <div className="min-w-48">
      {label && label.length > 0 && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      {type !== "select" && (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
            "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          )}
        />
      )}

      {type === "select" && options && (
        <div
          ref={selectRef}
          className="relative inline-block w-full text-gray-700"
        >
          <div
            className={clsx(
              "flex items-center justify-between bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 cursor-pointer"
            )}
            onClick={() => setIsOpen(!isOpen)}
            data-testid={id}
          >
            <span className="block">{selected}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          {isOpen && (
            <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
