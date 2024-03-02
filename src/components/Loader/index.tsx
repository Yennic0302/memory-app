import ReactDOM from "react-dom";
import "./style.css";
const Modal = () => {
  return ReactDOM.createPortal(
    <div className="loading">
      <img src="/imgs/loader.gif" alt="loader" />
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
