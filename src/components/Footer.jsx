import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-100" style={{height: '60px', backgroundColor: '#aea193'}}>
      <div className="d-flex flex-column justify-content-center align-items-center text-center text-dark">
        <p className="p-0 m-0">© 2023 - Tous droits réservés</p>
        {/* <a onClick={() => navigate("/about")} className="p-0 m-0 link-dark">A propos</a> */}
        <Link to={"/about"} className="p-0 m-0 link-dark">A propos</Link>
      </div>
    </div>
  );
}

export default Footer;
