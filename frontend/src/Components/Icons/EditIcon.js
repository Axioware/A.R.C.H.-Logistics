import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import stat from "../../Assets/Images/icons8-edit-30.png";
import dyn from "../../Assets/Images/icons8-edit-unscreen.gif";

const EditIcon = ({ path }) => {
  const [hovered, setHovered] = useState(false);
  const [first, setFirst] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleClick = () => {
    navigate(`/${path}`); // Navigate with query params
  };

  return (
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
        alignSelf: "right",
        alignItems: "right",
        width: "30px",
        height: "30px",
        cursor: "pointer",
      }}
    />
  );
};

export default EditIcon;
