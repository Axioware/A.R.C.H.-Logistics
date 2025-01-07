import React from 'react';

const GeneralDropdown = ({
  label,
  options = [],
  name,
  hint,
  func = () => {}, // Default no-op function
  width,
  height,
  id,
  label_position = 'top',
}) => {
  const styles = `
    .dropdown-container {
      display: flex;
      flex-direction: ${label_position === 'left' ? 'row' : 'column'};
      align-items: ${label_position === 'left' ? 'center' : 'flex-start'};
      width: 100%;
      gap: 8px;
      margin-bottom: 16px;
    }
    .dropdown-label {
      font-weight: light;
      text-align: ${label_position === 'left' ? 'right' : 'left'};
      white-space: ${label_position === 'left' ? 'nowrap' : 'normal'};
      min-width: ${label_position === 'left' ? '20%' : 'auto'};
    }
    .dropdown-select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 12px; /* Same as GeneralField */
      box-sizing: border-box;
      width: ${width || '100%'};
      height: ${height || '45px'};
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .dropdown-select:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
    }
  `;

  return (
    <div className="dropdown-container">
      <style>{styles}</style>
      {label && <label htmlFor={id} className="dropdown-label">{label}</label>}
      <select
        id={id}
        name={name}
        className="dropdown-select"
        onChange={(e) => func(e.target.value)}
        placeholder={hint}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GeneralDropdown;
