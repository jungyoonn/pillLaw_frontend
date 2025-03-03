import React, { useCallback, useState } from 'react';
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import MemberHeader from './MemberHeader';
import SignTerms from './SignTerms';
import SignInfo from './SignInfo';
import UseAxios from '../../hooks/UseAxios';
import { useNavigate } from 'react-router-dom';
import ToastMsg from '../common/ToastMsg';

const SignupForm = () => {
  const [term, setTerm] = useState(true);
  const [termsData, setTermsData] = useState(null);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const {req} = UseAxios("https://pilllaw.eeerrorcode.com/api");
  const navigate = useNavigate();

  const handleUserSubmit = useCallback(async (userFormData) => {
    // terms와 userData를 합친 최종 데이터 생성
    const finalData = {
      terms: {
        rule: termsData.rule,
        info: termsData.info,
        marketing: termsData.marketing,
        tel: termsData.tel,
        email: termsData.email
      },
      memberInfo: {
        email: userFormData.email,
        password: userFormData.password,
        name: userFormData.name,
        tel: userFormData.tel,
        nickname: userFormData.nickname
      }
    };

    console.log('전송 데이터:', finalData);

    try {
      const resp = await req('post', '/member/signup/terms', finalData);
      console.log(resp);

      if(resp.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        setFailure(true);
        setTimeout(() => {
          setFailure(false);
        }, 4000);
      }

    } catch(error) {
      console.error("회원가입 실패:", error);
    }
  }, [termsData, req, navigate]);

  const handleTermsSubmit = (termsFormData) => {
    setTermsData(termsFormData);
    setTerm(false); // 약관 동의 완료 후 회원가입 폼으로 전환
  };

  return (
    <Container>
      <MemberHeader />
      {term ? (
        <SignTerms onSubmit={handleTermsSubmit} /> 
      ) : (
        <SignInfo onSubmit={handleUserSubmit} failure={failure}/>
      )}
      {failure && <ToastMsg state={failure} msg={"이미 존재하는 회원입니다."} title={"가입 실패"} />}
      {success && <ToastMsg state={success} msg={'가입을 환영합니다!'} title={"가입 완료"} nav={"/"}/>}
    </Container>
  );
}

export default SignupForm;
