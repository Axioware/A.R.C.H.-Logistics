import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import stat from "../../Assets/Images/printer.png";
import dyn from "../../Assets/Images/printer.gif";

const PrintIcon = ({ path, args, hoverText }) => {
  const [hovered, setHovered] = useState(false);
  const [first, setFirst] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleClick = () => {
    const queryParams = new URLSearchParams(args).toString(); // Convert args to query string
    navigate(`${path}?${queryParams}`); // Navigate with query params
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Text displayed on hover */}
      {hovered && hoverText && (
        <div
          style={{
            position: "absolute",
            bottom: "60px", // Position the text below the icon
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "14px",
            whiteSpace: "nowrap",
          }}
        >
          {hoverText}
        </div>
      )}
      
      {/* Edit Icon */}
      <img
        src={hovered ? dyn : stat} // Toggle image on hover
        alt="Edit Icon"
        className="edit-icon"
        onMouseEnter={() => {
          if (!first) setHovered(true); // Trigger hover effect only if not animated yet
        }}
        onMouseLeave={() => {
          if (!first) {
            setHovered(false);
            setFirst(true); // Prevent hover animation from repeating
          }
        }}
        onClick={handleClick} // Handle click for navigation
        style={{
          width: "50px",
          height: "50px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default PrintIcon;
