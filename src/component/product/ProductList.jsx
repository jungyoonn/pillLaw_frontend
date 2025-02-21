import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import "../../resources/css/style.css";
import { Col, Container, Form, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import ProductCategorySelector from "./ProductCategorySelector";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";
import useAxios from '../../hooks/UseAxios';



const ProductList = () => {
  const {data, loading, error, req} = useAxios();

  // 검색어
  const [searchTerm, setSearchTerm] = useState("");
  // 검색 방식
  const [searchType, setSearchType] = useState("name");

  const navigate = useNavigate();

  useEffect(()=>{
    req('get', 'v1/product/list');
  },[req]);
  if(error){
    return <div><h1>Error Occured!</h1></div>;
  }
  if(loading){
    return <div><h1>loading,,,</h1></div>;
  }

  return (
    <div className="wrap">
      <Container className="text-center" style={{ paddingTop: "115.19px" }}>
        <h1 className="fw-bold my-5">상품 리스트</h1>
        <Row>
          <Navbar bg="light" data-bs-theme="light">
            <Container className="justify-content-center">
              <Nav>
                <Nav.Link onClick={() => setSearchType("name")} active={searchType === "name"}>이름으로 검색</Nav.Link>  
                <Nav.Link onClick={() => setSearchType("category")} active={searchType === "category"}>카테고리로 검색</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Row>

        {searchType === "name" && (
          <Row>
            <Col xs="3"></Col>
              <Col>
                <InputGroup className="mb-3 border border-pilllaw-primary rounded" >
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="fs-11"
                  />
                </InputGroup>
              </Col>
            <Col xs="3"></Col>
          </Row>
        )}

        {searchType === "category" && (
          <div className="category-selector">
            <ProductCategorySelector />
          </div>
        )}
        <Row className="text-center container-fluid mt-4">
          {data && data
                  .filter((p) => p.pname.includes(searchTerm))
                  .map(p => <ProductItem key={p.pno} product={p}/>)
          }
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
