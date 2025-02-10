import React from 'react';
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../resources/image/pilllaw_icon_crop.png';
import kakao from '../../resources/image/kakao-svgrepo-com.png';
import naver from '../../resources/image/naver-svgrepo-com.png';
import google from '../../resources/image/google-color-svgrepo-com.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Button from '../common/Button';
import { Container, Row, Col, Form } from 'react-bootstrap';

const Signin = () => {
  return (
    <div className="wrap">
      <Container>
        <div className="text-center m-2 mt-5">
          <Row>
            <Col xs lg="2"></Col>
            <Col xs lg="3" className="text-end">
              <Link to={"/"}>
                <img src={logo} className="img-fluid header-icon" alt="아이콘" />
              </Link>
            </Col>
            <Col className="text-start mt-4 ms-3">
              <h2 className="mt-4 ms-3 pt-3 fw-bold d-inline">
                <Link className="text-decoration-none header-font" to={"/"}>PILL LAW</Link>
              </h2>
            </Col>
          </Row>
        </div>

        {/* 로그인 폼 */}
        <div className="mx-5 px-5 mt-4">
          <div className="mx-5 px-5">
            <div className="mx-5 px-5 mt-3">
              <Form className="px-5 mx-5" method="post">
                <Form.Group className="mt-3 mx-5 px-5">
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

              <div className="mx-4 px-4">
                {/* 카카오 로그인 */}
                <div className="d-grid px-5 mx-5 mt-5">
                  <Button variant='kakao' to={"/"} className="btn btn-kakao mx-5 btn-block fw-bold text-kakao pt-2 fs-14">
                    <img className="img-fluid me-2 mb-1" src={kakao} width="18" alt="카카오 로그인" />
                    카카오 로그인
                  </Button>
                </div>

                {/* 네이버 로그인 */}
                <div className="d-grid px-5 mx-5 mt-2">
                  <Button variant='naver' to={"/"} className="btn btn-naver mx-5 btn-block fw-bold text-white pt-2 fs-14">
                    <img className="img-fluid me-2 mb-1" src={naver} width="18" alt="네이버 로그인" />
                    네이버 로그인
                  </Button>
                </div>

                {/* GitHub 로그인 */}
                <div className="d-grid px-5 mx-5 mt-2">
                  <Button variant='github' to={"/"} className="btn btn-github mx-5 fw-bold text-white mb-1 fs-14 py-2">
                    <FontAwesomeIcon icon={faGithub} className="mx-2 fa-lg" /> GitHub 로그인
                  </Button>
                </div>

                {/* 인스타그램 로그인 */}
                <div className="d-grid px-5 mx-5 mt-1">
                  <Button variant='insta' to={"/"} className="btn btn-insta mx-5 fw-bold text-white mb-1 fs-14 py-2">
                    <FontAwesomeIcon icon={faInstagram} className="mx-2 ms-4 fa-lg" /> 인스타그램 로그인
                  </Button>
                </div>

                {/* Google 로그인 */}
                <div className="d-grid px-5 mx-5 mt-1">
                  <Button variant='google' to={"/"} className="btn btn-google mx-5 fw-bold mb-1 fs-14 py-2">
                    <img className="img-fluid me-2 mb-1" src={google} width="18" alt="구글 로그인" />
                    Google 로그인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Signin;
