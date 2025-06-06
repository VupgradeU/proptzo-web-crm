"use client";

import { useState } from "react";

// React Icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

export default function FormInput({
  icon: Icon,
  label,
  required = false,
  disabled = false,
  wordLimit,
  type = "text",
  error,
  value,
  onChange,
  ghost = false,
}: {
  icon?: React.ElementType;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  wordLimit?: string;
  type?: string;
  error?: boolean | string;
  value?: string;
  onChange: (value: string) => void;
  ghost?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="w-full flex flex-col items-start justify-start gap-1">
      {!ghost ? (
        <h6 className="text-xs font-semibold line-clamp-1">
          {value ? (
            label
          ) : required ? (
            <span className="text-primary text-[10px]">* Required</span>
          ) : (
            <span className="text-gray-500 text-[10px]">Optional</span>
          )}{" "}
          {wordLimit && (
            <span className="text-gray-500 text-[10px]">
              {typeof wordLimit === "string"
                ? `(Word limit: ${wordLimit})`
                : ""}
            </span>
          )}
        </h6>
      ) : null}
      <div
        className={`w-full p-2 border rounded-md flex items-center justify-start gap-2 transition ease-in duration-300 ${
          disabled && "bg-gray-100 dark:bg-gray-950"
        } ${
          error ? "border-primary" : "border-gray-300 dark:border-white/10 "
        }`}
      >
        {Icon && (
          <Icon
            size={18}
            className={`shrink-0 transition ease-in duration-300 ${
              error ? "text-red-600" : value ? "text-green-600" : ""
            }`}
          />
        )}
        <input
          type={inputType}
          disabled={disabled}
          placeholder={label}
          value={value}
          maxLength={
            type !== "number" && wordLimit ? parseInt(wordLimit) : undefined
          }
          onChange={(e) => {
            let inputValue = e.target.value;
            const limit = wordLimit ? parseInt(wordLimit) : undefined;
            if (type === "number") {
              inputValue = inputValue.replace(/[^0-9]/g, "");
              if (limit) {
                inputValue = inputValue.slice(0, limit);
              }
              onChange(inputValue);
            } else {
              if (limit) {
                inputValue = inputValue.slice(0, limit);
              }
              onChange(inputValue);
            }
          }}
          onKeyDown={(e) => {
            if (
              type === "number" &&
              !/[0-9]/.test(e.key) &&
              e.key !== "Backspace" &&
              e.key !== "Delete" &&
              e.key !== "ArrowLeft" &&
              e.key !== "ArrowRight"
            ) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            const paste = e.clipboardData.getData("text");
            const limit = wordLimit ? parseInt(wordLimit) : undefined;
            if (type === "number") {
              const filteredPaste = paste.replace(/[^0-9]/g, "");
              const allowedPasteLength = limit
                ? limit - (value?.length || 0)
                : undefined;
              if (allowedPasteLength !== undefined) {
                if (allowedPasteLength <= 0) {
                  e.preventDefault();
                  return;
                }
                if (filteredPaste.length > allowedPasteLength) {
                  e.preventDefault();
                  onChange(value + filteredPaste.slice(0, allowedPasteLength));
                  return;
                }
              }
            }
          }}
          spellCheck={false}
          className="w-full outline-none text-sm bg-transparent"
        />
        {isPasswordType &&
          (showPassword ? (
            <FaRegEyeSlash
              size={18}
              onClick={() => setShowPassword(false)}
              className="shrink-0 text-gray-500 cursor-pointer hover:opacity-80 transition-opacity"
            />
          ) : (
            <FaRegEye
              size={18}
              onClick={() => setShowPassword(true)}
              className="shrink-0 text-gray-500 cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        {value && !required && (
          <IoCloseCircle
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="shrink-0 text-gray-500 hover:opacity-80 transition-opacity cursor-pointer"
          />
        )}
      </div>
      {error && (
        <h6 className="text-xs text-primary font-semibold line-clamp-2">
          {typeof error === "string" ? error : ""}
        </h6>
      )}
    </div>
  );
}
