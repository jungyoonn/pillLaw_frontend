import React, { useState } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// ✅ 아이콘 이미지 (실제 경로로 변경 필요)
import tag1 from "../../resources/image/main_tag1.png";
import tag2 from "../../resources/image/main_tag2.png";
import tag3 from "../../resources/image/main_tag3.png";
import tag4 from "../../resources/image/main_tag4.png";
import tag5 from "../../resources/image/main_tag5.png";
import tag6 from "../../resources/image/main_tag6.png";
import tag7 from "../../resources/image/main_tag7.png";
import tag8 from "../../resources/image/main_tag8.png";

// ✅ 카테고리 데이터
const categories = [
  { name: "인지능력", icon: tag1 },
  { name: "눈 건강", icon: tag2 },
  { name: "체지방", icon: tag3 },
  { name: "피로&면역", icon: tag4 },
  { name: "남성", icon: tag5 },
  { name: "혈당", icon: tag6 },
  { name: "장", icon: tag7 },
  { name: "관절, 뼈", icon: tag8 },
];




// ✅ 가로형 슬라이더 스타일
const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const ImageList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const ImageSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ startIndex, itemsPerView }) => `translateX(-${(startIndex % categories.length) * 130}px)`}; 
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 120px;
  margin: 0 5px;
`;

const CategoryIcon = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 10px;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
  position: absolute;
  ${({ left }) => (left ? "left: 0;" : "right: 0;")}
  z-index: 10;
  &:hover {
    color: #000;
  }
`;




// ✅ 무한 루프 적용 슬라이더 컴포넌트
const IndexSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const navigate = useNavigate();
  const itemsPerView = 5;

  // 🔹 다음 버튼 (마지막에 도달하면 처음으로 돌아감)
  const nextImages = () => {
    setStartIndex((prev) => (prev + 1) % categories.length);
  };

  // 🔹 이전 버튼 (처음이면 마지막으로 이동)
  const prevImages = () => {
    setStartIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleCategorySelect = (categoryName) => {
    navigate(`/product/list?selectedCategory=${encodeURIComponent(categoryName)}`);
  };

  return (
    <CarouselWrapper>
      <NavButton onClick={prevImages} left>
        <FontAwesomeIcon icon={faLessThan} />
      </NavButton>

      <ImageList>
        <ImageSlider startIndex={startIndex} itemsPerView={itemsPerView}>
          {categories.concat(categories).map((category, index) => (
            <ImageItem key={index} className="fs-11">
              <CategoryIcon src={category.icon} alt={category.name}  onClick={() => handleCategorySelect(category.name)} />
              <span>{category.name}</span>
            </ImageItem>
          ))}
        </ImageSlider>
      </ImageList>

      <NavButton onClick={nextImages}>
        <FontAwesomeIcon icon={faGreaterThan} />
      </NavButton>
    </CarouselWrapper>
  );
};

export default IndexSlider;
