import React from 'react';
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import kakao from '../../resources/image/kakao-svgrepo-com.png';
import naver from '../../resources/image/naver-svgrepo-com.png';
import google from '../../resources/image/google-color-svgrepo-com.png';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Button from '../common/Button';
import { Container, Row, Col, Form } from 'react-bootstrap';
import MemberHeader from './MemberHeader';

const Signin = () => {
  return (
    <Container>
      <MemberHeader />

      {/* 로그인 폼 */}
      <Row>
        <Col xs="1" lg="3" />
        <Col className='mx-3'>
          <Form method="post">
            <Form.Group className="mt-5 mx-5 px-5">
              <Form.Label htmlFor="email"></Form.Label>
              <Form.Control type="email" id="email" placeholder="이메일" name="email" />
            </Form.Group>
            <Form.Group className="mx-5 px-5 mt-1">
              <Form.Control type="password" id="pwd" placeholder="비밀번호" name="pswd" />
            </Form.Group>
            <Form.Group className="mb-3 mx-5 px-5">
              <Form.Label className="header-font fw-bold fs-12">
                <Form.Check type="switch" className="mx-2" label="로그인 정보 기억하기" name="remember" />
              </Form.Label>
            </Form.Group>
            <div className="d-grid px-4 mx-4">
              <Button  variant="pilllaw" type="submit" className="btn btn-pilllaw mx-5 btn-block d-grid">로그인</Button>
            </div>
          </Form>

          <div>
            {/* 카카오 로그인 */}
            <div className="d-grid px-4 mx-4 mt-5">
              <Button variant='kakao' to={"/"} className="btn btn-kakao mx-5 btn-block fw-bold text-kakao pt-2 fs-14">
                <img className="img-fluid me-2 mb-1" src={kakao} width="18" alt="카카오 로그인" />
                카카오 로그인
              </Button>
            </div>

            {/* 네이버 로그인 */}
            <div className="d-grid px-4 mx-4 mt-2">
              <Button variant='naver' to={"/"} className="btn btn-naver mx-5 btn-block fw-bold text-white pt-2 fs-14">
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
              <Button variant='google' to={"/"} className="btn btn-google mx-5 fw-bold mb-1 fs-14 py-2">
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
