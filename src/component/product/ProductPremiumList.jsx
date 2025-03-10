import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import "../../resources/css/style.css";
import image1 from "../../resources/image/product1.jpg";
import image2 from "../../resources/image/product2.jpg";
import image3 from "../../resources/image/product3.jpg";
import { Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ProductCategorySelector from "./ProductCategorySelector";
import ProductItem from "./ProductItem";
import axios from "axios";

const ProductPremiumList = () => {
  return (
    <div className="wrap">
      <Container className="text-center" style={{ paddingTop: "115.19px" }}>
        <h1 className="fw-bold my-5"> 멤버십 상품</h1>
        {/* 검색창 */}
        <div className="form-floating my-2 fs-12">
          <input 
            type="text"
            className="form-control"
            id="search"
            placeholder="검색어를 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{opacity:0.2}}
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
}

export default ProductPremiumList;
