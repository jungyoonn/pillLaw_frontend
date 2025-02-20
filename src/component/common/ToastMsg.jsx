import React, { useState } from 'react';
import { Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import favicon from '../../resources/image/pilllaw_favicon.png';
import { useNavigate } from 'react-router-dom';
import '../../resources/css/style.css';
import Button from './Button';


const ToastMsg = ({title, msg, state, nav}) => {
  const [show, setShow] = useState(state);
  const toggleShow = () => setShow(!show);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(nav);
  }

  return (
    <Row>
      <Col md={6} className="mb-2">
        <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
          <Toast show={show} onClose={toggleShow} className='bg-pilllaw'>
            <Toast.Header>
              <img
                src={favicon}
                width={20}
                className="rounded me-2"
                alt="아이콘"
              />
              <strong className="me-auto fw-bold">{title}</strong>
              <small className='fw-bold'>당신의 건강을 구독하세요!</small>
            </Toast.Header>
            <Toast.Body className='fw-bold'>
              {msg} &nbsp;&nbsp;&nbsp; 
              {nav && <Button variant="pilllaw" size='sm' className='float-end btn btn-pilllaw btn-sm border border-radius border-light' onClick={handleOnClick}>확인</Button>}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

export default ToastMsg;
