import React, { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import mainStyles from "../../Assets/CSS/styles";
import NavPath from '../../Components/General/NavPath';
import SideBar from '../../Components/General/Sidebar';
import GeneralButton from '../../Components/General/GeneralButton';
import ModalOpener from "../../Components/Table_Components/ModalOpener";
import PageHeading from "../../Components/Table_Components/PageHeading";
import FilterButton from '../../Components/Table_Components/FilterButton';
import FilterOptionsPrint1 from "../../Components/Filter/FilterOptionsPrint1";
import FilterOptionsDownload1 from "../../Components/Filter/FilterOptionsDownload1";



export default function Orderdetails() {

  const [Label, setLabel] = useState([
    // { LabelType: "FBA", Name: "Abdul Moiz Noman", FileURL: "" } // Example initial data
  ]);

      const [Services, setServices] = useState([
        { ProductName: [{pname:"Apple", sname: [{name: 'prep'}, {name: 'label'}]}, {pname:'orange', sname: [{name: 'bundling'}]}], BundleQuantity: "4", Quantity: "70", PackingInstruction: "Handle Carefully Fargile", StartDate: "12/12/2012", EndDate: "12/12/2012", Status: "Cancelled"},
        { ProductName: [{pname:"Apple", sname: [{name: 'prep'}, {name: 'label'}]}, {pname:'orange', sname: [{name: 'bundling'}]}], BundleQuantity: "4", Quantity: "70", PackingInstruction: "Handle Carefully Fargile", StartDate: "12/12/2012", EndDate: "12/12/2012", Status: "Completed"},
        { ProductName: [{pname:"Apple", sname: [{name: 'prep'}, {name: 'label'}]}, {pname:'orange', sname: [{name: 'bundling'}]}], BundleQuantity: "4", Quantity: "70", PackingInstruction: "Handle Carefully Fargile", StartDate: "12/12/2012", EndDate: "12/12/2012", Status: "In Progress"}
    ]);

    const [Boxes, setBoxes] = useState([
        { ProductName: [{pname:"Apple", sname: [{name: 'prep'}, {name: 'label'}]}, {pname:'orange', sname: [{name: 'bundling'}]}], BundleQuantity: "4", Quantity: "70", PackingInstruction: "Handle Carefully Fargile", StartDate: "12/12/2012", EndDate: "12/12/2012", Status: "Completed"}
    ]);

    const [Charges, setCharges] = useState([
        { ProductName: [{pname:"Apple", sname: [{name: 'prep'}, {name: 'label'}]}, {pname:'orange', sname: [{name: 'bundling'}]}], BundleQuantity: "4", Quantity: "70", PackingInstruction: "Handle Carefully Fargile", StartDate: "12/12/2012", EndDate: "12/12/2012", Status: "Completed"}
    ]);

    const [data, setData] = useState([
        { product: "Apple", service: "Prep", date: "12/12/2012", amount: "$987", notes: "" }
    ]);
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
  const [showModal, setShowModal] = useState(false); // Modal state
  const [showLabelModal, setShowLabelModal] = useState(false); // Modal state
  const [chargeType, setChargeType] = useState("Service Fee");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited
const [editingNotes, setEditingNotes] = useState(""); // Track the current value of the notes being edited


const [billingType, setBillingType] = useState("");
const [userStatus, setUserStatus] = useState("");
const [warehouse, setWarehouse] = useState("");


  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return { color: "green", fontWeight: "bold" };
      case "In Progress":
        return { color: "#D9B800", fontWeight: "bold" };
      case "Inactive":
        return { color: "red", fontWeight: "bold" };
      case "Cancelled":
        return { color: "red", fontWeight: "bold" };
      default:
        return { color: "black" };
    }
  };

  const resetModalValues = () => {
    setCustom(""); 
    setWidth(""); 
    setHeight(""); 
    setTextOnLabel(""); 
    setSelectedFile(null); // Ensure file input is also cleared
  };
  
  const handleAddLabel = () => {
    if (!custom || !width || !height || !selectedFile) {
      alert("Please select a file and fill in all fields before adding a label.");
      return;
    }
  
    const fileURL = URL.createObjectURL(selectedFile); // Ensure this is inside the function
  
    setLabel([...Label, { LabelType: custom, Name: selectedFile.name, FileURL: fileURL }]);
  
    resetModalValues();
    setSelectedFile(null);
    setShowLabelModal(false);
  };
  

  const [custom, setCustom] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [textOnLabel, setTextOnLabel] = useState("");
  
  // const handleUpload = () => {
  //   console.log("Upload File clicked");
  // };

  const [openDropdown, setOpenDropdown] = useState(null); // null means no dropdown is open

  const handleFilterButtonClick = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null); // Close the dropdown if it's already open
    } else {
      setOpenDropdown(dropdownName); // Open the clicked dropdown
    }
  };


  
  
  const AddLabel = () => {
    setShowLabelModal(true); // Close modal
    console.log('ygygyg');
  };
  
  useEffect(() => {
    // Fetch data logic here if needed
  }, [currentPage]);

  const handleDelete = (index) => {
    setLabel(Label.filter((_, i) => i !== index));
  };

  const [selectedFile, setSelectedFile] = useState(null);  // Track uploaded file
  const fileInputRef = useRef(null);  // Reference for file input

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setTextOnLabel(file.name); // Set file name as label text
    }
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  
  const handleCancel = () => {
    resetModalValues(); // Reset all input fields
    setSelectedFile(null); // Clear file selection
    setShowLabelModal(false); // Close modal
  };

  
    const chargeOptions = ["Service Fee", "Extra Services", "Late Fee", "Custom Charge"];
  
    const handleAddCharge = () => {
      setData([...data, { product: "New Item", service: chargeType, date: new Date().toLocaleDateString(), amount: `$${amount}`, notes }]);
      resetModal(); // Reset modal and close it
    };
  
    const resetModal = () => {
      setChargeType("Service Fee"); // Reset charge type
      setAmount(""); // Reset amount
      setNotes(""); // Reset notes
      setShowModal(false); // Close modal
    };
  
    const AddCharge = () => {
      setShowModal(true); // Open modal
    };
  
    useEffect(() => {
      // Fetch data logic here if needed
    }, [currentPage]);
  
    const handleDeletes = (index) => {
      setData(data.filter((_, i) => i !== index));
    };

    
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  
  return (
    <div>
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      <div style={mainStyles.centerContent(isSidebarClosed)}>

        <NavPath
          text={["Home", "Invoices", "Invoices Details"]}
          paths={["/home", "/invoices", "/invoices-details"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}

        />


<div style={mainStyles.tablesBackground}>
          <PageHeading text='Labels'width="auto" />

          <div style={styles.headerContainer}>
            <div style={styles.invoiceDetails}>
              {/* <span><strong>LLC Name:</strong> {LLCName}</span> */}
              {/* <span><strong>Order ID:</strong> {OrderID}</span> */}
            </div>
            <div style={styles.buttonWrapper}>
            {/* <FilterButton
                text="Print"
                text_color={[255, 255, 255]}
                background_color={[23, 23, 23]}
                onClick={() => setShowPrintModal(true)}
                content={FilterOptionsPrint}
                width="150px"
                height="50px"
                style={styles.filterButton}
              />
              <FilterButton
                text="Download"
                text_color={[255, 255, 255]}
                background_color={[23, 23, 23]}
                onClick={() => setShowDownloadModal(true)}
                content={FilterOptionsDownload}
                width="150px"
                height="50px"
                style={styles.filterButton}
              /> */}
              <FilterButton
                  text="Print"
                  content={<FilterOptionsPrint1/>} 
                />

              <FilterButton
                  text="Download"
                  content={<FilterOptionsDownload1/>} 
                />
            {/* <FilterButton
              text="Print"
              text_color={[255, 255, 255]} // White text color
              background_color={[23, 23, 23]} // Dark background
              filter_function={() => {}}   
              content={FilterOptionsPrint}
              width="150px" // Set width explicitly
              height="50px" // Set height explicitly
              style={styles.filterButton} // Add this to enforce consistent styling
            />
            <FilterButton
              text="Download"
              text_color={[255, 255, 255]} // White text color
              background_color={[23, 23, 23]} // Dark background
              filter_function={() => {}}   
              content={FilterOptionsDownload}
              width="150px" // Set width explicitly
              height="50px" // Set height explicitly
              style={styles.filterButton} // Add this to enforce consistent styling
            /> */}
            <ModalOpener 
              text="Add Label" 
              text_color={[255, 255, 255]} 
              func={AddLabel} 
              style={styles.modalOpener} // Add this to enforce consistent styling
            />
          </div>
          </div>

          <table style={styles.table}>
          <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "60%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th style={styles.th}>Label Type</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {Label.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td}>{row.LabelType}</td>
                  <td style={styles.td}>
                  {row.FileURL ? (
                    <a 
                      href={row.FileURL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        ...styles.link, 
                        textDecoration: "underline", 
                        textDecorationColor: "blue", 
                        color: "blue" // Ensures the text is also blue
                      }} 
                    >
                      {row.Name}
                    </a>
                  ) : (
                    row.Name
                  )}
                </td>

               <td style={{ ...styles.td, display: "flex" }}>
  <FaTrash style={{ ...styles.deleteIcon, marginLeft: "200px" }} onClick={() => handleDelete(index)} />
</td>
                </tr>
              ))}
            </tbody>
          </table>  


          
       {showLabelModal && 
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h2 style={styles.modalTitle}>Add Label</h2>

      {/* Row for Format, Width, and Height */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
  {/* Format - 50% width */}
  <div style={{ flex: 2 }}>
    <label style={styles.label}>Format</label>
    <select 
      style={styles.input} 
      value={custom} 
      onChange={(e) => setCustom(e.target.value)}
    >
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
  </div>

  {/* Conditionally render Width and Height when Option 2 is selected */}
  {custom === "option2" && (
    <>
      {/* Width - 25% width */}
      <div style={{ flex: 1 }}>
        <label style={styles.label}>Width</label>
        <input 
          type="text" 
          style={styles.input} 
          value={width} 
          onChange={(e) => setWidth(e.target.value)} 
          placeholder="Width" 
        />
      </div>

      {/* Height - 25% width */}
      <div style={{ flex: 1 }}>
        <label style={styles.label}>Height</label>
        <input 
          type="text" 
          style={styles.input} 
          value={height} 
          onChange={(e) => setHeight(e.target.value)} 
          placeholder="Height" 
        />
      </div>
    </>
  )}
</div>
      {/* Text field */}
      <label style={styles.label}>Text</label>
      <input type="text" style={styles.input} value={textOnLabel} onChange={(e) => setTextOnLabel(e.target.value)} placeholder="Text On Label" />

      {/* File Upload */}
      <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button style={styles.uploadButton} onClick={() => fileInputRef.current.click()}>
                  Upload File {selectedFile ? `(${selectedFile.name})` : ""}
                </button>

                {/* Cancel and Confirm buttons */}
                <div style={styles.buttonContainer}>
                  <button style={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                  <button style={styles.confirmButton} onClick={handleAddLabel}>Add Label</button>
      </div>
    </div>
  </div>
}

</div>

        <div style={mainStyles.tablesBackground}>
          <PageHeading text='Services' text_color={[0, 0, 0]} width='100%' height='auto' />

          <div style={styles.headerContainer}>
            <div style={styles.invoiceDetails}>
            </div>
            <div style={styles.buttonWrapper}>
            </div>
          </div>

          {/* Updated Table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Product Name</th>
                <th style={styles.th}>Service</th>
                <th style={styles.th}>BundleQuantity</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Packing Instruction</th>
                <th style={styles.th}>Start Date</th>
                <th style={styles.th}>EndDate</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {Services.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td}>
                    {row.ProductName.map((r, i) => (
                        <span key={i}>
                        {i + 1}{"."} {r.pname} <br />
                        </span>
                    ))}
                  </td>
                  <td style={styles.td}>
                    {row.ProductName.map((r, i) => (
                        <div key={i}>
                        {r.sname.map((a, z) => (
                            <span key={z}>
                            {i + 1}{"."} {a.name} <br />
                            </span>
                        ))}
                        </div>
                    ))}
                    </td>
                  <td style={styles.td}>{row.BundleQuantity}</td>
                  <td style={styles.td}>{row.Quantity}</td>
                  <td style={styles.td}>{row.PackingInstruction}</td>
                  <td style={styles.td}>{row.StartDate}</td>
                  <td style={styles.td}>{row.EndDate}</td>
                  <td style={{ ...styles.td, ...getStatusColor(row.Status) }}>{row.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div style={mainStyles.tablesBackground}>
          <PageHeading text='Boxes' text_color={[0, 0, 0]} width='100%' height='auto' />

          <div style={styles.headerContainer}>
            <div style={styles.invoiceDetails}>
            </div>
            <div style={styles.buttonWrapper}>
            </div>
          </div>

          {/* Updated Table */}
          <table style={styles.table}>
            <thead>
              <tr>
              <th style={styles.th}></th>
                <th style={styles.th}>BoxQuantity</th>
                <th style={styles.th}>Product Name (Services)</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Dimensions (L,H,W)</th>
                <th style={styles.th}>Weight</th>
              </tr>
            </thead>
            <tbody>
              {Boxes.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td}>
                    {row.ProductName.map((r, i) => (
                        <span key={i}>
                        {i + 1}{"."} {r.pname} <br />
                        </span>
                    ))}
                  </td>
                  <td style={styles.td}>
                    {row.ProductName.map((r, i) => (
                        <div key={i}>
                        {r.sname.map((a, z) => (
                            <span key={z}>
                            {i + 1}{"."} {a.name} <br />
                            </span>
                        ))}
                        </div>
                    ))}
                    </td>
                  <td style={styles.td}>{row.BundleQuantity}</td>
                  <td style={styles.td}>{row.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>        
        </div>

        <div style={mainStyles.tablesBackground}>
          <PageHeading text='Invoices Details' text_color={[0, 0, 0]} width='100%' height='auto' />

          <div style={styles.headerContainer}>
            <div style={styles.invoiceDetails}>
              <span><strong>LLC Name:</strong> {LLCName}</span>
              <span><strong>Order ID:</strong> {OrderID}</span>
            </div>
            <div style={styles.buttonWrapper}>
              <ModalOpener text="Add Charge" text_color={[255, 255, 255]} func={AddCharge} />
              <ModalOpener text="Add Discount" text_color={[255, 255, 255]} func={AddCharge} />
            </div>
          </div>

          {/* Updated Table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Services</th>
                <th style={styles.th}>Date Charged</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Notes</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td}>{row.product}</td>
                  <td style={styles.td}>{row.service}</td>
                  <td style={styles.td}>{row.date}</td>
                  <td style={styles.td}>{row.amount}</td>
                  <td style={styles.td}>
  {editingIndex === index ? (
    <input
      type="text"
      value={editingNotes}
      onChange={(e) => setEditingNotes(e.target.value)}
      onBlur={() => {
        const newData = [...data];
        newData[index].notes = editingNotes;
        setData(newData);
        setEditingIndex(null);
      }}
      style={styles.notesInput}
      autoFocus
    />
  ) : (
    <span
      onClick={() => {
        setEditingIndex(index);
        setEditingNotes(row.notes);
      }}
      style={row.notes ? {} : { color: '#999', fontStyle: 'italic' }} // Add placeholder styling
    >
      {row.notes || "Add notes..."} {/* Display placeholder if notes are empty */}
    </span>
  )}
</td>
                  <td style={styles.td}>
                    <FaTrash style={styles.deleteIcon} onClick={() => handleDeletes(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                <h2 style={styles.modalTitle}>Add Charge</h2>


                <label style={styles.label}>Amount</label>
                <input
                  type="text"
                  style={styles.input}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="$0.00"
                />

                <label style={styles.label}>Notes</label>
                <input
                  type="text"
                  style={styles.input}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Extra Services"
                />

                <div style={styles.buttonContainer}>
                  <button style={styles.cancelButton} onClick={resetModal}>
                    Cancel
                  </button>
                  <button style={styles.confirmButton} onClick={handleAddCharge}>
                    Add Charge
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
              <GeneralButton text="Cancel" width="110px" height="32px" font_size="12px" button_color={["230", "230", "230"]} text_color={["0", "0", 0]} />
              <GeneralButton text="Mark As Paid" type="submit" width="110px" height="32px" font_size="12px" />
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
   
    table: {
      width: "98%",
      borderCollapse: "collapse",
      marginBottom: "20px",
      textAlign: "left",
      marginRight: '30px',
      fontSize: "12px"
    },
    th: {
      background: "#000",
      color: "#fff",
      fontWeight: "bold",
      padding: "12px",
      borderBottom: "2px solid #ddd",
      textAlign: "center", // Center align text
      width: "auto", // Respect colgroup width
      fontFamily: "Montserrat, sans-serif"
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      textAlign: "center", // Center align text
      width: "auto", // Respect colgroup width
    },
    deleteIcon: {
      cursor: "pointer",
      color: "red",
      fontSize: "18px",
    },

    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
 
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "15px",
    },

    buttonWrapper: {
      display: 'flex',
      flexDirection: 'row', // Ensure buttons are in the same row
      alignItems: 'center', // Align buttons vertically in the center
      gap: '10px', // Add some space between buttons
      justifyContent: 'flex-end', // Align buttons to the right
      marginRight: '30px',
      fontWeight: "bold",
    },
    filterButton: {
      height: '50px', // Ensure consistent height
      display: 'flex',
      alignItems: 'center', // Center content vertically
      justifyContent: 'center', // Center content horizontally
    },
    modalOpener: {
      height: '50px', // Ensure consistent height
      display: 'flex',
      alignItems: 'center', // Center content vertically
      justifyContent: 'center', // Center content horizontally
    },
    modalOverlay: { 
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      width: "450px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      position: "relative",
    },
    modalTitle: {
      marginBottom: "20px",
      fontSize: "26px",
      fontWeight: "bolder",
      color: "#333",
    },
    label: {
      display: "block",
      textAlign: "left",
      marginBottom: "8px",
      fontSize: "22px",
      fontWeight: "500",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "18px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      outline: "none",
      transition: "border 0.3s ease",
    },
    uploadButton: {
      backgroundColor: "#4682B4",
      color: "white",
      border: "none",
      padding: "12px 18px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "background 0.3s ease",
      marginTop: "10px",
      width: "100%",
    },
    
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "15px",
    },

    cancelButton: {
      backgroundColor: "#ccc",
      color: "#333",
      border: "none",
      padding: "12px 18px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "background 0.3s ease",
    },
    confirmButton: {
      backgroundColor: "#4682B4",
      color: "#fff",
      border: "none",
      padding: "12px 18px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "background 0.3s ease",

      notesInput: {
        width: "100%",
        padding: "5px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#fff",
        fontSize: "1rem",
        outline: "none",
      },
      
      
      
    },
  };
  