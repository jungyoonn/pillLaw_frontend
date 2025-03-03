import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel, ListGroup, Badge, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UseAxios from "../../../hooks/UseAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile from '../../../resources/image/user-image.png';
import { 
  faHeart, 
  faComments, 
  faPeopleGroup, 
  faStar, 
  faTrophy, 
  faEnvelope, 
  faPhone, 
  faLocationDot 
} from "@fortawesome/free-solid-svg-icons";
import lifeStyle from '../../../resources/image/aboutus_lifeStyle.jpg';
import community from '../../../resources/image/aboutus_community.png';

// 커스텀 스타일을 인라인으로 정의
const styles = {
  primaryBg: { backgroundColor: '#7DA9A7' },
  secondaryBg: { backgroundColor: '#AFC8AD' },
  accentBg: { backgroundColor: '#F4EECF' },
  lightBg: { backgroundColor: '#F8F9FA' },
  accordionBg: { backgroundColor: '#cfdfdb' },
  primaryText: { color: '#7DA9A7' },
  secondaryText: { color: '#AFC8AD' },
  darkText: { color: '#436A68' },
  headerText: { color: '#3C7B89' },
  accentText: { color: '#F4EECF' },
  whiteText: { color: 'white' },
  primaryBtn: { 
    backgroundColor: '#7DA9A7', 
    borderColor: '#7DA9A7',
    color: 'white'
  },
  outlinePrimaryBtn: {
    backgroundColor: 'transparent',
    borderColor: '#7DA9A7',
    color: '#7DA9A7'
  },
  whiteBtn: {
    backgroundColor: 'white',
    borderColor: 'white',
    color: '#7DA9A7'
  },
  outlineWhiteBtn: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    color: 'white'
  },
  cardShadow: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  }
};

const AboutUs = () => {

  const { req, loading } = UseAxios();
  const [popularReviews, setPopularReviews] = useState([]);
  const [popularSupplements, setPopularSupplements] = useState([]);
  
  useEffect(() => {
    const fetchPopularReviews = async () => {
      try {
        const response = await req("GET", "v1/product/detail/review/popular");
        console.log("리뷰 3개 응답",response);
        setPopularReviews(response);
      } catch (error) {
        console.error("리뷰뷰 가져오기 실패:", error);
      }
    };

    const fetchTopRatedProducts = async () => {
      try {
        const response = await req("GET", "v1/product/top-rated");
        console.log("제품 3개 응답 : ", response);
        setPopularSupplements(response);
      } catch (error) {
        console.error("제품 가져오기 실패:", error);
      }
    };
    fetchTopRatedProducts();
    fetchPopularReviews();
  }, [req]);

  // 예시 데이터
  const features = [
    {
      title: "맞춤형 영양제 추천",
      description: "개인의 건강 상태와 목표에 맞는 최적의 영양제를 추천해 드립니다.",
      icon: faHeart
    },
    {
      title: "전문가 상담",
      description: "영양 전문가와 직접 상담하여 건강 관리에 대한 조언을 받을 수 있습니다.",
      icon: faComments
    },
    {
      title: "소셜 커뮤니티",
      description: "같은 건강 목표를 가진 사람들과 경험을 공유하고 소통할 수 있습니다.",
      icon: faPeopleGroup
    },
    {
      title: "리뷰 시스템",
      description: "실제 사용자들의 솔직한 리뷰를 통해 영양제 효과를 확인할 수 있습니다.",
      icon: faStar
    }
  ];

  // 인기 영양제 데이터 (예시)
  // const popularSupplements = [
  //   {
  //     id: 1,
  //     name: "멀티 비타민",
  //     description: "하루 활력을 위한 필수 비타민과 미네랄이 모두 담긴 종합 영양제",
  //     price: 32000,
  //     rating: 4.8,
  //     image: "/api/placeholder/300/300"
  //   },
  //   {
  //     id: 2,
  //     name: "오메가3",
  //     description: "눈과 두뇌 건강을 위한 고품질 오메가3 지방산",
  //     price: 28000,
  //     rating: 4.7,
  //     image: "/api/placeholder/300/300"
  //   },
  //   {
  //     id: 3,
  //     name: "프로바이오틱스",
  //     description: "장 건강을 개선하는 100억 유산균",
  //     price: 35000,
  //     rating: 4.9,
  //     image: "/api/placeholder/300/300"
  //   }
  // ];

  // 인기 리뷰 데이터 (예시)
  // const popularReviews = [
  //   {
  //     id: 1,
  //     productName: "멀티비타민 올인원",
  //     productImage: "/api/placeholder/100/100",
  //     authorName: "건강지킴이",
  //     authorImage: "/api/placeholder/50/50",
  //     rating: 5,
  //     content: "3개월 동안 꾸준히 복용했더니 확실히 피로감이 줄고 활력이 생겼어요.",
  //     likes: 128,
  //     comments: 32,
  //     date: "2025-02-15"
  //   },
  //   {
  //     id: 2,
  //     productName: "오메가3 프리미엄",
  //     productImage: "/api/placeholder/100/100",
  //     authorName: "영양덕후",
  //     authorImage: "/api/placeholder/50/50",
  //     rating: 4,
  //     content: "확실히 눈의 피로도가 줄어든 것 같아요. 재구매 의사 있습니다.",
  //     likes: 95,
  //     comments: 18,
  //     date: "2025-02-28"
  //   }
  // ];

  // FAQ 항목
  const faqs = [
    {
      question: "PILL LAW는 어떤 영양제를 판매하나요?",
      answer: "PILL LAW는 비타민, 미네랄, 허브 추출물, 프로바이오틱스 등 다양한 영양제를 판매합니다. 모든 제품은 엄격한 품질 기준을 통과한 제품만을 선별하여 제공합니다."
    },
    {
      question: "PILL LAW 커뮤니티는 어떻게 이용하나요?",
      answer: "회원가입 후 다른 사용자를 팔로우하고 리뷰를 작성하실 수 있습니다. 맞팔로우 관계가 된 회원 간에는 쪽지 기능을 통해 직접 소통할 수 있으며, 관심 있는 제품을 즐겨찾기하여 마이페이지에서 한눈에 확인하실 수 있습니다."
    },
    {
      question: "배송은 얼마나 걸리나요?",
      answer: "주문 확인 후 1-2일 내에 출고되며, 일반적으로 출고 후 1-3일 내에 받아보실 수 있습니다. 제주 및 도서산간 지역은 추가 배송일이 소요될 수 있습니다."
    },
    {
      question: "영양제 복용법은 어디서 확인할 수 있나요?",
      answer: "각 제품 페이지에서 상세한 복용법을 확인하실 수 있습니다. 또한 구매 후 마이페이지에서도 확인 가능하며, 전문가 상담을 통해 개인에게 최적화된 복용법을 안내받을 수도 있습니다."
    },
  ];

  return (
    <div className="pillaw-intro-page" style={{ paddingTop: '115.19px' }}>
      {/* 헤더 섹션 - 랜딩 페이지에서 가져옴 */}
      <header style={styles.primaryBg} className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold" style={styles.whiteText}>PILL LAW</h1>
              <p className="lead mb-4 fw-bold" style={styles.whiteText}>당신의 건강한 삶을 위한 최적의 영양제 솔루션</p>
              <p className="mb-4" style={styles.whiteText}>영양제 전문가들이 엄선한 제품과 커뮤니티를 통해 더 건강한 일상을 시작하세요.</p>
              <Button 
                variant="light" 
                size="lg" 
                as={Link} 
                to="/product/list" 
                className="me-3"
                style={styles.whiteBtn}
              >
                제품 보기
              </Button>
              <Button 
                variant="outline-light" 
                size="lg" 
                as={Link} 
                to="/signup"
                style={styles.outlineWhiteBtn}
              >
                회원가입
              </Button>
            </Col>
            <Col lg={6}>
              <img 
                src={lifeStyle} 
                alt="건강한 라이프스타일" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </header>

      {/* 소개 섹션 - 소개 페이지에서 가져옴 */}
      <section className="py-5" style={styles.lightBg}>
        <Container>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <Card className="h-100 border-0" style={styles.cardShadow}>
                <Card.Body className="p-4">
                  <h2 className="mb-4 fw-bold" style={styles.primaryText}>우리의 미션</h2>
                  <p className="lead fw-bold">모든 사람이 과학적으로 검증된 최적의 영양제를 통해 건강한 삶을 영위할 수 있도록 돕는 것</p>
                  <p>
                    PILL LAW는 단순한 영양제 판매를 넘어, 올바른 영양 정보와 
                    커뮤니티를 통해 건강한 라이프스타일을 지원합니다. 
                    우리는 모든 사람이 자신에게 맞는 영양제를 찾고, 
                    건강한 습관을 형성할 수 있도록 최선을 다하고 있습니다.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0" style={styles.cardShadow}>
                <Card.Body className="p-4">
                  <h2 className="mb-4 fw-bold" style={styles.primaryText}>우리의 비전</h2>
                  <p className="lead fw-bold">영양제 선택과 건강 관리의 새로운 패러다임을 제시하는 글로벌 건강 플랫폼</p>
                  <p>
                    PILL LAW는 개인화된 영양제 추천 시스템과 활발한 커뮤니티를 통해 
                    건강 관리의 새로운 기준을 만들어갑니다. 
                    우리는 한국을 넘어 글로벌 시장에서도 인정받는 
                    건강 플랫폼으로 성장하고자 합니다.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 특징 섹션 - 랜딩 페이지에서 가져옴 */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={styles.headerText}>PILL LAW의 특별함</h2>
          <Row>
            {features.map((feature, index) => (
              <Col md={3} className="mb-4" key={index}>
                <Card className="border-0 h-100 text-center" style={styles.cardShadow}>
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-3">
                      <FontAwesomeIcon icon={feature.icon} style={{...styles.primaryText, fontSize: '2.5rem'}} />
                    </div>
                    <Card.Title className=' fw-bold'>{feature.title}</Card.Title>
                    <Card.Text className="text-muted">{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 인기 제품 섹션 - 랜딩 페이지에서 가져옴 */}
      <section className="py-5" style={styles.accentBg}>
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={styles.headerText}>인기 영양제</h2>
          <Row>
            {popularSupplements.map(product => (
              <Col md={4} className="mb-4" key={product.id}>
                <Card className="h-100" style={styles.cardShadow}>
                  {/* <Card.Img 
                    variant="top" 
                    src={`https://eeerrorcode.buckets3.ap-northeast-2.amazonaws.com/uploads/2025/product/${product.pno}/img/`}
                    alt={product.name} /> */}
                  {/* https://eeerrorcode.buckets3.ap-northeast-2.amazonaws.com/uploads/2025/product/{pno}/img/ */}

                  <Card.Body>
                    <Card.Title className='fs-14 text-center'>{product.pname}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      {/* <span className="fw-bold" style={styles.primaryText}>{product.price.toLocaleString()}원</span> */}
                      <span className="text-warning">
                        <FontAwesomeIcon icon={faStar} /> {product.avgRating}
                      </span>
                    </div>
                    <Card.Text>{product.description}</Card.Text>
                    <Button 
                      variant="outline-primary" 
                      className="w-100" 
                      as={Link} 
                      to={`/product/detail/${product.pno}`}
                      style={styles.outlinePrimaryBtn}
                    >
                      상세 보기
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button 
              variant="primary" 
              size="lg" 
              as={Link} 
              to="/product/list"
              style={styles.primaryBtn}
            >
              모든 제품 보기
            </Button>
          </div>
        </Container>
      </section>

      {/* 커뮤니티 섹션 - 커뮤니티 페이지에서 가져옴 */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={styles.headerText}>커뮤니티</h2>
          <Row className="align-items-center mb-5">
            <Col lg={6} className="mb-4 mb-lg-0 fw-bold">
              <img 
                src={community}
                alt="PILL LAW 커뮤니티" 
                className="img-fluid rounded shadow"
                width={400}
              />
            </Col>
            <Col lg={6}>
              <h3 className="mb-4 fw-bold" style={styles.primaryText}>함께 성장하는 건강 커뮤니티</h3>
              <p className="lead mb-4 fw-bold">PILL LAW는 단순한 쇼핑몰이 아닌 건강한 삶을 위한 커뮤니티입니다.</p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <FontAwesomeIcon icon={faHeart} style={styles.primaryText} className="me-2" /> 
                  다른 회원들과 팔로우하고 소통하세요.
                </li>
                <li className="mb-2">
                  <FontAwesomeIcon icon={faStar} style={styles.primaryText} className="me-2" /> 
                  영양제 리뷰와 경험을 공유하세요.
                </li>
                <li className="mb-2">
                  <FontAwesomeIcon icon={faComments} style={styles.primaryText} className="me-2" /> 
                  맞팔로우 친구와 쪽지로 직접 소통하세요.
                </li>
                <li className="mb-2">
                  <FontAwesomeIcon icon={faTrophy} style={styles.primaryText} className="me-2" /> 
                  관심 있는 영양제를 즐겨찾기하고 관리하세요.
                </li>
              </ul>
            </Col>
          </Row>

          <h3 className="text-center mb-4 fw-bold" style={styles.headerText}>인기 리뷰</h3>
          <Row>
            {popularReviews.map(review => (
              <Col md={6} className="mb-4" key={review.id}>
                <Card style={styles.cardShadow}>
                  <Card.Body>
                    <div className="d-flex mb-3">
                      <img 
                        src={review.imageUrls[0]}
                        // src={`https://eeerrorcode.buckets3.ap-northeast-2.amazonaws.com/uploads/review/${review.pno}/${review.prno}/`}
                        alt={review.pname} 
                        className="me-3"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <div>
                        <h5 className="mb-1">{review.pname}</h5>
                        <div className="text-warning mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} style={{ color: i < review.rating ? '#ffc107' : '#e4e5e9' }} />
                          ))}
                        </div>
                        <Link to={`/product/detail/${review.pno}`} className="text-decoration-none">
                          <div className="d-flex align-items-center cursor-pointer">
                            <img 
                              src={profile} 
                              alt="프로필 사진" 
                              className="rounded-circle me-2"
                              style={{ width: "30px", height: "30px" }}
                            />
                            <span className="text-muted small fs-11">
                              {review.nickName} · {review.regDate}
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                    {/* <p className="mb-3">{review.content}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: review.content }}></div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ 섹션 - 소개 페이지에서 가져옴 */}
      <section className="py-5" style={styles.accordionBg}>
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={styles.headerText}>자주 묻는 질문</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion>
                {faqs.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 연락처 섹션 - 소개 페이지에서 가져옴 */}
      <section className="py-5" style={styles.secondaryBg}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="mb-4 fw-bold" style={styles.darkText}>궁금한 점이 있으신가요?</h2>
              <p className="lead mb-4 fw-bold">PILL LAW 팀에 문의하시면 빠르게 답변해 드립니다.</p>
              
              <Row className="my-5">
                <Col md={4} className="mb-4 mb-md-0">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faEnvelope} style={styles.primaryText} className="fa-2x" />
                  </div>
                  <h5>이메일</h5>
                  <p className='fw-bold'>sophia76256@gmail.com</p>
                </Col>
                <Col md={4} className="mb-4 mb-md-0">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faPhone} style={styles.primaryText} className="fa-2x" />
                  </div>
                  <h5>전화</h5>
                  <p className='fw-bold'>010-5191-9852</p>
                </Col>
                <Col md={4}>
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faLocationDot} style={styles.primaryText} className="fa-2x" />
                  </div>
                  <h5>주소</h5>
                  <p className='fw-bold'>서울특별시 구로구 디지털로 306<br /> 대륭포스트타워 2차</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA 섹션 */}
      <section className="py-5 text-center" style={styles.primaryBg}>
        <Container>
          <h2 className="mb-4 fw-bold" style={styles.whiteText}>지금 바로 PILL LAW와 함께 건강한 삶을 시작하세요</h2>
          <p className="lead mb-4" style={styles.whiteText}>회원가입 후 첫 구매 시 10% 할인 혜택을 드립니다!</p>
          <Button 
            variant="light" 
            size="lg" 
            as={Link} 
            to="/signup" 
            className="me-3"
            style={styles.whiteBtn}
          >
            회원가입하기
          </Button>
          <Button 
            variant="outline-light" 
            size="lg" 
            as={Link} 
            to="/product/list"
            style={styles.outlineWhiteBtn}
          >
            제품 둘러보기
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;