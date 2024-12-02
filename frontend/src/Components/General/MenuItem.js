import React, { useState } from "react";

const MenuItem = ({
  icon,
  text,
  expanded,
  sub_items,
  selected_color,
  text_color,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) onToggle();
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
            border: none;
            border-radius: 8px;
            background-color: transparent;
            cursor: pointer;
            width: 100%;
            color: rgb(${text_color.join(",")});
          }

          .menu-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }

          .menu-item-expanded {
            transform: rotate(180deg);
            transition: transform 0.3s ease;
          }

          .submenu {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          .submenu-item {
            padding: 10px 20px;
            background-color: #2a4d6b;
            color: white;
            border-radius: 8px;
            margin-top: 5px;
            cursor: pointer;
          }

          .submenu-item:hover {
            background-color: #1e3d59;
          }
        `}
      </style>

      {/* Main Menu Item */}
      <button className="menu-item" onClick={handleToggle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={icon} alt="Menu Icon" style={{ width: "20px" }} />
          <span>{text}</span>
        </div>
        {sub_items && (
          <span className={isExpanded ? "menu-item-expanded" : ""}>▼</span>
        )}
      </button>

      {/* Submenu Items */}
      {isExpanded && sub_items && (
        <ul className="submenu">
          {sub_items.map((subItem, idx) => (
            <li key={idx} className="submenu-item">
              {subItem}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MenuItem;
