import React, { useState } from 'react';
import '../../resources/css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import Button from '../common/Button';
import MemberHeader from './MemberHeader';
import UseAxios from '../../hooks/UseAxios';

const SignEmail = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState('인증메일 보내기');
  const {loading, req} = UseAxios('http://localhost:8080/api/member/');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleSendMailClick = async () => {
    const emailPattern = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (email === '') {
      setEmailError('이메일을 입력해 주세요.');
      return;
    }

    if (!emailPattern.test(email)) {
      setEmailError('유효한 이메일을 입력해 주세요.');
      return;
    }

    try {
      const resp = await req('post', 'signup/email/verification-requests', { email: email });
      console.log(resp);
      console.log(resp.ok);

      if(!resp.ok) {
        setEmailError('이미 존재하는 회원입니다.');
        // setLoading(false);
        return;
      }
      setMessage('인증메일 재전송')
      // setLoading(true);
      setEmailSent(true);

      setEmailError('');
    } catch (error) {
      setMessage('인증메일 보내기');
      setEmailError('이메일 전송에 실패했습니다. 다시 시도해 주세요.' + error);
    }
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
                readOnly={emailSent}
              />
              {emailError && <p className="fs-12 fw-bold text-danger email-failed mt-2">{emailError}</p>}
            </Form.Group>

            {emailSent && !loading && (
              <p className="fs-12 fw-bold text-success mb-3">
                <FontAwesomeIcon icon={faCircleCheck} className="fa-lg text-pilllaw me-1" />
                이메일로 인증 링크가 전송되었습니다! 받은 메일에서 링크를 클릭해 주세요.
              </p>
            )}

            {/* {authVisible && (
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
            )} */}
            {loading && (<div className='text-center clearfix mt-2'>
              <Spinner animation="border" role="status" className='text-pilllaw float-start' />
              <p className='fs-14 fw-bold text-pilllaw float-start mx-3 mt-2'>이메일 전송 중 . . .</p>
            </div>)}
            {!loading && (<Form.Group className="text-center d-grid">
            <Button variant='pilllaw' type="button" className="btn btn-pilllaw text-decoration-none btn-next" id="btn-next" onClick={handleSendMailClick}>
              {message}
            </Button>
            </Form.Group>)}
          </Form>
        </Col>
        <Col xs="1" lg="4" />
      </Row>
    </Container>
  );
}

export default SignEmail;
