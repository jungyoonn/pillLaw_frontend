import React, { useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';

const ProductCategoryNutrient = ({ data, selected, setSelectedNutri }) => {
  if (!data) return <h1>No Data Available</h1>;

  const handleCheck = (cno) => {
    setSelectedNutri((prev) => ({
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
            name="nutrientGroup"
            type="checkbox"
            id={`nutrient-${category.cno}`}
            checked={!!selected[category.cno]}
            onChange={()=>handleCheck(category.cno)}
          />
        ))}
      </Form>
    </Col>
  );
};

export default ProductCategoryNutrient;
