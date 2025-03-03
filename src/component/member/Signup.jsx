import React from 'react';
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import kakao from '../../resources/image/kakao-svgrepo-com.png';
import naver from '../../resources/image/naver-svgrepo-com.png';
import google from '../../resources/image/google-color-svgrepo-com.png';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Button from '../common/Button';
import MemberHeader from './MemberHeader';

const Signup = () => {
  const BACKEND_URL= "https://pilllaw.eeerrorcode.com";
  const FRONTEND_URL = "https://pilllaw.eeerrorcode.com";

  const handleSocialLogin = (provider) => {
    const redirectUri = encodeURIComponent(`${FRONTEND_URL}/pilllaw/oauth2/redirect`);
    console.log(redirectUri);
    window.location.href = `${BACKEND_URL}/oauth2/authorization/${provider}?redirect_uri=${redirectUri}`;
  };

  return (
    <Container>
      <MemberHeader />

      {/* 회원가입 버튼들 */}
      <Row className="mx-5 px-5 mt-4">
        <Col xs="1" lg="3" />
        <Col className='mx-5'>
          <h2 className="mt-4 ms-3 pt-3 fw-bold text-center header-font">
              회원가입
          </h2>
            <div className="mt-5"></div>
            <div className="d-grid mt-3">
              <Button variant='pilllaw' to={"/signup/form"} className="btn btn-pilllaw btn-block fw-bold text-white fs-14 py-2">
                <FontAwesomeIcon icon={faEnvelope} className="fa-lg mx-2" />
                이메일로 시작하기
              </Button>
            </div>
            <div className="d-grid mt-2">
              <Button variant='kakao' onClick={() => handleSocialLogin('kakao')} className="btn btn-kakao btn-block fw-bold text-kakao p-1 fs-14 pt-2">
                <img
                  className="img-fluid me-2 mb-1"
                  src={kakao}
                  width="18"
                  alt="카카오 회원가입"
                />
                카카오로 시작하기
              </Button>
            </div>
            <div className="d-grid mt-2 fs-12 align-items-center">
              <Button variant='naver' onClick={() => handleSocialLogin('naver')} className="btn btn-naver btn-block fw-bold text-white pt-2 fs-14">
                <img
                  className="img-fluid me-2 mb-1"
                  src={naver}
                  width="18"
                  alt="네이버 회원가입"
                />
                네이버로 시작하기
              </Button>
            </div>
            <div className="d-grid mt-2 fs-12">
              <Button variant='github' to={"/"} className="btn btn-github fw-bold text-white mb-1 fs-14 py-2">
                <FontAwesomeIcon icon={faGithub} className="fa-lg mx-2" />
                GitHub로 시작하기
              </Button>
            </div>
            <div className="d-grid mt-1 fs-12">
              <Button variant='insta' to={"/"} className="btn btn-insta fw-bold text-white mb-1 fs-14 py-2">
                <FontAwesomeIcon icon={faInstagram} className="fa-lg mx-2 ms-4" />
                인스타그램으로 시작하기
              </Button>
            </div>
            <div className="d-grid mt-1 fs-12">
              <Button variant='google' onClick={() => handleSocialLogin('google')} className="btn btn-google fw-bold mb-1 fs-14 py-2">
                <img
                  className="img-fluid me-2 mb-1"
                  src={google}
                  width="18"
                  alt="구글 회원가입"
                />
                Google로 시작하기
              </Button>
            </div>
          <hr className="mt-5" />
          <Row className="text-center">
            <Col className="fw-bold fs-12">
              <Link to={"/"} className="text-decoration-none text-pilllaw">
                개인정보 처리방침
              </Link>
            </Col>
            <Col className="fw-bold fs-12">
              <Link to={"/"} className="text-decoration-none text-pilllaw">
                이용 약관
              </Link>
            </Col>
            <Col className="fw-bold fs-12">
              <Link to={"/"} className="text-decoration-none text-pilllaw">
                이용 안내
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs="1" lg="3" />
      </Row>
    </Container>
  );
}

export default Signup;
