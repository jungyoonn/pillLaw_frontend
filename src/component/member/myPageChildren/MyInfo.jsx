import React, { useState } from 'react';
import profile from '../../../resources/image/user-image.png'
import { Card, Col, Form, Row } from 'react-bootstrap';
import Button from '../../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from "@fortawesome/free-solid-svg-icons";

const MyInfo = ({ activeKey }) => {
  const [email, setEmail] = useState(localStorage.getItem('email'));

  return (
    <>
      <Row>
        <Col xs="2" />
        <Col xs="2" lg="2" className='text-center'>
          <img src={profile} alt='프로필 사진' width={160} />
          <Button variant='pillllaw' className="btn btn-pilllaw mt-3">PILL LAW 구독</Button>
          <p className='fs-14 fw-bold text-pilllaw mt-2'>
            <FontAwesomeIcon icon={faCoins} className='text-pilllaw-secondary mx-1' />
            포인트 : 1500P
          </p>
        </Col>
        <Col xs="1" />
        <Col xs="4">
          <p className='m-1'>이메일</p>
          <Form.Control
            type="text"
            placeholder={email}
            className='bg-pilllaw-form'
            disabled
            readOnly
          />
          <Row className='mt-2'>
            <Col>
              <p className='m-1'>이름</p>
              <Form.Control
                type="text"
                placeholder={email}
                className='bg-pilllaw-form'
                disabled
                readOnly
              />
            </Col>
            <Col>
              <p className='m-1'>닉네임</p>
              <Form.Control
                type="text"
                placeholder={email}
                className='bg-pilllaw-form'
                disabled
                readOnly
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default MyInfo;
