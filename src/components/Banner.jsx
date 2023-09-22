import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function Banner({ type, message, uuid }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(true);

    const timerId = setTimeout(() => {
      setShowBanner(false);
    }, 4000);

    return () => {
      clearTimeout(timerId);
    };
  }, [type, message, uuid]);

  const handleClose = () => {
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  let iconClassName = "";
  switch (type) {
    case "info":
      iconClassName = "bi bi-info-circle-fill";
      break;
    case "success":
      iconClassName = "bi bi-check-circle-fill";
      break;
    case "warning":
      iconClassName = "bi bi-exclamation-triangle-fill";
      break;
    case "danger":
      iconClassName = "bi bi-x-circle";
      break;
    default:
      break;
  }

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show position-fixed top-0 start-0 end-0 w-75 mx-auto mt-3 text-start`}
      style={{ zIndex: 9999 }}
      role="alert"
    >
      <span className="me-2">
        <i className={iconClassName}></i>
      </span>
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={handleClose}
      ></button>
    </div>
  );
}

Banner.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired, // Propriété UUID pour différencier les appels
};

export default Banner;
