import React from "react";
import FollowHeaderButtonsArea from "./FollowHeaderButtonsArea";

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

const FollowListt = () => {
  return (
    
    // <div className="wrap">
    <div>
      <FollowHeaderButtonsArea />
       {/* <Container style={{paddingTop: '115.19px'}}>
      <img className="img-fluid p-0 pb-2" src={mainImage} alt="메인이미지" />
        <Row>
        <Col xs lg="9" className="mx-2">
        </Col>
      
        </Row> */}
      
      {/* 상단 버튼 영역 */}
      {/* </Container> */}
      
      {/* 팔로우 리스트 영역 */}
      <div className="list-group m-4">
        <a href="#" className="list-group-item">
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          치킨
        </a>
        <a href="#" className="list-group-item">
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          피자
        </a>
        <a href="#" className="list-group-item">
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          딸기모찌
        </a>
        <a href="#" className="list-group-item">
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          재즈맨
        </a>
        <a href="#" className="list-group-item">
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          쿠키
        </a>
        <a href="#" className="list-group-item">
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          초코쿠키
        </a>
        <a href="#" className="list-group-item">
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          딸기쿠키
        </a>
        <a href="#" className="list-group-item">
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          파인애플
        </a>
      </div>
    </div>
  );
};

export default FollowListt;
