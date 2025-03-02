import React, { useEffect, useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
import { Card, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserReviews = ({ mno }) => {
  const { req, data, loading, error } = UseAxios();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (mno) {
      fetchMyReviews(mno);
    }
  }, [mno]);

  const fetchMyReviews = async (mno) => {
    try {
      const response = await req("GET", `v1/product/detail/review/mine/${mno}`);
      console.log(response);
      if (response) {
        setReviews(response);
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;
  if (!reviews.length) return <p>작성한 리뷰가 없습니다.</p>;

  return (
    <div className="p-2">
      <h4 className="text-center header-font fw-bold">내가 작성한 리뷰</h4>
      <p className="fs-12 text-center">작성한 리뷰가 {reviews.length} 개 있습니다.</p>
      <Row>
        <Col xs="1" />
        <Col>
          <Card className="mt-3">
            <Card.Header className="fw-bold text-center text-pilllaw">상품 리뷰</Card.Header>
            <ListGroup variant="flush">
              {reviews.map((review) => (
                <ListGroup.Item key={review.prno} className="d-flex align-items-center bg-pilllaw-form">
                  <div className="flex-grow-1">
                    <Link to={`/product/detail/${review.pno}`} className="text-decoration-none text-black">
                      <p className="fw-bold mb-1 fs-14">{review.nickName}</p>
                      <div dangerouslySetInnerHTML={{ __html: review.content }} className="fs-14"></div>
                      <small className="text-muted">{new Date(review.regDate).toLocaleDateString()}</small>
                    </Link>
                  </div>

                  {review.fileDtos?.length > 0 && (
                    <div className="ms-3 d-flex">
                      {review.fileDtos.map((file, idx) => (
                        <img
                          key={idx}
                          src={file.url}
                          alt="리뷰 이미지"
                          className="review-image"
                        />
                      ))}
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col xs="1" />
      </Row>
    </div>
  );
};

export default UserReviews;
