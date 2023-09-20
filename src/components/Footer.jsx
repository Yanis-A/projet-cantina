import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-100" style={{height: '60px', backgroundColor: '#101010'}}>
      <div className="d-flex flex-column justify-content-center align-items-center text-center">
        <p className="p-0 m-0">© 2023 - Tous droits réservés</p>
        <Link to={"/about"} className="p-0 m-0 link-light">A propos</Link>
      </div>
    </div>
  );
}

export default Footer;
