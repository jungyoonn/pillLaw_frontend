import React, { useEffect, useState } from 'react';
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import kakao from '../../resources/image/kakao-svgrepo-com.png';
import naver from '../../resources/image/naver-svgrepo-com.png';
import google from '../../resources/image/google-color-svgrepo-com.png';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Button from '../common/Button';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import MemberHeader from './MemberHeader';
import UseAxios from '../../hooks/UseAxios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const Signin = () => {
  const BACKEND_URL= "//localhost:8080";
  const FRONTEND_URL = "http://localhost:3000";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, error, req} = UseAxios('https://pilllaw.eeerrorcode.com/api/member/');
  const [err, setErr] = useState('')
  const [rememberMe, setRememberMe] = useState(false);
  const navigate =  useNavigate();

  const {login} = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem('remember-email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if(rememberMe) {
      localStorage.setItem('remember-email', email);
    }

    const member = {
      email, 
      password,
      'remember-me': rememberMe
    };
    console.log(member);
    
    try {
      const resp = await req('post', 'signin', member);
      console.log(" :::::::: ");
      console.log(resp);
      resp && login(member.email, resp.token, resp.mno);
      resp && navigate('/');
    } catch(error) {
      console.error("로그인 실패", error);
      
      if(member.email === '' && member.password === '') {
        setErr('이메일과 비밀번호를 입력해 주세요.');
        return;
      }
      if(member.email === '') {
        setErr('이메일을 입력해 주세요.');
        return;
      }
      if(member.password === '') {
        setErr('비밀번호를 입력해 주세요.');
        return;
      }

      if (error.response) {
        switch (error.response.status) {
          case 401:
            setErr(error.response.data.clientMsg);
            break;
          case 403:
            setErr('잘못된 접근입니다.');
            break;
          default:
            setErr('서버 오류가 발생했습니다.');
        }
      }
    }
  }

  const handleSocialLogin = (provider) => {
    const redirectUri = encodeURIComponent(`${FRONTEND_URL}/pilllaw/oauth2/redirect`);
    console.log(redirectUri);
    window.location.href = `${BACKEND_URL}/oauth2/authorization/${provider}?redirect_uri=${redirectUri}`;
  };

  return (
    <Container>
      <MemberHeader />

      {/* 로그인 폼 */}
      <Row>
        <Col xs="1" lg="3" />
        <Col className='mx-3'>
          <Form method="post" onSubmit={handleSubmit}>
            <Form.Group className="mt-5 mx-5 px-5">
              <Form.Label htmlFor="email"></Form.Label>
              <Form.Control type="email" id="email" placeholder="이메일" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mx-5 px-5 mt-1">
              <Form.Control type="password" id="password" placeholder="비밀번호" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3 mx-5 px-5">
              <Form.Label className="header-font fw-bold fs-12">
                <Form.Check type="switch" className="mx-2" label="로그인 정보 기억하기" name="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              </Form.Label>
            </Form.Group>
            <div className="d-grid px-4 mx-4">
              <Button disabled={loading} variant="pilllaw" type="submit" className="btn btn-pilllaw mx-5 btn-block d-grid">{loading ? <Spinner animation="border" variant="light"> '로그인 중 . . . '</Spinner> : '로그인'}</Button>
              {error && <p className='text-danger fs-12 fw-bold mx-5'>{err}</p>}
            </div>
          </Form>

          <div>
            {/* 카카오 로그인 */}
            <div className="d-grid px-4 mx-4 mt-5">
              <Button variant='kakao' onClick={() => handleSocialLogin('kakao')} className="btn btn-kakao mx-5 btn-block fw-bold text-kakao pt-2 fs-14">
                <img className="img-fluid me-2 mb-1" src={kakao} width="18" alt="카카오 로그인" />
                카카오 로그인
              </Button>
            </div>

            {/* 네이버 로그인 */}
            <div className="d-grid px-4 mx-4 mt-2">
              <Button variant='naver' onClick={() => handleSocialLogin('naver')} className="btn btn-naver mx-5 btn-block fw-bold text-white pt-2 fs-14">
                <img className="img-fluid me-2 mb-1" src={naver} width="18" alt="네이버 로그인" />
                네이버 로그인
              </Button>
            </div>

            {/* GitHub 로그인 */}
            <div className="d-grid px-4 mx-4 mt-2">
              <Button variant='github' to={"/"} className="btn btn-github mx-5 fw-bold text-white mb-1 fs-14 py-2">
                <FontAwesomeIcon icon={faGithub} className="mx-2 fa-lg" /> GitHub 로그인
              </Button>
            </div>

            {/* 인스타그램 로그인 */}
            <div className="d-grid px-4 mx-4 mt-1">
              <Button variant='insta' to={"/"} className="btn btn-insta mx-5 fw-bold text-white mb-1 fs-14 py-2">
                <FontAwesomeIcon icon={faInstagram} className="mx-2 ms-4 fa-lg" /> 인스타그램 로그인
              </Button>
            </div>

            {/* Google 로그인 */}
            <div className="d-grid px-4 mx-4 mt-1">
              <Button variant='google' onClick={() => handleSocialLogin('google')} className="btn btn-google mx-5 fw-bold mb-1 fs-14 py-2">
                <img className="img-fluid me-2 mb-1" src={google} width="18" alt="구글 로그인" />
                Google 로그인
              </Button>
            </div>
          </div>
        </Col>
        <Col xs="1" lg="3" />
      </Row>
    </Container>
  );
}

export default Signin;
