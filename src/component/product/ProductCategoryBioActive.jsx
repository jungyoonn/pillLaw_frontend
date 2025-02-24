import React from 'react';
import { Col, Form } from 'react-bootstrap';

const ProductCategoryBioActive = ({ data = [], selectedCategories, onCategoryChange}) => {

  return (
    <Col>
      <Form>
        {
          data.map((category) => (
          <Form.Check
            key={category.cname}
            inline
            label={category.cname}
            type="checkbox"
            checked={!!selectedCategories.has(category.cname)}
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

export default ProductCategoryBioActive;