import React, { useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import MyInfo from './myPageChildren/MyInfo';
import OrderList from './myPageChildren/OrderList';
import PointList from './myPageChildren/PointList';
import ModifyInfo from './myPageChildren/ModifyInfo';
import FollowApp from '../follow/test/FollowApp';
// import FollowList from '../follow/layout/FollowList';

const MyPageLayout = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("myinfo");
  const memberId = localStorage.getItem("mno");  // 로그인된 회원번호 가져오기


  // 현재 activeKey에 따라 다른 컴포넌트 렌더링
  const renderContent = () => {
    console.log('renderContent called, activeKey:', activeKey);
    switch (activeKey) {
      case "myinfo":
        return <MyInfo activeKey={activeKey} setActiveKey={setActiveKey} />;
      case "edit-info":
        return <ModifyInfo activeKey={activeKey} />
      case 'followapp':
        return <FollowApp activeKey={activeKey} />
      case 'orders':
        return <OrderList memberId={memberId} />;  
      case 'points':
        return <PointList memberId={memberId} />;  
      default:
        return <div>선택된 메뉴가 없습니다.</div>;
    }
  };

  return (
    <Container style={{ paddingTop: '115.19px' }}>
      <Row>
        <Col xs="1" lg="2" />
        <Col xs="1" lg="1" className='text-center'>
          <Link to={"#"} onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}>
            <FontAwesomeIcon icon={faArrowLeft} className='fa-xl text-pilllaw' />
          </Link>
        </Col>
        <Col className='text-center'>
          <h4 className='text-pilllaw fw-bold'>마이 페이지</h4>
        </Col>
        <Col xs="1" lg="1" className='text-center'>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} className='fa-xl text-pilllaw' />
          </Link>
        </Col>
        <Col xs="1" lg="2" />
      </Row>
      <Row className='mt-5'>
        <Col xs="1" lg="2" className='text-center'>
          <Nav
            activeKey={activeKey}
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
            className="flex-column text-pilllaw custom-nav"
            variant="tabs">
            <Nav.Link eventKey="myinfo">내 정보</Nav.Link>
            <Nav.Link eventKey="edit-info">내 정보 수정</Nav.Link>
            <br />
            <Nav.Link eventKey="orders">주문내역 조회</Nav.Link>  {/* 주문내역 추가 */}
            <Nav.Link eventKey="points">포인트 사용 이력</Nav.Link>
            <Nav.Link eventKey="link-2">구독 내역</Nav.Link>
            <Nav.Link eventKey="link-2">즐겨찾기 상품</Nav.Link>
            <Nav.Link eventKey="link-2">내 후기 모아보기</Nav.Link>
            <br />
            <Nav.Link eventKey="link-2">보낸 쪽지</Nav.Link>
            <Nav.Link eventKey="link-2">받은 쪽지</Nav.Link>
            <Nav.Link eventKey="followapp">팔로우 / 팔로워</Nav.Link>
            <br />
            <Nav.Link eventKey="link-2">로그아웃</Nav.Link>
            <Nav.Link eventKey="link-2">회원 탈퇴</Nav.Link>
          </Nav>
        </Col>
        <Col>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default MyPageLayout;
