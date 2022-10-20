import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";

const Search = (): any => {
  //    let history = useHistory();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  // funcion que actualiza el estado cuando el input cambia
  const inputHandler = (value: string): void => {
    if (value != null) setSearch(value);
  };

  // funcion que actializa la url con parámetro nuevo de busqueda
  const updateSearch = (): void => {
    // si existe parametro en el estado del componente se actualiza la url para busqueda
    if (search != null) navigate(`/items?search=${search}`);
  };

  return (
    <div className="container">
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          updateSearch();
        }}
      >
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>

        <input
          onChange={(e) => {
            inputHandler(e.target.value);
          }}
          type="text"
          placeholder="Nunca dejes de buscar"
        />
        <button type="submit" onSubmit={() => updateSearch()}>
          <img className="searchIcon" src={searchIcon} alt="Submit" />
        </button>
      </form>
    </div>
  );
};

export default Search;
