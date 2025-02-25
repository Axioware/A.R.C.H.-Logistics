import { position } from "polished";

const mainStyles = {
    centerContent: (isSidebarClosed) => ({
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
        backgroundColor: '#F8F8F8',
        padding: '15px 15px 20px 15px',
        borderRadius: '8px',
        minHeight: '10vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // margin: '0px 0px 0px 0px',
        boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',
      },

      tablesBackground: {
        backgroundColor: '#F8F8F8',
        padding: '25px 15px 20px 35px',
        borderRadius: '8px',
        minHeight: '10vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: '40px 0px 0px 0px',
        boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',
      },
      AddInputBackground: {
        backgroundColor: '#F8F8F8',
        padding: '20px 0px 40px 60px',
        borderRadius: '8px',
        minHeight: '10vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '20px 0px 0px 0px',
        boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',
      },

      tableTopContainer: {
            display: 'flex',
            justifyContent: 'space-between', /* Space between heading and buttons */
            alignItems: 'center', /* Align items vertically */
            width: '100%',
            margin: '0px 0px 0px 30px', /* Add margin to the right */
            flexWrap: 'wrap' /* Allow items to wrap on smaller screens */
          },

      rowContainer: {
            display: 'flex',
            justifyContent: 'flex-end', /* Align buttons to the right */
            alignItems: 'center',
            gap: '20px' /* Add spacing between FilterButton and SearchBar */
      }
  };
  
export default mainStyles;