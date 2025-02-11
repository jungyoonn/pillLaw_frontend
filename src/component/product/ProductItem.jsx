import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductItem = ({ product }) => {
  return (
    <Col xs={6} sm={4} lg={3} xl={2} className="mt-2 mb-4 best-item">
      <Link to={`/product/detail/${product.id}`} className="text-decoration-none text-black">
        <img className="img-fluid mx-2" src={product.image} alt={product.name} />
        <p className="m-0 mt-1 fs-14 fw-bold">{product.name}</p>
      </Link>
      <p className="m-0 fs-14 mt-2">
        <span className="header-font fw-bold">{product.price.toLocaleString()}</span>원
      </p>
      <p className="m-0 fs-12 fw-bold">
        <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> {product.rating}{" "}
        <span className="fs-11" style={{ color: "#AAA" }}>
          리뷰({product.reviews})
        </span>
      </p>
    </Col>
  );
};

export default ProductItem;
