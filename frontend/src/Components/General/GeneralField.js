import React from 'react';

const GeneralField = ({
  label,
  label_position = 'top',
  hint,
  field_type = 'text', // Default to 'text' if no type is passed
  name,
  value,
  width = '100%', // Default width to 100% for responsiveness
  height = 'auto', // Default height to auto
  func = () => {}, // Default function: no-op
  id,
  label_id,
  label_text,
  maxLength, // New prop for max length
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
      gap: 8px;
    }

    .field-input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-sizing: border-box;
      width: ${width};
      height: ${height};
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    .field-input:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
    }

    .field-input.required {
      border-color: red;
    }

    .field-label.required::after {
      content: '*';
      color: red;
      margin-left: 4px;
    }

    #${label_id} {
      color: red;
      display: none;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .field-container {
        flex-direction: column;
        align-items: flex-start;
      }

      .field-label {
        text-align: left;
        min-width: auto;
      }

      .field-input {
        width: 100%; /* Full width on smaller screens */
      }
    }

    @media (max-width: 480px) {
      .field-input {
        padding: 6px; /* Smaller padding for very small screens */
        font-size: 0.9em; /* Smaller font size for better fit */
      }
    }
  `;

  return (
    <div className={`field-container ${label_position === 'left' ? 'left' : ''}`}>
      <style>{styles}</style>
      {label && (
        <label htmlFor={name} className={`field-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <input
        type={field_type}
        name={name}
        id={id}
        value={value}
        placeholder={hint}
        className={`field-input`}
        onChange={(e) => func(e)}
        maxLength={maxLength}
        required={required}
      />
      <p id={label_id}>{label_text}</p>
    </div>
  );
};

export default GeneralField;