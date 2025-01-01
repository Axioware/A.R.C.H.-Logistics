import React, { useState } from "react";
import Spinner from "../Components/General/Spinner";

const Asad = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(null);
  const [url, setUrl] = useState("https://example.com"); // Replace with a valid URL

  return (
    <div>
      <Spinner
        loading={loading}
        success={success}
        setLoading={setLoading}
        setSuccess={setSuccess}
        setStatus={setStatus}
        url={url}
      />
    </div>
  );
};

export default Asad;
