import PropTypes from "prop-types";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from 'react-bootstrap/Modal';
function RecipeCardButtons({ id, title, tooltipPosition }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <OverlayTrigger
        placement={tooltipPosition || "top"}
        overlay={<Tooltip id={`tooltip-${tooltipPosition || "top"}`}>Modifier la recette</Tooltip>}
      >
        <button
          className="btn btn-light btn-sm"
          onClick={() => navigate(`/recipe/edit/${id}`)}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        placement={tooltipPosition || "top"}
        overlay={<Tooltip id={`tooltip-${tooltipPosition || "top"}`}>Supprimer la recette</Tooltip>}
      >
        <button
          type="button"
          className="btn btn-danger btn-sm mt-1"
          onClick={handleShow}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </OverlayTrigger>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Veuillez confirmer la suppression de la recette &quot;{title}&quot;</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => alert("Suppression de la recette")}
          >
            Supprimer
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

RecipeCardButtons.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tooltipPosition: PropTypes.string,
};

export default RecipeCardButtons;
