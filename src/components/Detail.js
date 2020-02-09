import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useApi } from "../api";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useLocalStorage } from "../utils";

function Detail() {
  let { id } = useParams();

  const [myMovies, setMyMovies] = useLocalStorage("myMovies", {});
  const currentItemIndex = myMovies.findIndex(item => item.imdbID === id);
  let currentItem = currentItemIndex > -1 ? myMovies[currentItemIndex] : "";
  const [rateVal, setRate] = useState(currentItem.MyRate);

  const [{ data, loading, error }] = useApi({
    params: { i: id }
  });

  const setMyRate = rate => {
    if (currentItemIndex === -1) {
      const movie = { ...data, MyRate: rate };
      myMovies.push(movie);
    } else {
      myMovies[currentItemIndex].MyRate = rate;
    }
    setMyMovies(myMovies);
    setRate(rate);
  };

  if (loading) {
    return <h1 className="text-center mt-5">Loading ...</h1>;
  }

  if (error) {
    return (
      <h1 className="text-center text-danger mt-5">Something went wrong!</h1>
    );
  }

  if (data.Response === "False") {
    return <h1 className="text-center text-danger mt-5">{data.Error}</h1>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center container mt-5">
      <div className="row">
        <div className="col-md-12">
          <Card>
            <Card.Header>{data.Title}</Card.Header>
            <Card.Img variant="top" src={data.Poster} />
            <Card.Body>
              <Card.Title>{data.Title}</Card.Title>
              <Card.Text>{data.Plot}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Movie Rate: {data.imdbRating}</ListGroupItem>
              <ListGroupItem>Type: {data.Type}</ListGroupItem>
              <ListGroupItem>Genre: {data.Genre}</ListGroupItem>
              <ListGroupItem>
                <Form.Group>
                  <Form.Label>My Rate:</Form.Label>
                  <Form.Control
                    onChange={e => setMyRate(e.target.value)}
                    value={rateVal}
                    as="select"
                  >
                    <option>Not Rated</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Form.Control>
                </Form.Group>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Detail;
