import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  setSearchTitle,
  setSearchPortionsMin,
  setSearchPortionsMax,
  addSearchLevel,
  removeSearchLevel,
  setSearchMaxDuration,
} from "../services/slices";
import { useEffect } from "react";

function Search() {
  const dispatch = useDispatch();

  // Visibilité du collapse
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Récupération des champs de recherche
  const searchFields = useSelector((state) => state.globalProps.searchFields);
  useEffect(() => {
    console.log(searchFields);
  }, [searchFields]);

  // Gestion des champs de recherche
  const title = useSelector((state) => state.globalProps.searchFields.title);
  const portionsMin = useSelector(
    (state) => state.globalProps.searchFields.portions.min
  );
  const portionsMax = useSelector(
    (state) => state.globalProps.searchFields.portions.max
  );
  const level = useSelector((state) => state.globalProps.searchFields.level);
  const maxDuration = useSelector(
    (state) => state.globalProps.searchFields.maxDuration
  );

  // Opération sur les champs de recherche
  const handleTitleChange = (e) => {
    dispatch(setSearchTitle(e.target.value));
  };
  const handlePortionsMinChange = (e) => {
    dispatch(setSearchPortionsMin(parseInt(e.target.value, 10)));
  };
  const handlePortionsMaxChange = (e) => {
    dispatch(setSearchPortionsMax(parseInt(e.target.value, 10)));
  };
  const handleLevelChange = (e) => {
    if (e.target.checked) {
      dispatch(addSearchLevel(e.target.value));
    } else {
      dispatch(removeSearchLevel(e.target.value));
    }
  };
  const handleMaxDurationChange = (e) => {
    dispatch(setSearchMaxDuration(parseInt(e.target.value, 10)));
  };
  // Remise à zéro des champs de recherche
  const resetPortions = () => {
    dispatch(setSearchPortionsMin(null));
    dispatch(setSearchPortionsMax(null));
  };
  const resetMaxDuration = () => {
    dispatch(setSearchMaxDuration(null));
  };

  function preventNonNumericalInput(e) {
    // Empêcher la saisie de caractères non numériques
    if (!/^[0-9]*$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  }
  
  return (
    <div className="d-flex flex-column w-75">
      <div
        title="Formulaire de recherche"
        className="d-flex flex-row align-items-center justify-content-center mb-3"
        style={{ cursor: "pointer" }}
      >
        <button
          type="button"
          className="text-light btn fs-bold fs-5 m-0"
          onClick={toggleVisibility}
          data-bs-toggle="collapse"
          data-bs-target="#searchForm"
          aria-expanded="false"
          aria-controls="searchForm"
        >
          Recherche
          {isVisible ? (
            <i className="bi bi-arrow-up"></i>
          ) : (
            <i className="bi bi-arrow-down"></i>
          )}
        </button>
      </div>
      <div className="collapse" id="searchForm">
        <div className="row">
          <div className="d-flex flex-column col-12">
            {/* Rechercher par titre */}
            <div className="d-flex flex-column align-items-center justify-content-center mb-2">
              <label className="fw-bold mb-1" htmlFor="search">
                Rechercher une recette
              </label>
              <input
              value={title}
                className="form-control me-2"
                style={{ width: "250px" }}
                type="search"
                placeholder="Titre"
                aria-label="Search"
                id="search"
                onChange={handleTitleChange}
              />
            </div>
            {/* Recherche par niveau de difficulté */}
            <div className="d-flex flex-column align-items-center justify-content-center mb-2">
              <p className="fw-bold mb-0">Niveau</p>
              <div className="d-flex flex-row align-items-center justify-content-center">
                <input
                  value={"padawan"}
                  checked={level.includes("padawan")}
                  className="form-check-input mx-2"
                  type="checkbox"
                  id="check1"
                  onChange={handleLevelChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="check1"
                  title="Recette Facile"
                >
                  Padawan
                </label>
                <input
                  value={"jedi"}
                  checked={level.includes("jedi")}
                  className="form-check-input mx-2"
                  type="checkbox"
                  id="check2"
                  onChange={handleLevelChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="check2"
                  title="Recette Intermédiaire"
                >
                  Jedi
                </label>
                <input
                  value={"maitre"}
                  checked={level.includes("maitre")}
                  className="form-check-input mx-2"
                  type="checkbox"
                  id="check3"
                  onChange={handleLevelChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="check3"
                  title="Recette Difficile"
                >
                  Maître
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column col-12">
            {/* Recherche par portions */}
            <div className="d-flex flex-column align-items-center justify-content-center mb-2">
              <p className="fw-bold mb-1">Portions</p>
              <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="mb-0 me-2">Entre</p>
                <input
                  value={portionsMin === null ? '' : portionsMin}
                  type="number"
                  style={{ width: "75px" }}
                  placeholder="Min"
                  min={1}
                  max={11}
                  onKeyDown={preventNonNumericalInput}
                  onChange={handlePortionsMinChange}
                />
                <p className="mb-0 mx-2">et</p>
                <input
                  value={portionsMax === null ? '' : portionsMax}
                  type="number"
                  style={{ width: "75px" }}
                  placeholder="Max"
                  min={2}
                  max={12}
                  onKeyDown={preventNonNumericalInput}
                  onChange={handlePortionsMaxChange}
                />
                <p className="mb-0 ms-2">personnes</p>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-bottom">
                      Supprimer
                    </Tooltip>
                  }
                >
                  <button type="button" onClick={resetPortions} className="btn btn-sm">
                    <i className="bi bi-x-circle text-light"></i>
                  </button>
                </OverlayTrigger>
              </div>
            </div>
            {/* Recherche par durée */}
            <div className="d-flex flex-column align-items-center justify-content-center mb-2">
              <label className="fw-bold mb-1" htmlFor="search">
                Durée max. de préparation
              </label>
              <div className="d-flex flex-row">
                <input
                  value={maxDuration === null ? '' : maxDuration}
                  type="number"
                  title="Durée max. de préparation en minutes"
                  style={{ width: "75px" }}
                  placeholder="Min"
                  min={1}
                  max={180}
                  onKeyDown={preventNonNumericalInput}
                  onChange={handleMaxDurationChange}
                />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-bottom">
                      Supprimer
                    </Tooltip>
                  }
                >
                  <button type="button" onClick={resetMaxDuration} className="btn btn-sm">
                    <i className="bi bi-x-circle text-light"></i>
                  </button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
