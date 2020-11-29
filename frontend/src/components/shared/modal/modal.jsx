import React from 'react';
import './modal.css';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Container from "@material-ui/core/Container";

const Modal = ({modalTitle, modalContent, handleClose, open}) => {

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="xs" fullWidth={false}>
            <Container className="modal-container">
                <DialogTitle id="simple-dialog-title">{modalTitle}</DialogTitle>
                {modalContent}
            </Container>
        </Dialog>
    );
};

export default Modal;
