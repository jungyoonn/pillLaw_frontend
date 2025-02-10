import React from 'react';
import '../../resources/css/style.css';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../resources/image/pilllaw_icon.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className='pilllaw-footer'>
      <Container className="container-fluid">
        <hr className="text-pilllaw" />
        <div className="container clearfix mb-4">
          <Row>
            <Col xs lg="3">
              <Link to={"/"}><img src={logo} className="img-fluid" alt="footer logo" width="200" /></Link>
            </Col>
            <Col className="mt-3">
              <p className="fs-14 header-font fw-bold mb-0">상호명: PILL LAW</p>
              <p className="fs-14 header-font fw-bold mb-0">주소: 서울특별시 구로구 디지털로 306 대륭포스트타워 2차</p>
              <p className="fs-14 header-font fw-bold mb-0">고객센터: 010-5306-3569</p>
              <p className="fs-14 header-font fw-bold mb-0">계좌번호: 국민 040002-04-207375</p>
            </Col>
            <Col xs lg="2"></Col>
            <Col className="mt-3 text-center">
              <div className=" clearfix">
                <div className=" float-start">
                  <Link to={"/"} className="header-font text-decoration-none fw-bold"><FontAwesomeIcon icon={faGithub} className="fa-2xl header-font" /></Link>
                  <Link to={"/"} className="header-font text-decoration-none fw-bold fs-14"><br />GitHub 방문하기</Link>
                </div>
                <div className="mt-3">
                  <Link to={"/"} className="header-font text-decoration-none fw-bold"><FontAwesomeIcon icon={faDatabase} className="fa-2xl header-font" /></Link>
                  <Link to={"/"} className="header-font text-decoration-none fw-bold fs-14"><br />ERD diagram</Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col />
            <Col>
              <p className="fs-14 header-font text-center mb-2">개인정보 처리방침</p>
            </Col>
            <Col>
              <p className="fs-14 header-font text-center mb-2">이용약관</p>
            </Col>
            <Col>
              <p className="fs-14 header-font text-center mb-2">이용안내</p>
            </Col>
            <Col />
          </Row>
          <p className="fs-14 header-font text-center fw-bold mb-2">All rights resereved PILLLAW &copy; copyright.</p>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
