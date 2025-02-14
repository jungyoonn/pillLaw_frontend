import React, { useEffect, useState } from 'react';
import '../../resources/css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import MemberHeader from './MemberHeader';

const SignEmail = () => {
  const [email, setEmail] = useState('');
  const [verification, setVerification] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [authVisible, setAuthVisible] = useState(false);
  const [submitVisible, setSubmitVisible] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleVerificationChange = (e) => {
    setVerification(e.target.value.replace(/[^0-9]/g, ''));  // 숫자만 입력되도록
    setVerificationError('');
  };

  const handleNextClick = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (email === '') {
      setEmailError('이메일을 입력해 주세요.');
      return;
    }

    if (!emailPattern.test(email)) {
      setEmailError('유효한 이메일을 입력해 주세요.');
      return;
    }

    setEmailError('');
    setAuthVisible(true);
    setSubmitVisible(true);
  };

  const handleSubmitClick = () => {
    if (verification === '') {
      setVerificationError('인증번호가 일치하지 않습니다. 다시 시도해 주세요.');
      return;
    }

    // 인증번호가 일치하면 다음 동작
    setVerificationError('');
    // 다음 페이지나 동작으로 이동
    navigate('/signup/form');
  };

  return (
    <Container>
      <MemberHeader />

      {/* 이메일 인증 */}
      <Row className="terms mt-5 pt-5">
        <Col xs="1" lg="4" />
        <Col>
          <Form method="post">
            <Form.Group className="mb-2 mt-3">
              <Form.Label htmlFor="email"></Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="이메일을 입력해 주세요"
                name="email"
                value={email}
                onChange={handleEmailChange}
                readOnly={authVisible}
              />
              {emailError && <p className="fs-12 fw-bold text-danger email-failed">{emailError}</p>}
            </Form.Group>

            {authVisible && (
              <Form.Group className="mb-1 mt-1 auth">
                <Form.Label htmlFor="auth" className="fs-12 fw-bold">
                  <FontAwesomeIcon icon={faCircleCheck} className="fa-lg text-pilllaw me-1" />
                  인증번호가 전송되었습니다!
                </Form.Label>
                <Form.Control
                  type="text"
                  id="verification"
                  placeholder="인증번호를 입력해 주세요"
                  name="verification-num"
                  value={verification}
                  onChange={handleVerificationChange}
                />
                {verificationError && <p className="fs-12 fw-bold text-danger not-equal">{verificationError}</p>}
              </Form.Group>
            )}
            <Form.Group className="text-center d-grid">
              {!authVisible && (
                <Button variant='pilllaw' type="button" className="btn btn-pilllaw text-decoration-none btn-next" id="btn-next" onClick={handleNextClick}>
                  다음
                </Button>)}
              {submitVisible && (
                <Button variant='pilllaw' type="button" className="btn btn-pilllaw btn-submit" id="btn-submit" onClick={handleSubmitClick}>
                  확인
                </Button>
              )}
            </Form.Group>
          </Form>
        </Col>
        <Col xs="1" lg="4" />
      </Row>
    </Container>
  );
}

export default SignEmail;
