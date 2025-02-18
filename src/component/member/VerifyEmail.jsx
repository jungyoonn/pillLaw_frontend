import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../../resources/css/style.css';
import Button from '../common/Button';
import UseAxios from "../../hooks/UseAxios";
import { Container } from "react-bootstrap";
import MemberHeader from "./MemberHeader";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("이메일 인증 중...");
  const [verified, setVerified] = useState(false);
  const {loading, req} = UseAxios('http://localhost:8080/api/member/');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      console.log("토큰 인증");
      console.log(token);
      
      if (!token) {
        setMessage("잘못된 접근입니다.");
        return;
      }

      try {
        console.log("useAxios :: ");
        
        const resp = await req('get', `signup/email/verify?token=${token}`);
        console.log("resp는 ");
        console.log(resp);
        
        if (resp.ok) {
          setVerified(true);
          setMessage(resp.msg);
        } else {
          setMessage(resp.msg || '인증 처리 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.log("에러 발생", error);
        setMessage(error.response?.data?.msg || "인증 처리 중 오류가 발생했습니다.");
      }
    };

    verifyEmail();
  }, [req, searchParams]); // verified 제거, 무한 루프 방지

  const handleSubmit = () => {
    verified ? navigate('/signup/form') : navigate("/");
  }

  return (
    <Container>
      <MemberHeader />
      <div className="text-pilllaw fw-bold text-center mt-5 fs-14">
        {loading && "인증 요청 중 . . ."}  
      </div>
      {verified ? (
        <>
          <div className="text-pilllaw fw-bold text-center mt-5">
            <FontAwesomeIcon icon={faCircleCheck} className="fa-lg text-pilllaw me-2" />
              이메일 인증이 완료되었습니다.
            <div className="mt-5 text-center">
              <Button variant='pilllaw' className="btn btn-pilllaw px-5" onClick={handleSubmit}>확인</Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-pilllaw fw-bold text-center mt-5">
            <FontAwesomeIcon icon={faTriangleExclamation} className="fa-lg mx-3" />
            {message}
            <FontAwesomeIcon icon={faTriangleExclamation} className="fa-lg mx-3" />
          </div>
          <div className="mt-5 text-center">
            <Button variant='pilllaw' className="btn btn-pilllaw px-5" onClick={handleSubmit}>메인으로 돌아가기</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default VerifyEmail;
