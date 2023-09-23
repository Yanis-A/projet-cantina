import { OverlayTrigger, Tooltip } from "react-bootstrap";

function RequiredField() {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Champ obligatoire</Tooltip>}
    >
      <span className="text-danger">*</span>
    </OverlayTrigger>
  );
}

export default RequiredField;
