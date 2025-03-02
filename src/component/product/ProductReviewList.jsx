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

      await req("post", endpoint, {
        mno: mno, // ✅ 회원 ID 포함
        prno: reviewId, // ✅ 리뷰 ID 포함
      });
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
      <h3 className="mt-3 text-center">상품 리뷰</h3>
      <p className="fs-11 text-center">총 {reviews.length}개의 리뷰가 있습니다.</p>

      {reviews.length === 0 ? (
        <div className="text-center mt-3 text-muted">
          <p className="fs-12">아직 작성된 리뷰가 없습니다.</p>
          <p>구매 후 첫 리뷰를 남겨보세요!</p>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {reviews.map((review) => (
            <div key={review.prno} className="review-card">
              {/* ✅ 리뷰 이미지 */}
              <div className="review-image-container">
                {review.imageUrls && review.imageUrls.length > 0 ? (
                  <img src={review.imageUrls[0]} alt="리뷰 이미지" className="review-image" />
                ) : (
                  <div className="default-review-image"></div>
                )}
              </div>

              {/* ✅ 리뷰 내용 */}
              <div className="review-content">
                <p className="fw-bold">{review.nickName}</p>
                <div className="review-text" dangerouslySetInnerHTML={{ __html: review.content }}></div>
                <small className="text-muted">{formatDate(review.regDate)}</small>
              </div>

              {/* ✅ 별점 */}
              <div className="review-rating">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} className="text-warning" />
                ))}
                ({review.rating}점)
              </div>

              {/* ✅ 좋아요 및 삭제 버튼 */}
              <div className="review-actions">
                <button className="like-button" onClick={() => handleLikeToggle(review.prno)}>
                  <FontAwesomeIcon icon={faHeart} className={likedReviews[review.prno] ? "text-danger" : "text-secondary"} />
                  <span> 도움이 돼요 ({reviewLikes[review.prno]})</span>
                </button>
                {mno === review.mno && (
                  <Button variant="danger" size="sm" onClick={() => onDelete(review.prno)}>
                    <FontAwesomeIcon icon={faTrash} /> 삭제
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviewList;
