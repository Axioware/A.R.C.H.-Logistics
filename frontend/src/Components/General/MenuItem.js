import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
  selectedSubItem,
  func,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  // const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
  //     const menu = localStorage.getItem("selectedMenuItem");
  //     return menu;
  //   });

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle();
  };

  const handleSubItemClick = (subItem) => {
    func(subItem.name, subItem.routes)
    // console.log('sasaa' + selectedMenuItem);
    // setSelectedMenuItem(subItem.name);
    // localStorage.setItem("selectedMenuItem", subItem.name);
    // navigate(subItem.route);
    // func(subItem); // Update parent's selected sub-item state
  };

  const handleMenuItemClick = () => {
    func(text, routes)
  };

  return (
    <>
      {/* Internal CSS */}
      <style>
        {`
        .menu-item {

          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px; /* Same padding as menu-item */
          border: none;
          border-radius: 8px;
          // background-color: rgb(${background_color.join(",") || "42, 77, 107"});
          cursor: pointer;
          width: 100%; 
          // height: auto; /* Allow auto height for content expansion */
          height: ${height || "50px"};
          color: rgb(${text_color.join(",")});
          transition: background-color 0.3s ease;
          transition: all 0.3s ease;
          text-align: center;
          font-size: 100%;
        }

        .menu-item.selected {
          background-color: rgba(${selected_color.join(",")});
          color: white;
        }

        .submenu {
          list-style-type: none;
          padding: 0;
          margin: 0;
          margin-right: 30px;
          overflow: hidden;
          animation: slideDown 0.6s ease; /* Apply the slide-down animation */
        }


        .submenu.show {
          max-height: 500px; /* Maximum height for the animation (adjust as needed) */
          transition: max-height 0.3s ease; /* Ensure animation timing */
        }

          
        .submenu-item {
          justify-content: center;
          padding: 10px 20px;
          width: 250px;
          height: 50px;
          background-color: rgb(${background_color?.join(",") || "42, 77, 107"});
          color: white;
          border-radius: 8px;
          margin-top: 5px;
          cursor: pointer;
          transition: background-color 0.6s ease;
          text-align: center;
        }
  

        .submenu-item:hover {
          background-color: rgb(${hover_color || "30, 61, 89"});
        }

        .submenu-item.selected {
          background-color: rgba(${selected_color.join(",")}, 0.2);
          color: white;
        }

        .expand-icon {
          margin-left: auto; /* Push the arrow to the far right */
          margin-right: 10px;
          transition: transform 0.3s ease; /* Smooth rotation animation */
        }
                
        .expand-icon.flipped {
          transform: rotate(180deg); /* Rotate the arrow when expanded */
        }

        .menu-item-no-submenu {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px; /* Same padding as menu-item */
          border: none;
          border-radius: 8px;
          background-color: rgb(${background_color.join(",") || "42, 77, 107"});
          cursor: pointer;
          width: 100%; 
          height: ${height || "50px"};
          color: rgb(${text_color.join(",")});
          transition: all 0.3s ease;
          transition: background-color 0.3s ease;
          text-align: center;
          font-size: 100%;
        }

        /* Hover effect for no-submenu item */
        .menu-item-no-submenu:hover {
          background-color: rgb(${hover_color || "30, 61, 89"});
        }
        .menu-item-no-submenu.selected {
          background-color: rgba(${selected_color.join(",")}, 0.2);
          color: white;
        }
          
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px); /* Slide up slightly */
          }
          to {
            opacity: 1;
            transform: translateY(0); /* Slide down to normal position */
          }
        }
        `}
      </style>

      {/* Main Menu Item */}
      {sub_items && sub_items.length > 0 ? (
        <div className="menu-item" style={{ position: "relative" }}>
        <button className={`menu-item ${isExpanded ? "expanded" : ""}`} onClick={handleToggle}>
          <img src={icon} alt="Menu Icon" style={{ width: "10%", display: "block" }} />
          <span>{text}</span>
          <span className={`expand-icon ${isExpanded ? "flipped" : ""}`}>
            ▼ {/* Arrow symbol */}
          </span>
        </button></div>
      ) : (
        <div className="menu-item-no-submenu">
        <button
          className={`menu-item-no-submenu ${selectedSubItem == text ? "selected" : ""}`}
          onClick={() => handleMenuItemClick()}
        >
            <img src={icon} alt="Menu Icon" style={{ width: "10%", display: 'block'}} />
            <span>{text}</span>
        </button>
        </div>
      )}

      {/* Submenu Items */}
      {isExpanded && sub_items && (
        <ul className={`submenu ${isExpanded ? "show" : ""}`}>
        {sub_items.map((subItem, idx) => (
          <li
            key={idx}
            className={`submenu-item ${
              selectedSubItem == subItem.name ? "selected" : ""
            }`}
            onClick={() => handleSubItemClick(subItem)}
          >
            {subItem.name}
          </li>
        ))}
      </ul>
    
      )}
    </>
  );
};

export default MenuItem;
