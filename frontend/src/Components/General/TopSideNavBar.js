import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MenuItem from "../General/MenuItem"; // Correct import path
import UserDrop from "./UserDrop";

const NavBarWithSidebar = ({
    background_color,
    text_color,
    logo,
    company_name,
    company_name_color,
    username,
    username_color,
    icons,
    names,
    sidebar_background_color,
    sidebar_text_color,
    selected_color,
    hover_color,
    expanded,
    sidebar_width,
    sidebar_height,
    hamburger_color, // Added prop
  }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [expandedStates, setExpandedStates] = useState(expanded);
    
    // Reference for sidebar to detect clicks outside
    const sidebarRef = useRef(null);
  
    // Toggle the expansion of submenu items
    const toggleExpand = (index) => {
      setExpandedStates((prev) =>
        prev.map((value, i) => (i === index ? !value : value))
      );
    };
  
    // Toggle the sidebar open and close
    const toggleSidebar = () => {
      setIsSidebarOpen((prev) => !prev);
    };
  
    // Close sidebar when clicked outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsSidebarOpen(false); // Close sidebar
        }
      };
  
      if (isSidebarOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isSidebarOpen]);
  
    return (
      <>
        {/* Internal CSS */}
        <style>
          {`
          
            .top-nav-bar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 10px 30px;
              background-color: rgb(${background_color.join(",")});
              color: rgb(${text_color.join(",")});
            }
            .center-container {
              flex-grow: 1;
              display: flex;
              justify-content: center;
            }
            .company-name {
              margin: 0;
              color: rgb(${company_name_color.join(",")});
              font-size: 23px;
              font-weight: 500;
            }
            .hamburger {
              cursor: pointer;
              width: 25px;
              height: 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .hamburger-line {
              width: 100%;
              height: 3px;
              background-color: rgb(${hamburger_color.join(",")}); /* Changed to dynamic color */
              transition: transform 0.3s ease, opacity 0.3s ease;
            }
            .hamburger.open .line1 {
              transform: rotate(45deg) translate(5px, 5px);
            }
            .hamburger.open .line2 {
              opacity: 0;
            }
            .hamburger.open .line3 {
              transform: rotate(-45deg) translate(5px, -5px);
            }
            .sidebar {
              width: ${isSidebarOpen ? sidebar_width : "0"};
              height: ${sidebar_height};
              background-color: rgb(${sidebar_background_color.join(",")});
              position: fixed;
              top: 0;
              left: 0;
              overflow-x: hidden;
              z-index: 100;
              transition: width 0.3s ease;
              padding: ${isSidebarOpen ? "2% 2%" : "0"};
              box-shadow: ${isSidebarOpen ? "2px 0 10px rgba(0, 0, 0, 0.1)" : "none"};
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .logo img {
              width: ${isSidebarOpen ? "80%" : "0"};
              height: auto;
              transition: width 0.25s ease;
              margin-bottom: ${isSidebarOpen ? "50%" : "0"};
            }
            .user-section {
              position: absolute;
              bottom: 2%;
              width: 100%;
              text-align: center;
              color: rgb(${sidebar_text_color.join(",")});
            }
            

            .hamburger {
  cursor: pointer;
  width: 25px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  left: 20px; /* Initial position */
  transition: transform 0.3s ease, left 0.3s ease; /* Smooth transition for left position */
}

.hamburger.open {
  transform: translateX(250px); /* Moves the hamburger icon to the right by the sidebar width */
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background-color: rgb(${hamburger_color.join(",")}); /* Dynamic color */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.open .line1,
.hamburger.open .line2,
.hamburger.open .line3 {
  /* Keep the lines straight and do not apply any transformation */
  transform: none;
  opacity: 1;
}


          

          `}
        </style>
  
        {/* TopNavBar */}
        <nav className="top-nav-bar">
          <div
            className={`hamburger ${isSidebarOpen ? "open" : ""}`}
            onClick={toggleSidebar}
          >
            <div className="hamburger-line line1"></div>
            <div className="hamburger-line line2"></div>
            <div className="hamburger-line line3"></div>
          </div>
          <div className="center-container">
            <h1 className="company-name">{company_name}</h1>
          </div>
          <UserDrop userName={username} />
        </nav>
  
        {/* Sidebar */}
        <div className="sidebar" ref={sidebarRef}>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          {/* Close button inside sidebar */}
          {isSidebarOpen && (
            <div className="close-btn" onClick={() => setIsSidebarOpen(false)}>
              &#10005;
            </div>
          )}
          <div>
            {names.map((menuItems, index) => (
              <MenuItem
                key={index}
                icon={icons[index]}
                text={menuItems[0]}
                expanded={expandedStates[index]}
                text_color={sidebar_text_color}
                sub_items={menuItems.slice(1)}
                selected_color={selected_color}
                hover_color={hover_color}
                onToggle={() => toggleExpand(index)}
              />
            ))}
          </div>
          <div className="user-section">{isSidebarOpen && <p>{username}</p>}</div>
        </div>
      </>
    );
  };
  

NavBarWithSidebar.propTypes = {
  // TopNavBar Props
  background_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  text_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  logo: PropTypes.string.isRequired,
  company_name: PropTypes.string.isRequired,
  company_name_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  username: PropTypes.string.isRequired,
  username_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  // NavBarSidebar Props
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,
  names: PropTypes.arrayOf(PropTypes.array).isRequired,
  sidebar_background_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  sidebar_text_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  selected_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  hover_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  expanded: PropTypes.arrayOf(PropTypes.bool).isRequired,
  sidebar_width: PropTypes.string.isRequired,
  sidebar_height: PropTypes.string.isRequired,
  // New prop for hamburger color
  hamburger_color: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default NavBarWithSidebar;
