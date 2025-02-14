import React from "react";
import FollowHeaderButtonsArea from "./FollowHeaderButtonsArea";
import SendLetterPage from "../letter/SendLetterPage";

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

const FollowList = () => {
  const follows = [
    { id: 1, href: "SendLetterPage", label: "치킨" },
    { id: 2, href: "#", label: "피자" },
    { id: 3, href: "#", label: "딸기모찌" },
    { id: 4, href: "#", label: "재즈맨" },
    { id: 5, href: "#", label: "쿠키" },
    { id: 6, href: "#", label: "초코쿠키" },
    { id: 7, href: "#", label: "딸기쿠키" },
    { id: 8, href: "#", label: "파인애플" },
  ];

  return (
    <div className="container main-content">
    // <div className="wrap">
      <FollowHeaderButtonsArea />
      {/* 상단 버튼 영역 */}
      
      {/* 팔로우 리스트 영역 */}

      

      <div className="list-group m-4">
        {/* <a href="sendletter" className="list-group-item">
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          치킨
        </a> */}
        
        {follows.map((follow) => (
        <a
          key={follow.id}
          href={follow.href}
          className="list-group-item"
        >
          <img
            src="../../resources/followImage/사본 -freepik__adjust__7192.png"
            alt="프로필"
            style={{ marginRight: "8px" }}
          />
          {follow.label}
        </a>
      ))}
      </div>
      </div>
    </div>
    
  );
};

export default FollowList;
