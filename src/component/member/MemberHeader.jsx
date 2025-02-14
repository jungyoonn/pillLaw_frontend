import React from 'react';
import logo from '../../resources/image/pilllaw_icon_crop.png';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const MemberHeader = () => {
  return (
    <>
      <Row className='mt-5'>
        <Col xs="3" lg="4" />
        <Col xs="1" lg="1">
          <Link to={"/"}>
            <img src={logo} className="img-fluid header-icon" alt="아이콘" />
          </Link>
        </Col>
        <Col className='mt-4'>
          <h2 className="d-inline">
            <Link className="text-decoration-none header-font ms-3 fw-bold text-center" to={"/"}>PILL LAW</Link>
          </h2>
        </Col>
        <Col xs="1" lg="4" />
      </Row>
    </>
  );
}

export default MemberHeader;
