import React, { useState } from 'react';
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../resources/image/pilllaw_icon_crop.png';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");

  // 오류 메시지 상태
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  // 이메일 검증 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 비밀번호 검증 정규식 (영어 대문자, 소문자, 숫자 포함 8자 이상)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

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

    if (isValid) {
      alert("가입을 환영합니다!");
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


  return (
    <div className='wrap'>
      <Container className="mt-5">
        {/* 헤더 */}
        <Row className="justify-content-center text-center mb-4">
          <Col xs={2}></Col>
          <Col xs={3} className="text-end">
            <Link to={"/"}>
              <img
                src={logo}
                className="img-fluid header-icon"
                alt="아이콘"
              />
            </Link>
          </Col>
          <Col xs={5} className="text-start mt-4 ms-3">
            <h2 className="fw-bold d-inline">
              <Link className="text-decoration-none header-font" to={"/"}>
                PILL LAW
              </Link>
            </h2>
          </Col>
        </Row>

        {/* 회원가입 폼 */}
        <Container className="p-5 border rounded">
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

            {/* 비밀번호 오류 메시지 */}
            {/* {passwordError && (
              <Alert variant="danger">비밀번호가 일치하지 않습니다. 다시 입력해 주세요.</Alert>
            )} */}

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
                onChange={(e) => setPhone(e.target.value)}
                required
              />
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

            {/* 가입 버튼 */}
            <div className="text-center mt-4">
              <Button type="button" variant="pilllaw" onClick={handleSubmit}>
                가입하기
              </Button>
            </div>
          </Form>
        </Container>
      </Container>
    </div>
  );
}

export default SignupForm;
