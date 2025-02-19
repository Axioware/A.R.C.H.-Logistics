import React, { useState } from "react";
import NavPath from '../../Components/General/NavPath';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import PageHeading from "../../Components/Table_Components/PageHeading";
import GeneralButton from '../../Components/General/GeneralButton';
import { FaTrash } from "react-icons/fa";
import ModalOpener from "../../Components/Table_Components/ModalOpener";

export default function InvoicesDetails() {
  const [data, setData] = useState([
    { 
      BoxNo: "1", 
      BoxQuantity: "52", 
      Products: [{ ProductName: "Xyz", Quantity: "546" }, { ProductName: "Xyz", Quantity: "546" }], 
      Dimensions: "12x54x65", 
      Weight: "187" 
    }
  ]);


    const [clientName, setClientName] = useState("");
    const [clientOptions, setClientOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [errorCode, setErrorCode] = useState(null);
    const [clearance, setclearance] = useState(1);
    const [billingType, setBillingType] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [warehouse, setWarehouse] = useState('');
    const [search, setSearch] = useState('');
    const [endpoint, setEndpoint] = useState('api/users/');
    const [bundledItem, setBundledItem] = useState("no"); // Added missing state
    const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
      const storedState = localStorage.getItem("sidebarclosed");
      return storedState === null ? true : JSON.parse(storedState);
    });
  const [boxQuantity, setBoxQuantity] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([{ product: "", quantity: "" }]);

  const handleAddBox = () => {
    const newBox = {
      BoxNo: (data.length + 1).toString(), // Auto-increment BoxNo
      BoxQuantity: boxQuantity,
      Products: products.map(p => ({
        ProductName: p.product || "Unknown Product", // Default value if empty
        Quantity: p.quantity || "0", // Default value if empty
      })),
      Dimensions: `${length}x${height}x${width}`,
      Weight: weight,
    };

    // Add new box data to the existing table
    setData([...data, newBox]);

    // Reset input fields and close modal
    resetModal();
  };

  const resetModal = () => {
    setBoxQuantity("");
    setLength("");
    setWidth("");
    setHeight("");
    setWeight("");
    setProducts([{ product: "", quantity: "" }]); // Reset products
    setShowModal(false); // Close modal
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleAddProductField = () => {
    setProducts([...products, { product: "", quantity: "" }]);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div>
    {clearance && (clearance === "1" || clearance === "2" || clearance === "3") ? (
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
    ) : (
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
    )}
    <div style={mainStyles.centerContent(isSidebarClosed)}>
      <div style={mainStyles.centerContent(true)}>
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
              <span><strong>LLC Name:</strong> Prep Prime</span>
              <span><strong>Order ID:</strong> XCV82SL7</span>
            </div>
            <div style={styles.buttonWrapper}>
              <ModalOpener text="Add Box" text_color={[255, 255, 255]} func={() => setShowModal(true)} />
            </div>
          </div>

          {/* Updated Table */}
          <table style={styles.table}>
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr>
                <th style={styles.th}>Box No</th>
                <th style={styles.th}>Box Quantity</th>
                <th style={styles.th}>Products</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Dimensions ( L x H x W )</th>
                <th style={styles.th}>Weight</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td}>{row.BoxNo}</td>
                  <td style={styles.td}>{row.BoxQuantity}</td>
                  <td style={styles.td}>
                    {row.Products.map((product, i) => (
                      <div key={i} style={{ textAlign: "center" }}>{product.ProductName}</div>
                    ))}
                  </td>
                  <td style={styles.td}>
                    {row.Products.map((product, i) => (
                      <div key={i} style={{ textAlign: "center" }}>{product.Quantity}</div>
                    ))}
                  </td>
                  <td style={styles.td}>{row.Dimensions.replace(/x/g, " x ")}</td>
                  <td style={styles.td}>{row.Weight}</td>
                  <td style={styles.td}>
                    <FaTrash style={{ ...styles.deleteIcon, margin: "0 auto" }} onClick={() => handleDelete(index)} />
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

                {products.map((item, index) => (
                  <div key={index} style={styles.rowContainer}>
                    <div style={{ ...styles.inputGroup, ...styles.productServiceGroup }}>
                      <label style={styles.label}>Product (Service)</label>
                      <select
                        style={styles.dropdown}
                        value={item.product}
                        onChange={(e) => handleProductChange(index, "product", e.target.value)}
                      >
                        <option value="">Select Product</option> {/* Default placeholder */}
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
                        placeholder="25"
                      />
                    </div>
                  </div>
                ))}

                <p style={{ ...styles.addProduct, color: 'grey' }} onClick={handleAddProductField}>
                  + Add Another Product
                </p>

                {/* Cancel and Add Box Buttons */}
                <div style={styles.buttonContainer}>
                  <button style={styles.cancelButton} onClick={resetModal}>
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
};