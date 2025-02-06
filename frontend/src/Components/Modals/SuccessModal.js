import React from 'react';
import GeneralButton from '../../Components/General/GeneralButton';

const LargeModal = ({ 
    isOpen, 
    onClose, 
    onSave, 
    title, 
    content
    }) => 
    {
  if (!isOpen) return null;

  // Inline styles for the modal
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center', // Center vertically
      justifyContent: 'center', // Center horizontally
      zIndex: 1000,
      opacity: 0,
      animation: 'fadeIn 0.3s forwards'
    },
    modal: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      width: '20%',
      maxWidth: '600px',
      height: 'auto', // Adjusted to auto so content can fit
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transform: 'scale(0.9)',
      animation: 'scaleIn 0.3s forwards',
      display: 'flex', 
      flexDirection: 'column',  // Ensures header, content, and footer are stacked vertically
      justifyContent: 'center', // Center content within the modal
    },
    header: {
      borderBottom: '1px solid LightGrey',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '25px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    content: {
      marginTop:'20px',
      marginBottom: '20px',
      borderTop:'40px',
      borderBottom:'40px',
      borderColor:'rgba(23,23,23)',   
    },
    footer: {
      borderTop: '1px solid LightGrey',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px'
    },
    buttonContainer: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height:'100%', 
          gap: '10px',
          marginTop: '20px',
          lineHeight:'20px',
      },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          {title}
          <button style={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        <div style={styles.content}>
          {content}
        </div>
        <div style={styles.footer}>
          <div id="buttonContainer" style={styles.buttonContainer}>
            <GeneralButton text="Okay" width="80px" height="30px" onClick={onSave} />
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.9); }
            to { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default LargeModal;
