import React, { useState } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import CardDeck from "react-bootstrap/CardDeck";
import Spinner from "react-bootstrap/Spinner";

import { useApi } from "../api";
import FilmItem from "./FilmItem";
import Paginator from "./Paginator";

function Search({ location }) {
  const params = queryString.parse(location.search);

  const [searchVal, setSearch] = useState(params.query);
  const [{ data, loading }] = useApi({
    params: { s: params.query, page: params.page }
  });
  const onChangeHandler = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const goToPage = page =>
    history.push(`/search?query=${searchVal}&page=${page}`);

  let history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    if (searchVal.length > 0) history.push(`/search?query=${searchVal}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-5">
        <Spinner
          animation="border"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        />
      </div>
    );
  }

  if (data && data.Response === "False") {
    return (
      <div className="d-flex justify-content-center align-items-center container mt-5">
        <div className="row">
          <div className="col-md-12">
            <Alert className="text-center" variant="warning">
              <strong>{data.Error}</strong>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  const SearchForm = () => (
    <div className="col-md-12 mb-5">
      <Form onSubmit={handleSubmit} inline>
        <FormControl
          size="lg"
          id="search"
          type="text"
          required={true}
          autoFocus={true}
          value={searchVal}
          onChange={onChangeHandler}
          placeholder="Search"
          className="mr-sm-2"
        />
        <Button size="lg" type="submit" variant="outline-info">
          Search
        </Button>
      </Form>
      <br />
      <h4>Search Result for {params.query}</h4>
      <br />
      <h4>Total Result: {data.totalResults}</h4>
    </div>
  );

  return (
    <>
      <div className="d-flex justify-content-center align-items-center container mt-5">
        <div className="row">
          <div className="col-md-12">
            {loading && <h1 className="text-center">Loading...</h1>}
            <SearchForm />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <CardDeck>
            {data.Search.map((item, key) => (
              <FilmItem key={key} {...item} />
            ))}
          </CardDeck>
        </div>
        <div className="d-flex justify-content-center align-items-center container mt-5">
          <Paginator
            itemsCount={data.totalResults}
            active={params.page || 1}
            goToPage={goToPage}
          />
        </div>
      </div>
    </>
  );
}

export default Search;
