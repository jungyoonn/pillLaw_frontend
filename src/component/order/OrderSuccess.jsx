import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import UseAxios from '../../hooks/UseAxios'; // axios 훅
import { useLocation } from 'react-router-dom';

const OrderSuccessed = () => {
  const { req } = UseAxios(); // 'req' 함수 가져오기
  const location = useLocation();
  const { mno } = useAuth(); // mno 가져오기
  const { receiver, phone, address, message, amount, usedPoints, ono } = location.state || {};
  const navigate = useNavigate();
  const [isRequestSent, setIsRequestSent] = useState(false); 

  const goToIndex = () => {
    navigate('/');
  };

  useEffect(() => {
  if (mno && ono && !isRequestSent) {  // isRequestSent가 false일 때만 실행
    moveCartItemsToOrder(mno, ono);
  }
}, [mno, ono, isRequestSent]);  // isRequestSent를 의존성 배열에 추가

const moveCartItemsToOrder = async (mno, ono) => {
  try {
    const response = await req('POST', 'v1/order/move', { mno, ono });
    console.log("Order Items 이동 성공:", response.data);
    setIsRequestSent(true);  //작업완료
  } catch (error) {
    console.error("Order Items 이동 실패:", error.response?.data || error.message);
  } finally {
    console.log('작업 완료');  }
};

  return (
    <div className='wrap'>
      <Container style={{ paddingTop: '115.19px' }}>
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
              <Col xs={9}>{receiver}</Col>
            </Row>

            <Row className="mb-1">
              <Col xs={3} className="fw-bold">휴대전화</Col>
              <Col xs={9}>{phone}</Col>
            </Row>

            <Row className="mb-1">
              <Col xs={3} className="fw-bold">주소</Col>
              <Col xs={9}>{address}</Col>
            </Row>

            <Row className="mb-1">
              <Col xs={3} className="fw-bold">배송메세지</Col>
              <Col xs={9}>{message}</Col>
            </Row>
            <Row className="mb-1">
              <Col xs={3} className="fw-bold">주문금액</Col>
              <Col xs={9}>{(amount + usedPoints).toLocaleString()}원</Col>
            </Row>
            <Row className="mb-1">
              <Col xs={3} className="fw-bold">사용포인트</Col>
              <Col xs={9}>{usedPoints.toLocaleString()}P</Col>
            </Row>

            <Row className="mb-1">
              <Col xs={3} className="fw-bold">실결제금액</Col>
              <Col xs={9}>{amount.toLocaleString()}원</Col>
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