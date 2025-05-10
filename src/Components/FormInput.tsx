import React from "react";

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  options?: { label: string; value: string }[];
}

const FormInput: React.FC<FormInputProps> = ({ label, type, id, options }) => {
  if (type === "checkbox") {
    return (
      <div className="flex w-full gap-x-2 items-center mt-3 ml-0.5">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
        <input
          id={id}
          type="checkbox"
          className="bg-bg2 border-1 rounded mt-1"
        />
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="flex flex-col mt-2">
        <div className="flex w-full text-left ml-0.5">
          <label htmlFor={id} className="text-m">
            {label}
          </label>
        </div>
        <select
          id={id}
          className="flex items-center w-64 h-8 bg-bg2 border-1 border rounded outline-none px-2 text-sm"
        >
          {options?.map((option, index) => (
            <option key={`${index}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div className="mt-2">
        <div className="flex w-full text-left ml-0.5">
          <label htmlFor={id} className="text-m">
            {label}
          </label>
        </div>
        <textarea
          id={id}
          className="w-64 h-16 bg-bg2 border-1 border rounded outline-none p-2 text-sm resize-none"
        />
      </div>
    );
  } else {
    return (
      <div className="mt-2">
        <div className="flex w-full text-left ml-0.5">
          <label htmlFor={id} className="text-m">
            {label}
          </label>
        </div>
        <input
          id={id}
          type={type}
          className="w-64 h-8 bg-bg2 border-1 border rounded outline-none p-2 text-sm"
        />
      </div>
    );
  }
};

export default FormInput;
