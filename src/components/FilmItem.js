import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function FilmItem({ Title, Year, Type, Poster, imdbID, MyRate }) {
  return (
    <div className="col-md-4 col-sm-6 d-flex align-items-stretch mb-2">
      <Card>
        <Card.Img style={{ maxHeight: "380px" }} variant="top" src={Poster} />
        <Card.Body>
          <Card.Title>{Title}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Year: {Year}</ListGroupItem>
          <ListGroupItem>Type: {Type}</ListGroupItem>
          {MyRate && <ListGroupItem>My Rate: {MyRate}</ListGroupItem>}
          <ListGroupItem>
            <Link className="card-link" to={`/detail/${imdbID}`}>
              See More
            </Link>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

export default FilmItem;
