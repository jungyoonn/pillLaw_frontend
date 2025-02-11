import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderSuccessed = () => {
  const [orderData, setOrderData] = useState({
    receiver: '권미은',
    phone: '010-4149-2769',
    address: '서울특별시 구로구 182-13 대륭포스트타워 2차 2층 더조은컴퓨터학원',
    message: '문 앞에 놓아주세요',
    amount: '94,000원'
  });

  const navigate = useNavigate();
    const goToIndex = () => {
      navigate('/');
    };

  return (
    <div className='wrap'>
      <Container style={{ paddingTop: '115.19px'}}>
        <h4 className="text-center fw-bold my-5">
          <span className="text-secondary">1. 장바구니</span>
          <span className="text-secondary mx-5">2. 주문서 작성</span>
          <span className="header-font">3. 결제 완료</span>
        </h4>
        <div className='my-4'>
        <p className="text-center fs-16">주문이 성공적으로 <span className="header-font fw-bold">완료</span>되었습니다.</p>
        <p className="text-center"><span className="header-font fw-bold">PILL LAW</span>를 이용해주셔서 감사합니다.</p>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <Card className="p-4" style={{ width: '50%', backgroundColor: 'transparent' }}>
            <h5 className="card-title fw-bold mb-3 text-center">주문서</h5>
            
            <Row className="mb-1">
              <Col xs={3} className="fw-bold">받는사람</Col>
              <Col xs={9}>{orderData.receiver}</Col>
            </Row>
            
            <Row className="mb-1">
              <Col xs={3} className="fw-bold">휴대전화</Col>
              <Col xs={9}>{orderData.phone}</Col>
            </Row>
            
            <Row className="mb-1">
              <Col xs={3} className="fw-bold">주소</Col>
              <Col xs={9}>{orderData.address}</Col>
            </Row>
            
            <Row className="mb-1">
              <Col xs={3} className="fw-bold">배송 메세지</Col>
              <Col xs={9}>{orderData.message}</Col>
            </Row>
            
            <Row className="mb-1">
              <Col xs={3} className="fw-bold">결제 금액</Col>
              <Col xs={9}>{orderData.amount}</Col>
            </Row>
            
          </Card>
        </div>
        
        <p className="text-center fs-16">확인 버튼을 누르면 메인 페이지로 이동합니다.</p>
        
        <div className="d-flex justify-content-center mt-3">
          <Button className="btn-pilllaw" onClick={goToIndex}>확인</Button>
        </div>
      </Container>
    </div>
  );
}

export default OrderSuccessed;