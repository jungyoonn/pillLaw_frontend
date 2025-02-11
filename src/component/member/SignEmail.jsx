import React, { useEffect, useState } from 'react';
import '../../resources/css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../resources/image/pilllaw_icon_crop.png';
import Button from '../common/Button';

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
    <div className="wrap">
      <Container className="px-0">
        <div className="text-center m-2 mt-5">
          <Row>
            <Col xs lg="2" />
            <Col xs lg="3" className="text-end">
              <Link to={"/"}>
                <img src={logo} className="img-fluid header-icon" alt="아이콘" />
              </Link>
            </Col>
            <Col className="text-start mt-4 ms-3">
              <h2 className="mt-4 ms-3 pt-3 fw-bold d-inline">
                <Link to={"/"} className="text-decoration-none header-font">PILL LAW</Link>
              </h2>
            </Col>
          </Row>
        </div>

        {/* 이메일 인증 */}
        <div className="terms mx-5 px-5 mt-5 pt-5">
          <div className="mx-5 px-5">
            <Form className="mx-5 px-5" method="post">
              <Form.Group className="mb-2 mt-3 mx-5 px-5">
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
                <Form.Group className="mb-1 mt-1 auth mx-5 px-5">
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


              <Form.Group className="text-center d-grid mx-5 px-5">
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
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SignEmail;
