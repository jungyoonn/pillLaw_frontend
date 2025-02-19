import React, { useEffect, useState } from 'react';
import '../../resources/css/style.css';
import mainImage from '../../resources/image/main_image_2.jpg';
import product1 from '../../resources/image/product1.jpg';
import product2 from '../../resources/image/product2.jpg';
import tag1 from '../../resources/image/main_tag1.png';
import tag2 from '../../resources/image/main_tag2.png';
import tag4 from '../../resources/image/main_tag4.png';
import tag6 from '../../resources/image/main_tag6.png';
import tag7 from '../../resources/image/main_tag7.png';
import slider from '../../resources/image/main_slider.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faGreaterThan, faCrown, faStar, faCircle } from "@fortawesome/free-solid-svg-icons";
import ProfileCard from './ProfileCard';
import LoginCard from './LoginCard';
import UseAxios from '../../hooks/UseAxios';

const Index = () => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(false);
  const [nickname, setNickname] = useState('');
  const {req} = UseAxios("http://localhost:8080/api");

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);
    setLogin(!!storedEmail);

    const loadUser = async () => {
      try {
        // email이 있을 때만 API 호출
        if (storedEmail) {
          const resp = await req('get', `?email=${storedEmail}`);
          // null 체크 추가
          if (resp && resp.nickname) {
            setNickname(resp.nickname);
          }
        }
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
      }
    };

    loadUser();
  }, [email, req]);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setEmail(null);
    setLogin(false);
  };


  return (
    <div className='wrap'>
      <Container style={{paddingTop: '115.19px'}}>
        <img className="img-fluid p-0 pb-2" src={mainImage} alt='메인 이미지' />
        <Row>
          <Col xs lg="9" className="mx-2">
            <div className="mt-3 mb-4 mx-3">
              <div className="mb-3 text-center">
                <FontAwesomeIcon  icon={faLessThan}  className="fa-2xl fw-bold text-pilllaw px-3"  />
                <Link to={"/"} className="m-3"><img className="img-fluid mx-2" src={tag1} width="50" alt='태그 이미지' /></Link>
                <Link to={"/"} className="m-3"><img className="img-fluid mx-2" src={tag2} width="50" alt='태그 이미지' /></Link>
                <Link to={"/"} className="m-3"><img className="img-fluid mx-2" src={tag7} width="50" alt='태그 이미지' /></Link>
                <Link to={"/"} className="m-3"><img className="img-fluid mx-2" src={tag4} width="50" alt='태그 이미지' /></Link>
                <Link to={"/"} className="m-3"><img className="img-fluid mx-2" src={tag6} width="50" alt='태그 이미지' /></Link>
                <FontAwesomeIcon  icon={faGreaterThan}  className="fa-2xl fw-bold text-pilllaw px-3"  />
              </div>
              <Row>
                <Col className="text-end">
                  <h1 className="fw-bold col pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#BEST상품</Link></h1>
                  <h1 className="fw-bold mt-1 pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#얼리버드</Link></h1>
                  <h1 className="fw-bold col pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#구독자상품</Link></h1>
                </Col>
                <Col>
                  <h1 className="fw-bold col pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#필로패키지</Link></h1>
                  <h1 className="fw-bold pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#신제품</Link></h1>
                  <h1 className="col fw-bold pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#높은평점</Link></h1>
                </Col>
              </Row>
            </div>
            <h5 className="mx-3 fw-bold"><FontAwesomeIcon icon={faCrown} style={{ color: "#FFD43B" }} /> BEST</h5>
            <div className="container clearfix">
              <Row className="text-center">
                <Col className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product1} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </Col>
                <Col className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product2} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </Col>
                <Col className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product1} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </Col>
                <Col className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product2} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </Col>
                <Col className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product1} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </Col>
                <Col className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product2} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="me-2 p-0">
            <div className="card pilllaw-profile p-2">
              <div className="clearfix">
                <div className="card-body p-0">
                  {login ? (
                    <ProfileCard onLogout={handleLogout} nickname={nickname} />
                  ) : (
                    <LoginCard />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link to={"/"}><img className="img-fluid" src={slider} alt="슬라이더 사진" /></Link>
              <div className="text-center">
                <Link to={"/"} className="text-secondary"><FontAwesomeIcon icon={faCircle} className="fa-2xs mx-1" /></Link>
                <Link to={"/"} className="text-black"><FontAwesomeIcon icon={faCircle} className="fa-2xs mx-1" /></Link>
                <Link to={"/"} className="text-secondary"><FontAwesomeIcon icon={faCircle} className="fa-2xs mx-1" /></Link>
                <Link to={"/"} className="text-secondary"><FontAwesomeIcon icon={faCircle} className="fa-2xs mx-1" /></Link>
                <Link to={"/"} className="text-secondary"><FontAwesomeIcon icon={faCircle} className="fa-2xs mx-1" /></Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Index;
