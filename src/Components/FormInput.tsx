import React from "react";

interface FormInputProps {
  label: string;
  type: string;
  id: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, id }) => {
  if (type === "checkbox") {
    return (
      <div className="flex w-full gap-x-2 items-center mt-3 ml-0.5">
        <label htmlFor={id} className="text-sm">
          Are you employed?
        </label>
        <input
          id={id}
          type="checkbox"
          className="bg-bg2 border-1 rounded mt-1"
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
