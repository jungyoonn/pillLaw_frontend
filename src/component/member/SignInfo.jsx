import React, { useState } from 'react';
import { Alert, Col, Form, Row } from 'react-bootstrap';
import Button from '../common/Button';

const SignInfo = ({onSubmit, failure}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [nickname, setNickname] = useState("");

  // 오류 메시지 상태
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  // 이메일 검증 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 비밀번호 검증 정규식 (영어 대문자, 소문자, 숫자 포함 8자 이상)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // 휴대전화 번호 검증 정규식
  const phoneRegex = /^010[0-9]{8}$/;

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    let isValid = true;

    // 이메일 검증
    if (!emailRegex.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    // 비밀번호 검증
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    // 비밀번호 확인 검사
    if (password !== passwordConfirm) {
      setPasswordMismatchError(true);
      isValid = false;
    } else {
      setPasswordMismatchError(false);
    }

    // 휴대전화 번호 검증
    if (!phoneRegex.test(phone)) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    if (isValid) {
      const tel = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

      const userData = {
        email,
        password,
        name,
        tel, // 하이픈이 포함된 번호
        nickname
      };

      onSubmit(userData); // 부모 컴포넌트로 userData 전달
    }

  };

  const handlePasswordConfirmChange = (e) => {
    if(password !== e.target.value) {
      setPasswordMismatchError(true);
    } else {
      setPasswordMismatchError(false);
    }
    setPasswordConfirm(e.target.value);
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력 가능
    setPhone(value);
    
    if(!phoneRegex.test(value)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  return (
    <Row className="p-5 mt-3 border rounded">
      <Col xs="1" lg="3" />
      <Col>
        <Form onSubmit={handleSubmit}>
          <p className="fs-12 text-end fw-bold">
            <span className="text-danger">*</span>은 필수 입력입니다.
          </p>

          {/* 이메일 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>이메일 <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="fs-12 fw-bold text-danger email-failed">유효한 이메일을 입력해 주세요.</p>}
          </Form.Group>

          {/* 비밀번호 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>비밀번호 <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="password"
              placeholder="영어 대소문자, 숫자 조합 8자 이상"
              value={password}
              name='pw'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="fs-12 fw-bold text-danger email-failed">비밀번호가 올바르지 않습니다. (영어 대소문자, 숫자 조합 8자 이상)</p>}
          </Form.Group>

          {/* 비밀번호 확인 */}
          <Form.Group className="mb-3">
            <Form.Label>비밀번호 확인 <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호 재입력"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              required
            />
            {passwordMismatchError && <p className="fs-12 fw-bold text-danger email-failed">비밀번호가 일치하지 않습니다. 다시 입력해 주세요.</p>}
          </Form.Group>

          {/* 이름 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>이름 <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="이름을 입력해 주세요"
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          {/* 휴대전화 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>휴대전화 번호 <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="휴대전화 번호를 입력해 주세요(- 제외하고 입력)"
              value={phone}
              name='phone'
              onChange={handlePhoneChange}
              maxLength={11}
              required
            />
            {phoneError && 
              <p className="fs-12 fw-bold text-danger">올바른 휴대전화 번호를 입력해 주세요.</p>
            }
          </Form.Group>

          {/* 닉네임 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>닉네임 <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              name='nickname'
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </Form.Group>

          {failure && (
            <Alert variant="danger">
              이미 존재하는 회원입니다. <br />
              <Alert.Link href="/signin">로그인하러 가기</Alert.Link>
            </Alert>
          )}

          {/* 가입 버튼 */}
          <div className="text-center mt-4 d-grid">
            <Button type="button" variant="pilllaw" onClick={handleSubmit}>
              가입하기
            </Button>
          </div>
        </Form>
      </Col>
      <Col xs="1" lg="3" />
    </Row>
  );
}

export default SignInfo;
