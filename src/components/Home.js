import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";

function Home() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <Jumbotron>
              <h1>Welcome to OMDB applicaton</h1>
              <p>
                Here you can find your movie and rate them.
              </p>
            </Jumbotron>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
