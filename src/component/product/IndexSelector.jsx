import React, { useEffect, useState } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import useAxios from "../../hooks/UseAxios";
import IndexItem from "./IndexItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import tag1 from "../../resources/image/main_tag1.png";
import tag2 from "../../resources/image/main_tag2.png";
import tag4 from "../../resources/image/main_tag4.png";
import tag6 from "../../resources/image/main_tag6.png";
import tag7 from "../../resources/image/main_tag7.png";

const IndexSelector = () => {
  const { req } = useAxios();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("BEST상품"); // ✅ 현재 선택된 카테고리

  useEffect(() => {
    console.log("API에서 받은 regDate:", products.map(p => p.product.regDate));
    const fetchProducts = async () => {
      try {
        const response = await req("get", "v1/product/list");
        if (response && Array.isArray(response)) {
          setProducts(response);
        } else {
          console.warn("상품 데이터가 없습니다.");
          setProducts([]);
        }
      } catch (err) {
        console.error("상품 정보 불러오기 실패:", err);
        setError(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [req]);

  // 안전한 정렬 (undefined 값 고려)
  const safeSort = (arr, key, desc = true) => {
    return [...arr].sort((a, b) => {
      const valA = key in a.product ? parseFloat(a.product[key]) || 0 : 0;
      const valB = key in b.product ? parseFloat(b.product[key]) || 0 : 0;
      return desc ? (valB - valA) : (valA - valB);
    }).slice(0, 6);
  };

  // 카테고리별 데이터 필터링
  let filteredProducts = [];

  if (selectedCategory === "BEST상품") {
    filteredProducts = safeSort(products, "rating"); // ✅ 평점 높은 순
  } else if (selectedCategory === "신제품") {
    filteredProducts = [...products]
      .filter((p) => p.product.regDate)
      .sort((a, b) => new Date(b.product.regDate) - new Date(a.product.regDate))
      .slice(0, 6);
  } else if (selectedCategory === "리뷰많은순") {
    filteredProducts = [...products]
      .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0)) // ✅ 리뷰 많은 순 수정
      .slice(0, 6);
  }

  return (
    <Col xs lg="9" className="mx-2">
      <div className="mt-3 mb-4 mx-3">
        <div className="mb-3 text-center">
          <FontAwesomeIcon icon={faLessThan} className="fa-2xl fw-bold text-pilllaw px-3" />
          <img className="img-fluid mx-2" src={tag1} width="50" alt="태그 이미지" />
          <img className="img-fluid mx-2" src={tag2} width="50" alt="태그 이미지" />
          <img className="img-fluid mx-2" src={tag7} width="50" alt="태그 이미지" />
          <img className="img-fluid mx-2" src={tag4} width="50" alt="태그 이미지" />
          <img className="img-fluid mx-2" src={tag6} width="50" alt="태그 이미지" />
          <FontAwesomeIcon icon={faGreaterThan} className="fa-2xl fw-bold text-pilllaw px-3" />
        </div>
        <Row>
          <Col className="text-end mx-1">
            <h1 className="fw-bold col pilllaw-tag" onClick={() => setSelectedCategory("BEST상품")}>
              #BEST상품
            </h1>
            <h1 className="fw-bold mt-1 pilllaw-tag" onClick={() => setSelectedCategory("얼리버드")}>
              #얼리버드
            </h1>
            <h1 className="fw-bold col pilllaw-tag" onClick={() => setSelectedCategory("구독자상품")}>
              #구독자상품
            </h1>
          </Col>
          <Col className="mx-1 text-start">
            <h1 className="fw-bold col pilllaw-tag" onClick={() => setSelectedCategory("필로패키지")}>
              #필로패키지
            </h1>
            <h1 className="fw-bold pilllaw-tag" onClick={() => setSelectedCategory("신제품")}>
              #신제품
            </h1>
            <h1 className="col fw-bold pilllaw-tag" onClick={() => setSelectedCategory("리뷰많은순")}>
              #리뷰 많은
            </h1>
          </Col>
        </Row>
      </div>

      {/* 선택된 카테고리 제목 표시 */}
      <h5 className="mx-3 fw-bold">
        <FontAwesomeIcon icon={faCrown} style={{ color: "#FFD43B" }} /> {selectedCategory}
      </h5>
      <div className="container clearfix">
        <Row className="text-center">
          {loading ? (
            <Spinner animation="border" variant="info" />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <Col className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item" key={p.product.pno}>
                <IndexItem product={p.product} />
              </Col>
            ))
          ) : (
            <p className="text-muted">등록된 상품이 없습니다.</p>
          )}
        </Row>
      </div>
    </Col>
  );
};

export default IndexSelector;
