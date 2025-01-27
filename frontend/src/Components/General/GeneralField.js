import React from 'react';

const GeneralField = ({
  label,
  label_position = 'top',
  hint,
  field_type = 'text', // Default to 'text' if no type is passed
  name,
  width,
  height,
  func = () => {}, // Default function: no-op
  id,
  label_id,
  label_text,
  maxLength,
  required = false,
  
}) => {
  const styles = `
    .field-container {
      display: flex;
      flex-direction: ${label_position === 'left' ? 'row' : 'column'};
      align-items: ${label_position === 'left' ? 'center' : 'flex-start'};
      width: 100%;
      gap: 8px;
      margin-bottom: 16px;
    }
    .field-label {
      font-weight: light;
      text-align: ${label_position === 'left' ? 'right' : 'left'};
      white-space: ${label_position === 'left' ? 'nowrap' : 'normal'};
      min-width: ${label_position === 'left' ? '20%' : 'auto'};
    }
    .field-input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 12px; /* Increased border radius for a more professional look */
      box-sizing: border-box;
      width: ${width};
      height: ${height};
      transition: border-color 0.3s, box-shadow 0.3s; /* Optional: Smooth focus effect */
    }
    .field-input:focus {
      border-color: #007bff; /* Change border color on focus */
      outline: none;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.25); /* Subtle shadow for focus */
    }
    .required-asterisk {
      color: red;
    }
    #${label_id}{ color: red; display: none; }
  `;

  return (
    <div className={`field-container ${label_position === 'left' ? 'left' : ''}`}>
      <style>{styles}</style>
      {label && (
        <label htmlFor={name} className="field-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <input
        type={field_type}
        name={name}
        id={id}
        placeholder={hint}
        className={`field-input`} // Apply modified class name for input
        onChange={(e) => func(e.target.value)} // Ensure func is always a function
        maxLength={maxLength} // Set the max length
      />
      <p id={label_id}>{label_text}</p>
    </div>
  );
};

export default GeneralField;
