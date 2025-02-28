import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useAxios from '../../hooks/UseAxios';

const ProductItem = ({ product, reviews }) => {
  const {loading, error} = useAxios();

  useEffect(()=>{
    console.log("ProductItem에서 받은 Product :::: ", product);
    console.log("ProductItem에서 받은 Product :::: ", reviews);
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
      <p className="m-0 mt-1 fs-14 fw-bold">{product.pname}</p>
    </Link>
      <p className="m-0 fs-14 mt-2">
        <span className="header-font fw-bold">{product.priceInfo.salePrice}</span>원
      </p>
      <p className="m-0 fs-12 fw-bold">
        <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 
        {averageRating}
        <span className="fs-11 text-secondary">
          ({reviews.length})
        </span>
      </p>
    </Col>
  );
};

export default ProductItem;
