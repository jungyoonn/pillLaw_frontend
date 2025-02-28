import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../resources/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faStar } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
import Button from '../common/Button';
import ReviewForm from '../common/ReviewForm'
import ProductSummary from './ProductSummary'
import ReviewChart from "../common/ReviewChart"
import ProductReviewList from "./ProductReviewList";
import useAxios from '../../hooks/UseAxios';
import ProductSlider from "../common/ProductSlider";

const ProductDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("real-product-details");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);  
  const { loading, error, req } = useAxios();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (id) {
      req("get", `v1/product/${id}`)
        .then((response) => {
          console.log("제품 데이터:", response);
          setProduct(response.product);
          setSelectedImage(response.product.imageUrl);
        }).catch((err) => {
          console.error("제품 데이터 로드 에러:", err);
        });

      req("get", `v1/product/detail/review/list/${id}`)
        .then((response) => {
          console.log("리뷰 : ", response)
          setReviews(response);
        }).catch((err)=>{
          console.error("리뷰 로드 에러 :: ", err);
          setReviews([]);
        });
    }
  }, [id]);
  
  if (loading){
    return <div className="text-center"><h2>로딩 중...</h2></div>;
  } 
  if (error) {
    return <h2 className="text-center mt-5">상품을 찾을 수 없습니다.</h2>;
  }

  const handleDeleteReview = (prno) => {
    req("delete", `v1/review/${prno}`)
      .then(() => {
        console.log(`리뷰 삭제 성공: ${prno}`);
        return req("get", `v1/review/list/${id}`); 
      })
      .then((response) => {
        setReviews(response || []);
      })
      .catch((err) => console.error("리뷰 삭제 실패:", err));
  };
  
  const handleAddReview = (newReview) => {
    req("post", "v1/product/detail/review/register", newReview)
    .then((response)=>{
      console.log("리뷰 등록 성공");
      setReviews((prevReviews) => [response, ...prevReviews]);
      return req("get", `v1/product/detail/review/list/${id}`);
    })
    .then((response) => {
      if(response && response.length > 0 ){
        setReviews(response);
      }
    })
    .catch((err) => console.error("리뷰 등록 실패", err));
  };
  
  const calculateRatingDistribution = (reviews) => {
    const distribution = [0, 0, 0, 0, 0]; 
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating - 1] += 1;
      }
    });
    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution(reviews || []);

  return (
    <Container style={{ paddingTop: "115.19px" }}>
      <Container className="container-fluid product-detail text-center">
        <h1 className="fw-bold mb-4 text-pilllaw">상품 상세정보</h1>
        <hr className="text-pilllaw" />
        <pre>{JSON.stringify(product, null, 2)}</pre>

        <Row className="mt-4">
          <Col xs={5}>
            <img
              src={selectedImage}
              alt="상품 이미지 없음"
              onError={(e) => e.target.src = "https://via.placeholder.com/500"}
              style={{width: 500, height:500}}
            />
          </Col>

          <Col xs={2} className="mt-3 d-flex justify-content-center">
            {product.imageUrlList && product.imageUrlList.length > 0 ? (
              <ProductSlider 
                imageUrls={product.imageUrlList} 
                onSelect={setSelectedImage} 
              />
            ) : (
              <p className="text-muted">썸네일이 없습니다.</p>
            )}
          </Col>

        <Col xs={5} className="mt-2">
          <ProductSummary product={product} />
        </Col>
      </Row>
        <Row className="mt-5">
          <ul className="nav nav-tabs nav-justified">
            <li className="nav-item">
              <Button 
                variant="pilllaw" 
                className={`nav-link text-white btn-pilllaw ${activeTab === "real-product-details" ? "active" : ""}`} 
                onClick={() => setActiveTab("real-product-details")}>
                제품 상세정보
              </Button>
            </li>
            <li className="nav-item">
              <Button
                variant="pilllaw"
                className={`nav-link text-white btn-pilllaw ${activeTab === "real-product-review" ? "active" : ""}`}
                onClick={() => setActiveTab("real-product-review")}
              >
                제품 리뷰({reviews ? reviews.length : "-"})
              </Button>
            </li>
          </ul>

          {activeTab === "real-product-details" && (
            <div className="tab-content mt-5 fade show active">
              {product.effect && product.effect.split(',').map((tag, index) => (
                <span key={index} className="badge bg-success fs-14 mx-1">{tag.trim()}</span>
              ))}
              <div className="d-flex justify-content-center mt-3">
                <img className="img-fluid mx-auto" src={product.detailImage} alt="상세정보" />
              </div>
            </div>
          )}

          {activeTab === "real-product-review" && (
            <div className="tab-content mt-5 mb-5 fade show active">
              <div className="pilllaw-product-score-total text-center p-4">
                <span className="fs-18 fw-bold text-pilllaw">리뷰</span>
                <br />
                <span className="fs-14">소중한 후기를 남겨주세요.</span>
                <br />

                <Row className="mt-5 container">
                  <Col xs={2} className="text-center fs-14">
                    <Row>
                      <p className="fw-bold">만족도</p>
                    </Row>
                    <Row>
                      <p>
                        <FontAwesomeIcon icon={faStar} className="text-warning" />{" "}
                        {reviews.length > 0
                          ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length).toFixed(1)
                          : "0"}{" "}
                        / 5
                      </p>
                    </Row>
                  </Col>

                  <Col xs={2} className="text-center">
                    <Row>
                      <p className="fw-bold fs-14">개수</p>
                    </Row>
                    <Row>
                      <p>{reviews.length} 개</p>
                    </Row>
                  </Col>

                  <Col xs={6} className="d-flex justify-content-center align-items-center">
                    <div style={{ width: "100%", maxWidth: "250px", height: "auto" }}>
                      <ReviewChart ratingDistribution={ratingDistribution} activeTab={activeTab}/>
                    </div>
                  </Col>

                  <ReviewForm show={showReviewModal} handleClose={() => setShowReviewModal(false)} addReview={handleAddReview} productId={product.pno} />

                  <Col xs={2} className="justify-content-end">
                    <Button variant="pilllaw" className="fw-bold fs-14 btn-pilllaw btn" onClick={() => setShowReviewModal(true)}>
                      리뷰 작성하기 <FontAwesomeIcon icon={faStar} />
                    </Button>
                  </Col>
                </Row>
              </div>
              <Row className="mt-5">
                <Row className="mt-5">
                  <ProductReviewList reviews={reviews || []} onDelete={handleDeleteReview} />
                </Row>
              </Row>
            </div>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default ProductDetail;
