import { useState } from "react";

function Search() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <p onClick={toggleVisibility}>Recherche</p>
        {isVisible ? (
          <i className="bi bi-arrow-up"></i>
        ) : (
          <i className="bi bi-arrow-down"></i>
        )}
      </div>
      <div>
        {isVisible && (
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Rechercher une recette"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Rechercher
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
