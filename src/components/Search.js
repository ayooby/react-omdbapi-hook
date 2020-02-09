import React, { useState } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import CardDeck from "react-bootstrap/CardDeck";

import { useApi } from "../api";
import FilmItem from "./FilmItem";

function Search({ location }) {
  const params = queryString.parse(location.search);

  const [searchVal, setSearch] = useState(params.query);
  const [{ data, loading }] = useApi({
    params: { s: params.query }
  });

  let history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    if (searchVal.length > 0) history.push(`/search?query=${searchVal}`);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center container mt-5">
        <div className="row">
          <div className="col-md-12">
            <Form onSubmit={handleSubmit} inline>
              <FormControl
                size="lg"
                type="text"
                required={true}
                value={searchVal}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button size="lg" type="submit" variant="outline-info">
                Search
              </Button>
            </Form>
            <div className="col-md-12 mt-5">
              <h4>Search Result for {params.query}</h4>
              {data && data.totalResults && (
                <h4>Total Result: {data.totalResults}</h4>
              )}
            </div>
            {loading && <h1 className="text-center">Loading...</h1>}
            {data && data.Response === "False" && (
              <Alert className="text-center" variant="warning">
                <strong>{data.Error}</strong>
              </Alert>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <CardDeck>
            {data &&
              data.Search &&
              data.Search.map((item, key) => <FilmItem key={key} {...item} />)}
          </CardDeck>
        </div>
      </div>
    </>
  );
}

export default Search;
