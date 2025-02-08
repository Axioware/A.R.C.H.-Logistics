import React, { useState, useEffect } from "react";
import NavPath from '../../Components/General/NavPath';
import TableContent from '../../Components/Table_Components/TableContent';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import PageHeading from "../../Components/Table_Components/PageHeading";
import GeneralButton from '../../Components/General/GeneralButton';

export default function InvoicesDetails() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setClearance] = useState(1);
  const [LLCName, setLLCName] = useState("Prep Prime");
  const [OrderID, setOrderID] = useState("XCV82SL7");
  const [TotalCharge, setTotalCharge] = useState(27235);


  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  // State for filters
  const [billingType, setBillingType] = useState('All');
  const [userStatus, setUserStatus] = useState('All');

  // State to toggle the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getData = async () => {
    const url = `https://api.example.com/users?page=${currentPage}&billingType=${billingType}&userStatus=${userStatus}`;
    const response = await fetchData(setLoading, setSuccess, url);

    if (response && response.error) {
      switch (response.error) {
        case 400:
          setErrorCode(400);
          break;
        case 401:
          setErrorCode(401);
          break;
        case 403:
          setErrorCode(403);
          break;
        case 500:
          setErrorCode(500);
          break;
        default:
          setErrorCode(response.error);
          break;
      }
    } else if (response) {
      setData(response);
      setErrorCode(null);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

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

  // Handle Reset and Apply for filters
  const handleReset = () => {
    setBillingType('All');
    setUserStatus('All');
  };

  const handleApply = () => {
    console.log("Filters applied:", { billingType, userStatus });
  };

  // Toggle dropdown visibility on filter button click
  const toggleDropdown = () => {
    console.log("Dropdown toggled");
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {clearance && (clearance === "1" || clearance === "2" || clearance === "3") ? (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      ) : (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      )}
      <div style={mainStyles.centerContent(isSidebarClosed)}>

        <NavPath
          text={["Home", "Invoices", "Invoices Details"]}
          paths={["/home", "/invoices", "/invoices-details"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />

        <div style={mainStyles.tableBackground}>
          <PageHeading
            text='Invoices Details'
            text_color={[0, 0, 0]}
            width='100%'
            height='auto'
            sidebar_color={[0, 0, 0]}
            font_size='2rem'
            sidebar_width='10px'
            border_color={[0, 0, 0]}
          />

            <div style={styles.headerContainer}>
            <div style={styles.invoiceDetails}>
            <span><strong>LLC Name:</strong> {LLCName}</span>
            <span><strong>Order ID:</strong> {OrderID}</span>
            </div>


            <div style={styles.buttonWrapper}>
              <AddButton text="Add Charge" text_color={[255, 255, 255]} path="/add-charge" />
              <AddButton text="Add Discount" text_color={[255, 255, 255]} path="/add-discount" />
            </div>
          </div>


          <TableContent
            table_headings={['ID', 'Name', 'Email', 'Role', 'Actions']}
            last_column={true}
            loading={loading}
            success={success}
            prev_button={handlePrev}
            next_button={handleNext}
            fetchData={getData}
            data={data}
            currentPage={currentPage}
            totalPages={totalPages}
          />

         

<div style={styles.totalContainer}>
    <div style={styles.totalCharge}>
        <span><strong>Total Charge:</strong> ${TotalCharge}</span>
    </div>
    <div style={styles.buttonWrapper}>
        <GeneralButton 
            text="Cancel" 
            width="145px" 
            height="42px" 
            button_color={["230", "230", "230"]} 
            text_color={["0", "0", "0"]} 
        />
        <GeneralButton 
            text="Mark As Paid" 
            type="submit" 
            width="145px" 
            height="42px" 
        />
    </div>
</div>



        </div>
      </div>
    </div>
  );
}




const styles = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',  /* Align text left, buttons right */
        alignItems: 'center',  /* Align elements vertically */
        width: '100%',
        marginBottom: '15px',
        padding: '10px 0',
        // borderBottom: '1px solid #ccc', /* Adds a subtle separator */
      },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end', /* Aligns buttons to the right */
        marginTop: '20px',
        marginRight: '20px', /* Adds right margin */
    },
    buttonWrapper: {
       
    },
    
    invoiceDetails: {
        display: 'flex',
        gap: '20px',
        whiteSpace: 'nowrap',  // Prevents text from breaking
        alignItems: 'center' ,   // Ensures vertical alignment
        fontSize:'1.2rem'
      },
        // invoiceDetails: {
        //   display: 'inline-flex',
        //   gap: '20px',
        //   alignItems: 'center',
        // }
        totalContainer: {
            display: 'flex',
            justifyContent: 'space-between', // Aligns TotalCharge left, buttons right
            alignItems: 'center',
            width: '100%',
            marginBottom: '20px',
            padding: '10px 0',
        },
        totalCharge: {
            display: 'flex',
            justifyContent: 'flex-start', // Aligns TotalCharge to the left
            fontSize: '1.2rem',
            fontWeight: 'bold',
        },
        buttonWrapper: {
            // display: 'flex',
            // flexWrap: 'nowrap', /* Ensures buttons stay in the same line */
            // gap: '10px', /* Adds space between buttons */
            // justifyContent: 'flex-end', /* Aligns buttons to the right */
            // alignItems: 'center', /* Ensures proper vertical alignment */
            // width: '100%', /* Ensures full width for proper alignment */
            // marginRight: '30px', /* Adds right margin */
            marginBottom: '20px', 
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: '30px',
            
        },

        
      };



