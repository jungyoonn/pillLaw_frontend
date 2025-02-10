import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JavaScript 추가
import "font-awesome/css/font-awesome.min.css"; // FontAwesome 아이콘
import image1 from "../../resources/image/product1.jpg";
import image2 from "../../resources/image/product2.jpg";
import image3 from "../../resources/image/product3.jpg";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../resources/css/style.css';
import Chart from "chart.js/auto";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("real-product-details"); // 기본 선택된 탭
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // 기존 차트 제거
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["1점", "2점", "3점", "4점", "5점"],
        datasets: [
          {
            label: "리뷰 개수",
            data: [2, 5, 7, 3, 3],
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // 언마운트될 때 차트 제거
      }
    };
  }, []);

  return (
    <div className="container-fluid product-detail text-center">
      <h1 className="fw-bold mb-4 text-pilllaw">상품 상세정보</h1>
      <hr className="text-pilllaw" />

      {/* 탭 네비게이션 */}
      <div className="row mt-5">
        <ul className="nav nav-tabs nav-justified text-pilllaw">
          <li className="nav-item">
            <button
              className={`nav-link text-decoration-none text-pilllaw ${activeTab === "real-product-details" ? "active" : ""}`}
              onClick={() => setActiveTab("real-product-details")}
            >
              제품 상세정보
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-decoration-none text-pilllaw ${activeTab === "real-product-review" ? "active" : ""}`}
              onClick={() => setActiveTab("real-product-review")}
            >
              제품 리뷰(20)
            </button>
          </li>
        </ul>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="tab-content">
        <div className={`tab-pane container mt-5 ${activeTab === "real-product-details" ? "show active" : "d-none"}`}>
          <span className="badge bg-success fs-14">눈 건강</span>
          <span className="badge bg-success fs-14">단백질</span>
          <span className="badge bg-success fs-14">지방산</span>
          <span className="badge bg-success fs-14">면역</span>
        </div>

        <div className={`tab-pane container mt-5 ${activeTab === "real-product-review" ? "show active" : "d-none"}`}>
          <div className="pilllaw-product-score-total text-center p-3">
            <span className="fs-18 fw-bold">리뷰</span>
            <br />
            <span className="fs-16">당신의 소중한 후기를 남겨주세요.</span>
            <br />
            <div className="w-100">
              <canvas id="reviewChart" ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
