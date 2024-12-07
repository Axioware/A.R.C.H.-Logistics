import React from "react";
import PropTypes from "prop-types";
import GeneralButton from "../General/GeneralButton"; // Adjust the path as needed

const SessionExpired = ({
  icon,
  heading_text,
  heading_text_color,
  heading_background,
  body_text,
  body_text_color,
  background_color,
  click_outside,
  button_text,
  button_color,
  button_function,
  button_hover_color,
  button_width,
  button_height,
  width,
  height,
}) => {
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
              onClick={button_function}
            />
          </div>
        </div>
      </div>
    </>
  );
};

SessionExpired.propTypes = {
  icon: PropTypes.string, // Path to the icon image
  heading_text: PropTypes.string.isRequired,
  heading_text_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  heading_background: PropTypes.arrayOf(PropTypes.number).isRequired,
  body_text: PropTypes.string.isRequired,
  body_text_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  background_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  click_outside: PropTypes.bool.isRequired,
  button_text: PropTypes.string.isRequired,
  button_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  button_function: PropTypes.func.isRequired,
  button_hover_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  button_width: PropTypes.string.isRequired,
  button_height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default SessionExpired;
