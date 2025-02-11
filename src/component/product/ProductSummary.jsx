import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCapsules,
  faHeart,
  faShareNodes,
  faWonSign,
  faTruck,
  faCartShopping,
  faCoins,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductSummary = ({ product }) => {
  if (!product) return null;

  const discountedPrice = product.price - product.price * product.discount;

  return (
    <>
      <Row>
        {/* 상품 제목 */}
        <Col className="text-start">
          <h4 className="fw-bold">
            <FontAwesomeIcon icon={faCapsules} size="xl" /> &nbsp;&nbsp;&nbsp; {product.name}
          </h4>
        </Col>
        {/* 좋아요 및 공유 버튼 */}
        <Col className="text-end">
          <span className="fw-bold">
            <Link to="#" className="text-decoration-none text-pilllaw">
              <FontAwesomeIcon icon={faHeart} size="xl" className="fs-16" />
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="#" className="text-decoration-none text-pilllaw">
              <FontAwesomeIcon icon={faShareNodes} size="xl" className="fs-16 "/>
            </Link>
          </span>
        </Col>
      </Row>

      {/* 정상가 */}
      <Row className="mt-4">
        <Col className="text-start">
          <FontAwesomeIcon icon={faWonSign} size="xl"/>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="fs-14 text-decoration-line-through text-secondary fw-bold">
            {product.price.toLocaleString()}
          </span>{" "}
          <span> 원 </span>
        </Col>
      </Row>

      {/* 할인가 */}
      <Row className="mt-2">
        <Col className="text-start">
          <span className="text-pilllaw fs-12 fw-bold">-{product.discount * 100}%</span>
          &nbsp;&nbsp;&nbsp;
          <span className="fs-14 fw-bold">{discountedPrice.toLocaleString()}</span> <span> 원 </span>
        </Col>
      </Row>

      {/* 구독 권유 버튼 */}
      <Row>
        <Col className="d-grid mt-4">
          <Button variant="pilllaw" className="btn-block">
            필로 구독 시 배송비 무료! 구독하러 가기 &nbsp;&nbsp;
            <FontAwesomeIcon icon={faShare} size="xl" />
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="text-start">
          <FontAwesomeIcon icon={faTruck} size="xl" /> &nbsp; <span>배송비</span>
          <span className="fs-14 fw-bold"> 3,000 </span> <span> 원 </span>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col xs={1}></Col>
        <Col>
          <Form.Select className="fs-16">
            <option className="text-secondary" disabled selected>
              (필수)옵션 선택
            </option>
            <option className="fs-12">30일 &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; {discountedPrice.toLocaleString()}원</option>
            <option className="fs-12">60일 &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; {(discountedPrice * 2).toLocaleString()}원</option>
            <option className="fs-12">90일 &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; {(discountedPrice * 3).toLocaleString()}원</option>
          </Form.Select>
        </Col>
        <Col xs={1}></Col>
      </Row>

      <Row className="mt-5">
        <Col xs={2}></Col>
        <Col className="d-flex justify-content-between">
          <Button variant="pilllaw">
            <FontAwesomeIcon icon={faCartShopping} /> &nbsp; 장바구니
          </Button>
          <Button variant="pilllaw">
            <FontAwesomeIcon icon={faCoins} /> &nbsp; 구매하기
          </Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </>
  );
};

export default ProductSummary;
