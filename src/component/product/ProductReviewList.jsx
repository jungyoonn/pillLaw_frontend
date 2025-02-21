import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";

const ProductReviewList = ({ reviews }) => {
  const [reviewLikes, setReviewLikes] = useState({});
  const [likedReviews, setLikedReviews] = useState({});

  useEffect(() => {
    const initialLikes = reviews.reduce((acc, review) => {
      acc[review.id] = review.likes;
      return acc;
    }, {});
    setReviewLikes(initialLikes);
  }, [reviews]);

  const handleLikeToggle = (reviewId) => {
    setReviewLikes((prevLikes) => ({
      ...prevLikes,
      [reviewId]: likedReviews[reviewId] ? prevLikes[reviewId] - 1 : prevLikes[reviewId] + 1,
    }));

    setLikedReviews((prevLiked) => ({
      ...prevLiked,
      [reviewId]: !prevLiked[reviewId], 
    }));
  };



  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="row border border-1 pt-4 pb-3 mx-3 fs-12 mt-2">
          <Col xs={2} className="d-flex align-items-center">
            {review.images && review.images.length > 0 ? (
              <img className="img-fluid w-75 pilllaw-product-image" src={review.images[0]} alt="리뷰 이미지" />
            ) : (
              <img className="img-fluid w-75 pilllaw-product-image" src="/default-image.jpg" alt="기본 이미지" />
            )}
          </Col>

          <Col xs={6}>
            <Row className="text-start">
              <span className="fw-bold">{review.title}</span>
            </Row>
            <Row className="text-start mt-2">
              <span dangerouslySetInnerHTML={{ __html: review.content }} />
            </Row>
          </Col>

          <Col xs={2} className="text-center">
            <span>작성일: {review.date}</span>
          </Col>

          <Col xs={2} className="text-center">
            <span className="fw-bold">별점: </span>
            {Array.from({ length: review.rating }).map((_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} className="text-warning" />
            ))}
            ({review.rating}점)
          </Col>

          <Row className="row text-end mt-2">
            <Col className="col">
              <button
                className="btn btn-link fw-bold fs-12"
                onClick={() => handleLikeToggle(review.id)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: likedReviews[review.id] ? "red" : "black",
                }}
              >
                도움이 돼요{" "}
                <FontAwesomeIcon icon={faHeart} className={likedReviews[review.id] ? "text-danger" : "text-secondary"} />{" "}
                : <span>{reviewLikes[review.id]}</span>
              </button>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewList;
