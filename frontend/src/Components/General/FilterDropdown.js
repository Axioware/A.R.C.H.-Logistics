import React, { useState } from 'react';
import styled from 'styled-components';
import COLORS from "../../Assets/JS/Color";

const StyledDropdown = styled.div`
  position: relative;
  width: fit-content;
  margin-top:10px;

  .dropdown-toggle {
    cursor: pointer;
    padding: 10px;
    background-color: rgb(${props => props.backgroundColor});
    color: rgb(${props => props.textColor});
    border-radius: ${props => props.borderRadius};
    width: ${props => props.width[0]};
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
      background-color: rgb(${props => props.hoverColor});
    }

    svg {
      transition: transform 0.3s;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0 0 5px 5px;
    display: none;
    flex-direction: column;
    z-index: 1000;
    background-color: #fff;

    &.show {
      display: flex;
    }

    button {
      padding: 10px;
      text-align: left;
      width: 100%;
      border: none;
      background: none;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &.selected {
        background-color: rgb(${props => props.selectedColor});
      }
    }
  }
`;

const FilterDropdown = ({
  text,
  text_color,
  selected=[],
  background_color = COLORS.PRIMARY_BLUE,
  hover_color = COLORS.WHITE,
  selected_color = COLORS.PRIMARY_BLUE,
  func,
  radio,
  border_radius,
  width,
  height
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(selected);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    if (radio) {
      setSelectedOptions([option]);
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
      
    }
    func(option); // Callback function when an option is selected
    if (radio) setShowDropdown(false); // Close dropdown if radio is true
  };

  // Displaying the selected options as text on the dropdown button
  const displayText = selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select Options';

  return (
    <StyledDropdown
      textColor={text_color.join(',')}
      backgroundColor={background_color.join(',')}
      hoverColor={hover_color.join(',')}
      selectedColor={selected_color.join(',')}
      borderRadius={border_radius}
      width={width}
      height={height}
    >
      <button className="dropdown-toggle" onClick={handleToggleDropdown}>
        {displayText}
        <svg viewBox="0 0 20 20" width="20" height="20">
          <path fill="currentColor" d="M5 8l5 5 5-5H5z" />
        </svg>
      </button>
      <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
        {text.map((option, index) => (
          <button
            key={index}
            className={`button ${selectedOptions.includes(option) ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </StyledDropdown>
  );
};

export default FilterDropdown;
