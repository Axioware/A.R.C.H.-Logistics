import React, { useState, useEffect } from "react";
<<<<<<< HEAD
// import PropTypes from "prop-types";
=======
import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
>>>>>>> 3218bf829ba4d2acf0bae22578f292aaade5a95b
import MenuItem from "../General/MenuItem";
import UserDrop from "./UserDrop";

const NavBarWithSidebar = ({
  background_color = [235, 232, 232],
  text_color = [0, 0, 0],
  menuItems,
  toggle,
  logo,
  routes,
  company_name,
  company_name_color = [0, 0, 0],
  username,
  icons,
  names,
  sidebar_background_color = [26, 24, 24],
  sidebar_text_color = [235, 232, 232],
  selected_color = [235, 232, 232],
  hover_color = [235, 232, 232],
  // expanded = ['User Management'],
  // isSidebarOpen_p,
  toggleSidebar_func,
  sidebar_width,
  sidebar_height,
  hamburger_color = [0, 0, 0],
}) => {

  // const [isSidebarOpen, setIsSidebarOpen] = useState(isSidebarOpen_p);
   const navigate = useNavigate();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedSidebarState = localStorage.getItem("isSidebarOpen");
    return savedSidebarState;
  });



  const [expandedStates, setExpandedStates] = useState(() => {
    const savedExpandedStates = localStorage.getItem("expandedStates");
    return savedExpandedStates !== null ? JSON.parse(savedExpandedStates) : null;
  });

  const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
    const savedSelectedMenuItem = localStorage.getItem("selectedSubItem");
    return savedSelectedMenuItem;
  });

  // const toggleExpand = (index) => {
  //   if (expandedStates) {
  //   setExpandedStates((prev) =>
  //     prev.map((value, i) => (i === index ? !value : value))
  //   );
  // }};

  useEffect(() => {
    // Simulating an async data fetch
    console.log('hello world' + menuItems);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    toggleSidebar_func();
  };

  const selectedMenuItemChange = (text, route) => {
    // console.log('d' + selectedMenuItem);
    setSelectedMenuItem(text);
    localStorage.setItem("selectedMenuItem", text);
    navigate(routes);
    // func(Item); // Update parent's selected sub-item state
  };

  return (
    <>
      {/* Internal CSS */}
      <style>
        {`
          .TopSideNavBar-nav-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 30px;
            background-color: rgb(${background_color.join(",")});
            text-color: rgb(${text_color.join(",")});
          }
            /* Ensure fixed position for smaller screen widths */
@media (max-width: 1700px) {
  .TopSideNavBar-hamburger {
    top: 10px; /* Keep the same top position */
    left: 30px; /* Maintain the left position for consistency */
  }
}
  @media (min-width: 1700px) {
  .TopSideNavBar-hamburger {
    top: 10px; /* Maintain the same vertical alignment */
    left: 50px; /* Adjust left position for wider screens */
  }
}

@media (max-width: 1200px) {
  .TopSideNavBar-hamburger {
    top: 10px; /* Ensure it remains aligned */
    left: 30px; /* Adjust if necessary for tighter spaces */
  }
}

@media (max-width: 768px) {
  .TopSideNavBar-hamburger {
    top: 10px; /* Align for smaller viewports */
    left: 30px; /* Adjust only if there's overlap or misalignment */
  }
}

/* Parent navbar to ensure relative positioning for hamburger */
.TopSideNavBar-nav-bar {
  position: relative; /* Parent container for absolute positioning */
  display: flex;
   width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  background-color: rgb(${background_color.join(",")});
  text-color: rgb(${text_color.join(",")});
}
          .TopSideNavBar-center-container {
            flex-grow: 1;
            display: flex;
            justify-content: center;
           
          }
          .TopSideNavBar-company-name {
            margin: 0;
            text-color: rgb(${company_name_color.join(",")});
            font-size: 23px;
            font-weight: 500;
          }
          .TopSideNavBar-hamburger {
            cursor: pointer;
            width: 25px;
            height: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-color: rgb(${hamburger_color.join(",")});
          }
          .TopSideNavBar-hamburger.open {
              transform: translateX(250px); /* Moves the hamburger icon to the right by the sidebar width */
              transition: transform 0.35s ease, opacity 0.3s ease;
          }
          .TopSideNavBar-hamburger-line {
            width: 100%;
            height: 3px;
            background-color: rgb(${hamburger_color.join(",")});
            transition: transform 0.35s ease, opacity 0.3s ease;
          }
          .TopSideNavBar-hamburger-line line1,
          .TopSideNavBar-hamburger-line line2,
          .TopSideNavBar-hamburger-line line3 {
              transform: none;
              opacity: 1;
            }
          .TopSideNavBar-sidebar {
            width: ${isSidebarOpen ? sidebar_width : "0"};
<<<<<<< HEAD
            height: ${sidebar_height || "100vh"};
=======
            height: ${sidebar_height};
>>>>>>> 3218bf829ba4d2acf0bae22578f292aaade5a95b
            background-color: rgb(${sidebar_background_color.join(",")});
            position: fixed;
            height: 100%;
            top: 0;
            left: 0;
            overflow-x: hidden;
            z-index: 100;
            transition: width 0.35s ease;
            // padding: ${isSidebarOpen ? "2% 2%" : "0"};
            box-shadow: ${isSidebarOpen
              ? "2px 0 10px rgba(0, 0, 0, 0.1)"
              : "none"};
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .TopSideNavBar-logo img {
            width: ${isSidebarOpen ? "80%" : "0"};
            height: auto;
            transition: width 0.35s ease;
            padding: ${isSidebarOpen ? "2% 2%" : "0"};
            margin-bottom: ${isSidebarOpen ? "50%" : "0"};
          }

        `}
      </style>

      {/* TopNavBar */}
      <nav className="TopSideNavBar-nav-bar">
        <div
          className={`TopSideNavBar-hamburger ${
            isSidebarOpen ? "open" : ""
          }`}
          onClick={toggleSidebar}
        >
          <div className="TopSideNavBar-hamburger-line line1"></div>
          <div className="TopSideNavBar-hamburger-line line2"></div>
          <div className="TopSideNavBar-hamburger-line line3"></div>
        </div>
        <div className="TopSideNavBar-center-container">
          <h1 className="TopSideNavBar-company-name">{company_name}</h1>
        </div>
        <UserDrop userName={username} />
      </nav>

      

      {/* Sidebar */}
      <div className="TopSideNavBar-sidebar">
        <div className="TopSideNavBar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div
          style={{
            // display: 'flex',
            // flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center', /* Align buttons horizontally */
            alignItems: 'center', /* Align buttons vertically */
            gap: '10px',
            flexDirection: 'column',
            // alignItems: 'center',
            position: 'relative',
            width: '100%' // Centers content horizontally
          }}
          >

          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              icon={menuItem.icon}
              text={menuItem.name}
              routes={menuItem.route}
              expanded={menuItem.expanded}
              text_color={sidebar_text_color}
              sub_items={menuItem.subItems}
              selected_color={selected_color}
              hover_color={hover_color}
              background_color={sidebar_background_color}
              onToggle={toggle}
              func={selectedMenuItemChange}
              selectedSubItem={selectedMenuItem}
            />
          ))}
        </div>
        <div className="TopSideNavBar-user-section">
          {isSidebarOpen && <p>{username}</p>}
        </div>
      </div>
    </>
  );
};

export default NavBarWithSidebar;
