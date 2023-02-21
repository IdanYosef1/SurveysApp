import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsTrash } from "react-icons/bs";

function ModalBox({
  callback,
  exitOrDelete,
  disabled,
  buttonName,
  buttonStyle,
}) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {buttonName === "deleteAll" ? (
        <button
          onClick={handleShow}
          disabled={disabled}
          className={buttonStyle}
        >
          <BsTrash size="20" />
        </button>
      ) : (
        <button className={buttonStyle} onClick={handleShow}>
          {buttonName}
        </button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure you want to {exitOrDelete}?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              callback();
              handleClose();
            }}
          >
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBox;
