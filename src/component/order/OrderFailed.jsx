import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderFailed = () => {
    const navigate = useNavigate();
    const goToCart = () => {
      navigate('/cart'); // /cart로 이동
    };

  return (
    <div className='wrap'>
    <Container style={{ paddingTop: '115.19px', height: '550px'}}>
      <h4 className="text-center fw-bold my-5 header-font">결제 실패</h4>
      
      <p className="text-center fs-16">주문결제가 정상처리 되지 않았습니다.</p>
      <p className="text-center">
        <span className="header-font fw-bold">장바구니</span>로 이동 후 다시 시도 부탁드립니다.
      </p>
      <div className="d-flex justify-content-center mt-3">
        <Button className="btn-pilllaw mt-2" onClick={goToCart}>장바구니로 이동</Button>
      </div>
    </Container>
    </div>
  );
}

export default OrderFailed;