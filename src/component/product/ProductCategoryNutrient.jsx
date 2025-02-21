import React, { useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';

const ProductCategoryNutrient = ({ data, selectedCategories, onCategoryChange }) => {

  // const handleCheckboxChange = (event, category) => {
  //   event.stopPropagation(); // ✅ 이벤트 중복 실행 방지
  //   event.preventDefault();  // ✅ 기본 이벤트 차단
  
  //   onCategoryChange(category);
  // };
  // if (!data) return <h1>No Data Available</h1>;

  // const handleCheck = (cno) => {
  //   setSelectedNutri((prev) => ({
  //     ...prev,
  //     [cno]: !prev[cno],
  //   }));
  // };
  
  return (
    <Col>
      <Form>
        {data.map((category) => (
          <Form.Check
            key={category.cname}
            inline
            label={category.cname}
            type="checkbox"
            checked={!!selectedCategories.has(category.cname)} // ✅ Boolean 값으로 변환하여 확실한 상태 적용
            onChange={() => {
              console.log(`✅ 체크박스 클릭됨: ${category.cname}, 현재 상태: ${selectedCategories.has(category.cname)}`);
              onCategoryChange(category.cname);
            }}
          />
        ))}
      </Form>
    </Col>
  );
};

export default ProductCategoryNutrient;
