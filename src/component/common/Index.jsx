import React from 'react';
import mainImage from '../../resources/image/main_image_2.jpg';
import favicon from '../../resources/image/pilllaw_favicon.png';
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


const Index = () => {
  return (
    <div className='wrap'>
      <Container style={{paddingTop: '115.19px'}}>
        <img className="img-fluid p-0 pb-2" src={mainImage} alt='메인 이미지' />
        <Row>
          <div className="col-9 mx-2">
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
              <div className="row">
                <div className="col text-end">
                  <h1 className="fw-bold col pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#BEST상품</Link></h1>
                  <h1 className="fw-bold mt-1 pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#얼리버드</Link></h1>
                  <h1 className="fw-bold col pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#구독자상품</Link></h1>
                </div>
                <div className="col">
                  <h1 className="fw-bold col pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#필로패키지</Link></h1>
                  <h1 className="fw-bold pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#신제품</Link></h1>
                  <h1 className="col fw-bold pilllaw-tag"><Link to={"/"} className="text-black text-decoration-none pilllaw-tag">#높은평점</Link></h1>
                </div>
              </div>
            </div>
            <h5 className="mx-3 fw-bold"><FontAwesomeIcon icon={faCrown} style={{ color: "#FFD43B" }} /> BEST</h5>
            <div className="container clearfix">
              <div className="row text-center">
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product1} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </div>
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product2} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </div>
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product1} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </div>
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product2} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </div>
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product1} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </div>
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <img className="img-fluid mx-2" src={product2} alt='상품 사진' />
                    <p className="m-0 mt-1 fs-14 fw-bold">프레쉬 유산균</p>
                  </Link>
                  <p className="m-0 fs-14 mt-2"><Link to={"/"} className="text-decoration-none text-black"><span className="header-font fw-bold">30,500</span>원</Link></p>
                  <p className="m-0 fs-12 fw-bold"><Link to={"/"} className="text-decoration-none text-black"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /> 4.1 <span className="fs-11" style={{color: "#AAA"}}>리뷰(19)</span></Link></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col me-2 p-0">
            {/* <div className="card pilllaw-profile p-2" style="z-index: -9999;">
              <div className="clearfix">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="float-start p-2 pe-0 ms-4 col-1"><i className="fa-solid fa-user fa-xl header-font"></i></div>
                    <div className="col mt-2 ms-1">
                      <span className="fs-16 fw-bold">김철수 </span>
                      <span className="fs-14">님, 환영합니다!</span>
                    </div>
                    <div className="float-end p-2 me-2 col-2"><a className="text-decoration-none" href="#"><i className="fa-solid fa-gear fa-xl header-font"></i></a></div>
                  </div>
                  <div className="card-body p-0 row">
                    <div className="col-7">
                      <div className="px-2 ms-4 mb-0 fs-14"><i className="fa-solid fa-coins fw-bold header-font me-1"></i>&nbsp;포인트 1500p</div>
                      <div className="px-2 ms-4 mt-0 fs-14"><i className="fa-solid fa-paper-plane fw-bold header-font me-1"></i>&nbsp;쪽지 0개</div>
                    </div>
                    <div className="col mt-2">
                      <a className="btn btn-pilllaw fs-14">로그아웃</a>
                    </div>
                  </div>
                  <div className="row mt-4 d-flex justify-content-center">
                    <div className="col">
                      <p className="fs-14 fw-bold text-center ms-2"><a className="text-pilllaw" href="#">팔로잉 15명</a></p>
                    </div>
                    <div className="col">
                      <p className="fs-14 fw-bold text-center me-2"><a className="text-pilllaw" href="#">팔로워 20명</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="card pilllaw-profile p-2">
              <div className="clearfix">
                <div className="card-body p-0">
                  <p className="fs-14 fw-bold text-center header-font mt-3">로그인 후 이용하실 수 있습니다.</p>
                  <div className="row">
                    <div className="col-2"></div>
                    <div className="col text-center">
                      <Link to={"/"} className="btn btn-pilllaw d-flex text-center"><img className="img-fluid me-2" src={favicon} width="25" alt="아이콘" />PILL LAW 로그인</Link>
                      <Link to={"/"} className="fs-11 text-pilllaw fw-bold ms-1">아이디찾기</Link>
                      <Link to={"/"} className="fs-11 text-pilllaw fw-bold ms-1">비밀번호찾기</Link>
                      <Link to={"/"} className="fs-11 text-pilllaw fw-bold ms-1">회원가입</Link>
                      <p className="fs-14 text-pilllaw fw-bold mt-2">당신의 건강을 구독하세요!</p>
                    </div>
                    <div className="col-2"></div>
                  </div>
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
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Index;
