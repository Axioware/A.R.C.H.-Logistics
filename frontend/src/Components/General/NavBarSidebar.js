import React, { useState } from "react";
import MenuItem from "../General/MenuItem";  // Corrected import path

const NavBarSidebar = ({
  icons,
  names,
  expanded,
  background_color,
  text_color,
  logo,
  username,
  selected_color,
  hover_color,  
  toggle,
  width,
  height,
  menuitemindex,
  submenuindex,
}) => {
  const [expandedStates, setExpandedStates] = useState(expanded);

  const toggleExpand = (index) => {
    setExpandedStates((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <>
      {/* Internal CSS */}
      <style>
        {`
          .sidebar {
            width: ${width}; 
            height: ${height}; 
            background-color: rgb(${background_color.join(",")});
            position: fixed;
            top: 0;
            left: 0;
            overflow: hidden;
            z-index: 100;
            padding: 2% 2%;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .logo {
            margin-bottom: 2%;
          }

          .logo img {
            width: ${toggle ? "80%" : "40%"};
            height: auto;
            transition: width 0.25s ease, opacity 0.25s ease;
            margin-bottom: 50%;
            }

          .user-section {
            position: absolute;
            bottom: 2%;
            width: 100%;
            text-align: center;
            color: rgb(${text_color.join(",")});
          }

          .user-section p {
            font-weight: bold;
            font-size: 1rem;
          }

          .toggle-btn {
            display: ${toggle ? "none" : "block"};
          }
        `}
      </style>

      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Menu Items */}
        <div>
        {names.map((menuItems, index) => {
          const flag = index === menuitemindex ? submenuindex : null;
                
          return (
            <MenuItem
              key={index}
              icon={icons[index]}
              text={menuItems[0]}
              expanded={expandedStates[index]}
              text_color={text_color}
              sub_items={menuItems.slice(1)}
              selected_color={selected_color}
              hover_color={hover_color} // Pass hover_color to MenuItem
              onToggle={() => toggleExpand(index)}
              abc={flag}
            />
          );
        })}

        </div>

        {/* User Section */}
        <div className="user-section">
          {toggle && <p>{username}</p>}
        </div>
      </div>
    </>
  );
};

export default NavBarSidebar;
