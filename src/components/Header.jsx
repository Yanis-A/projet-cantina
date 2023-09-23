import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo_sdt_v3.png";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [typePreventMessage, setTypePreventMessage] = useState("");
  const createdRecipeTitle = useSelector(
    (state) => state.globalProps.createdRecipeTitle
  );

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (
        window.location.pathname.includes("add") ||
        window.location.pathname.includes("edit")
      ) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (location.pathname.includes("add")) {
      setTypePreventMessage("la création");
    } else if (location.pathname.includes("edit")) {
      setTypePreventMessage("la modification");
    }
  }, [location.pathname]);

  const handleLinkClick = (e) => {
    if (
      location.pathname.includes("add") ||
      location.pathname.includes("edit")
    ) {
      e.preventDefault();
      setShowConfirmationModal(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmationModal(false);
    window.location.href = "/";
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-center">
        <Link to="/" onClick={handleLinkClick}>
          <img width={350} src={logo} alt="Logo" className="img-fluid" />
        </Link>
      </div>

      <Modal show={showConfirmationModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous vraiment annuler {typePreventMessage} de{" "}
          {createdRecipeTitle ? `"${createdRecipeTitle}"` : "cette recette"} ?
          Cette action est irréversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Header;
