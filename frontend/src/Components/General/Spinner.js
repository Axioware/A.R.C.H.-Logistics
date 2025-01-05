import React, { useEffect } from "react";

const ApiHandlerComponent = ({
  loading,
  setLoading,
  success,
  setSuccess,
  setStatus,
  url,
}) => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setSuccess(false);

      const response = await fetch(url);

      if (response.status === 200) {
        setStatus(200);
        setLoading(false);
        setSuccess(true);
      } else if (response.status === 400) {
        setStatus(400);
        setLoading(false);
        setSuccess(false);
      } else if (response.status === 500) {
        setStatus(500);
        setLoading(false);
        setSuccess(false);
      } else {
        setStatus(response.status);
        setLoading(false);
        setSuccess(false);
      }
    } catch (error) {
      setStatus(500);
      setLoading(false);
      setSuccess(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px", height: "200px" }}>
      <div className="icon-container">
        {loading ? (
          <div className="spinner">
            <div className="table-spinner"></div>
          </div>
        ) : success ? (
          <div className="success-message">Success! Data fetched.</div>
        ) : (
          <div
            className="refresh-icon"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={fetchData}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20"
              />
            </svg>
          </div>
        )}
      </div>

      <style>
        {`
          .icon-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          }

          .spinner {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .table-spinner {
            border: 5px solid #f3f3f3;
            border-top: 5px solid black; /* Changed color to black */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .success-message {
            font-size: 18px;
            color: green;
            font-weight: bold;
          }

          .refresh-icon {
            cursor: pointer;
          }

          .refresh-icon svg {
            transition: transform 0.3s ease;
          }

          .refresh-icon:hover svg {
            transform: rotate(360deg);
          }
        `}
      </style>
    </div>
  );
};

export default ApiHandlerComponent;
