import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Button } from "react-bootstrap";
import UseAxios from "../../hooks/UseAxios";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

const ProductReviewList = ({ reviews }) => {
  const {mno} = useAuth();
  const [reviewLikes, setReviewLikes] = useState({});
  const [likedReviews, setLikedReviews] = useState({});
  const { req } = UseAxios();

  useEffect(() => {
    console.log("리뷰 :", reviews);  
    if (reviews && reviews.length > 0) {
      const initialLikes = reviews.reduce((acc, review) => {
        acc[review.prno] = review.likes;
        return acc;
      }, {});
      setReviewLikes(initialLikes);
    }
  }, [reviews]);
  
  const handleLikeToggle = (reviewId) => {  
    req("put", `v1/review/like/${reviewId}`)
      .then(() => {
        setReviewLikes((prevLikes) => ({
          ...prevLikes,
          [reviewId]: likedReviews[reviewId] ? prevLikes[reviewId] - 1 : prevLikes[reviewId] + 1,
        }));
        setLikedReviews((prevLiked) => ({
          ...prevLiked,
          [reviewId]: !prevLiked[reviewId], 
        }));
      })
      .catch((err) => console.error("좋아요 요청 실패:", err));
  };
  

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.prno} className="row border border-1 pt-4 pb-3 mx-3 fs-12 mt-2">
          <Col xs={2} className="d-flex align-items-center">
            {review.fileDtos && review.fileDtos.length > 0 ? (
              <img className="img-fluid w-75 pilllaw-product-image" src={reviews.fileDtos[0].url} alt="리뷰 이미지" />
            ) : (
              <img className="img-fluid w-75 pilllaw-product-image" src="/default-image.jpg" alt="기본 이미지" />
            )}
          </Col>

          <Col xs={6}>
            <Row className="text-start">
            </Row>
            <Row className="text-start mt-2">
              <span dangerouslySetInnerHTML={{ __html: review.content }} />
            </Row>
          </Col>

          <Col xs={2} className="text-center">
            <span>작성일: {review.regDate}</span>
          </Col>

          <Col xs={2} className="text-center">
            <span className="fw-bold">별점: </span>
            {Array.from({ length: review.rating }).map((_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} className="text-warning" />
            ))}
            ({review.rating}점)
          </Col>

          <Row className="row text-end mt-2 ">
            <Col xs="8"></Col>
            <Col xs="2">
              <Link
                className="btn btn-link text-decoration-none fw-bold fs-12"
                onClick={() => handleLikeToggle(review.prno)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: likedReviews[review.prno] ? "red" : "black",
                }}
              >
                도움이 돼요{review.count}
                <FontAwesomeIcon icon={faHeart} className={likedReviews[review.prno] ? "text-danger" : "text-secondary"} />{" "}
                : <span>{reviewLikes[review.prno]}</span>
              </Link>
            </Col>
            <Col className="py-1 mt-1 ">
            {/* {{ if({{mno}} == locatstorage.get(mno)) {
                <Link className="text-decoration-none text-danger fw-bold fs-12 "  onClick={() => onDelete}> 삭제 </Link>
              }}} */}
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewList;