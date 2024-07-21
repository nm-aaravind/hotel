import React from "react";
import ReactDOM from "react-dom";
const ModalWrapper = ({ children, modalVisible , toggleModalVisible }) => {
  if (modalVisible === false) return null;
  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, { toggleModalVisible: toggleModalVisible });
  });
  return ReactDOM.createPortal(
    <div
      onClick={(e) => {
        toggleModalVisible(false);
      }}
      className="fixed z-10 top-0 bottom-0 right-0 backdrop-blur-md left-0 grid place-items-center"
    >
      <div  
        className="bg-white rounded-lg overflow-hidden sm:w-[min(90%,450px)] md:w-[max(500px,28%)] shadow-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {childrenWithProps}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalWrapper;
