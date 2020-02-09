import React, { useState } from "react";

import Alert from "react-bootstrap/Alert";
import CardDeck from "react-bootstrap/CardDeck";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import { useLocalStorage, sortBy } from "../utils";
import FilmItem from "./FilmItem";

function MyMovies() {
  const [myMovies] = useLocalStorage("myMovies", {});
  const [movieList, setMovieList] = useState(myMovies);
  const [value, setValue] = useState("");

  const handleChange = val => {
    let sortedMovie;
    if (val === "name") {
      sortedMovie = movieList.sort(
        sortBy("Title", false, a => a.toUpperCase())
      );
    }
    if (val === "myRate") {
      sortedMovie = movieList.sort(sortBy("MyRate", false, parseInt));
    }
    setValue(val);
    setMovieList(sortedMovie);
  };

  return (
    <div className="d-flex justify-content-center align-items-center container mt-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <strong>Sort By: </strong>
          <ToggleButtonGroup
            type="radio"
            name="sort"
            value={value}
            onChange={handleChange}
          >
            <ToggleButton value="name">Name</ToggleButton>
            <ToggleButton value="myRate">My Rates</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="col-md-12">
          {myMovies.length === 0 ? (
            <Alert variant="warning">There is no movie yet.</Alert>
          ) : (
            <CardDeck>
              {movieList.map((item, key) => (
                <FilmItem key={key} {...item} />
              ))}
            </CardDeck>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyMovies;
