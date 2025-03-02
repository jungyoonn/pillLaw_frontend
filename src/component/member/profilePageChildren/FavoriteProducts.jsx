import React, { useEffect, useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
import { Link } from "react-router-dom";

const FavoriteProducts = ({ memberId }) => {  // ✅ props로 mno 받기
  const { req, data, loading, error } = UseAxios();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    if (memberId) {
      console.log("📢 좋아요한 상품 가져오기: mno =", memberId);  // ✅ 로그 추가
      fetchFavoriteProducts(memberId);
    }
  }, [memberId]);

  const fetchFavoriteProducts = async (memberId) => {
    try {
      const response = await req("GET", `v1/product/${memberId}/liked`);
      console.log("📢 좋아요한 상품 API 응답:", response);  // ✅ 응답 확인
      if (response) {
        setFavoriteProducts(response);
      }
    } catch (error) {
      console.error("❌ API 호출 중 오류 발생:", error);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;
  if (!favoriteProducts.length) return <p>좋아요한 상품이 없습니다.</p>;

  return (
    <div>
      <h2>내가 좋아요 한 상품</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {favoriteProducts.map((product) => (
          <li key={product.pno} style={{ marginBottom: "15px" }}>
            <Link to={`/product/${product.pno}`} style={{ textDecoration: "none", color: "black" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img 
                  src={product.imageUrl} 
                  alt={product.pname} 
                  width={50} 
                  height={50} 
                  style={{ borderRadius: "5px", marginRight: "10px" }} 
                />
                <span>{product.pname}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteProducts;