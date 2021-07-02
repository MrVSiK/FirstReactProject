import Classes from "./Modal.module.css"
import React from "react"
import ReactDOM from "react-dom"

const Backdrop = props =>{
    return <div className={Classes.backdrop} onClick={props.onClose} ></div>
}

const ModalOverlay = props =>{
    return <div className={Classes.modal}>
        <div className={Classes.content}>{props.children}</div>
    </div>
}

const Modal = props =>{
    return <React.Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, document.getElementById("overlays"))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById("overlays"))}
    </React.Fragment>
};

export default Modal;