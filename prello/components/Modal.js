import ReactModal from "react-modal";

export default function Modal({isOpen, onClose, children}) {
  return (
      <ReactModal
        shouldCloseOnEsc={true}
        onRequestClose={() => {
          onClose();
        }}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.50)",
            backdropFilter: "blur(1px)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            width: "50%",
            height: "50%",
            margin: "auto",
            backgroundColor: "black",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        isOpen={isOpen}
      >
        {children}
      </ReactModal>
  );
}
