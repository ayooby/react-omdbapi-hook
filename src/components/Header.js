import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";

function Header() {
  const [searchVal, setSearch] = useState("");
  let history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    if (searchVal.length > 0) history.push(`/search?query=${searchVal}`);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>React OMDB</Navbar.Brand>
        <Nav className="mr-auto">
          <Link
            className="nav-link"
            to="/"
          >
            Home
          </Link>
          <Link
            className="nav-link"
            to="my-movies"
          >
            My Movie
          </Link>
        </Nav>
        <Form onSubmit={handleSubmit} inline>
          <FormControl
            type="text"
            required={true}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button type="submit" variant="outline-info">
            Search
          </Button>
        </Form>
      </Navbar>
    </>
  );
}

export default Header;
