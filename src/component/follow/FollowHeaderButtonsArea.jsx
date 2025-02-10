import React from "react";
import { Container } from "react-bootstrap";

const FollowHeaderButtonsArea = () => {
  return (
  <div className="wrap">
    <Container style={{paddingTop: '115.19px'}} >
    <div className="row">
      <div className="btn-group">
        <button type="button" className="btn btn-pilllaw">
          <a
            className="text-decoration-none text-secondary"
            href="#"
            >
            맞팔로우
          </a>
        </button>
        <button type="button" className="btn btn-pilllaw">
          <a
            className="text-decoration-none text-secondary"
            href="FollowerdList333.html"
            >
            팔로워
          </a>
        </button>
        <button type="button" className="btn btn-pilllaw">
          <a
            className="text-decoration-none text-secondary"
            href="#"
            >
            팔로잉
          </a>
        </button>
      </div>
    </div>
    </Container>
  </div>
  );
};

export default FollowHeaderButtonsArea;
