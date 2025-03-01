import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import "../../resources/css/style.css";
import { Col, Container, Form, InputGroup, Nav, Navbar, Row, Spinner } from "react-bootstrap";
import ProductCategorySelector from "./ProductCategorySelector";
import ProductItem from "./ProductItem";
import useAxios from '../../hooks/UseAxios';

const ProductList = () => {
  const {data, loading, error, req} = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [forceUpdate, setForceUpdate] = useState(false);


  useEffect(()=>{
    req('get', 'v1/product/list');
    console.log("req ::::: 로 받은 것 들" , data);
  },[req]);

  if(error){
    return <div><h1>Error Occured!</h1></div>;
  }
  if(loading){
    <Container className="text-center d-flex justify-content-center " style={{ paddingTop: "115.19px" }}>
      <h1 className="fw-bold my-5">전체 상품</h1>
      <Spinner className="text-center" animation="border" variant="info" />
      <p className="mt-2 text-secondary">상품을 불러오는 중...</p>
    </Container>
  }

  const filteredData = data?.filter((p) => {
    const matchesSearch = searchTerm.trim() === "" || p.product.pname.includes(searchTerm);
    const matchesCategory = selectedCategories.size === 0 || 
      Array.from(selectedCategories).every(selected => 
        p.categories.some(category => category.cname === selected)
      );
    return matchesSearch && matchesCategory; 
  }) || [];

  const onCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = new Set(prev);
      if (updatedCategories.has(category)) {
        updatedCategories.delete(category);
      } else {
        updatedCategories.add(category);
      }
      console.log("🔹 선택한 카테고리:", category);
      console.log("🔹 업데이트된 카테고리:", Array.from(updatedCategories));
      setForceUpdate(prev => !prev); 
      return new Set(updatedCategories);
    });
  };



  return (
    <div className="wrap">
      <Container className="text-center" style={{ paddingTop: "115.19px" }}>
        <h1 className="fw-bold my-5">전체 상품</h1>
        <Row>
        {/* 컴포넌트화 예정! */}
          <Navbar bg="light" data-bs-theme="light">
            <Container className="justify-content-center">
              <Nav>
                <Nav.Link onClick={() => setSearchType("name")} active={searchType === "name"}>이름으로 검색</Nav.Link>  
                <Nav.Link onClick={() => setSearchType("category")} active={searchType === "category"}>카테고리로 검색</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Row>

        {/* 컴포넌트화 예정! */}
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
            <ProductCategorySelector className="mt-3" onCategoryChange={onCategoryChange} selectedCategories={selectedCategories} />
          </div>
        )}
        <Row className="text-center container-fluid mt-4 ">
          <p className="fs-12 text-secondary">현재 검색 결과에 일치하는 상품이 {filteredData.length} 개 있습니다.</p>
          {loading ? (
            <Spinner animation="border" variant="info" className="mt-3" />
          ) : filteredData.length > 0 ? (
            filteredData.map(p => <ProductItem className="mt-3" key={p.product.pno} product={p.product} reviews={p.reviews}/>) 
          ) : (
            <h3>선택한 카테고리에 해당하는 상품이 없습니다.</h3>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;