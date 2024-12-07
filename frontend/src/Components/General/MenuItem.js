import React, { useState } from "react";

const MenuItem = ({
  icon,
  text,
  expanded,
  sub_items,
  routes,
  text_color,
  selected_color,
  hover_color,
  background_color, 
  width,
  height,
  onToggle,
  onSubItemSelect,
  abc,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected main item
  const [selectedSubItem, setSelectedSubItem] = useState(null); // Track selected sub-item

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) onToggle();
  };

  const handleMainItemClick = () => {
    if (selectedItem === text) {
      setSelectedItem(null);
      setSelectedSubItem(null);
    } else {
      setSelectedItem(text);
      setSelectedSubItem(null);
    }
    handleToggle();
  };

  const handleSubItemClick = (subItem, route, idx) => {
    if (selectedSubItem === subItem) {
      setSelectedSubItem(null);
    } else {
      setSelectedItem(text);
      setSelectedSubItem(subItem);
    }

    if (onSubItemSelect) onSubItemSelect(subItem, idx);
    if (route) {
      window.location.href = route;
    }
  };

  return (
    <>
      {/* Internal CSS */}
      <style>
        {`
          .menu-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            padding-left: 30px; /* Add extra padding to prevent icon cutoff */
            border: none;
            border-radius: 8px;
            background-color: rgb(${background_color?.join(",") || "42, 77, 107"});
            cursor: pointer;
            width: ${width || "250px"};
            height: ${height || "50px"};
            color: rgb(${text_color.join(",")});
            transition: background-color 0.3s ease;
            text-align: left;
          }

          .menu-item.selected {
            background-color: rgba(${selected_color.join(",")}, 0.2);
            color: white;
          }

          .submenu {
            list-style-type: none;
            padding: 0;
            margin: 0;
            margin-left: 20px;
          }

          .submenu-item {
            padding: 10px 20px;
            width: 250px;
            height: 50px;
            background-color: rgb(${background_color?.join(",") || "42, 77, 107"});
            color: white;
            border-radius: 8px;
            margin-top: 5px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            text-align: left;
            font-weight: normal; /* Reset weight */
          }

          .submenu-item:hover {
            background-color: rgb(${hover_color || "30, 61, 89"});
          }

          .submenu-item.selected {
            background-color: rgba(${selected_color.join(",")}, 0.2);
            color: white;
          }

          .menu-item .expand-icon {
            margin-left: auto;
            transition: transform 0.3s ease;
          }

          .menu-item-expanded .expand-icon {
            transform: rotate(180deg); /* Rotate 180 degrees when expanded */
          }
        `}
      </style>

      {/* Main Menu Item */}
      <button
        className={`menu-item ${
          selectedItem === text || isExpanded ? "selected menu-item-expanded" : ""
        }`}
        onClick={handleMainItemClick}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={icon} alt="Menu Icon" style={{ width: "20px" }} />
          <span>{text}</span>
        </div>
        {sub_items && <span className="expand-icon">▼</span>}
      </button>

      {/* Submenu Items */}
      {isExpanded && sub_items && (
        <ul className="submenu">
          {sub_items.map((subItem, idx) => (
            <li
              key={idx}
              className={`submenu-item ${
                selectedSubItem === subItem || idx === abc ? "selected bold" : ""
              }`}
              onClick={() => handleSubItemClick(subItem, routes && routes[idx], idx)}
              style={{
                fontWeight: idx === abc ? "bold" : "normal", // Add inline bold style
                backgroundColor: `rgb(${background_color?.join(",") || "42, 77, 107"})`, // Inline background color
              }}
            >
              {subItem}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MenuItem;
