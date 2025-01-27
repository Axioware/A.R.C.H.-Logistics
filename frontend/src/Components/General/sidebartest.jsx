import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const Sidebar = ({sidebar_state, set_sidebar_state}) => {
  const [isSidebarClosed, setSidebarClosed] = useState(
    sidebar_state === null || sidebar_state === undefined ? true : sidebar_state
  );
  const [openMenus, setOpenMenus] = useState({});

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
    set_sidebar_state(!isSidebarClosed);
  };

  const toggleSubmenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <div className="page-container">
      <div className={`sidebar ${isSidebarClosed ? "close" : ""}`}>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">A.R.C.H. Logistics</span>
        </div>
        <ul className="nav-links">
          <li>
            <a onClick={() => navigate("/dashboard")}>
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">Dashboard</a>
              </li>
            </ul>
          </li>

          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-user"></i>
                <span className="link_name">User</span>
              </a>
            </div>
            <ul className={`sub-menu blank`}>
              <li>
                <a className="link_name" href="#">User</a>
              </li>
            </ul>
          </li>

          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-cabinet"></i>
                <span className="link_name">Inventory</span>
              </a>
            </div>
            <ul className={`sub-menu blank`}>
              <li>
                <a className="link_name" href="#">Inventory</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Orders</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">Orders</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <i className="bx bx-line-chart"></i>
              <span className="link_name">Invoices</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">Invoices</a>
              </li>
            </ul>
          </li>

          <li>
            
              <a href="#">
                <i className="bx bx-plug"></i>
                <span className="link_name">Analytics</span>
              </a>
            <ul className={`sub-menu ${openMenus.plugins ? "showMenu" : ""}`}>
              <li>
                <a className="link_name" href="#">Analytics</a>
              </li>
            </ul>
          </li>

          <li>
            <div className="iocn-link">
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="link_name">Other</span>
            </a>
            <i
                className="bx bxs-chevron-down arrow"
                onClick={() => toggleSubmenu("plugins")}
              ></i>
            </div>
            <ul className="sub-menu ">
              <li>
                <a className="link_name" href="#">Other</a>
              </li>
              <li>
                <a href="#">Locations</a>
              </li>
              <li>
                <a href="#">Warehouses</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
            </ul>
          </li>

          <li>
            <div className="profile-details">
              <div className="profile-content">
                <img src="image/profile.jpg" alt="profileImg" />
              </div>
              <div className="name-job">
                <div className="profile_name">Prem Shahi</div>
                <div className="job">Web Designer</div>
              </div>
              <i className="bx bx-log-out"></i>
            </div>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div className="home-content">
          <i className="bx bx-menu" onClick={toggleSidebar}></i>
          <span className="text">Drop Down Sidebar</span>
        </div>
      </section>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 260px;
          background: #11101d;
          z-index: 100;
          transition: all 0.5s ease;
        }

        .sidebar.close {
          width: 78px;
        }

        .sidebar .logo-details {
          height: 60px;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .sidebar .logo-details i {
          font-size: 30px;
          color: #fff;
          height: 50px;
          min-width: 78px;
          text-align: center;
          line-height: 50px;
        }

        .sidebar .logo-details .logo_name {
          font-size: 18px;
          color: #fff;
          font-weight: 600;
          transition: 0.3s ease;
          transition-delay: 0.1s;
        }

        .sidebar.close .logo-details .logo_name {
          transition-delay: 0s;
          opacity: 0;
          pointer-events: none;
        }

        .sidebar .nav-links {
          height: 100%;
          padding: 30px 0 150px 0;
          overflow: auto;
        }

        .sidebar.close .nav-links {
          overflow: visible;
        }

        .sidebar .nav-links::-webkit-scrollbar {
          display: none;
        }

        .sidebar .nav-links li {
          position: relative;
          list-style: none;
          transition: all 0.4s ease;
        }

        .sidebar .nav-links li:hover {
          background: #1d1b31;
        }

        .sidebar .nav-links li .iocn-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sidebar.close .nav-links li .iocn-link {
          display: block;
        }

        .sidebar .nav-links li i {
          height: 50px;
          min-width: 78px;
          text-align: center;
          line-height: 50px;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sidebar .nav-links li.showMenu i.arrow {
          transform: rotate(-180deg);
        }

        .sidebar.close .nav-links i.arrow {
          display: none;
        }

        .sidebar .nav-links li a {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .sidebar .nav-links li a .link_name {
          font-size: 18px;
          font-weight: 400;
          color: #fff;
          transition: all 0.4s ease;
        }

        .sidebar.close .nav-links li a .link_name {
          opacity: 0;
          pointer-events: none;
        }

        .sidebar .nav-links li .sub-menu {
          padding: 6px 6px 14px 80px;
          margin-top: -10px;
          background: #1d1b31;
          display: none;
        }

        .sidebar .nav-links li.showMenu .sub-menu {
          display: block;
        }

        .sidebar .nav-links li .sub-menu a {
          color: #fff;
          font-size: 15px;
          padding: 5px 0;
          white-space: nowrap;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .sidebar .nav-links li .sub-menu a:hover {
          opacity: 1;
        }

        .sidebar.close .nav-links li .sub-menu {
          position: absolute;
          left: 100%;
          top: -10px;
          margin-top: 0;
          padding: 10px 20px;
          border-radius: 0 6px 6px 0;
          opacity: 0;
          display: block;
          pointer-events: none;
          transition: 0s;
        }

        .sidebar.close .nav-links li:hover .sub-menu {
          top: 0;
          opacity: 1;
          pointer-events: auto;
          transition: all 0.4s ease;
        }

        .sidebar .nav-links li .sub-menu .link_name {
          display: none;
        }

        .sidebar.close .nav-links li .sub-menu .link_name {
          font-size: 18px;
          opacity: 1;
          display: block;
        }

        .sidebar .nav-links li .sub-menu.blank {
          opacity: 1;
          pointer-events: auto;
          padding: 3px 20px 6px 16px;
          opacity: 0;
          pointer-events: none;
        }

        .sidebar .nav-links li:hover .sub-menu.blank {
          top: 50%;
          transform: translateY(-50%);
        }

        .sidebar .profile-details {
          position: fixed;
          bottom: 0;
          width: 260px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #1d1b31;
          padding: 12px 0;
          transition: all 0.5s ease;
        }

        .sidebar.close .profile-details {
          background: none;
        }

        .sidebar.close .profile-details {
          width: 78px;
        }

        .sidebar .profile-details .profile-content {
          display: flex;
          align-items: center;
        }

        .sidebar .profile-details img {
          height: 52px;
          width: 52px;
          object-fit: cover;
          border-radius: 16px;
          margin: 0 14px 0 12px;
          background: #1d1b31;
          transition: all 0.5s ease;
        }

        .sidebar.close .profile-details img {
          padding: 10px;
        }

        .sidebar .profile-details .profile_name,
        .sidebar .profile-details .job {
          color: #fff;
          font-size: 18px;
          font-weight: 500;
          white-space: nowrap;
        }

        .sidebar.close .profile-details i,
        .sidebar.close .profile-details .profile_name,
        .sidebar.close .profile-details .job {
          display: none;
        }

        .sidebar .profile-details .job {
          font-size: 12px;
        }

        .home-section {
          position: relative;
          background: #e4e9f7;
          height: 15%;
          justify-content: center;
          left: 260px;
          width: calc(100% - 260px);
          transition: all 0.5s ease;
        }

        .sidebar.close ~ .home-section {
          left: 78px;
          width: calc(100% - 78px);
        }

        .home-section .home-content {
          height: 60px;
          display: flex;
          align-items: center;
          
        }

        .home-section .home-content .bx-menu,
        .home-section .home-content .text {
          color: #11101d;
          font-size: 35px;
          justify-content: center;
        }

        .home-section .home-content .bx-menu {
          margin: 0 15px;
          cursor: pointer;
        }

        .home-section .home-content .text {
          font-size: 26px;
          font-weight: 600;
        }

        @media (max-width: 420px) {
          .sidebar.close .nav-links li .sub-menu {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
