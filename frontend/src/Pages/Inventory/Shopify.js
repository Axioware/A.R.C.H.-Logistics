import React, { useState, useEffect } from "react";
import SideBar from '../../Components/General/Sidebar';
import NavPath from '../../Components/General/NavPath';
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles"; // Importing mainStyles from an external file
import fetchData from '../../utils/fetch_data';
import GeneralButton from '../../Components/General/GeneralButton';

export default function Shopify() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setclearance] = useState(1);
  const [endpoint, setEndpoint] = useState('api/users/');
  const [Store, setStore] = useState('');  // ✅ Moved here
  const [Secret, setSecret] = useState('');  // ✅ Moved here

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

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

          #buttonContainer {
            align-self: flex-end;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            width: 100%;
            max-width: 250px;
            text-align: right;
            gap: 20px;
            line-height: 40px;
            margin-top: 20px;
            margin-right: 100px;
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            .table-top-container {
              margin: 20px auto 10px 20px;
            }

            .form-grid {
              grid-template-columns: repeat(2, 1fr);
              margin: 20px 0px 0px 20px;
            }

            .input-field, .select-fields {
              width: 90%;
            }

            #buttonContainer {
              max-width: 100%;
              margin-right: 20px;
              justify-content: center;
            }

            .nav-path {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
              padding: 10px;
            }

            .nav-path a {
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .form-grid {
              grid-template-columns: 1fr;
              margin: 20px 0px 0px 10px;
            }

            .input-field, .select-fields {
              width: 100%;
            }

            #buttonContainer {
              flex-direction: column;
              align-items: center;
              gap: 10px;
            }

            .nav-path {
              flex-direction: column;
              align-items: flex-start;
              gap: 5px;
              padding: 5px;
            }

            .nav-path a {
              font-size: 12px;
            }
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
            text={["Home", "Setting", "Shopify Shop Integration"]}
            paths={["/home", "/inventory", "/add-inventorys"]}
            width="100%"
            height="50px"
            className="nav-path"
          />

          <div style={mainStyles.AddInputBackground}>
            <div className="table-top-container">
              <PageHeading
                text={'Shopify Shop Integration'}
                width="auto" 
                height="auto"
                sidebar_width="5px"
                sidebar_height="35px"
              />
            </div>

            <form className="inventory-form">
              <div className="form-grid"> 
                <div>
                  <label>Store URL:</label>
                  <input
                    type="text"
                    value={Store}
                    onChange={(e) => setStore(e.target.value)}
                    className="input-field"
                    placeholder="Enter Store URL"
                  />
                </div>
                <div>
                  <label>Secret Key:</label>
                  <input
                    type="text"
                    value={Secret}
                    onChange={(e) => setSecret(e.target.value)}
                    className="input-field"
                    placeholder="Enter Secret Key"
                  />
                </div>
              </div>
            </form>

            <div id="buttonContainer">
              <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
              <GeneralButton text="Save" type="submit" width="100px" height="100%" />
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
    textAlign: 'right',
    gap: '20px',
    lineHeight: '40px',
    marginTop: "20px",
    marginRight: "100px",
  },
};
