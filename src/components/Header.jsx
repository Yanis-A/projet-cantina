import { Link } from "react-router-dom";
import logo from "../assets/logo_sdt.png";

function Header() {
  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-center">
        <Link to="/">
          <img width={250} src={logo} alt="Logo" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
