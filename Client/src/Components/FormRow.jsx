import React from "react";

const FormRow = ({
  type,
  name,
  labelText,
  defaulyValue,
  className,
  labelClass,
  readOnly,
}) => {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {labelText || name}{" "}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaulyValue || ""}
        
        className={className}
        readOnly={readOnly}
      />
      <br /> <br />
    </div>
  );
};

export default FormRow;
