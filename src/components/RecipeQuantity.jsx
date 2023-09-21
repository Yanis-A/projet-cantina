import PropTypes from "prop-types";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function RecipeQuantity({ quantity, tooltipPosition }) {
  return (
    <OverlayTrigger
        placement={tooltipPosition || "top"}
        overlay={
          <Tooltip id={`tooltip-${tooltipPosition || "top"}`}>Pour {quantity} {quantity === 1 ? "personne" : "personnes"}</Tooltip>
        }
      >
        <div className="mt-1">
          {quantity}&nbsp;
          <i className="bi bi-person-fill"></i>
        </div>
      </OverlayTrigger>
  );
}

RecipeQuantity.propTypes = {
  quantity: PropTypes.number.isRequired,
  tooltipPosition: PropTypes.string,
};

export default RecipeQuantity;
