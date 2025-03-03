import React, { useState } from "react";
import styled from "@emotion/styled";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  position: relative;
  overflow: hidden;
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 390px; /* 3개만 보이도록 설정 */
  overflow: hidden;
  position: relative;
`;

const ImageSlider = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
  transform: ${({ startIndex }) => `translateY(-${startIndex * 130}px)`}; 
`;

const ImageItem = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 5px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const NavButton = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  padding: 3px 6px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 12px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  opacity: ${({ disabled }) => (disabled ? "0.3" : "1")}; /* 🔥 버튼 유지 + 비활성화 시 투명도 조정 */

  ${({ top }) => (top ? "top: 0;" : "bottom: 0;")} /* 🔥 버튼이 이미지 위아래에 위치하도록 조정 */

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    cursor: default;
  }
`;

const ProductSlider = ({ imageUrls, onSelect }) => {
  const [startIndex, setStartIndex] = useState(0);
  const imagesPerView = 3;
  const maxIndex = Math.max(0, imageUrls.length - imagesPerView);

  const prevImages = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const nextImages = () => setStartIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <CarouselWrapper>
      <NavButton onClick={prevImages} disabled={startIndex === 0} top>
        ▲
      </NavButton>

      <ImageList>
        <ImageSlider startIndex={startIndex}>
          {imageUrls.map((img, index) => (
            <ImageItem key={index} src={img} alt={`thumbnail-${index}`} onClick={() => onSelect(img)} />
          ))}
        </ImageSlider>
      </ImageList>

      <NavButton onClick={nextImages} disabled={startIndex >= maxIndex}>
        ▼
      </NavButton>
    </CarouselWrapper>
  );
};

export default ProductSlider;
