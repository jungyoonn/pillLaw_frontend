import React from 'react';
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signin = () => {
  return (
    <div className="wrap">
      <Container>
        <div className="text-center m-2 mt-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-3 text-end">
              <a href="#">
                <img src="/resources/image/pilllaw_icon_crop.png" className="img-fluid header-icon" alt="아이콘" />
              </a>
            </div>
            <div className="col text-start mt-4 ms-3">
              <h2 className="mt-4 ms-3 pt-3 fw-bold d-inline">
                <a className="text-decoration-none header-font" href="#">PILL LAW</a>
              </h2>
            </div>
          </div>
        </div>

        {/* 로그인 폼 */}
        <div className="mx-5 px-5 mt-4">
          <div className="mx-5 px-5">
            <div className="mx-5 px-5 mt-3">
              <form className="px-5 mx-5" method="post">
                <div className="mt-3 mx-5 px-5">
                  <label htmlFor="email" className="form-label"></label>
                  <input type="email" className="form-control border-bottom" id="email" placeholder="이메일" name="email" />
                </div>
                <div className="mx-5 px-5 mt-1">
                  <input type="password" className="form-control" id="pwd" placeholder="비밀번호" name="pswd" />
                </div>
                <div className="form-check mb-3 mx-5 px-5">
                  <label className="form-check-label header-font fw-bold fs-12">
                    <input className="form-check-input mx-2" type="checkbox" name="remember" /> 로그인 정보 기억하기
                  </label>
                </div>
                <div className="d-grid px-4 mx-4">
                  <button type="submit" className="btn btn-pilllaw mx-5 btn-block">로그인</button>
                </div>
              </form>

              <div className="mx-4 px-4">
                <div className="mt-5"></div>

                {/* 카카오 로그인 */}
                <div className="d-grid px-5 mx-5 mt-3">
                  <button type="button" className="btn btn-kakao mx-5 btn-block fw-bold text-kakao">
                    <img className="img-fluid me-2 mb-1" src="/resources/image/kakao-svgrepo-com.png" width="18" alt="카카오 로그인" />
                    카카오 로그인
                  </button>
                </div>

                {/* 네이버 로그인 */}
                <div className="d-grid px-5 mx-5 mt-2">
                  <button type="button" className="btn btn-naver mx-5 btn-block fw-bold text-white">
                    <img className="img-fluid me-2 mb-1" src="/resources/image/naver-svgrepo-com.png" width="18" alt="네이버 로그인" />
                    네이버 로그인
                  </button>
                </div>

                {/* GitHub 로그인 */}
                <div className="d-grid px-5 mx-5 mt-2">
                  <button type="button" className="btn btn-github mx-5 fw-bold text-white mb-1">
                    <i className="fa-brands fa-lg fa-github mx-2"></i> GitHub 로그인
                  </button>
                </div>

                {/* 인스타그램 로그인 */}
                <div className="d-grid px-5 mx-5 mt-1">
                  <button type="button" className="btn btn-insta mx-5 fw-bold text-white mb-1">
                    <i className="fa-brands fa-instagram fa-lg mx-2 ms-4"></i> 인스타그램 로그인
                  </button>
                </div>

                {/* Google 로그인 */}
                <div className="d-grid px-5 mx-5 mt-1">
                  <button type="button" className="btn btn-google mx-5 fw-bold mb-1">
                    <img className="img-fluid me-2 mb-1" src="/resources/image/google-color-svgrepo-com.png" width="18" alt="구글 로그인" />
                    Google 로그인
                  </button>
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
