// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import Header from './header';  // Header 컴포넌트 임포트
import Footer from './footer';  // Footer 컴포넌트 임포트

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, img: "https://placehold.co/60", name: "콜린 미오 이노시톨", price: 20000, option: "30일", quantity: 1 },
    { id: 2, img: "https://placehold.co/60", name: "철분 24mg", price: 15000, option: "60일", quantity: 1 },
    { id: 3, img: "https://placehold.co/60", name: "종합비타민", price: 16000, option: "30일", quantity: 1 },
    { id: 4, img: "https://placehold.co/60", name: "코큐텐", price: 19000, option: "90일", quantity: 2 },
    { id: 5, img: "https://placehold.co/60", name: "루테인 오메가", price: 35000, option: "30일", quantity: 3 },
    { id: 6, img: "https://placehold.co/60", name: "가르시니아", price: 25000, option: "30일", quantity: 1 }
  ]);

  // 장바구니 테이블 업데이트 함수
  const updateCart = () => {
    let totalPrice = 0;
    let tableBody = document.getElementById("cartTableBody");
    tableBody.innerHTML = '';

    if (cartItems.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 fw-bold text-muted">상품을 담아주세요</td>
        </tr>
      `;
      document.getElementById("totalPrice").innerText = "0";
      document.getElementById("finalPrice").innerText = "0";
      return;
    }

    cartItems.forEach(item => {
      let optionMultiplier = 1;
      if (item.option === "60일") optionMultiplier = 2;
      if (item.option === "90일") optionMultiplier = 3;

      const itemTotal = item.price * optionMultiplier * item.quantity;
      totalPrice += itemTotal;

      tableBody.innerHTML += `
        <tr>
          <td><input type="checkbox" class="item-checkbox" data-id="${item.id}"></td>
          <td><img src="${item.img}" class="img-fluid"></td>
          <td>${item.name}</td>
          <td><button class="btn btn-sm btn-outline-secondary change-option" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#optionModal">${item.option}</button></td>
          <td>${(item.price * optionMultiplier).toLocaleString()}원</td>
          <td><input type="number" class="form-control text-center quantity" data-id="${item.id}" value="${item.quantity}" min="1"></td>
          <td>${itemTotal.toLocaleString()}원</td>
        </tr>
      `;
    });

    // 총 가격, 배송비, 최종 결제 금액 갱신
    document.getElementById("totalPrice").innerText = totalPrice.toLocaleString();
    document.getElementById("finalPrice").innerText = (totalPrice + 3000).toLocaleString(); // 배송비 포함
  };

  useEffect(() => {
    updateCart();
  }, [cartItems]);

  return (
    <div className="wrap">
      <Header />
      <main className="container px-0" style={{ paddingTop: '115.19px' }}>
        <h4 className="text-center fw-bold mb-4">
          <span className="header-font">1. 장바구니</span>
          <span className="header-font text-secondary mx-5">2. 주문서 작성</span>
          <span className="header-font text-secondary">3. 결제 완료</span>
        </h4>
        <table className="table text-center align-middle">
          <thead className="table-light">
            <tr>
              <th><input type="checkbox" id="selectAllCheckbox" /></th>
              <th width="10%" className="header-font">장바구니 상품</th>
              <th width="50%">상품명</th>
              <th width="10%">구독기간</th>
              <th width="10%">가격</th>
              <th width="10%">수량</th>
              <th width="10%">합계</th>
            </tr>
          </thead>
          <tbody id="cartTableBody"></tbody>
        </table>
        <div className="d-flex justify-content-between my-3">
          <p className="fs-4 text-end">배송비 <span className="fw-bold">+ 3,000원</span></p>
          <p className="fs-4 text-end">총 금액 <span className="fw-bold" id="finalPrice">0</span>원</p>
        </div>
        <div className="d-flex justify-content-between my-3">
          <p className="fs-4 text-end">총 상품 금액 <span className="fw-bold" id="totalPrice">0</span>원</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
