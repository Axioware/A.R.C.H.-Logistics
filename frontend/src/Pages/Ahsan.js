import React, { useState, useEffect } from "react";
import NavBarWithSidebar from '../Components/General/TopSideNavBar';
import archlogo from '../Assets/Images/logo1.png';
import NavPath from '../Components/General/NavPath';
import TableContent from '../Components/Table_Components/TableContent';
import TableTop from '../Components/Table_Components/TableTop';
import fetchData from '../utils/fetch_data'
import SessionExpired from '../Components/Modals/SessionExpired';
// import Forbidden from '../Components/Error/Forbidden';
// import ServerError from '../Components/Error/ServerError';
import SideBar from '../Components/General/sidebartest';

export default function Ahsan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state
  const [currenturl, setCurrentUrl] = useState('https://127.0.0.1:8000/users');
  const [baseurl, setBaseUrl] = useState('https://127.0.0.1:8000/users');


  const fetchUsers = async (urls) => {
    const url = `${urls}?page=${currentPage}`;  // Example URL
    const response = await fetchData(setLoading, setSuccess, url);
    console.log(response.error)
    
    if (response && response.error) {
      switch (response.error) {
        case 400:
          // Do nothing for 400 (Bad Request)
          setErrorCode(400);
          break;
    
        case 401:
          setErrorCode(401);  // Unauthorized
          break;
    
        case 403:
          setErrorCode(403);  // Forbidden
          break;
    
        case 500:
          setErrorCode(500);  // Internal Server Error
          break;
    
        default:
          setErrorCode(response.error);  // Handle other errors (fallback)
          break;
      }
      console.error('Error fetching data:', response.message);
    } else if (response) {
      setData(response);  // Update data for successful fetch
      setErrorCode(null);  // Clear error if successful
    }
  };

  useEffect(() => {
    fetchUsers(currenturl);
  }, [currentPage]);  // Call on currentPage change


  function handleSearch(text) {
    const searchParam = `search=${encodeURIComponent(text)}`;

    if (currenturl.includes('search')) {
      console.log(currenturl);
      return 
    }
    else {
      if (currenturl.includes('?')) {
        // If URL already has query parameters, append with '&'
        setCurrentUrl(`${currenturl}&${searchParam}`);
      } else {
        // If no query parameters, start with '?'
        setCurrentUrl(`${currenturl}?${searchParam}`);
      }
      console.log(currenturl);
  }
  }

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);  // Toggle between true and false
  };

  function resetUrl() {
    setCurrentUrl(`${baseurl}`);
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const styles = {
    mainContent: {
      flex: 1,
      padding: "10px",
      transition: "margin-left 0.5s ease",
      marginLeft: isSidebarOpen ? "18%" : "4%",
    },
  };

  const [menuItems, setMenuItems] = useState([
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: "bx bx-grid-alt",
    },
    {
      name: "Category",
      route: "/category",
      icon: "bx bx-user",
      subMenu: [
        { name: "HTML & CSS", route: "/html-css" },
        { name: "JavaScript", route: "/javascript" },
        { name: "PHP & MySQL", route: "/php-mysql" },
      ],
    },
    {
      name: "Posts",
      route: "/posts",
      icon: "bx bx-cabinet",
      subMenu: [
        { name: "Web Design", route: "/web-design" },
        { name: "Login Form", route: "/login-form" },
        { name: "Card Design", route: "/card-design" },
      ],
    },
  ]);
  return (
    <>
    
    <SideBar />
  {/* <SideBar menuItems={menuItems} set={setMenuItems}/> */}
  </>
  );
}
