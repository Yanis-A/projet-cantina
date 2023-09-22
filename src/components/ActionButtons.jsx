import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import { deleteRecipe, fetchRecipes } from "../services/service";
import { useDispatch } from "react-redux";
import { setBanner, setRecipes } from "../services/slices";
function ActionButtons({ id, title, isVertical, tooltipPosition }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  function onClickDelete() {
    deleteRecipe(id)
      .then((data) => {
        handleClose();
        dispatch(setBanner({ type: "success", message: data.message, uuid: crypto.randomUUID() }));
        fetchRecipes()
          .then((recipes) => {
            dispatch(setRecipes(recipes));
          })
          .catch((error) => {
            dispatch(setBanner({ type: "danger", message: error.message, uuid: crypto.randomUUID() }));
          });
  
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        handleClose();
        dispatch(setBanner({ type: "danger", message: error.message, uuid: crypto.randomUUID() }));
      });
  }
  

  return (
    <>
      <OverlayTrigger
        placement={tooltipPosition || "top"}
        overlay={
          <Tooltip id={`tooltip-${tooltipPosition || "top"}`}>
            Modifier la recette
          </Tooltip>
        }
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
        overlay={
          <Tooltip id={`tooltip-${tooltipPosition || "top"}`}>
            Supprimer la recette
          </Tooltip>
        }
      >
        <button
          type="button"
          className={"btn btn-danger btn-sm" + (isVertical ? " mt-1" : " ms-1")}
          onClick={handleShow}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </OverlayTrigger>
      {/* Modal de suppression */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Veuillez confirmer la suppression de la recette &quot;{title}&quot;
        </Modal.Body>
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
            onClick={onClickDelete}
          >
            Supprimer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ActionButtons.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isVertical: PropTypes.bool.isRequired,
  tooltipPosition: PropTypes.string,
};

export default ActionButtons;
