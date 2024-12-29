import React from "react";
import PropTypes from "prop-types";
import GeneralButton from "../General/GeneralButton"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

const SessionExpired = ({
  icon,
  heading_text,
  heading_text_color  = [233, 233, 233],
  heading_background = [23, 23, 23],
  body_text,
  body_text_color  = [100, 100, 100],
  background_color = [255, 255, 255],
  click_outside,
  button_text,
  button_color = [23, 23, 23],
  button_hover_color  = [100, 100, 100],
  button_width,
  button_height,
  width,
  height,
}) => {

  const navigate = useNavigate();

  const button_function = () => {
    navigate('/login');
  }
  const closemodal = () => {
    if (click_outside) {
      button_function(); // Close modal when clicking outside
    }
  };

  return (
    <>
      {/* Modal Styles */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
          }

          .modal-container {
            background-color: rgb(${background_color.join(",")});
            width: ${width};
            height: ${height};
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .modal-header {
            background-color: rgb(${heading_background.join(",")});
            color: rgb(${heading_text_color.join(",")});
            padding: 16px;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .modal-header img {
            width: 50px;
            height: 50px;
            margin-bottom: 10px;
          }

          .modal-body {
            margin-top: 25px;
            flex: 1;
            color: rgb(${body_text_color.join(",")});
            padding: 16px;
            font-size: 1rem;
            text-align: center;
            white-space: pre-wrap; /* Preserve line breaks */
            overflow-y: auto; /* Enable scrolling if content overflows */
          }

          .modal-footer {
            padding: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>

      <div
        className="modal-overlay"
        onClick={click_outside ? closemodal : undefined}
      >
        <div
          className="modal-container"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Modal Header */}
          <div className="modal-header">
            {icon && <img src={icon} alt="Icon" />}
            {heading_text}
          </div>

          {/* Modal Body */}
          <div className="modal-body">{body_text}</div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <GeneralButton
              text={button_text}
              color={button_color}
              hoverColor={button_hover_color}
              width={button_width}
              height={button_height}
              func={button_function}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionExpired;
