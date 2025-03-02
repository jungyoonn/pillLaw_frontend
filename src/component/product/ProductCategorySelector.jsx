import React, { useCallback, useEffect, useState } from "react";
import '../../resources/css/style.css';
import useAxios from '../../hooks/UseAxios';
import ProductCategoryBioActive from "./ProductCategoryBioActive";
import ProductCategoryNutrient from "./ProductCategoryNutrient";
import { Form, Row } from "react-bootstrap";

const ProductCategorySelector = ({ selectedCategories, onCategoryChange}) => {
  const [categoryType, setCategoryType] = useState(true);
  const { loading: loading1, error: error1, req: req1 } = useAxios();
  const { loading: loading2, error: error2, req: req2 } = useAxios();
  const [bio, setBio] = useState([]);
  const [nutri, setNutri] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [result1, result2] = await Promise.all([
          req1('get', 'v1/category/list/bioactive'),
          req2('get', 'v1/category/list/nutrient'),
        ]);
        setBio(result1);
        setNutri(result2);
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
      }
    };
    fetchData();
  }, [req1, req2]);

  if (loading1 || loading2) return <div>Loading...</div>;
  if (error1 || error2) return <div>Error occurred!</div>;

  return (
    <>
      <Row>
        <Form>
          <div className="mb-3">
            <Form.Check
              inline
              label="생리활성"
              name="group1"
              type="radio"
              checked={categoryType === true}
              id="inline-radio-1"
              onChange={() => setCategoryType(true)}
            />
            <Form.Check
              inline
              label="영양소"
              name="group1"
              type="radio"
              checked={categoryType === false}
              id="inline-radio-2"
              onChange={() => setCategoryType(false)}
            />
          </div>
        </Form>
      </Row>

      {categoryType ? (
        <ProductCategoryBioActive 
          data={bio} 
          selectedCategories={selectedCategories} 
          onCategoryChange={onCategoryChange} 
        />
      ) : (
        <ProductCategoryNutrient 
          data={nutri} 
          selectedCategories={selectedCategories} 
          onCategoryChange={onCategoryChange} 
        />
      )}
    </>
  );
};

export default ProductCategorySelector;