import React, { useState } from "react";
import logo from '../../resources/image/pilllaw_icon_crop.png';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const SignTerms = () => {
  const [terms, setTerms] = useState({
    rule: false,
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
        rule: checked,
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
        all: checked && prev.rule && prev.info && prev.marketing && prev.sms && prev.email,
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
        <div className="terms mx-5 px-5 pt-5">
          <Form method="post">
            <div className="form-check-reverse text-start">
              <Form.Label htmlFor="rule">
                <Form.Check 
                  className="ps-0"
                  style={{display:'inline'}}
                  type="checkbox"
                  id="rule"
                  checked={terms.rule}
                  label={<><span className="text-success fw-bold">[필수] </span> 필로 이용 약관</>}
                  onChange={handleCheckboxChange}
                />
              </Form.Label>
              <Form.Control as="textarea" rows={5} readOnly className="mt-2 scroll" />

              <Form.Label className="mt-3" htmlFor="info">
                <Form.Check
                  className="ps-0"
                  type="checkbox"
                  id="info"
                  label={<><span className="text-success fw-bold">[필수] </span>개인정보 수집 및 이용</>}
                  checked={terms.info}
                  onChange={handleCheckboxChange}
                />
              </Form.Label>
              <Form.Control as="textarea" rows={5} readOnly className="mt-2 scroll" />
            </div>

            <div className="form-check-reverse text-start">
              <Form.Label className="mt-3" htmlFor="marketing">
                <Form.Check 
                  className="ps-0"
                  type="checkbox"
                  id="marketing"
                  label={<><span className="fw-bold" style={{ color: "blueviolet" }}>[선택] </span>마케팅 수신 전체 동의</>}
                  checked={terms.marketing}
                  onChange={handleCheckboxChange}
                />
              </Form.Label> <br />

              <Form.Label className="mt-1" htmlFor="sms">
                <Form.Check 
                  className="ps-0"
                  type="checkbox"
                  id="sms"
                  label={<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SMS 수신 동의</>}
                  checked={terms.sms}
                  onChange={handleCheckboxChange}
                />
              </Form.Label> <br />

              <Form.Label className="mt-1" htmlFor="email">
                <Form.Check
                  className="ps-0"
                  type="checkbox"
                  id="email"
                  label={<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 이메일 수신 동의</>}
                  checked={terms.email}
                  onChange={handleCheckboxChange}
                />
              </Form.Label>
            </div>

            <hr />
            <div className="text-center">
              <Form.Label className="mt-2 fw-bold" htmlFor="all">
                <Form.Check 
                  className="ps-0"
                  type="checkbox"
                  id="all"
                  label={<>전체 동의</>}
                  checked={terms.all}
                  onChange={handleCheckboxChange}
                />
              </Form.Label>
              <Button variant="pilllaw" to={"/signup/email"} type="submit" className="btn btn-pilllaw mx-5 px-5">다음</Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default SignTerms;
