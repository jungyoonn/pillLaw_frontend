import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../resources/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  // faShareNodes,
  // faWonSign,
  // faTruck,
  // faCartShopping,
  // faCoins,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
import image1 from "../../resources/image/product1.jpg";
import image2 from "../../resources/image/product2.jpg";
import image3 from "../../resources/image/product3.jpg";
import image4 from "../../resources/image/helfugarcinia.jpg";
import Button from '../common/Button';
import ReviewForm from '../common/ReviewForm'
import ProductSummary from './ProductSummary'
import ReviewChart from "../common/ReviewChart"

//  상품 데이터 (API 연동 전 테스트 데이터)
const products = [
  {
    id: 1,
    name: "프레쉬 유산균",
    price: 22900,
    discount: 0.1,
    image: image3,
    thumbnails: [image3, image2, image1],
    description: "이 제품은 면역과 건강을 위한 최고의 선택입니다.",
    tags: ["눈 건강", "단백질", "지방산", "면역"],
    detailImage: image4,
  },
  {
    id: 2,
    name: "비타민",
    price: 26000,
    discount: 0.15,
    image: image2,
    thumbnails: [image2, image1, image3],
    description: "비타민은 신체 기능을 지원하며 에너지를 공급합니다.",
    tags: ["비타민 A", "비타민 C", "면역"],
    detailImage: image4,
  },
  {
    id: 3,
    name: "홍삼",
    price: 41500,
    discount: 0.2,
    image: image1,
    thumbnails: [image1, image3, image2],
    description: "홍삼은 면역력을 증진시키고 피로 회복에 도움을 줍니다.",
    tags: ["면역", "항산화", "피로 회복"],
    detailImage: image4,
  },
];

// 점수 분포 데이터
const ratingDistribution = [2, 5, 7, 3, 3];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [mainImage, setMainImage] = useState(product ? product.image : "");
  const [activeTab, setActiveTab] = useState("real-product-details");
  const [showReviewModal, setShowReviewModal] = useState(false); // 📌 모달 상태 추가
  // 📌 초기 리뷰 상태를 `useState`에서 관리하도록 변경
  const [reviews, setReviews] = useState([
    { id: 1, title: "건강하면 울리는 사이렌", content: "우리 아이가 참 좋아해요.", rating: 4, date: "2025.02.10", likes: 17, images: [] },
    { id: 2, title: "건강맨", content: "매일 먹으니 효과가 좋은 것 같아요.", rating: 5, date: "2025.02.08", likes: 25, images: [] },
    { id: 3, title: "좋아요맨", content: "잘 먹고 있어요!", rating: 5, date: "2025.02.10", likes: 10, images: [] },
    { id: 4, title: "괜찮아요맨", content: "괜찮은 제품이에요.", rating: 4, date: "2025.02.08", likes: 5, images: [] }
  ]);
  
  const handleAddReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  useEffect(() => {
    if (!product) return;
    setMainImage(product.image);
  }, [product]);

  const calculateRatingDistribution = (reviews) => {
    const distribution = [0, 0, 0, 0, 0]; 
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating - 1] += 1;
      }
    });
    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution(reviews);

  if (!product) return <h2 className="text-center mt-5">상품을 찾을 수 없습니다.</h2>;

  return (
    <Container style={{ paddingTop: "115.19px" }}>
      <Container className="container-fluid product-detail text-center">
        <h1 className="fw-bold mb-4 text-pilllaw">상품 상세정보</h1>
        <hr className="text-pilllaw" />

        {/*  상품 이미지 및 정보 */}
        <Row className="mt-4">
          <Col xs={5}>
            <img className="img-fluid mx-2 pilllaw-product-image" src={mainImage} alt={product.name} />
          </Col>

          <Col xs={2} className="mt-4">
            {product.thumbnails.map((img, index) => (
              <Row key={index} className="align-middle my-2">
                <img
                  className="img-fluid mx-auto float-end w-75 pilllaw-product-image"
                  src={img}
                  alt={`thumbnail-${index}`}
                  onClick={() => setMainImage(img)}
                  style={{ cursor: "pointer" }}
                />
              </Row>
            ))}
          </Col>

          <Col xs={5} className="mt-2">
            <ProductSummary product={product} />
          </Col>
        </Row>

        {/*  제품 상세정보, 리뷰 보기 탭 */}
        <Row className="mt-5">
          <ul className="nav nav-tabs nav-justified text-pilllaw">
            <li className="nav-item">
              <Button 
                variant="pilllaw-secondary" 
                className={`nav-link ${activeTab === "real-product-details" ? "active" : ""}`} 
                onClick={() => setActiveTab("real-product-details")}>
                제품 상세정보
              </Button>
            </li>
            <li className="nav-item">
            <Button
              variant="pilllaw-secondary"
              className={`nav-link ${activeTab === "real-product-review" ? "active" : ""}`}
              onClick={() => setActiveTab("real-product-review")}
            >
              제품 리뷰({reviews.length})
            </Button>
            </li>
          </ul>

          {/*  제품 상세정보 탭 */}
          {activeTab === "real-product-details" && (
            <div className="tab-content mt-5 fade show active">
              {product.tags.map((tag, index) => (
                <span key={index} className="badge bg-success fs-14 mx-1">{tag}</span>
              ))}
              <div className="d-flex justify-content-center mt-3">
                <img className="img-fluid mx-auto" src={product.detailImage} alt="상세정보" />
              </div>
            </div>
          )}

          {/* 리뷰 탭 */}
          {activeTab === "real-product-review" && (
            <div className="tab-content mt-5 mb-5 fade show active">
              <div className="pilllaw-product-score-total text-center p-4">
                <span className="fs-18 fw-bold">리뷰</span>
                <br />
                <span className="fs-16">당신의 소중한 후기를 남겨주세요.</span>
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

                  {/* 개수 표시 */}
                  <Col xs={2} className="text-center">
                    <Row>
                      <p className="fw-bold fs-14">개수</p>
                    </Row>
                    <Row>
                      <p>{reviews.length} 개</p>
                    </Row>
                  </Col>

                  {/* 차트 컨테이너 */}
                  <Col xs={6} className="d-flex justify-content-center align-items-center">
                    <div style={{ width: "100%", maxWidth: "250px", height: "auto" }}>
                      <ReviewChart ratingDistribution={ratingDistribution} activeTab={activeTab}/>
                    </div>
                  </Col>

                  <ReviewForm show={showReviewModal} handleClose={() => setShowReviewModal(false)} addReview={handleAddReview} />

                  <Col xs={2} className="justify-content-end">
                    <Button variant="pilllaw" className="fw-bold fs-14 btn-pilllaw btn" onClick={() => setShowReviewModal(true)}>
                      리뷰 작성하기 <FontAwesomeIcon icon={faStar} />
                    </Button>
                  </Col>
                </Row>
              </div>

              {/* 리뷰 리스트 */}
              <Row className="mt-5">
                {reviews.map((review) => (
                  <div key={review.id} className="row border border-1 pt-4 pb-3 mx-3 fs-12 mt-2">
                    <Col xs={2} className="d-flex align-items-center">
                      {review.images && review.images.length > 0 ? (
                        <img className="img-fluid w-75 pilllaw-product-image" src={review.images[0]} alt="리뷰 이미지" />
                      ) : (
                        <img className="img-fluid w-75 pilllaw-product-image" src={mainImage} alt="기본 이미지" />
                      )}
                    </Col>

                    {/* 리뷰 본문 */}
                    <Col xs={6}>
                      <Row className="text-start">
                        <span className="fw-bold">{review.title}</span>
                      </Row>
                      <Row className="text-start mt-2">
                        <span dangerouslySetInnerHTML={{ __html: review.content }} />
                      </Row>
                    </Col>

                    {/* 작성일 */}
                    <Col xs={2} className="text-center">
                      <span>작성일: {review.date}</span>
                    </Col>

                    {/* 별점 */}
                    <Col xs={2} className="text-center">
                      <span className="fw-bold">별점: </span>
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} className="text-warning" />
                      ))}
                      ({review.rating}점)
                    </Col>

                    {/* 좋아요 버튼 */}
                    <Row className="row text-end mt-2">
                      <Col className="col">
                        도움이 돼요{" "}
                        <FontAwesomeIcon icon={faHeart} className="text-danger" /> : <span>{review.likes}</span>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Row>

            </div>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default ProductDetail;
