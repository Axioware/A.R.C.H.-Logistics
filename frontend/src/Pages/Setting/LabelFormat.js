import React, { useState } from "react";
import NavPath from '../../Components/General/NavPath';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import PageHeading from "../../Components/Table_Components/PageHeading";
import { FaTrash } from "react-icons/fa";
import SearchBar from "../../Components/Table_Components/SearchBar";
import { FaEdit } from "react-icons/fa"; // Import the edit icon


export default function LabelFormat() {
  const [data, setData] = useState([
    { 
      ID: "1", 
      Name: "John", 
      Dimensions: "12x54x65", 
      DefaultPrinter: "CL II" 
    }
  ]);

  const [boxQuantity, setBoxQuantity] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([{ product: "", quantity: "" }]);
  const [search, setSearch] = useState('');
  const handleEdit = (index) => {
    console.log("Editing row:", index);
    // Add your edit logic here (e.g., open a modal to edit row details)
  };
  

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };


  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div>
      <SideBar sidebar_state={true} set_sidebar_state={() => {}} />
      <div style={mainStyles.centerContent(true)}>
      <div style={{ marginBottom: '50px' }}>
        <NavPath
          text={["Home", "Setting", "Label Format"]}
          paths={["/home", "/setting", "/label-format"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />
        </div>

        <div style={mainStyles.tableBackground}>
        <div style={styles.headerContainer}>
            <div style={{ marginBottom: '20px' }}>
                       <PageHeading text='Label Format' text_color={[0, 0, 0]} width='100%' height='auto' />
                     </div>
                        
            <SearchBar
                hint="Search..."
                setSearch={setSearch}
                width="300px"
                height="50px"
            />
        </div>

        {/* Updated Table */}
          <table style={styles.table}>
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Dimensions</th>
                <th style={styles.th}>Default Printer</th>
                <th style={styles.th}></th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td}>{row.ID}</td>
                  <td style={styles.td}>{row.Name}</td>
                  <td style={styles.td}>{row.Dimensions}</td>
                  <td style={styles.td}>{row.DefaultPrinter}</td>
                  <td style={styles.td}>
                    <FaTrash style={{ ...styles.deleteIcon, margin: "0 auto" }} onClick={() => handleDelete(index)} />
                  </td>
                  <td style={styles.td}>
        <FaEdit
          style={{ ...styles.editIcon, margin: "0 auto" }}
          onClick={() => handleEdit(index)} // Call edit function
        />
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
                      placeholder="65"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Length</label>
                    <input
                      type="number"
                      style={styles.input}
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="12"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Width</label>
                    <input
                      type="number"
                      style={styles.input}
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="25"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Height</label>
                    <input
                      type="number"
                      style={styles.input}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="45"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Weight</label>
                    <input
                      type="number"
                      style={styles.input}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="88"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}const styles = {
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
      fontSize:"12px",
    },
    th: {
      background: "#000",
      color: "#fff",
      fontWeight: "bold",
      padding: "12px",
      borderBottom: "2px solid #ddd",
      textAlign: "center",
      width: "auto",
      fontFamily: "Montserrat, sans-serif",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      textAlign: "center",
      width: "auto",
      fontFamily: "Nunito, sans-serif",
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
    dropdown: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    addProduct: {
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
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    productServiceGroup: {
      flex: 3,
    },
    unitQuantityGroup: {
      flex: 1,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
    },
    cancelButton: {
      backgroundColor: '#ccc',
      color: '#000',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px',
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

    editIcon: {
        cursor: "pointer",
        color: "blue",
        fontSize: "18px",
        marginRight: "50px",
      },
      
  };