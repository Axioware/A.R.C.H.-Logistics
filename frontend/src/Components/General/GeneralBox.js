import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Box Component
export default function Box({
  loading: initialLoading,
  success: initialSuccess,
  background_color,
  color,
  text,
  number,
  id,
  width,
  height,
  className = 'default-box',
  navigateTo = '/', // Parameter for the navigation route
}) {
  const navigate = useNavigate(); // Define navigate using the hook
  const [loadingState, setLoadingState] = useState(initialLoading);
  const [successState, setSuccessState] = useState(initialSuccess);
  const [numberState, setNumberState] = useState(number);

  function rgbArrayToString(rgbArray) {
    if (Array.isArray(rgbArray) && rgbArray.length === 3) {
      const [r, g, b] = rgbArray;
      return `rgb(${r}, ${g}, ${b})`;
    }
    return '#1E3D59';
  }

  const colors = rgbArrayToString(background_color);
  const text_color = rgbArrayToString(color);

  const fetchData = async () => {
    setLoadingState(true);
    setSuccessState(false);

    try {
      const response = await fetch('https://dummyjson.com/products/1');
      if (response.ok) {
        const responseData = await response.json();
        setNumberState(responseData.price || numberState);
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

  useEffect(() => {
    fetchData();
  }, [number]);

  const handleClick = () => {
    navigate(navigateTo); // Navigate to the route specified in navigateTo
  };

  return (
    <div
      id={id}
      className={`custom-box ${className}`}
      onClick={handleClick} // Add click event for navigation
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
          <button
  className="refresh-button"
  onClick={(e) => {
    e.stopPropagation(); // Prevent navigation when the button is clicked
    fetchData();
  }}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24">
    <path
      fill="white"
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
            width: ${width || '40%'};
            height: ${height || '100%'};
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            flex-direction: column;
            position: absolute;
            padding: 20px;
            cursor: pointer; /* Makes the div clickable */
            transition: transform 0.2s, box-shadow 0.2s; /* For hover effect */
          }


          .custom-box:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
            background-color: ${colors || '#FFFFF'};
            color: ${text_color || '#FFFFF'};
            border: none;
            border-radius: 3px;
            padding: 10px;
            cursor: pointer;
          }

          .refresh-button:hover {
            // background-color: #4caf50;
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
            background-color: ${text_color || '#FFFFF'};
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
