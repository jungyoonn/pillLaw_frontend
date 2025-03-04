import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useAxios from '../../hooks/UseAxios';

const ProductItem = ({ product, reviews }) => {
  const {loading, error} = useAxios();

  useEffect(()=>{
    // console.log("ProductItem에서 받은 Product :::: ", product);
    // console.log("ProductItem에서 받은 Product :::: ", reviews);
  }, [product, reviews]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0; // 리뷰가 없으면 0 반환
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return (totalRating / reviews.length).toFixed(1); // 소수점 한 자리까지 반올림
  };
  
  const averageRating = calculateAverageRating(reviews);

  if(error){
    return <div><h1>Error Occured!</h1></div>;
  }
  if(loading){
    return <div><h1>loading,,,</h1></div>;
  }


  return (
    <Col xs={6} sm={4} lg={3} xl={2} className="mt-2 mb-4">
    <Link to={`/product/detail/${product.pno}`} className="text-decoration-none text-black">
      <img className="img-fluid mx-2" style={{height:200}} src={product.imageUrl} alt={product.pname} />
      <p className="m-0 mt-1 fs-11 fw-bold text-secondary text-start mx-2">{product.company}</p>
      <p className="m-0 mt-1 fs-14 fw-bold text-start mx-2">{product.pname}</p>
      <Row className="m-0 mt-1">
        {product.priceInfo.rate !== 0 ? (
          <p className="mb-0 p-0 text-start mx-2">
            {product.priceInfo.rate !== 0 && (
              <span className="text-info fw-bold mx-2"> {product.priceInfo.rate} % </span>
            )}
          </p>
        ) : 
          null
        }
      </Row>
      <Row className="mt-1 mb-0">
        <Col className="p-0">
        
        {product.priceInfo.rate !== 0 ? (
          <>
            <span className="header-font fs-14 fw-bold mx-2">{product.priceInfo.salePrice.toLocaleString()}</span>
            <span className="mx-2 text-secondary text-decoration-line-through">
              {product.priceInfo.price.toLocaleString()}
            </span>원
          </>
        ) : null}
        </Col>
      </Row>
      <Row className="m-0 p-0 fs-12 fw-bold text-start">
        <Col>
          <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 
          {averageRating}
          <span className="fs-12 text-secondary mx-2">
            리뷰 ({reviews.length})
          </span>
        </Col>
      </Row>
    </Link>
    </Col>
  );
};

export default ProductItem;