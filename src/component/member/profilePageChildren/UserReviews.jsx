import React, { useEffect, useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
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
    <div>
      <h2>내가 작성한 리뷰</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {reviews.map((review) => (
          <li
            key={review.prno}
            style={{
              marginBottom: "15px",
              padding: "10px",
              borderBottom: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              to={`/product/detail/${review.pno}`}
              style={{ textDecoration: "none", color: "black", flex: 1 }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {review.nickName}
              </p>
              <div dangerouslySetInnerHTML={{ __html: review.content }}></div>
              <small>{new Date(review.regDate).toLocaleDateString()}</small>
            </Link>

            {/* ✅ 리뷰 이미지 추가 */}
            {review.fileDtos?.length > 0 && (
              <div style={{ marginLeft: "10px" }}>
                {review.fileDtos.map((file, idx) => (
                  <img
                    key={idx}
                    src={file.url}
                    alt="리뷰 이미지"
                    style={{ width: "50px", height: "50px", borderRadius: "5px", objectFit: "cover", marginLeft: "5px" }}
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReviews;
