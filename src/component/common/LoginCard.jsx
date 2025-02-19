import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import favicon from '../../resources/image/pilllaw_favicon.png';

const LoginCard = () => {
  return (
    <>
      <p className="fs-14 fw-bold text-center header-font mt-3">로그인 후 이용하실 수 있습니다.</p>
        <Row>
          <Col xs lg="2"></Col>
          <Col className="text-center">
            <Link to={"/signin"} className="btn btn-pilllaw d-flex text-center"><img className="img-fluid me-2" src={favicon} width="25" alt="아이콘" />PILL LAW 로그인</Link>
            <Link to={"/"} className="fs-11 text-pilllaw fw-bold ms-1">아이디찾기</Link>
            <Link to={"/"} className="fs-11 text-pilllaw fw-bold ms-1">비밀번호찾기</Link>
            <Link to={"/signup"} className="fs-11 text-pilllaw fw-bold ms-1">회원가입</Link>
            <p className="fs-14 text-pilllaw fw-bold mt-2">당신의 건강을 구독하세요!</p>
          </Col>
          <Col xs lg="2"></Col>
        </Row>
    </>
  );
}

export default LoginCard;
