import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCapsules,
  faHeart,
  faShareNodes,
  faWonSign,
  faTruck,
  faCartShopping,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/AuthContext';
import UseAxios from '../../hooks/UseAxios'; // axios 훅



const ProductSummary = ({ product }) => {
  const { mno } = useAuth();
  const { req } = UseAxios();
  const [selectedOption, setSelectedOption] = useState("30");
  const [cno, setCno] = useState(null);
  const navigate = useNavigate();

  const fetchCartCno = useCallback(async () => {
    try {
      const response = await req("get", `v1/cart/${mno}`);
      console.log("🔍 전체 응답 데이터:", response);
      setCno(response); // 👈 response 자체가 13이므로 이렇게 설정!
    } catch (error) {
      console.error("장바구니 조회 실패:", error);
    }
  }, [mno]); // mno가 변경될 때마다 새로 정의되도록 의존성 추가

  useEffect(() => {
    if (mno) {
      fetchCartCno(); // mno가 있을 때만 호출
    }
  }, [mno, fetchCartCno]); // mno나 fetchCartCno가 변경될 때마다 실행되도록 설정

  const goToCart = () => {
    navigate("/cart");
  };

  const handleAddToCart = async () => {
    if (!mno) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!cno) {
      alert("장바구니를 불러올 수 없습니다.");
      return;
    }
    try {
      const cartItemDto = {
        cno,
        pno: product.pno,
        subday: parseInt(selectedOption),
        quantity: 1,
      };
      const response = await req("post", `v1/cart/${cno}/items`, cartItemDto);
      console.log("장바구니 추가 성공:", response);
      alert("장바구니에 추가되었습니다.");

    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  console.log("🧐 ProductSummary에서 받은 product:", product);
  if (!product || Object.keys(product).length === 0) {
    console.warn("⚠️ ProductSummary에서 product가 유효하지 않음:", product);
    return <div>상품 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <Row>
        {/* 상품 제목 */}
        <Col className="text-start">
          <h4 className="fw-bold">
            <FontAwesomeIcon icon={faCapsules} size="xl" /> &nbsp;&nbsp;&nbsp; {product.pname}
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
              <FontAwesomeIcon icon={faShareNodes} size="xl" className="fs-16 " />
            </Link>
          </span>
        </Col>
      </Row>

      {/* 정상가 */}
      <Row className="mt-4">
        <Col className="text-start">
          <FontAwesomeIcon icon={faWonSign} size="xl" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="fs-14 text-decoration-line-through text-secondary fw-bold">
            {product.priceInfo.price.toLocaleString()}
          </span>{" "}
          <span> 원 </span>
        </Col>
      </Row>

      {/* 할인가 */}
      <Row className="mt-2">
        <Col className="text-start">
          <span className="text-pilllaw fs-12 fw-bold">-{product.priceInfo.rate}%</span>
          &nbsp;&nbsp;&nbsp;
          <span className="fs-14 fw-bold">{product.priceInfo.salePrice.toLocaleString()}</span> <span> 원 </span>
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

      {/* <Row className="mt-5">
        <Col xs={1}></Col>
        <Col>
          <Form.Select className="fs-16" value={selectedOption} onChange={(e)=> setSelectedOption(e.target.value)}>
            <option className="text-secondary" disabled>
              (필수)옵션 선택
            </option>
            <option className="fs-12">30일 &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;</option>
            <option className="fs-12">60일 &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; </option>
            <option className="fs-12">90일 &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; </option>
          </Form.Select>
        </Col>
        <Col xs={1}></Col>
      </Row> */}

      <Row className="mt-5">
        <Col xs={1}></Col>
        <Col>
          <Form.Select className="fs-16" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="30">30일</option>
            <option value="60">60일</option>
            <option value="90">90일</option>
          </Form.Select>
        </Col>
        <Col xs={1}></Col>
      </Row>

      <Row className="mt-5">
        <Col xs={2}></Col>
        <Col className="d-flex justify-content-between">
          <Button variant="pilllaw" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faCartShopping} productImage={product.imageUrl}/> 장바구니에 담기
          </Button>
          <Button variant="pilllaw" onClick={goToCart}>
            <FontAwesomeIcon icon={faShare} size="xl" />&nbsp; 장바구니로 가기
          </Button>
        </Col>
        <Col xs={2}></Col>
      </Row>

      
      {/* <Row className="mt-5">
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
      </Row> */}
    </>
  );
};

export default ProductSummary;