import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import stat from "../../Assets/Images/dollar-static-black-1.png";
import dyn from "../../Assets/Images/dollar-animated-1.gif";

const DollarIcon = ({ path, tooltipText = "Custom Rates", width = "30px", height= "30px" }) => {
  const [tool, setTool] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [first, setFirst] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleClick = () => {
    navigate(`/${path}`); // Navigate with query params
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Tooltip */}
      {tool && (
        <div
          style={{
            position: "absolute",
            bottom: "35px", // Position tooltip above icon
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "black",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {tooltipText}
        </div>
      )}

      {/* Icon */}
      <img
        src={hovered ? dyn : stat} // Toggle image on hover
        alt="Dollar Icon"
        className="dollar-icon"
        onMouseEnter={() => {
            setTool(true)
          if (!first) setHovered(true); // Trigger hover effect only if not animated yet
        }}
        onMouseLeave={() => {
            setTool(false)
          if (!first) {
            setHovered(false);
            setFirst(true); // Prevent hover animation from repeating
          }
        }}
        onClick={handleClick} // Handle click for navigation
        style={{
          alignSelf: "right",
          alignItems: "right",
          width: {width},
          height: {height},
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default DollarIcon;
