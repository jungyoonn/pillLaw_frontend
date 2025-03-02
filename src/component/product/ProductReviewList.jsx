import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Button } from "react-bootstrap";
import UseAxios from "../../hooks/UseAxios";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { formatDate } from "../../utils/formatDate";

const ProductReviewList = ({ reviews, onDelete }) => {
  const { mno } = useAuth();
  const [reviewLikes, setReviewLikes] = useState({});
  const [likedReviews, setLikedReviews] = useState({});
  const { req } = UseAxios();

  // ✅ 좋아요 상태 초기화
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const initialLikes = reviews.reduce((acc, review) => {
        acc[review.prno] = review.count; // 좋아요 개수 설정
        return acc;
      }, {});

      setReviewLikes(initialLikes);

      // ✅ 사용자가 좋아요를 눌렀는지 여부 확인 (비동기 처리)
      const fetchLikedStatus = async () => {
        const updatedLikedReviews = {};
        for (const review of reviews) {
          try {
            const response = await req("get", `v1/product/review/like/check/${mno}/${review.prno}`);
            updatedLikedReviews[review.prno] = response.data; // true or false
          } catch (error) {
            console.error("좋아요 상태 가져오기 실패:", error);
          }
        }
        setLikedReviews(updatedLikedReviews);
      };

      fetchLikedStatus();
    }
  }, [reviews, mno, req]);

  // ✅ 좋아요 토글
  const handleLikeToggle = async (reviewId) => {
    try {
      const isLiked = likedReviews[reviewId];

      const endpoint = isLiked
        ? `v1/product/review/like/remove`
        : `v1/product/review/like/add`;

      const requestData = { mno, prno: reviewId };
      await req("post", endpoint, requestData);

      setReviewLikes((prevLikes) => ({
        ...prevLikes,
        [reviewId]: isLiked ? prevLikes[reviewId] - 1 : prevLikes[reviewId] + 1,
      }));

      setLikedReviews((prevLiked) => ({
        ...prevLiked,
        [reviewId]: !prevLiked[reviewId],
      }));
    } catch (err) {
      console.error("좋아요 요청 실패:", err);
    }
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const fetchLikesCount = async () => {
        const updatedLikes = {};
        for (const review of reviews) {
          try {
            const response = await req("get", `v1/product/review/like/count/${review.prno}`);
            updatedLikes[review.prno] = response.data; // 좋아요 개수
          } catch (error) {
            console.error("좋아요 개수 가져오기 실패:", error);
            updatedLikes[review.prno] = 0;
          }
        }
        setReviewLikes(updatedLikes);
      };
  
      fetchLikesCount();
    }
  }, [reviews, req]);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.prno} className="row border border-1 pt-4 pb-3 mx-3 fs-12 mt-2">
          <Col xs={2} className="d-flex align-items-center">
            {review.imageUrls && review.imageUrls.length > 0 ? (
              <img
                className="img-fluid w-75 pilllaw-product-image"
                src={review.imageUrls[0]}
                alt="리뷰 이미지"
                onError={(e) => (e.target.src = "/default-image.jpg")} // 기본 이미지 설정
              />
            ) : (
              <img className="img-fluid w-75 pilllaw-product-image" src="/default-image.jpg" alt="기본 이미지" />
            )}
          </Col>
          <Col xs={6}>
            <Row className="text-start">
              <span dangerouslySetInnerHTML={{ __html: review.content }} />
            </Row>
          </Col>
          <Col xs={1} className="text-start">
            <Link className="text-decoration-none text-pilllaw" to={`/userpage/${review.mno}`}>
              {review.nickName}
            </Link>
          </Col>
          <Col xs={1} className="text-center">
            <span>{review.regDate ? formatDate(review.regDate) : "날짜 없음"}</span>
          </Col>
          <Col xs={2} className="text-center">
            <span className="fw-bold">별점: </span>
            {Array.from({ length: review.rating }).map((_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} className="text-warning" />
            ))}
            ({review.rating}점)
          </Col>
          <Row className="row text-end mt-2">
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
                도움이 돼요
                <FontAwesomeIcon icon={faHeart} className={likedReviews[review.prno] ? "text-danger" : "text-secondary"} />{" "}
                : {reviewLikes[review.prno]}
              </Link>
            </Col>
            <Col className="py-1 mt-1">
              {mno === review.mno && (
                <Col xs="2" className="text-center">
                  <Button variant="danger" className="fw-bold fs-12" onClick={() => onDelete(review.prno)}>
                    <FontAwesomeIcon icon={faTrash} /> 삭제
                  </Button>
                </Col>
              )}
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
export default ProductReviewList;