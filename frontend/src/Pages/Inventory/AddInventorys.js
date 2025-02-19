import React, { useState, useEffect } from "react";
import SideBar from '../../Components/General/Sidebar';
import NavPath from '../../Components/General/NavPath';
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import fetchData from '../../utils/fetch_data';
import GeneralButton from '../../Components/General/GeneralButton';

export default function AddInventory() {
  const [data, setData] = useState([]);
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
  const [location, setLocation] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensionFields, setDimensionFields] = useState([
    { length: '', width: '', height: '', weight: '', quantity: '' }
  ]);
  const [bundleQuantity, setBundleQuantity] = useState('');
  const [bundleProducts, setBundleProducts] = useState([{ product: '', quantity: '' }]);

  const fetchClients = async () => {
    const url = `https://api.example.com/api/clients/`;
    const response = await fetchData(setLoading, setSuccess, url);

    if (response && response.error) {
      setErrorCode(response.error);
    } else if (response) {
      setClientOptions(response);
    }
  };

  useEffect(() => {
    getData();
    fetchClients();
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

  const handleClientChange = (event) => {
    setClientName(event.target.value);
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
            right: 30px;
            top: 50%;
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
                  <select 
                    value={clientName} 
                    onChange={handleClientChange} 
                    className="select-field"
                  >
                    <option value="">Select a client</option>
                    {clientOptions.map((client, index) => (
                      <option key={index} value={client.name}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Product:</label>
                  <select 
                    value={product} 
                    onChange={(e) => setProduct(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select a product</option>
                    {/* Populate options dynamically if needed */}
                  </select>
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
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select a category</option>
                    {/* Populate options dynamically if needed */}
                  </select>
                </div>
                <div>
                  <label>Charge By:</label>
                  <select 
                    value={chargeBy} 
                    onChange={(e) => setChargeBy(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select charge by</option>
                    <option value="weight">Weight</option>
                    <option value="unit">Unit</option>
                  </select>
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
                  <select 
                    value={warehouse} 
                    onChange={(e) => setWarehouse(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select a warehouse</option>
                    {/* Populate options dynamically if needed */}
                  </select>
                </div>
                <div>
                  <label>Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field"
                    placeholder="Enter location"
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
};