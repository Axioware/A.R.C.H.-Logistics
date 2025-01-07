import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import MenuItem from "../General/MenuItem";
import UserDrop from "./UserDrop";

const NavBarWithSidebar = ({
  background_color = [235, 232, 232],
  text_color = [0, 0, 0],
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
  expanded = ['User Management'],
  isSidebarOpen_p,
  toggleSidebar_func,
  sidebar_width,
  sidebar_height,
  hamburger_color = [0, 0, 0],
}) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(isSidebarOpen_p);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
  //   const savedSidebarState = localStorage.getItem("isSidebarOpen");
  //   return savedSidebarState !== null ? JSON.parse(savedSidebarState) : isSidebarOpen_p;
  // });



  const [expandedStates, setExpandedStates] = useState(() => {
    const savedExpandedStates = localStorage.getItem("expandedStates");
    return savedExpandedStates ? JSON.parse(savedExpandedStates) : expanded;
  });

  const [selectedSubItem, setSelectedSubItem] = useState(() => {
    const savedSelectedSubItem = localStorage.getItem("selectedSubItem");
    return savedSelectedSubItem ? JSON.parse(savedSelectedSubItem) : null;
  });

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
    localStorage.setItem("expandedStates", JSON.stringify(expandedStates));
    localStorage.setItem("selectedSubItem", JSON.stringify(selectedSubItem));
  }, [isSidebarOpen, expandedStates, selectedSubItem]);

  const toggleExpand = (index) => {
    if (expandedStates) {
    setExpandedStates((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    toggleSidebar_func();
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
            // height: ${sidebar_height};
            background-color: rgb(${sidebar_background_color.join(",")});
            position: fixed;
            height: 100%;
            top: 0;
            left: 0;
            overflow-x: hidden;
            z-index: 100;
            transition: width 0.35s ease;
            padding: ${isSidebarOpen ? "2% 2%" : "0"};
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
  margin-bottom: ${isSidebarOpen ? "50%" : "0"};
}

/* Adjust logo for smaller screens */
@media (max-width: 1200px) {
  .TopSideNavBar-logo img {
    width: ${isSidebarOpen ? "70%" : "0"}; /* Slightly reduce width */
    margin-bottom: ${isSidebarOpen ? "30%" : "0"}; /* Adjust spacing */
  }
}

@media (max-width: 768px) {
  .TopSideNavBar-logo img {
    width: ${isSidebarOpen ? "60%" : "0"}; /* Reduce width further */
    margin-bottom: ${isSidebarOpen ? "20%" : "0"}; /* Adjust for smaller viewports */
  }
    /* Media Query for very large screens (above 1900px) */
@media (min-width: 1900px) {
  .TopSideNavBar-hamburger {
    top: 10px; /* Keep the vertical positioning same */
    left: 60px; /* Ensure it stays at the same position on very large screens */
    opacity: 1; /* Ensure hamburger remains visible */
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
        <div>
          {names.map((menuItems, index) => (
            <MenuItem
              key={index}
              icon={icons[index]}
              text={menuItems[0]}
              routes={routes[index]}
              expanded={expandedStates[index]}
              text_color={sidebar_text_color}
              sub_items={menuItems.slice(1)}
              selected_color={selected_color}
              hover_color={hover_color}
              background_color={sidebar_background_color}
              onToggle={() => toggleExpand(index)}
              func={setSelectedSubItem}
              selectedSubItem={selectedSubItem}
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
