import { position } from "polished";

const mainStyles = {
    mainContent: (isSidebarClosed) => ({
      flex: 1,
      position: 'relative',
      padding: "10px 90px 10px 10px",
      transition: "all 0.5s ease",
    //   background: "#e4e9f7",
      height: '100%',
      marginLeft: isSidebarClosed ? "8%" : "18%", // Adjust margin-left based on sidebar state
      width: isSidebarClosed ? "calc(92%)" : "calc(82%)", // Adjust width dynamically
    //   marginLeft: isSidebarClosed ? "78px" : "260px", // Adjust margin-left based on sidebar state
    //   width: isSidebarClosed ? "calc(100% - 78px)" : "calc(100% - 260px)", // Adjust width dynamically
    //   width: isSidebarClosed ? "width: calc(100% - 78px)" : "width: calc(100% - 260px)",
      // backgroundColor: hasClosedClass ? "#f0f0f0" : "#fff", // Example additional style for closed class
    }),

    tableBackground: {
        backgroundColor: '#f7f6f6',
        padding: '20px 0px 40px 60px',
        borderRadius: '8px',
        minHeight: '10vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: '20px 0px 0px 0px',
        boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',
      },

    url: 'localhost:8000'
  };
  
export default mainStyles;