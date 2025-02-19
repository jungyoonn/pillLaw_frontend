import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faCoins, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from './Button';

const ProfileCard = ({onLogout, nickname}) => {
  const handleClick = (e) => {
    e.preventDefault();

    try {
      onLogout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <Row>
        <Col xs lg="1" className="float-start p-2 pe-0 ms-4"><FontAwesomeIcon icon={faUser} className="fa-xl header-font" /></Col>
        <Col className="mt-2 ms-1">
          <span className="fs-16 fw-bold">{nickname + ' ' || '익명의 사용자 '} </span>
          <span className="fs-14">님, 환영합니다!</span>
        </Col>
        <Col xs lg="2" className="float-end p-2 me-2"><Link to={"/"} className="text-decoration-none"><FontAwesomeIcon icon={faGear} className="fa-xl header-font" /></Link></Col>
      </Row>
      <Row className="card-body p-0">
        <Col xs lg="7">
          <div className="px-2 ms-4 mb-0 fs-14"><FontAwesomeIcon icon={faCoins} className="fw-bold header-font me-1" />&nbsp;포인트 1500p</div>
          <div className="px-2 ms-4 mt-0 fs-14"><FontAwesomeIcon icon={faPaperPlane} className="fw-bold header-font me-1" />&nbsp;쪽지 0개</div>
        </Col>
        <Col className="mt-2">
          <Button variant='pilllaw' className="btn btn-pilllaw fs-14" onClick={handleClick} >로그아웃</Button>
        </Col>
      </Row>
      <Row className="row mt-4 d-flex justify-content-center">
        <Col>
          <p className="fs-14 fw-bold text-center ms-2"><Link to={"/"} className="text-pilllaw" >팔로잉 15명</Link></p>
        </Col>
        <Col>
          <p className="fs-14 fw-bold text-center me-2"><Link to={"/"} className="text-pilllaw">팔로워 20명</Link></p>
        </Col>
      </Row>
    </>
  );
}

export default ProfileCard;
