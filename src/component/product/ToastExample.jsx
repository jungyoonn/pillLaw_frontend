import React, { useState } from 'react';
import ToastMsg from '../common/ToastMsg';
import Button from 'react-bootstrap/Button';

const ToastExample = () => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <Button onClick={() => setShowToast(true)} variant="primary">
        토스트 메시지 표시
      </Button>

      {showToast && (
        <ToastMsg
          title="결제 성공!"
          msg="주문이 완료되었습니다."
          state={true}  // 처음 상태를 true로 설정
          nav="/order/success"  // 버튼 클릭 시 이동할 경로
        />
      )}
    </div>
  );
};

export default ToastExample;
