import React from "react";

// import Row from 'react-bootstrap/Row';
// import mainImage from '../../resources/image/main_image_2.jpg';
// import favicon from '../../resources/image/pilllaw_favicon.png';
// import product1 from '../../resources/image/product1.jpg';
// import product2 from '../../resources/image/product2.jpg';
// import tag1 from '../../resources/image/main_tag1.png';
// import tag2 from '../../resources/image/main_tag2.png';
// import tag4 from '../../resources/image/main_tag4.png';
// import tag6 from '../../resources/image/main_tag6.png';
// import tag7 from '../../resources/image/main_tag7.png';
// import slider from '../../resources/image/main_slider.jpg';
// import { Col, Container } from "react-bootstrap";

const FollowHeaderButtonsArea = () => {
  return (
    <div className="row">
      <div className="btn-group">
        <button type="button" className="btn btn-pilllaw disabled">
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
  );
};

export default FollowHeaderButtonsArea;
