import React, { useState, useEffect } from "react";
import NavPath from '../../Components/General/NavPath';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import PageHeading from "../../Components/Table_Components/PageHeading";
import GeneralButton from '../../Components/General/GeneralButton';
import { FaTrash } from "react-icons/fa";
import ModalOpener from "../../Components/Table_Components/ModalOpener";

export default function InvoicesDetails() {
  const [data, setData] = useState([
    { product: "Apple", service: "Prep", date: "12/12/2012", amount: "$987", notes: "abdul moiz noman" }
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
  const [chargeType, setChargeType] = useState("Service Fee");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited
  const [editingNotes, setEditingNotes] = useState(""); // Track the current value of the notes being edited

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

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div>
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
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
            <colgroup>
              <col style={{ width: "18%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "24%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
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
                        style={{ ...styles.notesInput, textAlign: "center" }} // Center align input text
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() => {
                          setEditingIndex(index);
                          setEditingNotes(row.notes);
                        }}
                        style={row.notes ? { textAlign: "center" } : { color: '#999', fontStyle: 'italic', textAlign: "center" }} // Center align span text
                      >
                        {row.notes || "Add notes..."}
                      </span>
                    )}
                  </td>
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
              <span><strong>Total Charge:</strong> &nbsp;&nbsp; ${TotalCharge}</span>
            </div>
            <div style={styles.buttonWrapper}>
              <GeneralButton text="Cancel" width="145px" height="42px" button_color={["230", "230", "230"]} text_color={["0", "0", 0]} />
              <GeneralButton text="Mark As Paid" type="submit" width="145px" height="42px" />
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
  notesInput: {
    width: "60%",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: "#fff",
    fontSize: "1rem",
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
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background 0.3s ease",
  },
};