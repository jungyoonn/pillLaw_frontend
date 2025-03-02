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

  // ✅ 좋아요 상태 및 개수 초기화
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const fetchLikesData = async () => {
        try {
          const likePromises = reviews.map((review) =>
            req("get", `v1/product/review/like/count/${review.prno}`)
          );

          const likedPromises = reviews.map((review) =>
            req("get", `v1/product/review/like/check/${mno}/${review.prno}`)
          );

          // ✅ 병렬 요청 실행
          const likeCounts = await Promise.all(likePromises);
          const likedStatuses = await Promise.all(likedPromises);

          // ✅ 상태 업데이트
          const updatedLikes = reviews.reduce((acc, review, index) => {
            acc[review.prno] = likeCounts[index]?.data || 0;
            return acc;
          }, {});

          const updatedLikedReviews = reviews.reduce((acc, review, index) => {
            acc[review.prno] = likedStatuses[index]?.data || false;
            return acc;
          }, {});

          setReviewLikes(updatedLikes);
          setLikedReviews(updatedLikedReviews);
        } catch (error) {
          console.error("좋아요 상태 가져오기 실패:", error);
        }
      };

      fetchLikesData();
    }
  }, [reviews, mno, req]);

  // ✅ 좋아요 토글
  const handleLikeToggle = async (reviewId) => {
    console.log("👍 좋아요 요청 전송 - mno:", mno, "prno:", reviewId);

    if (!mno) {
      console.error("❌ 회원 ID가 없습니다! 로그인 상태를 확인하세요.");
      return;
    }

    try {
      // ✅ 현재 좋아요 상태 확인
      const isLiked = likedReviews[reviewId];

      // ✅ UI를 즉시 업데이트 (낙관적 업데이트)
      setLikedReviews((prev) => ({
        ...prev,
        [reviewId]: !isLiked,
      }));

      setReviewLikes((prev) => ({
        ...prev,
        [reviewId]: isLiked ? prev[reviewId] - 1 : prev[reviewId] + 1,
      }));

      // ✅ 서버에 요청 보내기
      const endpoint = isLiked
        ? "v1/product/review/like/remove"
        : "v1/product/review/like/add";

      const response = await req("post", endpoint, {
        mno: mno, // ✅ 회원 ID 포함
        prno: reviewId, // ✅ 리뷰 ID 포함
      });

      console.log("👍 좋아요 요청 완료:", response.data);
    } catch (error) {
      console.error("❌ 좋아요 요청 실패:", error);

      // ✅ 요청 실패 시 원래 상태로 복구
      setLikedReviews((prev) => ({
        ...prev,
        [reviewId]: !prev[reviewId],
      }));

      setReviewLikes((prev) => ({
        ...prev,
        [reviewId]: prev[reviewId] + (likedReviews[reviewId] ? 1 : -1),
      }));
    }
  };

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
                onError={(e) => (e.target.src = "/default-image.jpg")}
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
