import gif from "../assets/gif_404.gif";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    document.title = "Page introuvable - Saveurs de Tatooine";
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "calc(100vh - 293px)" }}
    >
      <h1>Page introuvable</h1>
      <img src={gif} alt="Perdu" className="img-fluid my-4" />
      {countdown > 1 ? (
        <p>
          Pas de panique! Nous vous ramenons en lieu sûr dans{" "}
          <strong>{countdown - 1}</strong> secondes...
        </p>
      ) : (
        <p>Retour à l&apos;accueil...</p>
      )}
    </div>
  );
}
export default NotFound;
