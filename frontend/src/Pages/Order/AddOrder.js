import React, { useState, useEffect, useRef } from "react";
import Select from 'react-select'; // Add this import
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
  const [Packing, setPacking] = useState("");

  // Define categories and handleCategorySelect
  const categories = ["Select", "Category 1", "Category 2", "Category 3"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const resetModalValues = () => {
    setCustom(""); 
    setWidth(""); 
    setHeight(""); 
    setTextOnLabel(""); 
    setSelectedFile(null);
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

  // const resetModalValues = () => {
  //   setCustom(""); 
  //   setWidth(""); 
  //   setHeight(""); 
  //   setTextOnLabel(""); 
  //   setSelectedFile(null);
  // };

  const AddLabel = () => {
    setShowLabelModal(true);
  };

  const handleAddLabel = () => {
    if (!serviceList.length || !serviceList[0].service) {
      alert("Please select at least one service before adding.");
      return;
    }
  
    const updatedLabel = [...Label];
  
    // Assuming all services are applied to the same product for now
    const newProduct = {
      ProductName: "New Product",
      Services: serviceList.map(s => ({ service_name: s.service, service_id: Math.random() })), // Assign unique IDs
      BundleQuantity: custom || 0,
      UnitQuantity: products.map(p => ({ Quantity: p.quantity })),
      PackingInstruction: Packing || "Handle Carefully",
    };
  
    updatedLabel.push(newProduct);
    setLabel(updatedLabel);
  
    // Reset the modal values
    resetModalValues();
    setServiceList([{ service: "" }]);
    setProducts([{ product: "", quantity: "" }]);
    setShowLabelModal(false);
  };
  

  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (index, value) => {
    const newServiceList = [...serviceList];
    newServiceList[index].service = value;
    setServiceList(newServiceList);
  
    // Check if "Bundling" is selected in any of the services
    const hasBundling = newServiceList.some(service => service.service === "Bundling");
  
    // If "Bundling" is selected, ensure there are exactly two product fields
    if (hasBundling) {
      if (products.length < 2) {
        // Add only one more set of fields if "Bundling" is selected
        setProducts([...products, { product: "", quantity: "" }]);
      }
    } else {
      // If no "Bundling" is selected, ensure there is only one product field
      if (products.length > 1) {
        setProducts([{ product: "", quantity: "" }]);
      }
    }
  };
  
  const handleAddAnotherService = () => {
    setServiceList([...serviceList, { service: "" }]);
  };
  
  useEffect(() => {
    // Fetch data logic here if needed
    console.log(selectedCategory);
  }, [selectedCategory]);

  const handleDelete = (index) => {
    setLabel(Label.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    resetModalValues(); // Reset fields
    setServiceList([{ service: "" }]); // Reset service list to default state
    setProducts([{ product: "", quantity: "" }]); // Reset products
    setShowLabelModal(false); // Close modal
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

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const clientOptions = [
    { value: "client1", label: "Client 1" },
    { value: "client2", label: "Client 2" },
    { value: "client3", label: "Client 3" },
  ];



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
          <div style={{ marginBottom: '20px' }}>
            <PageHeading text='Add Order' text_color={[0, 0, 0]} width='100%' height='auto' />
          </div>

          <div style={{ display: "flex", gap: "100px", alignItems: "center" }}>
 
          {/* Client Name Dropdown */}
          <div style={{ marginBottom: '15px' }}>
            <label style={styles.label}>Client Name</label>
            <Select
              options={clientOptions}
              onChange={(selectedOption) => setSelectedClient(selectedOption)}
              placeholder="Select Client"
              isSearchable={true}
              styles={{
                control: (base) => ({
                  ...base,
                  width: "250px",
                  height: "40px",
                }),
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
          {/* Category Dropdown */}
          <DropDown
            label="Category"
            data={["FBA", "FBM", "Storage", "Other"]}
            width="250px"
            height="40px"
            onSelect={setSelectedCategory}
            required={true}
            multi={false}
          />
</div>

<div style={{ marginBottom: '20px' }}>
          {/* Warehouse Dropdown */}
          <DropDown
            label="Warehouse"
            data={["Warehouse 1", "Warehouse 2", "Warehouse 3"]}
            width="250px"
            height="40px"
            onSelect={setSelectedWarehouse}
            required={true}
            multi={false}
          />
          </div>
          </div>

          {selectedClient && selectedCategory && selectedWarehouse && (
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
                  <col style={{ width: "19%" }} />
                  <col style={{ width: "19%" }} />
                  <col style={{ width: "19%" }} />
                  <col style={{ width: "19%" }} />
                  <col style={{ width: "19%" }} />
                  <col style={{ width: "5%" }} />
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
  {Label.map((row, index) => (
    <tr key={index}>
      <td style={styles.td}>{row.ProductName}</td>
      <td style={styles.td}>
        {row.Services.map((s, i) => (
          <span key={i}>{s.service_name}{i < row.Services.length - 1 ? ", " : ""}</span>
        ))}
      </td>
      <td style={styles.td}>{row.BundleQuantity}</td>
      <td style={styles.td}>
        {row.UnitQuantity.map((q, i) => (
          <span key={i}>{q.Quantity}{i < row.UnitQuantity.length - 1 ? ", " : ""}</span>
        ))}
      </td>
      <td style={styles.td}>{row.PackingInstruction}</td>
      <td style={{ ...styles.td, display: "flex" }}>
        <FaTrash style={styles.deleteIcon} onClick={() => handleDelete(index)} />
      </td>
    </tr>
  ))}
</tbody>
              </table>  
            </>
        )}

{showLabelModal && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h2 style={styles.modalTitle}>Add Service</h2>

      {/* Render Services */}
      {serviceList.map((service, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div style={{ flex: 2 }}>
            <label style={styles.label}>Service</label>
            <select
              style={styles.input}
              value={service.service}
              onChange={(e) => handleServiceChange(index, e.target.value)}
            >
              <option value="">Select</option>
              <option value="Prep">Prep</option>
              <option value="Bundling">Bundling</option>
            </select>
          </div>
        </div>
      ))}

      {/* Add Another Service Button */}
      <div style={{ textAlign: 'left' }}>
        <button style={styles.addAnotherButton} onClick={handleAddAnotherService}>
          + Add Another Service
        </button>
      </div>

      {/* Render Product and Unit Quantity Fields */}
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

      {/* Add Another Product Button */}
      <p style={{ ...styles.addProduct, color: 'grey' }} onClick={handleAddProductField}>
        + Add Another Product
      </p>

      {/* Bundle Quantity Field */}
      {serviceList.some(service => service.service === "Bundling") && (
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
      )}

      {/* Packing Instruction Field */}
      {serviceList.some(service => service.service !== "") && (
        <div style={styles.inputGroup}>
          <label style={styles.label}>Packing Instruction</label>
          <input
            type="text"
            style={styles.input}
            value={Packing}
            onChange={(e) => setPacking(e.target.value)}
            placeholder="Enter packing instructions"
          />
        </div>
      )}

      {/* Modal Buttons */}
      <div style={styles.buttonContainer}>
        <button style={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        <button style={styles.confirmButton} onClick={handleAddLabel}>Add Service</button>
      </div>
    </div>
  </div>
)}
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