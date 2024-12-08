import React from 'react';

const GeneralField = ({
  label,
  label_position = 'top',
  hint,
  field_type,
  name,
  width,
  height,
  className_Input = '', // Class name for input
  className_Label = '', // Class name for label
  func,
  id,
  maxLength, // New prop for max length
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
      border-radius: 6px;
      box-sizing: border-box;
      width: ${width};
      height: ${height};
    }
  `;

  return (
    <div className={`field-container ${label_position === 'left' ? 'left' : ''}`}>
      <style>{styles}</style>
      {label && (
        <label htmlFor={name} className={`field-label ${className_Label}`}>
          {label}
        </label>
      )}
      <input
        type={field_type}
        name={name}
        id={id}
        placeholder={hint}
        className={`field-input ${className_Input}`} // Apply modified class name for input
        onChange={(e) => func(e.target.value, id)} 
        maxLength={maxLength} // Set the max length
      />
    </div>
  );
};

export default GeneralField;












