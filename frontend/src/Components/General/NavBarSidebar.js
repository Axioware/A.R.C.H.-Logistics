import React, { useState } from "react";
import MenuItem from "./MenuItem";

const NavBarSidebar = ({
  icons,
  names,
  expanded,
  background_color,
  text_color,
  logo,
  username,
  selected_color,
  toggle,
  width,
  height,
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
          /* Sidebar Container */
          .sidebar {
            width: ${toggle ? "13%" : "10%"};
            height: 100vh;
            background-color: rgb(${background_color.join(",")});
            transition: width 0.25s ease, background-color 0.25s ease;
            position: fixed;
            top: 0;
            left: 0;
            overflow: hidden;
            z-index: 100;
            padding: 5% 2%;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          /* Logo */
          .logo {
            margin-bottom: 15%; /* Adjust space between logo and menu */
            transition: margin-bottom 0.25s ease;
          }

          .logo img {
            width: ${toggle ? "80%" : "40%"};
            height: auto;
            transition: width 0.25s ease, opacity 0.25s ease;
          }

          /* User Section at the Bottom */
          .user-section {
            position: absolute;
            bottom: 5%;
            width: 100%;
            text-align: center;
            color: rgb(${text_color.join(",")});
            font-size: 0.9rem;
            font-family: 'Arial', sans-serif;
          }

          .user-section p {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 1rem;
          }

          /* Menu Item Styling */
          .menu-item {
            width: 100%;
            padding: 3% 5%;
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 1rem; /* Use rem for text scaling */
            font-family: 'Arial', sans-serif;
            color: rgb(${text_color.join(",")});
            border-radius: 8px;
            transition: background-color 0.2s ease, color 0.2s ease;
          }

          /* Menu Item Hover Effect */
          .menu-item:hover {
            background-color: rgba(${selected_color.join(",")}, 0.1);
            color: rgb(${selected_color.join(",")});
          }

          /* Menu Item Icon (Arrow) */
          .menu-item .icon {
            margin-left: auto;
            margin-right: ${toggle ? "5%" : "0"};
            font-size: ${toggle ? "1.5rem" : "1.2rem"};
            transition: margin-right 0.25s ease, font-size 0.25s ease;
          }

          /* Arrow Rotation on Expand */
          .menu-item.expanded .icon {
            transform: rotate(90deg);
            transition: transform 0.25s ease;
          }

          /* Expand/Collapse Animation for Sub-Menu */
          .sub-items {
            padding-left: 5%;
            padding-top: 5%;
            padding-bottom: 5%;
            display: ${expandedStates ? "block" : "none"};
            max-height: ${expandedStates ? "50vh" : "0"};
            opacity: ${expandedStates ? 1 : 0};
            transition: max-height 0.25s ease, opacity 0.25s ease;
          }

          .sub-items .sub-item {
            padding: 4% 0;
            font-size: 1rem;
            color: rgb(${text_color.join(",")});
            transition: background-color 0.2s ease;
          }

          .sub-items .sub-item:hover {
            background-color: rgba(${selected_color.join(",")}, 0.15);
          }

          /* Toggle Button for Collapsing/Expanding Sidebar */
          .toggle-btn {
            display: ${toggle ? "none" : "block"};
            position: absolute;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(${text_color.join(",")}, 0.8);
            border: none;
            border-radius: 5px;
            padding: 4%;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }

          .toggle-btn:hover {
            background-color: rgba(${text_color.join(",")}, 1);
          }

          /* Active Menu Item */
          .menu-item.active {
            background-color: rgba(${selected_color.join(",")}, 0.3);
            color: rgb(${selected_color.join(",")});
            font-weight: bold;
            transition: background-color 0.2s ease, color 0.2s ease;
          }
        `}
      </style>

      <div className="sidebar">
        {/* Sidebar Logo */}
        <div className="logo">
          <img src={logo} alt={`${logo} Logo`} />
        </div>

        {/* Menu Items */}
        <div>
          {names.map((menuItems, index) => (
            <MenuItem
              key={index}
              icon={icons[index]}
              text={menuItems[0]}
              expanded={expandedStates[index]}
              text_color={text_color}
              sub_items={menuItems.slice(1)}
              selected_color={selected_color}
              onToggle={() => toggleExpand(index)}
            />
          ))}
        </div>

        {/* User Section */}
        <div className="user-section">
          {toggle && (
            <div>
              <p style={{ fontWeight: "bold" }}>{username}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBarSidebar;
