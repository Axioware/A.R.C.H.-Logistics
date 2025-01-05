import React, { useState } from "react";
import Spinner from "./Spinner";
import BoxContent from "./BoxContent";

const BoxContentTop = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [status, setStatus] = useState(null);
  const [url, setUrl] = useState("https://example.com"); // Replace with a valid URL

  

  const containerStyle = {
    backgroundColor: '#f7f6f6',
    // padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // height: '100%',
    // boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={{ position: "relative",  }}>
      {(loading || (!loading && !success)) ? (
        
          <div
            style={{
              position: "relative",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              backgroundColor: "#f7f6f6", 
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',

            }}
          >
           
            

            <Spinner
              loading={loading}
              success={success}
              setLoading={setLoading}
              setSuccess={setSuccess}
              setStatus={setStatus}
              url={url}
            />
              </div>
            
           
      
      ) : (
        
        <div style={containerStyle}>
          <BoxContent />
        </div>
      )}
    </div>
  );
};

export default BoxContentTop;
