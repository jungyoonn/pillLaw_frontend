import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card, Row, Col, Button } from "react-bootstrap";
import UseAxios from "../../hooks/UseAxios";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { formatDate } from "../../utils/formatDate";

const ProductReviewList = ({ reviews, onDelete }) => {
  const { mno } = useAuth();
  const [reviewLikes, setReviewLikes] = useState({});
  const [likedReviews, setLikedReviews] = useState({});
  const { req } = UseAxios();

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

          const likeCounts = await Promise.all(likePromises);
          const likedStatuses = await Promise.all(likedPromises);

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

  const handleLikeToggle = async (reviewId) => {
    console.log("👍 좋아요 요청 전송 - mno:", mno, "prno:", reviewId);

    if (!mno) {
      console.error("회원 ID가 없습니다! 로그인 상태를 확인하세요.");
      return;
    }

    try {
      const isLiked = likedReviews[reviewId];

      setLikedReviews((prev) => ({
        ...prev,
        [reviewId]: !isLiked,
      }));

      setReviewLikes((prev) => ({
        ...prev,
        [reviewId]: isLiked ? prev[reviewId] - 1 : prev[reviewId] + 1,
      }));

      const endpoint = isLiked
        ? "v1/product/review/like/remove"
        : "v1/product/review/like/add";

      await req("post", endpoint, {
        mno: mno, 
        prno: reviewId, 
      });
    } catch (error) {
      console.error("좋아요 요청 실패:", error);

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
        <Row className="justify-content-center">
          {reviews.map((review) => (
            <Col md={6} lg={4} key={review.prno} className="mb-4">
              <Card className="h-100 shadow-sm">
                {review.imageUrls && review.imageUrls.length > 0 ? (
                  <Card.Img
                    variant="top"
                    src={review.imageUrls[0]}
                    alt="리뷰 이미지"
                    className="review-image"
                    style={{ width:"100%", height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div className="default-review-image" style={{ height: "200px", backgroundColor: "#f0f0f0" }}></div>
                )}

                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                  <Link to={`/userpage/${review.mno}?tab=user-reviews`} className="text-decoration-none text-pilllaw">
                    <span>{review.nickName}</span>
                  </Link>
                    <small className="text-muted">{formatDate(review.regDate)}</small>
                  </Card.Title>

                  <Card.Text>
                    <div className="review-text fs-12" dangerouslySetInnerHTML={{ __html: review.content }}></div>
                  </Card.Text>

                  <div className="mb-3">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="text-warning" />
                    ))}
                    <span className="ms-1 fw-bold">({review.rating}점)</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleLikeToggle(review.prno)}
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={likedReviews[review.prno] ? "text-danger" : "text-secondary"}
                      />{" "}
                      도움이 돼요 ({reviewLikes[review.prno]})
                    </Button>

                    {mno === review.mno && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(review.prno)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> 삭제
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductReviewList;
