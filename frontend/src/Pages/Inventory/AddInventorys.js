import React, { useState, useEffect } from "react";
import Select from 'react-select';
import SideBar from '../../Components/General/Sidebar';
import NavPath from '../../Components/General/NavPath';
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import fetchData from '../../utils/fetch_data';
import GeneralButton from '../../Components/General/GeneralButton';

// Custom styles for react-select dropdown
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: state.isFocused ? `0 0 0 1px rgb(14, 116, 144)` : 'none',
    '&:hover': {
      borderColor: 'rgb(14, 116, 144)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'rgb(14, 116, 144)' : 'white',
    color: 'black', // Always black text
    '&:hover': {
      backgroundColor: 'rgba(14, 116, 144, 0.8)',
      color: 'black', // Always black text on hover
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black', // Always black text for selected value
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid rgb(14, 116, 144)',
  }),
};

export default function AddInventory() {
  const [data, setData] = useState([]);
  const [clientName, setClientName] = useState("");
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
  const [bundledItem, setBundledItem] = useState("no");
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [chargeBy, setChargeBy] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  // const [location, setLocation] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensionFields, setDimensionFields] = useState([
    { length: '', width: '', height: '', weight: '', quantity: '' }
  ]);
  const [bundleQuantity, setBundleQuantity] = useState('');
  const [bundleProducts, setBundleProducts] = useState([{ product: '', quantity: '' }]);

  const [clientOptions, setClientOptions] = useState([
    { value: "Abdul Moiz", label: "Abdul Moiz" },
    { value: "John", label: "John" },
    { value: "Smith", label: "Smith" }
  ]);

  const [warehouseOptions, setWarehouseOptions] = useState([
    { value: "Warehouse 1", label: "Warehouse 1" },
    { value: "Warehouse 2", label: "Warehouse 2" }
  ]);

  const [productOptions, setProductOptions] = useState([
    { value: "Add New Product", label: "Add New Product" },
  ]);

  const [categoryOptions, setCategoryOptions] = useState([
    { value: "Electronics", label: "Electronics" },
    { value: "Furniture", label: "Furniture" },
    { value: "Clothing", label: "Clothing" },
  ]);

  const [chargeByOptions, setChargeByOptions] = useState([
    { value: "weight", label: "Weight" },
    { value: "unit", label: "Unit" },
  ]);

  const handleWarehouseChange = (selectedOption) => {
    setWarehouse(selectedOption ? selectedOption.value : ''); // Ensure warehouse is updated
    setLocation([]); // Clear location selection when warehouse changes
    console.log("Warehouse selected:", selectedOption ? selectedOption.value : 'None'); // Debugging
  };

  console.log("Current warehouse:", warehouse); // Debugging
  // const handleWarehouseChange = (selectedOption) => {
  //   setWarehouse(selectedOption.value);
  //   setLocation([]); // Clear location selection when warehouse changes
  // };
  const [location, setLocation] = useState([]); // Store multiple locations
  const handleLocationChange = (selectedOptions) => {
    setLocation(selectedOptions); // selectedOptions is an array of selected values
  };
  const [locationOptions, setLocationOptions] = useState([
    { value: "Location 1", label: "Location 1" },
    { value: "Location 2", label: "Location 2" },
    { value: "Location 3", label: "Location 3" },
  ]);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '4px',
      // boxShadow: state.isFocused ? `0 0 0 1px rgb(14, 116, 144)` : 'none',
      '&:hover': {
        borderColor: 'rgb(14, 116, 144)',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgb(14, 116, 144)' : 'white',
      color: 'black', // Always black text
      '&:hover': {
        backgroundColor: 'rgba(14, 116, 144, 0.8)',
        color: 'white', // Always black text on hover
      },
    }),
    // multiValue: (provided) => ({
    //   ...provided,
    //   backgroundColor: 'rgb(14, 116, 144)',
    //   color: 'white',
    // }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'black',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: 'rgba(14, 116, 144, 0.8)',
        color: 'white',
      },
    }),
  };

  const [showModal, setShowModal] = useState(false);

  const fetchClients = async () => {
    const url = `https://api.example.com/api/clients/`;
    const response = await fetchData(setLoading, setSuccess, url);
  
    if (response && response.error) {
      setErrorCode(response.error);
    } else if (response) {
      setClientOptions([...response, { value: "Abdul Moiz", label: "Abdul Moiz" }, { value: "Noman", label: "Noman" }, { value: "John", label: "John" }, { value: "Smith", label: "Smith" }]);
    }
  };

  const fetchWarehouses = async () => {
    const url = `https://api.example.com/api/warehouses/`;
    const response = await fetchData(setLoading, setSuccess, url);
  
    if (response && response.error) {
      setErrorCode(response.error);
    } else if (response) {
      setWarehouseOptions([...response, { value: "Warehouse 1", label: "Warehouse 1" }, { value: "Warehouse 2", label: "Warehouse 2" }]);
    }
  };

  const fetchProducts = async () => {
    const url = `https://api.example.com/api/products/`; 
    const response = await fetchData(setLoading, setSuccess, url);
  
    if (response && response.error) {
      setErrorCode(response.error);
    } else if (response) {
      setProductOptions([...response, { value: "Product 1", label: "Product 1" }, { value: "Product 2", label: "Product 2" }]);
    }
  };

  useEffect(() => {
    getData();
    fetchClients();
    fetchWarehouses();
    fetchProducts();
  }, [currentPage]);

  const getData = async () => {
    const url = `https://api.example.com/${endpoint}`;
    const response = await fetchData(setLoading, setSuccess, url);

    if (response && response.error) {
      setErrorCode(response.error);
    } else if (response) {
      setData(response);
      setErrorCode(null);
    }
  };

  const handleClientChange = (selectedOption) => {
    setClientName(selectedOption.value);
  };

  const handleProductChange = (selectedOption) => {
    setProduct(selectedOption.value);
    if (selectedOption.value === "Add New Product") {
      setShowModal(true);
    }
  };

  // const handleWarehouseChange = (selectedOption) => {
  //   setWarehouse(selectedOption.value);
  // };

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value);
  };

  const handleChargeByChange = (selectedOption) => {
    setChargeBy(selectedOption.value);
  };

  const handleAddNewProduct = (newProduct) => {
    setProductOptions([...productOptions, { value: newProduct.name, label: newProduct.name }]);
    setProduct(newProduct.name);
    setShowModal(false);
  };

  const handleAddDimensionFields = () => {
    setDimensionFields([...dimensionFields, { length: '', width: '', height: '', weight: '', quantity: '' }]);
  };

  const handleDimensionChange = (index, field, value) => {
    const updatedFields = [...dimensionFields];
    updatedFields[index][field] = value;
    setDimensionFields(updatedFields);
  };

  const handleRemoveDimensionFields = (index) => {
    if (dimensionFields.length > 1) {
      const updatedFields = [...dimensionFields];
      updatedFields.splice(index, 1);
      setDimensionFields(updatedFields);
    }
  };

  const handleAddBundleProductFields = () => {
    setBundleProducts([...bundleProducts, { product: '', quantity: '' }]);
  };

  const handleBundleProductChange = (index, field, value) => {
    const updatedProducts = [...bundleProducts];
    updatedProducts[index][field] = value;
    setBundleProducts(updatedProducts);
  };

  const handleRemoveBundleProductFields = (index) => {
    if (bundleProducts.length > 1) {
      const updatedProducts = [...bundleProducts];
      updatedProducts.splice(index, 1);
      setBundleProducts(updatedProducts);
    }
  };

  const Modal = ({ onClose, onAddProduct }) => {
    const [newProduct, setNewProduct] = useState({
      id: '',
      name: '',
      description: ''
    });
    const [errors, setErrors] = useState({}); // State to track validation errors
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewProduct({ ...newProduct, [name]: value });
      // Clear errors when the user starts typing
      setErrors({ ...errors, [name]: '' });
    };
  
    const validateForm = () => {
      const newErrors = {};
      if (!newProduct.id.trim()) {
        newErrors.id = 'Product ID is required';
      }
      if (!newProduct.name.trim()) {
        newErrors.name = 'Name is required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Return true if no errors
    };
  
    const handleAddProduct = () => {
      if (validateForm()) {
        onAddProduct(newProduct);
        onClose();
      }
    };
  
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h2 style={styles.modalTitle}>Add New Product</h2>
          <label style={styles.label}>SKU </label>
          <input
            type="text"
            name="id"
            value={newProduct.id}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="XZ1292"
          />
          {errors.id && <span style={styles.error}>{errors.id}</span>}
          <label style={styles.label}>Name</label>
          <input
            type="text" 
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Iron Board"
          />
          {errors.name && <span style={styles.error}>{errors.name}</span>}
          <label style={styles.label}>Description</label>
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="My Name Is Khan"
          />
          <div style={styles.buttonContainers}>
            <button style={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              type="button" // Ensure this is not type="submit"
              style={styles.confirmButton}
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          .table-top-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 95%;
            margin: 30px auto 20px 50px;
            flex-wrap: wrap;
          }

          .row-container1 {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 20px;
          }

          .page-heading {
            flex-grow: 1;
          }

          .input-field, .select-fields {
            width: 70%;
            padding: px;
            margin-top: 5px;
            border: 0px solid #ccc;
            border-radius: 4px;
          }

           .input-field, .select-field {
            width: 70%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 20px;
            position: relative;
            margin: 20px 0px 0px 50px;
          }

          .form-grid label {
            display: block;
            margin-bottom: 5px;
          }

          .dimension-container {
            display: flex;
            gap: 10px;
            width: 70%;
          }

          .dimension-input {
            width: calc(33.33% - 7px) !important;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .add-another-button {
            margin-top: 10px;
            padding: 8px 16px;
            color: grey;
            border: none;
            cursor: pointer;
            background: none;
            margin: 10px 0px 0px 50px;
          }

          .add-another-buttons {
            margin-top: 10px;
            padding: 0px 16px;
            color: grey;
            border: none;
            cursor: pointer;
            background: none;
          }

          .remove-dimension-button {
            position: absolute;
            right: 110px;
            top: 75%;
            transform: translateY(-50%);
            background-color: #ff6b6b;
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 14px;
          }

          .remove-dimension-button:hover {
            background-color: #ff3d3d;
          }

          .radio-container {
            display: flex;
            align-items: center;
            margin-top: 8px;
          }

          .radio-label {
            display: flex;
            align-items: center;
            margin-right: 20px;
          }

          .radio-input {
            margin-right: 5px;
          }

          .bundle-product-container {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 20px;
          }

          .bundle-product-container .input-field {
            width: 100%;
          }

          .bundle-product-container .add-another-button {
            margin: 0;
            align-self: flex-end;
          }
        `}
      </style>

      <div>
        {clearance && (clearance === "1" || clearance === "2" || clearance === "3") ? (
          <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        ) : (
          <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        )}
        <div style={mainStyles.centerContent(isSidebarClosed)}>
          <NavPath
            text={["Home", "Inventory", "Add Inventory"]}
            paths={["/home", "/inventory", "/add-inventorys"]}
            width="100%"
            height="50px"
          />

          <div style={mainStyles.AddInputBackground}>
            <div className="table-top-container">
              <PageHeading
                text={'Add Inventory'}
                width="auto" 
                height="auto"
                sidebar_width="5px"
                sidebar_height="35px"
              />
            </div>

            <form className="inventory-form">
              <div className="form-grid">
                <div>
                  <label>Client Name:</label>
                  <Select
                    value={clientOptions.find(option => option.value === clientName)}
                    onChange={handleClientChange}
                    options={clientOptions}
                    className="select-fields"
                    placeholder="Select a client"
                    styles={customStyles} // Apply custom styles
                  />
                </div>
              </div>

              {clientName && (
                <>
                  <div className="form-grid">
                    <div>
                      <label>Product:</label>
                      <Select
                        value={productOptions.find(option => option.value === product)}
                        onChange={handleProductChange}
                        options={productOptions}
                        className="select-fields"
                        placeholder="Select a product"
                        styles={customStyles} // Apply custom styles
                      />
                      {showModal && (
                        <Modal 
                          onClose={() => setShowModal(false)} 
                          onAddProduct={handleAddNewProduct} 
                        />
                      )}
                    </div>
                    <div>
                      <label>Product Name:</label>
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="input-field"
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <label>Description:</label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                        placeholder="Enter description"
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div>
                      <label>Quantity:</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="input-field"
                        placeholder="Enter quantity"
                      />
                    </div>
                    <div>
                      <label>Category:</label>
                      <Select
                        value={categoryOptions.find(option => option.value === category)}
                        onChange={handleCategoryChange}
                        options={categoryOptions}
                        className="select-fields"
                        placeholder="Select a category"
                        styles={customStyles} // Apply custom styles
                      />
                    </div>
                    <div>
                      <label>Charge By:</label>
                      <Select
                        value={chargeByOptions.find(option => option.value === chargeBy)}
                        onChange={handleChargeByChange}
                        options={chargeByOptions}
                        className="select-fields"
                        placeholder="Select charge by"
                        styles={customStyles} // Apply custom styles
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div>
                      <label>Date Added:</label>
                      <input
                        type="date"
                        value={dateAdded}
                        onChange={(e) => setDateAdded(e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label>Warehouse:</label>
                      <Select
                        value={warehouseOptions.find(option => option.value === warehouse)}
                        onChange={handleWarehouseChange}
                        options={warehouseOptions}
                        className="select-fields"
                        placeholder="Select a warehouse"
                        styles={customStyles} // Apply custom styles
                      />
                    </div>

                    <div>
                      <label>Location:</label>
                      <Select
                        isMulti
                        value={location}
                        onChange={handleLocationChange}
                        options={locationOptions}
                        className="select-fields"
                        placeholder="Select location(s)"
                        styles={customStyles}
                        isDisabled={!warehouse} // Disable if no warehouse is selected
                      />
                    </div>

   
                  </div>

                  {dimensionFields.map((field, index) => (
                    <div className="form-grid" key={index}>
                      <div>
                        <label>Dimension:</label>
                        <div className="dimension-container">
                          <input
                            type="text"
                            value={field.length}
                            onChange={(e) => handleDimensionChange(index, 'length', e.target.value)}
                            className="dimension-input"
                            placeholder="Length"
                          />
                          <input
                            type="text"
                            value={field.width}
                            onChange={(e) => handleDimensionChange(index, 'width', e.target.value)}
                            className="dimension-input"
                            placeholder="Width"
                          />
                          <input
                            type="text"
                            value={field.height}
                            onChange={(e) => handleDimensionChange(index, 'height', e.target.value)}
                            className="dimension-input"
                            placeholder="Height"
                          />
                        </div>
                      </div>
                      <div>
                        <label>Weight (lbs):</label>
                        <input
                          type="number"
                          value={field.weight}
                          onChange={(e) => handleDimensionChange(index, 'weight', e.target.value)}
                          className="input-field"
                          placeholder="Enter weight"
                        />
                      </div>
                      <div>
                        <label>Quantity:</label>
                        <input
                          type="number"
                          value={field.quantity}
                          onChange={(e) => handleDimensionChange(index, 'quantity', e.target.value)}
                          className="input-field"
                          placeholder="Enter quantity"
                        />
                      </div>
                      {index > 0 && (
                        <button 
                          type="button" 
                          className="remove-dimension-button"
                          onClick={() => handleRemoveDimensionFields(index)}
                          aria-label="Remove dimension field"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}

                  <button type="button" className="add-another-button" onClick={handleAddDimensionFields}>
                    + Add Another
                  </button>

                  <div className="form-grid">
                    <div>
                      <label>Bundled Item?</label>
                      <div className="radio-container">
                        <label className="radio-label">
                          <input
                            type="radio"
                            value="yes"
                            checked={bundledItem === "yes"}
                            onChange={() => setBundledItem("yes")}
                            className="radio-input"
                          />
                          Yes
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            value="no"
                            checked={bundledItem === "no"}
                            onChange={() => setBundledItem("no")}
                            className="radio-input"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {bundledItem === "yes" && (
                    <>
                      <div className="form-grid">
                        <div>
                          <label>Bundle Quantity:</label>
                          <input
                            type="number"
                            value={bundleQuantity}
                            onChange={(e) => setBundleQuantity(e.target.value)}
                            className="input-field"
                            placeholder="Enter bundle quantity"
                          />
                        </div>
                        <div>
                          <label>Bundle Product:</label>
                          {bundleProducts.map((bundleProduct, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                value={bundleProduct.product}
                                onChange={(e) => handleBundleProductChange(index, 'product', e.target.value)}
                                className="input-field"
                                placeholder="Enter bundle product"
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <label>Quantity:</label>
                          {bundleProducts.map((bundleProduct, index) => (
                            <div key={index}>
                              <input
                                type="number"
                                value={bundleProduct.quantity}
                                onChange={(e) => handleBundleProductChange(index, 'quantity', e.target.value)}
                                className="input-field"
                                placeholder="Enter quantity"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="form-grid">
                        <div></div> {/* Empty column for alignment */}
                        <div>
                          <button type="button" className="add-another-buttons" onClick={handleAddBundleProductFields}>
                            + Add Another
                          </button>
                        </div>
                        <div></div> {/* Empty column for alignment */}
                      </div>
                    </>
                  )}
                </>
              )}
            </form>
            <div id="buttonContainer" style={styles.buttonContainer}>
                <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
                <GeneralButton text="Add" type="submit" width="100px" height="100%" />
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  buttonContainer: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: '250px',
    textAlign: 'right', // Ensure text & inline elements align
    gap: '20px',
    lineHeight: '40px',
    marginTop: "20px",
    marginRight: "100px",
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
  buttonContainers: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    padding: '8px 10px ',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    marginTop: "14px",
  },
  confirmButton: {
    backgroundColor: 'rgb(14, 116, 144)',  // Updated color
    color: 'white',
    border: '1px solid rgb(14, 116, 144)', // Updated border color
    padding: '8px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s',
    marginTop: "14px",
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginBottom: '10px',
    display: 'block',
  },
};