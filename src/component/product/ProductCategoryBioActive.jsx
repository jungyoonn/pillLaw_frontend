import React from 'react';
import { Col, Form } from 'react-bootstrap';

const ProductCategoryBioActive = ({ data, selected, setSelectedBio }) => {
  if(!data) return null;
  
  const handleCheck = (cno) => {
    setSelectedBio((prev) => ({
      ...prev,
      [cno]: !prev[cno],
    }));
  };
  
  return (
    <Col>
      <Form>
        {data.map((category) => (
          <Form.Check
            key={category.cno}
            inline
            label={category.cname} 
            name="bioactiveGroup"
            type="checkbox"
            id={`bioactive-${category.cno}`}
            checked={!!selected[category.cno]}
            onChange={() => handleCheck(category.cno)}
          />
        ))}
      </Form>
    </Col>
  );
};

export default ProductCategoryBioActive;
