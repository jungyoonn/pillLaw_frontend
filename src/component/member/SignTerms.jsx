import React, { useState } from "react";
import logo from '../../resources/image/pilllaw_icon_crop.png';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignTerms = () => {
  const [terms, setTerms] = useState({
    use: false,
    info: false,
    marketing: false,
    sms: false,
    email: false,
    all: false,
  });

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    
    if (id === "all") {
      setTerms({
        use: checked,
        info: checked,
        marketing: checked,
        sms: checked,
        email: checked,
        all: checked,
      });
    } else {
      setTerms((prev) => ({
        ...prev,
        [id]: checked,
        all: checked && prev.use && prev.info && prev.marketing && prev.sms && prev.email,
      }));
    }
  };

  return (
    <div className="wrap">
      <Container className="px-0">
        <div className="text-center m-2 mt-5">
          <Row>
            <Col xs lg="2"></Col>
            <Col xs lg="3" className="text-end">
              <Link to={"/"}>
                <img
                  src={logo}
                  className="img-fluid header-icon"
                  alt="아이콘"
                />
              </Link>
            </Col>
            <Col className="text-start mt-4 ms-3">
              <h2 className="mt-4 ms-3 pt-3 fw-bold d-inline">
                <Link to={"/"} className="text-decoration-none header-font">PILL LAW</Link>
              </h2>
            </Col>
          </Row>
        </div>

        {/* 약관 동의 폼 */}
        <div className="terms mx-5 px-5 mt-5 pt-5">
          <form method="post">
            <div className="form-check form-check-reverse text-start">
              <label className="form-check-label" htmlFor="use">
                <span className="text-success fw-bold">[필수] </span>필로 이용 약관
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="use"
                  checked={terms.use}
                  onChange={handleCheckboxChange}
                />
              </label>
              <textarea className="form-control mt-2 scroll" rows="5" readOnly></textarea>

              <label className="form-check-label mt-3" htmlFor="info">
                <span className="text-success fw-bold">[필수] </span>개인정보 수집 및 이용
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="info"
                  checked={terms.info}
                  onChange={handleCheckboxChange}
                />
              </label>
              <textarea className="form-control mt-2 scroll" rows="5" readOnly></textarea>
            </div>

            <label className="form-check-label mt-3" htmlFor="marketing">
              <span className="fw-bold" style={{ color: "blueviolet" }}>[선택] </span>마케팅 수신 전체 동의
              <input
                className="form-check-input"
                type="checkbox"
                id="marketing"
                checked={terms.marketing}
                onChange={handleCheckboxChange}
              />
            </label> <br />

            <label className="form-check-label mt-1" htmlFor="sms">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SMS 수신 동의
              <input
                className="form-check-input"
                type="checkbox"
                id="sms"
                checked={terms.sms}
                onChange={handleCheckboxChange}
              />
            </label> <br />

            <label className="form-check-label mt-1" htmlFor="email">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 이메일 수신 동의
              <input
                className="form-check-input"
                type="checkbox"
                id="email"
                checked={terms.email}
                onChange={handleCheckboxChange}
              />
            </label>

            <hr />
            <div className="text-center">
              <label className="form-check-label mt-2 fw-bold" htmlFor="all">
                전체 동의
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="all"
                  checked={terms.all}
                  onChange={handleCheckboxChange}
                />
              </label>
              <button type="submit" className="btn btn-pilllaw mx-5 px-5">다음</button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SignTerms;
