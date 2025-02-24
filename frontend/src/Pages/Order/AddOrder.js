import React, { useState, useEffect, useRef } from "react";
import NavPath from '../../Components/General/NavPath';
import ModalOpener from "../../Components/Table_Components/ModalOpener";
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import PageHeading from "../../Components/Table_Components/PageHeading";
import { FaTrash } from "react-icons/fa";
import DropDown from "../../Components/General/DropDown";

export default function AddOrder() {
  const [Label, setLabel] = useState([
    { ProductName: "Xyz", Services: [ { service_name: "Prep", service_id: 1}, { service_name: "Bundling", service_id: 2}], BundleQuantity: 145, UnitQuantity: [{ Quantity: "78"},  {Quantity: "78"}], PackingInstruction: "Handle Carefully" }
  ]);


  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setClearance] = useState(1);
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });
  const [showModal, setShowModal] = useState(false);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [chargeType, setChargeType] = useState("Service Fee");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingNotes, setEditingNotes] = useState("");

  const [custom, setCustom] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [textOnLabel, setTextOnLabel] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Define categories and handleCategorySelect
  const categories = ["Select", "Category 1", "Category 2", "Category 3"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };



  // Define products state and related functions
  const [products, setProducts] = useState([{ product: "", quantity: "" }]);

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleAddProductField = () => {
    setProducts([...products, { product: "", quantity: "" }]);
  };

  const Dropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
      setSelectedOption(option);
      onSelect(option);
      setIsOpen(false);
    };

    return (
      <div style={styles.dropdown}>
        <button onClick={toggleDropdown} style={styles.dropdownButton}>
          {selectedOption} <span style={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && (
          <ul style={styles.dropdownList}>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleSelect(option)} style={styles.dropdownItem}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const resetModalValues = () => {
    setCustom(""); 
    setWidth(""); 
    setHeight(""); 
    setTextOnLabel(""); 
    setSelectedFile(null);
  };

  const AddLabel = () => {
    setShowLabelModal(true);
  };

  const handleAddLabel = () => {
    if (!custom) {
      alert("Please select a service before adding.");
      return;
    }

    // Add the new service to the Label state
    setLabel([...Label, { ProductName: "New Product", Service: custom, BundleQuantity: "0", Quantity: "0", PackingInstruction: "Handle Carefully" }]);

    // Reset modal values and close the modal
    resetModalValues();
    setShowLabelModal(false);
  };

  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleAddAnotherService = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  const handleServiceChange = (index, value) => {
    const newServiceList = [...serviceList];
    newServiceList[index].service = value;
    setServiceList(newServiceList);
  };
  
  useEffect(() => {
    // Fetch data logic here if needed

    console.log(selectedCategory)
  }, [selectedCategory]);

  const handleDelete = (index) => {
    setLabel(Label.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    resetModalValues();
    setSelectedFile(null);
    setShowLabelModal(false);
  };

  

  const chargeOptions = ["Service Fee", "Extra Services", "Late Fee", "Custom Charge"];
  

  
  const resetModal = () => {
    setChargeType("Service Fee");
    setAmount("");
    setNotes("");
    setShowModal(false);
  };
  
  useEffect(() => {
    // Fetch data logic here if needed
  }, [currentPage]);


  
  

  return (
    <div>
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      <div style={mainStyles.centerContent(isSidebarClosed)}>
        <div style={{ marginBottom: '60px' }}>
        <NavPath
          text={["Home", "Add Order"]}
          paths={["/home", "/add-order"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />
        </div>

<div style={mainStyles.AddInputBackground}>
  {/* PageHeading with margin-bottom */}
  <div style={{ marginBottom: '20px' }}> {/* Add margin-bottom here */}
    <PageHeading text='Add Order' text_color={[0, 0, 0]} width='100%' height='auto' />
  </div>
          
          
          <DropDown
            label="Category"
            data={["FBA", "FBM", "Storage", "Other"]} // Example data, replace with actual data
            width="250px"
            height="40px"
            onSelect={setSelectedCategory} // Update selectedCategory
            required={true}
            multi={false} 
          />

{selectedCategory && ["FBA", "FBM", "Storage", "Other"].includes(selectedCategory.value) && (
  <>
    <div style={styles.buttonWrapper}>
      <ModalOpener 
        text="Add Service" 
        text_color={[255, 255, 255]} 
        func={AddLabel} 
        style={styles.modalOpener}
      />
    </div>

    <table style={styles.table}>
      <colgroup>
        <col style={{ width: "18%" }} />
        <col style={{ width: "18%" }} />
        <col style={{ width: "18%" }} />
        <col style={{ width: "18%" }} />
        <col style={{ width: "18%" }} />
        <col style={{ width: "10%" }} />
      </colgroup>
      <thead>
        <tr>
          <th style={styles.th}>Product Name</th>
          <th style={styles.th}>Service</th>
          <th style={styles.th}>Bundle Quantity</th>
          <th style={styles.th}>Quantity</th>
          <th style={styles.th}>Packing Instruction</th>
          <th style={styles.th}></th>
        </tr>
      </thead>
      <tbody>
        {/* {Label.map((row, index) => (
          <tr key={index}>
            <td style={styles.td}>{row.ProductName}</td>
            <td style={styles.td}>{row.Service}</td>
            <td style={styles.td}>{row.BundleQuantity}</td>
            <td style={styles.td}>{row.Quantity}</td>
            <td style={styles.td}>{row.PackingInstruction}</td>
            <td style={{ ...styles.td, display: "flex" }}>
              <FaTrash style={{ ...styles.deleteIcon }} onClick={() => handleDelete(index)} />
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>  
  </>
)}

{showLabelModal && 
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h2 style={styles.modalTitle}>Add Service</h2>
      
      {serviceList.map((service, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div style={{ flex: 2 }}>
            <label style={styles.label}>Service</label>
            <select 
              style={styles.input} 
              value={service.service} 
              onChange={(e) => handleServiceChange(index, e.target.value)}
            >
              <option value="option1">Select</option>
              <option value="option1">Prep</option>
              <option value="option2">Bundling</option>
            </select>
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'left' }}>
        <button style={styles.addAnotherButton} onClick={handleAddAnotherService}>
          + Add Another Service
        </button>
      </div>

      {/* If "Prep" is selected, show these fields once */}
      {serviceList.some(service => service.service === "option1") && (
        <>
          <div style={styles.rowContainer}>
            <div style={{ ...styles.inputGroup, ...styles.productServiceGroup }}>
              <label style={styles.label}>Product</label>
              <select
                style={styles.dropdown}
                value={products[0]?.product || ""}
                onChange={(e) => handleProductChange(0, "product", e.target.value)}
              >
                <option value="">Select Product</option>
                <option value="Xyz1">Xyz1</option>
                <option value="Xyz2">Xyz2</option>
              </select>
            </div>
            <div style={{ ...styles.inputGroup, ...styles.unitQuantityGroup }}>
              <label style={styles.label}>Unit Quantity</label>
              <input
                type="number"
                style={styles.input}
                value={products[0]?.quantity || ""}
                onChange={(e) => handleProductChange(0, "quantity", e.target.value)}
                placeholder="Enter quantity"
              />
            </div>
          </div>

          {/* Packing Instruction Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Packing Instruction</label>
            <input
              type="text"
              style={styles.input}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Enter packing instructions"
            />
          </div>
        </>
      )}

      {/* If "Bundling" is selected, show multiple products and extra fields */}
      {serviceList.some(service => service.service === "option2") && (
        <>
          {products.map((item, index) => (
            <div key={index} style={styles.rowContainer}>
              <div style={{ ...styles.inputGroup, ...styles.productServiceGroup }}>
                <label style={styles.label}>Product</label>
                <select
                  style={styles.dropdown}
                  value={item.product}
                  onChange={(e) => handleProductChange(index, "product", e.target.value)}
                >
                  <option value="">Select Product</option>
                  <option value="Xyz1">Xyz1</option>
                  <option value="Xyz2">Xyz2</option>
                </select>
              </div>
              <div style={{ ...styles.inputGroup, ...styles.unitQuantityGroup }}>
                <label style={styles.label}>Unit Quantity</label>
                <input
                  type="number"
                  style={styles.input}
                  value={item.quantity}
                  onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
            </div>
          ))}

          <p style={{ ...styles.addProduct, color: 'grey' }} onClick={handleAddProductField}>
            + Add Another Product
          </p>

          {/* Bundle Quantity Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Bundle Quantity</label>
            <input
              type="text"
              style={styles.input}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Enter Bundle Quantity"
            />
          </div>

          {/* Packing Instruction Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Packing Instruction</label>
            <input
              type="text"
              style={styles.input}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Enter packing instructions"
            />
          </div>
        </>
      )}

      <div style={styles.buttonContainer}>
        <button style={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        <button style={styles.confirmButton} onClick={handleAddLabel}>Add Service</button>
      </div>
    </div>
  </div>
}

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
    fontSize: "12px",
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
    fontFamily: "Nunito, sans-serif"

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
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bolder",
    color: "#333",
    textAlign: 'center'
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
};