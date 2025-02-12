import React, { useState, useEffect } from "react";
import NavPath from '../../Components/General/NavPath';
import TableContent from '../../Components/Table_Components/TableContent';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';
import ModalOpener from "../../Components/Table_Components/ModalOpener";
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import PageHeading from "../../Components/Table_Components/PageHeading";
import GeneralButton from '../../Components/General/GeneralButton';
import { FaTrash } from "react-icons/fa";

export default function InvoicesDetails() {

  const [data, setData] = useState([
    { BoxNo: "1", BoxQuantity: "52", ProductName: "Xyz", Quantity: "546", Dimensions: "12x54x65", Weight: "187" }
  ]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setClearance] = useState(1);
  const [LLCName, setLLCName] = useState("Prep Prime");
  const [OrderID, setOrderID] = useState("XCV82SL7");
//   const [TotalCharge, setTotalCharge] = useState(27235);
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });


  const [boxQuantity, setBoxQuantity] = useState("");
  const [product, setProduct] = useState("");
  const [unitQuantity, setUnitQuantity] = useState("");
  
  const handleAddBox = () => {
    console.log("Box added with details:", { boxQuantity, product, unitQuantity });
  };
  

  
    const [showModal, setShowModal] = useState(false); // Modal state
    const [chargeType, setChargeType] = useState("Service Fee");
    const [amount, setAmount] = useState("");
    const [notes, setNotes] = useState("");


    const handleAddCharge = () => {
        setData([...data, { product: "New Item", service: chargeType, date: new Date().toLocaleDateString(), amount: `$${amount}`, notes }]);
        setShowModal(false); // Close modal
      };
    
      const AddCharge = () => {
        setShowModal(true); // Close modal
        console.log('ygygyg');
      };

  const chargeOptions = ["Service Fee", "Extra Services", "Late Fee", "Custom Charge"];

  useEffect(() => {
    // Fetch data logic here if needed
  }, [currentPage]);

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div>
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      <div style={mainStyles.centerContent(isSidebarClosed)}>

        <NavPath
          text={["Home", "Order Details", "Add Box Dimensions"]}
          paths={["/home", "/order-details", "/add-dimension"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />

        <div style={mainStyles.tableBackground}>
          <PageHeading text='Add Box Dimensions' text_color={[0, 0, 0]} width='100%' height='auto' />

          <div style={styles.headerContainer}>
            <div style={styles.invoiceDetails}>
              <span><strong>LLC Name:</strong> {LLCName}</span>
              <span><strong>Order ID:</strong> {OrderID}</span>
            </div>
            <div style={styles.buttonWrapper}>
                             <ModalOpener text="Add Box" text_color={[255, 255, 255]} func={AddCharge} />
            </div>
          </div>

          {/* Updated Table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Box No</th>
                <th style={styles.th}>Box Quantity</th>
                <th style={styles.th}>Product Name ( Services )</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Dimensions ( L , H , W )</th>
                <th style={styles.th}>Weight</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td}>{row.BoxNo}</td>
                  <td style={styles.td}>{row.BoxQuantity}</td>
                  <td style={styles.td}>{row.ProductName}</td>
                  <td style={styles.td}>{row.Quantity}</td>
                  <td style={styles.td}>{row.Dimensions}</td>
                  <td style={styles.td}>{row.Weight}</td>
                  <td style={styles.td}>
                    <FaTrash style={styles.deleteIcon} onClick={() => handleDelete(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          {showModal && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h2 style={styles.modalTitle}>Add Box</h2>

      {/* Box Quantity, Length, Width, Height, Weight in the same row */}
      <div style={styles.rowContainer}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Box Quantity <span style={{ color: 'red' }}>*</span></label>
          <input
            type="number"
            style={styles.input}
            value={boxQuantity}
            onChange={(e) => setBoxQuantity(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Length</label>
          <input
            type="number"
            style={styles.input}
            placeholder="Length"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Width</label>
          <input
            type="number"
            style={styles.input}
            placeholder="Width"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Height</label>
          <input
            type="number"
            style={styles.input}
            placeholder="Height"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Weight</label>
          <input
            type="number"
            style={styles.input}
            placeholder="Weight"
          />
        </div>
      </div>

      <div style={styles.rowContainer}>
  <div style={{ ...styles.inputGroup, ...styles.productServiceGroup }}>
    <label style={styles.label}>Product (Service)</label>
    <select
      style={styles.dropdown}
      value={product}
      onChange={(e) => setProduct(e.target.value)}
    >
      <option value="5">5</option>
    </select>
  </div>
  <div style={{ ...styles.inputGroup, ...styles.unitQuantityGroup }}>
    <label style={styles.label}>Unit Quantity</label>
    <input
      type="number"
      style={styles.input}
      value={unitQuantity}
      onChange={(e) => setUnitQuantity(e.target.value)}
    />
  </div>
</div>
      {/* Add Another Product Link */}
      <p style={styles.addProduct}>+ Add Another Product</p>

      {/* Cancel and Add Box Buttons */}
      <div style={styles.buttonContainer}>
        <button style={styles.cancelButton} onClick={() => setShowModal(false)}>
          Cancel
        </button>
        <button style={styles.confirmButton} onClick={handleAddBox}>
          Add Box
        </button>
      </div>
    </div>
  </div>
)}
          <div style={styles.totalContainer}>
            <div style={styles.totalCharge}>
              {/* <span><strong>Total Charge:</strong> &nbsp;&nbsp; ${TotalCharge}</span> */}
            </div>
            <div style={styles.buttonWrapper}>
              <GeneralButton text="Cancel" width="145px" height="42px" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
              <GeneralButton text="Add Dimensions" type="submit" width="145px" height="42px" />
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
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: '15px',
      padding: '10px 0',
    },
    invoiceDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      alignItems: 'flex-start',
      fontSize: '1.2rem',
      fontFamily: "'abc'",
    },
    totalContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: '20px',
      padding: '10px 0',
    },
    totalCharge: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      display: 'flex',
      gap: '20px',
    },
    buttonWrapper: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end',
      marginRight: '30px',
    },
    table: {
      width: "98%",
      borderCollapse: "collapse",
      marginBottom: "20px",
      textAlign: "left",
      marginRight: '30px',
    },
    th: {
      background: "#000",
      color: "#fff",
      fontWeight: "bold",
      padding: "12px",
      borderBottom: "2px solid #ddd",
      textAlign: "left",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
    deleteIcon: {
      cursor: "pointer",
      color: "red",
      fontSize: "18px",
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '35%',
      },
      modalTitle: {
        marginBottom: '20px',
      },
      label: {
        display: 'block',
        marginBottom: '5px',
      },
      input: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      },
      disabledInput: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
      },
      dimensionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
      },
      dropdown: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      },
      addProduct: {
        color: 'blue',
        cursor: 'pointer',
        marginBottom: '10px',
      },

      rowContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
        marginBottom: '10px',
      },
      inputGroup: {
        flex: 1,  // Makes all inputs equal width
        display: 'flex',
        flexDirection: 'column',
      },

      rowContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
        marginBottom: '10px',
      },
      inputGroup: {
        display: 'flex',
        flexDirection: 'column',
      },
      productServiceGroup: {
        flex: 3, // 75% width
      },
      unitQuantityGroup: {
        flex: 1, // 25% width
      },
      dropdown: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      },
      input: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      },
      
      buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end', // Aligns buttons to the right
        marginTop: '20px',
      },
      cancelButton: {
        backgroundColor: '#ccc',
        color: '#000',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px', // Space between buttons
      },
      confirmButton: {
        backgroundColor: 'black',
        color: 'white',
        border: '1px solid black',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: '0.3s',
      },
      confirmButtonHover: {
        backgroundColor: 'white',
        color: 'black',
      },
      
  };
