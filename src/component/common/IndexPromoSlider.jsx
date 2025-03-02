import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import UseAxios from "../../hooks/UseAxios";

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: auto;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  background-color: #f8f8f8;
  border-radius: 8px; /* 선택적: 박스에 둥근 모서리 추가 */
`;

const SlideWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ active }) => (active ? "1" : "0")};
  z-index: ${({ active }) => (active ? "1" : "0")};
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  transition: opacity 0.8s ease-in-out;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.8s ease-in-out;
  transform: ${({ active }) => (active ? "scale(1.0)" : "scale(1.05)")};
`;

const IndicatorContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 12px; /* 슬라이더와 인디케이터 사이 간격 */
`;

const Indicator = styled(FontAwesomeIcon)`
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
  color: ${({ active }) => (active ? "black" : "#ccc")};
  font-size: 12px;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
`;

const IndexPromoSlider = () => {
  const { req } = UseAxios();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const defaultImage = "/default-placeholder.png";

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  useEffect(() => {
    const fetchPromoProducts = async () => {
      setIsLoading(true);
      try {
        const response = await req("get", "v1/product/list");
        if (response && Array.isArray(response)) {
          const shuffled = shuffleArray(response).slice(0, 5);
          setProducts(shuffled);
          setImageLoaded(new Array(shuffled.length).fill(false));
          console.log("✅ 불러온 상품 목록:", shuffled.map(p => p.product.pname));
        }
      } catch (error) {
        console.error("슬라이더 상품 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromoProducts();
  }, [req]);

  useEffect(() => {
    if (products.length === 0) return;
    
    // 이미지가 모두 로드되었을 때만 슬라이더 작동
    const allImagesLoaded = imageLoaded.some(loaded => loaded); // 최소 하나 이상 로드되면 시작
    if (!allImagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [products, imageLoaded]);

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => {
      const newLoadState = [...prev];
      newLoadState[index] = true;
      return newLoadState;
    });
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  // 데이터가 로딩 중이거나 제품이 없는 경우
  if (isLoading || products.length === 0) {
    return (
      <SliderWrapper>
        <SliderContainer>
          <LoadingPlaceholder>
            상품 로딩 중...
          </LoadingPlaceholder>
        </SliderContainer>
      </SliderWrapper>
    );
  }

  return (
    <SliderWrapper>
      <SliderContainer>
        {products.map((p, index) => {
          const imageUrl = p.product.imageUrl || defaultImage;
          return (
            <SlideWrapper key={index} active={index === currentIndex}>
              <Link to={`/product/detail/${p.product.pno}`} style={{ width: '100%', height: '100%' }}>
                <SlideImage
                  src={imageUrl}
                  alt={`slide-${index}`}
                  active={index === currentIndex}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageLoad(index)}
                />
              </Link>
            </SlideWrapper>
          );
        })}
      </SliderContainer>

      {/* 인디케이터를 슬라이더 밖으로 이동 */}
      <IndicatorContainer>
        {products.map((_, index) => (
          <Indicator 
            key={index} 
            icon={faCircle} 
            active={index === currentIndex} 
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </IndicatorContainer>
    </SliderWrapper>
  );
};

export default IndexPromoSlider;