import { position } from "polished";
const mainStyles = {
  centerContent: (isSidebarClosed) => ({
    flex: 1,
    position: 'relative',
    padding: "10px 90px 10px 10px",
    transition: "all 0.5s ease",
    height: '100%',
    marginLeft: isSidebarClosed ? "8%" : "18%",
    width: isSidebarClosed ? "calc(92%)" : "calc(82%)",
    '@media (max-width: 1200px)': {
      marginLeft: isSidebarClosed ? "6%" : "16%",
      width: isSidebarClosed ? "calc(94%)" : "calc(84%)",
    },
    '@media (max-width: 992px)': {
      marginLeft: isSidebarClosed ? "5%" : "15%",
      width: isSidebarClosed ? "calc(95%)" : "calc(85%)",
    },
    '@media (max-width: 768px)': {
      marginLeft: isSidebarClosed ? "4%" : "14%",
      width: isSidebarClosed ? "calc(96%)" : "calc(86%)",
      padding: "10px 20px 10px 10px",
    },
    '@media (max-width: 480px)': {
      marginLeft: isSidebarClosed ? "2%" : "12%",
      width: isSidebarClosed ? "calc(98%)" : "calc(88%)",
      padding: "10px 10px 10px 10px",
    },
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
    boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      padding: '10px 10px 15px 10px',
    },
    '@media (max-width: 480px)': {
      padding: '5px 5px 10px 5px',
    },
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
    '@media (max-width: 768px)': {
      padding: '20px 10px 15px 20px',
      margin: '20px 0px 0px 0px',
    },
    '@media (max-width: 480px)': {
      padding: '15px 5px 10px 10px',
      margin: '10px 0px 0px 0px',
    },
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
    '@media (max-width: 768px)': {
      padding: '15px 0px 30px 40px',
    },
    '@media (max-width: 480px)': {
      padding: '10px 0px 20px 20px',
    },
  },

  tableTopContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: '0px 0px 0px 30px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      margin: '0px 0px 0px 20px',
    },
    '@media (max-width: 480px)': {
      margin: '0px 0px 0px 10px',
    },
  },

  rowContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '20px',
    '@media (max-width: 768px)': {
      gap: '10px',
    },
    '@media (max-width: 480px)': {
      gap: '5px',
    },
  },
};

export default mainStyles;