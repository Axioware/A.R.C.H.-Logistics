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


    const [Label, setLabel] = useState([
        { LabelType: "FBA", Name: "Abdul Moiz Noman"  }
      ]);


      const [Services, setServices] = useState([
        { ProductName: [{pname:"Apple", sname: [{name: 'prep'}, {name: 'label'}]}, {pname:'orange', sname: [{name: 'bundling'}]}], BundleQuantity: "4", Quantity: "70", PackingInstruction: "Handle Carefully Fargile", StartDate: "12/12/2012", EndDate: "12/12/2012", Status: "Completed"}
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
  const [chargeType, setChargeType] = useState("Service Fee");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const chargeOptions = ["Service Fee", "Extra Services", "Late Fee", "Custom Charge"];

  const handleAddCharge = () => {
    setData([...data, { product: "New Item", service: chargeType, date: new Date().toLocaleDateString(), amount: `$${amount}`, notes }]);
    setShowModal(false); // Close modal
  };

  const AddCharge = () => {
    setShowModal(true); // Close modal
    console.log('ygygyg');
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
          <PageHeading text='Labels' text_color={[0, 0, 0]} width='100%' height='auto' />

          <div style={styles.headerContainer}>
            <div style={styles.invoiceDetails}>
              {/* <span><strong>LLC Name:</strong> {LLCName}</span> */}
              {/* <span><strong>Order ID:</strong> {OrderID}</span> */}
            </div>
            <div style={styles.buttonWrapper}>
              <ModalOpener text="Print" text_color={[255, 255, 255]} func={AddCharge}/>
              <ModalOpener text="Download" text_color={[255, 255, 255]} func={AddCharge} />
              <ModalOpener text="Upload" text_color={[255, 255, 255]} func={AddCharge} />
            </div>
          </div>

          {/* Updated Table */}
          <table style={styles.table}>
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
                  <td style={styles.td}>{row.Name}</td>
                  <td style={styles.td}>
                    <FaTrash style={styles.deleteIcon} onClick={() => handleDelete(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && 
          <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                <h2 style={styles.modalTitle}>Add Charge</h2>

                <label style={styles.label}>Amount</label>
                <input type="text" style={styles.input} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="$0.00" />

                <label style={styles.label}>Notes</label>
                <input type="text" style={styles.input} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Extra Services" />

                <div style={styles.buttonContainer}>
                  <button style={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
                  <button style={styles.confirmButton} onClick={handleAddCharge}>Add Charge</button>
                </div>
              </div>
            </div>}
        </div>








        <div style={mainStyles.tableBackground}>
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
                  <td style={styles.td}>{row.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && 
          <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                <h2 style={styles.modalTitle}>Add Charge</h2>

                <label style={styles.label}>Amount</label>
                <input type="text" style={styles.input} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="$0.00" />

                <label style={styles.label}>Notes</label>
                <input type="text" style={styles.input} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Extra Services" />

                <div style={styles.buttonContainer}>
                  <button style={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
                  <button style={styles.confirmButton} onClick={handleAddCharge}>Add Charge</button>
                </div>
              </div>
            </div>}
        </div>


        <div style={mainStyles.tableBackground}>
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

          {showModal && 
          <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                <h2 style={styles.modalTitle}>Add Charge</h2>

                <label style={styles.label}>Amount</label>
                <input type="text" style={styles.input} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="$0.00" />

                <label style={styles.label}>Notes</label>
                <input type="text" style={styles.input} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Extra Services" />

                <div style={styles.buttonContainer}>
                  <button style={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
                  <button style={styles.confirmButton} onClick={handleAddCharge}>Add Charge</button>
                </div>
              </div>
            </div>}
        </div>



        <div style={mainStyles.tableBackground}>
          <PageHeading text='Order Details' text_color={[0, 0, 0]} width='100%' height='auto' />

          <div style={styles.headerContainer}>
            <div style={styles.invoiceDetails}>
            </div>
            <div style={styles.buttonWrapper}>
              <ModalOpener text="Add Charge" text_color={[255, 255, 255]} func={AddCharge}/>
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
  <input
    type="text"
    value={row.notes}
    onChange={() => {}}
    style={styles.notesInput} // Apply the specific style here
  />
</td>
                  <td style={styles.td}>
                    <FaTrash style={styles.deleteIcon} onClick={() => handleDelete(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && 
          <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                <h2 style={styles.modalTitle}>Add Charge</h2>

                <label style={styles.label}>Amount</label>
                <input type="text" style={styles.input} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="$0.00" />

                <label style={styles.label}>Notes</label>
                <input type="text" style={styles.input} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Extra Services" />

                <div style={styles.buttonContainer}>
                  <button style={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
                  <button style={styles.confirmButton} onClick={handleAddCharge}>Add Charge</button>
                </div>
              </div>
            </div>}

          <div style={styles.totalContainer}>
            <div style={styles.totalCharge}>
            </div>
            <div style={styles.buttonWrapper}>
              <GeneralButton text="Cancel Order" width="145px" height="42px" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
              <GeneralButton text="Mark As Completed" type="submit" width="145px" height="42px" />
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
  