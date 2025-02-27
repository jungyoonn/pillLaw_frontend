import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const FollowHeaderButtonsArea = () => {
  return (
  <div className="wrap">
    <Container style={{paddingTop: '115.19px'}} >
    <div className="row">
      <div className="btn-group">
        <button type="button" className="btn btn-pilllaw">
          <Link to="/followList" className="text-decoration-none text-secondary">
            맞팔로우
          </Link>
        </button>
        <button type="button" className="btn btn-pilllaw">
          <Link to="/followersList" className="text-decoration-none text-secondary">
            팔로워
          </Link>
        </button>
        <button type="button" className="btn btn-pilllaw">
          <Link to="/followingList" className="text-decoration-none text-secondary">
            팔로잉
          </Link>
        </button>
      </div>
    </div>
    </Container>
  </div>
  );
};

export default FollowHeaderButtonsArea;
