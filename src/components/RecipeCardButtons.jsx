import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenedPopoverId } from "../services/slices";
import ActionButtons from "./ActionButtons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Popover } from "react-bootstrap";
function RecipeCardButtons({
  id,
  title,
  isOnPopover,
  isVertical,
  tooltipPosition,
}) {
  const dispatch = useDispatch();
  const openedPopoverId = useSelector(
    (state) => state.globalProps.openedPopoverId
  );
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (openedPopoverId !== id) {
      setShowPopover(false);
    }
  }, [openedPopoverId, id]);

  const togglePopover = () => {
    if (openedPopoverId === null) {
      setShowPopover(true);
      dispatch(setOpenedPopoverId(id));
    } else if (openedPopoverId === id) {
      setShowPopover(false);
      dispatch(setOpenedPopoverId(null));
    } else if (openedPopoverId !== id) {
      setShowPopover(true);
      dispatch(setOpenedPopoverId(id));
    }
  };
  const popover = (
    <Popover id="popover-basic" style={{ zIndex: "1000" }}>
      <Popover.Body>
        <ActionButtons
          id={id}
          title={title}
          isVertical={isVertical}
          tooltipPosition={tooltipPosition}
        />
      </Popover.Body>
    </Popover>
  );
  return (
    <div
      className={
        "d-flex justify-content-center align-items-center" +
        (isVertical ? " flex-column mt-2" : " flex-row")
      }
    >
      {isOnPopover ? (
        <OverlayTrigger
          trigger="click"
          placement="left"
          overlay={popover}
          show={showPopover}
        >
          <button
            type="button"
            className="btn text-white"
            onClick={togglePopover}
            style={{ backgroundColor: "transparent" }}
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </OverlayTrigger>
      ) : (
        <ActionButtons
          id={id}
          title={title}
          isVertical={isVertical}
          tooltipPosition={tooltipPosition}
        />
      )}
    </div>
  );
}

RecipeCardButtons.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isOnPopover: PropTypes.bool.isRequired,
  isVertical: PropTypes.bool.isRequired,
  tooltipPosition: PropTypes.string,
};

export default RecipeCardButtons;
