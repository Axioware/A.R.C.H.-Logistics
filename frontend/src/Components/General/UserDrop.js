import React, { useState } from "react";
import "../../Assets/CSS/user.css"; // Ensure you have the CSS file
// import axios from "axios"; // Import Axios for API call
import Avatar from "../../Assets/Images/User/avatar.jpg"
import Profile from "../../Assets/Images/User/user.png"
import Settings from "../../Assets/Images/User/settings.png"
import Logout from "../../Assets/Images/User/log-out.png"
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({username, id}) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies (if used) are sent
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/login"); // Always navigate to login
    }
  };

  const menuToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="action">
      {/* Profile Image Clickable */}
      <div className="profile" onClick={menuToggle}>
        <img src={Profile} alt="User Avatar" />
      </div>

      {/* Dropdown Menu */}
      <div className={`menu ${isActive ? "active" : ""}`}>
        <h3>
          {username ? username : "Someone Famous"}
        </h3>
        <ul>
          <li>
            <img src={Profile} alt="User Icon" />
            <a href="#">My profile</a>
          </li>
          
          
          {/* <li>
            <img src={Settings} alt="Settings Icon" />
            <a href="#">Settings</a>
          </li> */}
          {/* <li>
            <img src="./assets/icons/question.png" alt="Help Icon" />
            <a href="#">Help</a>
          </li> */}
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <img src={Logout} alt="Logout Icon" />
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;
