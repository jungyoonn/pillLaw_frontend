import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import UseAxios from '../../hooks/UseAxios'; // axios 훅
import { Container } from 'react-bootstrap';


const PaymentPage = () => {
  console.log('PaymentPage 컴포넌트 렌더링됨');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { token, mno } = useAuth(); // 인증 정보
  const { req } = UseAxios(); // axios 훅
  const navigate = useNavigate();

  const handlePayment = () => {
    setLoading(true);
    const { IMP } = window;

    IMP.init('imp24587612'); // IAMPORT API Key

    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: '카드',
        merchant_uid: `merchant_${new Date().getTime()}`, // 주문번호
        name: '테스트 상품', // 상품명
        amount: 1000, // 결제 금액
        buyer_email: 'test@test.com',
        buyer_name: '테스트 사용자',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울시 강남구 테헤란로 123',
        buyer_postcode: '123-456',
      },
      async (response) => {
        setLoading(false);
        if (response.success) {
          // 결제 성공 시
          const paymentData = {
            imp_uid: response.imp_uid,
            ono: 2, // 실제 주문 번호를 이곳에 넣어야 합니다.
          };

          // 서버에 결제 완료 요청
          try {
            const res = await req('POST', 'pay', paymentData, {
              Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            });
            if (res) {
              setMessage('결제 완료');
              // 결제 완료 후 리디렉션 등 추가 작업
              navigate('/order-success');
            }
          } catch (error) {
            setMessage('결제 처리 중 오류가 발생했습니다.');
          }
        } else {
          setMessage('결제 실패: ' + response.error_msg);
        }
      }
    );
  };

  useEffect(() => {
    if (!window.IMP) {
      console.error('IAMPORT SDK 로드 실패');
    } else {
      console.log('IAMPORT SDK 로드 성공');
    }
  }, []);

  return (

  <div className='wrap'>
  <Container style={{ paddingTop: '115.19px', height: '550px'}}>
    <h4 className="text-center fw-bold my-5 header-font">결제 테스트</h4>
    <div>
      <h2>결제 테스트</h2>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? '결제 처리 중...' : '결제 진행'}
      </button>
      {message && <p>{message}</p>}
    </div>
    
    <div className="d-flex justify-content-center mt-3">
    </div>
  </Container>
  </div>
);
};

export default PaymentPage;
