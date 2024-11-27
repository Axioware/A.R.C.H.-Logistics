import React, { useState, useEffect } from 'react';

// Box Component
export default function Box({
  loading: initialLoading,
  success: initialSuccess,
  color,
  text,
  number,
  id,
  width,
  height,
  className = 'default-box',
}) {
  const [loadingState, setLoadingState] = useState(initialLoading);
  const [successState, setSuccessState] = useState(initialSuccess);
  const [numberState, setNumberState] = useState(number);

  function rgbArrayToString(rgbArray) {
    if (Array.isArray(rgbArray) && rgbArray.length === 3) {
      const [r, g, b] = rgbArray;
      return `rgb(${r}, ${g}, ${b})`;
    }
    // Return default color if input is invalid
    return '#1E3D59'; 
  }

  const colors = rgbArrayToString(color);

  const fetchData = async () => {
    setLoadingState(true);
    setSuccessState(false);

    try {
      // Simulate an async API call
      const response = await fetch('https://dummyjson.com/products/1');
      if (response.ok) {
        const responseData = await response.json();
        setNumberState(responseData.price || numberState); // Update number with API response
        setSuccessState(true);
      } else {
        setSuccessState(false);
      }
    } catch (error) {
      setSuccessState(false);
    } finally {
      setLoadingState(false);
    }
  };

  // Fetch data when the component mounts or when relevant props change
  useEffect(() => {
    fetchData();
  }, [number]); // Optional: You could also include other props that might trigger a re-fetch

  return (
    <div
      id={id}
      className={`custom-box ${className}`} // Apply the user-defined className
      style={{
        width: width,
        height: height,
        backgroundColor: color || '#1E3D59', // Use the passed color, fallback to default
      }}
    >
      {loadingState ? (
        <div className="bouncing-dots">
          <div className="bouncing-dot"></div>
          <div className="bouncing-dot"></div>
          <div className="bouncing-dot"></div>
        </div>
      ) : successState ? (
        <>
          <div className="number-display">{numberState}</div>
          <div className="text-display">{text}</div>
        </>
      ) : (
        <div>
          <button className="refresh-button" onClick={fetchData}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20"
              />
            </svg>
          </button>
        </div>
      )}
      <style>
        {`
          .custom-box {
            background-color: ${colors || '#1E3D59'}; 
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            flex-direction: column;
            position: relative;
            padding: 20px;
            width: 100%; 
          }

          .number-display {
            font-size: 28px;
          }

          .text-display {
            font-size: 17px;
          }

          .refresh-button {
            position: relative;
            top: 0%;
            right: 0%;
            background-color: #1E3D59;
            color: #FFFFFF;
            border: none;
            border-radius: 3px;
            padding: 10px;
            cursor: pointer;
          }

          .refresh-button:hover {
            background-color: #4caf50;
          }

          .bouncing-dots {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }

          .bouncing-dot {
            width: 8px;
            height: 8px;
            margin: 0 4px;
            background-color: #1D4ED8;
            border-radius: 50%;
            animation: bounce 1.2s infinite ease-in-out;
          }

          .bouncing-dot:nth-child(1) {
            animation-delay: 0s;
          }

          .bouncing-dot:nth-child(2) {
            animation-delay: 0.2s;
          }

          .bouncing-dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}
