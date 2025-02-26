import React, { useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import UseAxios from '../../hooks/UseAxios';
import ReviewForm from '../common/ReviewForm'

const ProductRegister = () => {
  const { loading, error, req } = UseAxios();
  const [regiProduct, setRegiProduct] = useState([]);  

  const handleAddReview = (newProduct) => {
    req("post", "v1/product/register", newProduct)
      .then(() => {
        console.log("리뷰 등록 성공");
        return req("get", `v1/product/list`);  
      })
      .then((response) => {
        setRegiProduct(response || []);
      })
      .catch((err) => console.error("리뷰 등록 실패:", err));
  };
  return (
    <Container className='text-center' style={{ paddingTop: "115.19px" }}>
      <Row>
        <h1 className="fw-bold my-5">상품 등록</h1>
        <hr className='text-pilllaw'/>
        
        <Form.Label htmlFor="productTitle ">상품명 입력</Form.Label>
        <Form.Control
          type='text'
          id="productTitle"
          aria-describedby='titleHelp'
          className='text-start'
        />
        <Form.Text id="titleHelp" muted className='text-start'>
          제목은 상품을 대표합니다. 특수문자나 기호는 삼가해 주세요.
        </Form.Text>

        
      </Row>


    </Container>
  );
}

export default ProductRegister;
