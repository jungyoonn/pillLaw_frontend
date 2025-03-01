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
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/AuthContext';
import UseAxios from '../../hooks/UseAxios'; // axios 훅
import ToastMsg from "../common/ToastMsg";



const ProductSummary = ({ product }) => {
  const { mno } = useAuth();
  const { req } = UseAxios();
  const [selectedOption, setSelectedOption] = useState("30");
  const [cno, setCno] = useState(null);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");

  const fetchCartCno = useCallback(async () => {
    try {
      const response = await req("get", `v1/cart/${mno}`);
      setCno(response); // 👈 response 자체가 13이므로 이렇게 설정!
    } catch (error) {
    }
  }, [mno]); // mno가 변경될 때마다 새로 정의되도록 의존성 추가

  useEffect(() => {
    if (mno) {
      fetchCartCno(); // mno가 있을 때만 호출
    }
  }, [mno, fetchCartCno]); // mno나 fetchCartCno가 변경될 때마다 실행되도록 설정

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false); // 3초 후 토스트 닫기
      }, 3000);

      return () => clearTimeout(timer); // 클린업 (안전하게 정리)
    }
  }, [showToast]);


  const goToCart = () => {
    if (!mno) {
      setToastMessage("로그인이 필요한 서비스입니다.");
      setToastTitle("실패");
      setShowToast(true);
      return;
    }
    navigate("/cart");
  };

  const handleAddToCart = async () => {
    if (!mno) {
      setToastMessage("로그인이 필요한 서비스입니다.");
      setToastTitle("실패");
      setShowToast(true);
      return;
    }
    if (!cno) {
      setToastMessage("장바구니가 생성되지 못했습니다. 로그아웃 후 다시 시도해주세요");
      setToastTitle("성공");
      setShowToast(true);
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
      setToastMessage("상품이 장바구니에 추가되었습니다.");
      setToastTitle("성공");
      setShowToast(true);

    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      setToastMessage("다시 시도해 주세요");
      setToastTitle("실패");
      setShowToast(true);
    }
  };

  if (!product || Object.keys(product).length === 0) {
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

      <Row className="mt-4">
        <Col className="text-start">
          <FontAwesomeIcon icon={faTruck} size="xl" /> &nbsp; <span>배송비</span>
          <span className="fs-14 fw-bold"> 3,000 </span> <span> 원 </span>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faCalendarCheck} size="xl" className="align-middle me-2" />
          <Form.Select className="fs-16 w-25" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="30">30일</option>
            <option value="60">60일</option>
            <option value="90">90일</option>
          </Form.Select>
          <span className="text-muted">섭취기간을 선택해주세요</span>
        </Col>
      </Row>

    
      <Row className="mt-5">
        <Col xs={2}></Col>
        <Col className="d-flex justify-content-start gap-2">  {/* justify-content-end로 우측 정렬하고 gap-2로 간격 추가 */}
          <Button variant="pilllaw" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartShopping} productImage={product.imageUrl} /> 장바구니 담기
          </Button>
          <Button variant="pilllaw" onClick={goToCart}>
            <FontAwesomeIcon icon={faShare} />&nbsp; 장바구니 가기
          </Button>
        </Col>
        <Col xs={2}></Col>
      </Row>

      {showToast && (
        <ToastMsg
          title={toastTitle}
          msg={toastMessage}
          state={showToast}  // 토스트 표시 상태
          nav={null}  // 토스트 버튼 클릭 시 이동할 경로
        />
      )}
    </>
  );
};

export default ProductSummary;