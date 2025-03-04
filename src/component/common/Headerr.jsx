import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../resources/css/style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../resources/image/pilllaw_icon_crop.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBell,
  faMagnifyingGlass,
  faPaperPlane,
  faCapsules
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../hooks/AuthContext';
import { icon } from '@fortawesome/fontawesome-svg-core';

const icons = [
  { icon: faUser, path: "/mypage" },
  { icon: faCartShopping, path: "/cart"}, 
  { icon: faMagnifyingGlass, path: "/product/list"},
  { icon: faPaperPlane, path: "/mypage?tab=letterlistcomponent" },
];

const navItems = [
  { name: "전체 상품", path: "/product/list" },
  { name: "필로", path: "/aboutus" },
  { name: "장바구니", path: "/cart" },
  { name: "마이페이지", path: "/mypage" },
  { name: "공지사항", path: "/notice" }
];

const Headerr = () => {
// const Headerr = (login, email, setEmail, setLogin) => {
  const [login, setLogin] = useState(false);
  const {logout} = useAuth();
  
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    // console.log(localStorage.getItem('token'));
    // console.log(localStorage.getItem('email'));
    
    setLogin(!!storedEmail);

  }, [login, logout]);

  const handleLogout = () => {
    logout();
    setLogin(false);
  }

  return (
    <header
      className="container-fluid mb-0"
      style={{ position: "fixed", backgroundColor: "#F8F9FA", width: "100%", zIndex: "99" }}
    >
      <Container>
        <Row>
          <Col xs="1" lg="3">
            <Link to="/" className="float-start m-2">
              <img
                className="img-fluid header-icon"
                src={logo}
                alt="아이콘"
              />
            </Link>
            <h2 className="float-start mt-4 ms-3 pt-3 fw-bold">
              <Link className="text-decoration-none header-font" to="/">
                PILL LAW
              </Link>
            </h2>
          </Col>
          <Col>
            <div className="float-start py-4 ps-5">
              {navItems.map((item, index) => (
                <h6 key={index} className="float-start m-4 text-center fw-bold">
                  <Link key={index} className="text-decoration-none header-font pt-4" to={item.path}>
                    {item.name}
                  </Link>
                </h6>
              ))}
            </div>
            <div className="float-end py-4">
              {icons.map(
                (item, index) => (
                  <Link to={item.path} key={index}>
                    <FontAwesomeIcon
                      key={index}
                      icon={item.icon}
                      className="fa-lg header-font float-end mx-2 pt-4 text-center"
                    />
                  </Link>
                )
              )}
                {!login ? (
                  <>
                    <p className="float-end mx-2 pt-4 text-center fw-bold fs-12">
                      <Link className="header-font pt-3" to="/signup">
                        회원가입
                      </Link>
                    </p>
                    <p className="float-end pt-4 text-center fw-bold fs-12">
                      <Link className="header-font pt-3" to="/signin">
                        로그인
                      </Link>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="float-end mx-2 pt-4 text-center fw-bold fs-12">
                      <Link className="header-font pt-3" onClick={handleLogout}>
                        로그아웃
                      </Link>
                    </p>
                    <div className="float-end pt-4 text-center fw-bold fs-12">
                      <p className="header-font text-decoration-none">
                      <FontAwesomeIcon icon={faCapsules} className="fa-regular fa-lg mx-1" />
                      환영합니다!
                      </p>
                    </div>
                  </>
                )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Headerr;
