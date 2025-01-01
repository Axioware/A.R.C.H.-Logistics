import React, { useState } from "react";
import Spinner from "./Spinner";
import BoxContent from "./BoxContent";

const BoxContentTop = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(null);
  const [url, setUrl] = useState("https://example.com"); // Replace with a valid URL

  return (
    <div>
      {(!loading || loading) && !success ? (
        <Spinner
          loading={loading}
          success={success}
          setLoading={setLoading}
          setSuccess={setSuccess}
          setStatus={setStatus}
          url={url}
        />
      ) : (
        success && <BoxContent />
      )}
    </div>
  );
};

export default BoxContentTop;
