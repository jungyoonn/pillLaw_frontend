import React, { useState } from 'react';
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import MemberHeader from './MemberHeader';
import SignTerms from './SignTerms';
import SignInfo from './SignInfo';
import UseAxios from '../../hooks/UseAxios';

const SignupForm = () => {
  const [term, setTerm] = useState(true);
  const [termsData, setTermsData] = useState(null);
  const [userData, setUserData] = useState(null);
  const {req} = UseAxios("http://localhost:8080/api");

  const handleTermsSubmit = (termsFormData) => {
    setTermsData(termsFormData);
    setTerm(false); // 약관 동의 완료 후 회원가입 폼으로 전환
  };

  const handleUserSubmit = async (userFormData) => {
    // terms와 userData를 합친 최종 데이터 생성
    setUserData(userFormData);
    const finalData = {
      terms: {
        rule: termsData.rule,
        info: termsData.info,
        marketing: termsData.marketing,
        tel: termsData.tel,
        email: termsData.email
      },
      memberInfo: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        tel: userData.tel,
        nickname: userData.nickname
      }
    };

    console.log('전송 데이터:', finalData);

    try {
      const resp = await req('post', '/member/signup/terms', finalData);
      console.log(resp);
      // 성공 처리...
    } catch(error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <Container>
      <MemberHeader />
      {term ? (
        <SignTerms onSubmit={handleTermsSubmit} /> 
      ) : (
        <SignInfo onSubmit={handleUserSubmit} />
      )}
    </Container>
  );
}

export default SignupForm;
