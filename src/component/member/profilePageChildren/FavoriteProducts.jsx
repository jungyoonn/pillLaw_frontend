import React, { useEffect, useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
import IndexItem from "../../product/IndexItem";

const FavoriteProducts = ({ memberId }) => {  
  const { req, data, loading, error } = UseAxios();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    if (memberId) {
      console.log("📢 좋아요한 상품 가져오기: mno =", memberId);  
      fetchFavoriteProducts(memberId);
    }
  }, [memberId]);

  const fetchFavoriteProducts = async (memberId) => {
    try {
      const response = await req("GET", `v1/product/${memberId}/liked`);
      console.log("📢 좋아요한 상품 API 응답:", response);  
      if (response) {
        setFavoriteProducts(response);
      }
    } catch (error) {
      console.error(" 호출 중 오류 발생:", error);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>로딩 중...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>오류 발생: {error.message}</p>;

  return (
    <div>
       <h4 className="text-center text-pilllaw">나의 좋아요 상품</h4>
      <p className="fs-11 text-center"> 좋아요 한 상품이 {favoriteProducts.length} 개 있습니다.</p>

      {favoriteProducts.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px", color: "#6c757d" }}>
          <p className="fs-12">엇, 아직 ❤️ 좋아요한 상품이 없습니다.</p>
          <p>관심 있는 상품을 찾아 ❤️ 좋아요를 눌러보세요!</p>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-3">  
          {favoriteProducts.map((product) => (
            <div key={product.pno} className="favorite-product-wrapper">  
              <IndexItem product={product} />
            </div>
          ))}
        </div>
      )}
      <div className="my-5 py-5"></div>
      <div className="my-5 py-5"></div>
    </div>
  );
};

export default FavoriteProducts;
