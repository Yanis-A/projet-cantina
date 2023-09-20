import PropTypes from "prop-types";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { convertToHours } from "../services/utils.js";

function RecipeDuration({ duration, tooltipPosition }) {
  return (
    <OverlayTrigger
        placement={tooltipPosition || "top"}
        overlay={
          <Tooltip id={`tooltip-${tooltipPosition || "top"}`}>
            Temps de cuisson: {convertToHours(duration)}
          </Tooltip>
        }
      >
        <div className="mt-1">
          <i className="bi bi-clock-fill"></i>&nbsp;
          {convertToHours(duration)}
        </div>
      </OverlayTrigger>
  );
}

RecipeDuration.propTypes = {
  duration: PropTypes.number.isRequired,
  tooltipPosition: PropTypes.string,
};

export default RecipeDuration;
