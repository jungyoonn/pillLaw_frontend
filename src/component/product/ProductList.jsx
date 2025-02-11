import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import "../../resources/css/style.css";
import image1 from "../../resources/image/product1.jpg";
import image2 from "../../resources/image/product2.jpg";
import image3 from "../../resources/image/product3.jpg";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import ProductCategorySelector from "./ProductCategorySelector";
import ProductItem from "./ProductItem";

// 상품 데이터 (추후 API 연동 예정)
const products = [
  { id: 1, name: "프레쉬 유산균", price: 30500, image: image1, rating: 4.1, reviews: 19 },
  { id: 2, name: "비타민", price: 26000, image: image2, rating: 4.5, reviews: 25 },
  { id: 3, name: "홍삼", price: 41500, image: image3, rating: 4.2, reviews: 30 },
];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="wrap">
      <Container className="text-center" style={{ paddingTop: "115.19px" }}>
        <h1 className="fw-bold my-5">상품 리스트</h1>
        {/* 검색창 */}
        <div className="form-floating my-2 fs-12">
          <input 
            type="text"
            className="form-control"
            id="search"
            placeholder="검색어를 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{opacity:0.3}}
          />
          <label htmlFor="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-14"/> 검색어를 입력하세요.
          </label>
        </div>
        <hr className="text-pilllaw"/>
        {/* 카테고리 필터 */}
        <div className="category-selector">
          <ProductCategorySelector/>
        </div>


        {/* 상품 리스트 */}
        <Row className="text-center container-fluid mt-4">
          {products
            .filter((product) => product.name.includes(searchTerm)) // 검색 필터 적용
            .map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
