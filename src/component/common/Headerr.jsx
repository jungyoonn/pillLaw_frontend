import React from 'react';
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
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { name: "전체 상품", path: "/product/list" },
  { name: "구독하기", path: "/subscribe" },
  { name: "필로", path: "/pillaw" },
  { name: "마이페이지", path: "/mypage" },
];

const Headerr = () => {
  return (
    <header
      className="container-fluid mb-0"
      style={{ position: "fixed", backgroundColor: "#F8F9FA", width: "100%", zIndex: "99" }}
    >
      <Container>
        <Row>
          <Col xs lg="3">
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
                  <Link className="text-decoration-none header-font pt-4" to={item.path}>
                    {item.name}
                  </Link>
                </h6>
              ))}
            </div>
            <div className="float-end py-4">
              {[faUser, faCartShopping, faBell, faMagnifyingGlass, faCommentDots].map(
                (icon, index) => (
                  <Link to={"/"}>
                    <FontAwesomeIcon
                      key={index}
                      icon={icon}
                      className="fa-lg header-font float-end mx-2 pt-4 text-center"
                    />
                  </Link>
                )
              )}
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
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Headerr;
