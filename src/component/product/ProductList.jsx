import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";  // 🔥 Bootstrap JS 추가
import "font-awesome/css/font-awesome.min.css"; // FontAwesome 아이콘
import image1 from "../../resources/image/product1.jpg";
import image2 from "../../resources/image/product2.jpg";
import image3 from "../../resources/image/product3.jpg";
import "../../resources/css/style.css";
import { Link } from "react-router-dom";

// 상품 데이터
const products = [
  { id: 1, name: "프레쉬 유산균", price: 30500, image: image1, rating: 4.1, reviews: 19 },
  { id: 2, name: "비타민", price: 26000, image: image2, rating: 4.1, reviews: 19 },
  { id: 3, name: "홍삼", price: 41500, image: image3, rating: 4.1, reviews: 19 },
  { id: 4, name: "밀크씨슬", price: 19500, image: image1, rating: 4.1, reviews: 19 },
];

// 필터 데이터 (카테고리)
const categories = [
  {
    title: "생리활성",
    options: [
      '기억력', '혈행', '간건강', '체지방', '갱년기 남', '갱년기 여',
      '혈당', '눈', '면역', '관절, 뼈', '전립선', '피로', '피부',
      '콜레스테롤', '혈압', '긴장', '장', '칼슘', '요로', '소화', '항산화',
      '혈중중성지방', '인지능력', '운동수행, 지구력', '치아', '배뇨',
      '면역과민 피부', '월경', '정자', '질 유산균', '유아 성장'
    ]
  },
  {
    title: "영양소",
    options: [
      '비타민 A', '비타민 B', '비타민 D', '비타민 E', '비타민 K',
      '비타민 B1', '비타민 B2', '비타민 B6', '비타민 B12', '비타민 C',
      '나이아신', '엽산', '비오틴', '칼슘', '마그네슘', '철', '아연', '구리',
      '셀레늄', '요오드', '망간', '몰리브덴', '칼륨', '크롬', '식이섬유',
      '단백질', '필수 지방산'
    ]
  },
];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="wrap">
      <div className="container text-center" style={{paddingTop: '115.19px'}}>
        <h1 className="fw-bold my-5">상품 리스트</h1>
        <hr />

        {/* 필터 및 검색 */}
        <div className="keyword-selector d-flex p-3 m-2">
          <ul className="nav mx-auto">
            <li className="nav-item">
              <a className="nav-link text-decoration-none text-black" href="#">전체보기</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-decoration-none text-black" href="#">조회순</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-decoration-none text-black" href="#">구매 많은 순</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-decoration-none text-black" href="#">구독자 전용</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-decoration-none text-black" href="#">필로 패키지</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-decoration-none text-black" href="#">얼리버드</a>
            </li>
          </ul>
        </div>

        {/* 검색창 */}
        <div className="form-floating my-2 fs-12">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="검색어를 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label htmlFor="search">
            <i className="fa-solid fa-magnifying-glass"></i> 검색어를 입력하세요.
          </label>
        </div>

        {/* 카테고리 필터 */}
        <div className="category-selector">
          <div className="accordion" id="accordion">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="card">
                <div className="card-header bg-pilllaw opacity-75 pilllaw-secondary-tag">
                  <button
                    className="btn btn-link text-black"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${categoryIndex}`}
                    aria-expanded={categoryIndex === 0 ? "true" : "false"}
                    aria-controls={`collapse${categoryIndex}`}
                  >
                    {category.title}
                  </button>
                </div>
                <div
                  id={`collapse${categoryIndex}`}
                  className={`collapse ${categoryIndex === 0 ? "show" : ""}`}
                  data-bs-parent="#accordion"
                >
                  <div className="card-body fs-12">
                    <div className="row d-flex flex-wrap">
                      {category.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="col-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`check${categoryIndex}-${optionIndex}`}
                              name={`option${categoryIndex}`}
                              value={option}
                            />
                            <label className="form-check-label" htmlFor={`check${categoryIndex}-${optionIndex}`}>
                              {option}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 상품 리스트 */}
        <div className="row text-center container-fluid mt-4">
          {products
            .filter((product) => product.name.includes(searchTerm)) // 검색 필터 적용
            .map((product) => (
              <div key={product.id} className="col-6 col-sm-4 col-lg-3 col-xl-2 mt-2 mb-4 best-item">
                <Link to="#" className="text-decoration-none text-black">
                  <img className="img-fluid mx-2" src={product.image} alt={product.name} />
                  <p className="m-0 mt-1 fs-14 fw-bold">{product.name}</p>
                </Link>
                <p className="m-0 fs-14 mt-2">
                  <Link to="#" className="text-decoration-none text-black">
                    <span className="header-font fw-bold">{product.price.toLocaleString()}</span>원
                  </Link>
                </p>
                <p className="m-0 fs-12 fw-bold">
                  <Link to="#" className="text-decoration-none text-black">
                    <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i> {product.rating}{" "}
                    <span className="fs-11" style={{ color: "#AAA" }}>
                      리뷰({product.reviews})
                    </span>
                  </Link>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
