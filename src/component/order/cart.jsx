import React, { useState } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, img: "https://placehold.co/60", name: "콜린 미오 이노시톨", price: 20000, option: "30일", quantity: 1 },
    { id: 2, img: "https://placehold.co/60", name: "철분 24mg", price: 15000, option: "60일", quantity: 1 },
    { id: 3, img: "https://placehold.co/60", name: "종합비타민", price: 16000, option: "30일", quantity: 1 },
    { id: 4, img: "https://placehold.co/60", name: "코큐텐", price: 19000, option: "90일", quantity: 2 },
    { id: 5, img: "https://placehold.co/60", name: "루테인 오메가", price: 35000, option: "30일", quantity: 3 },
    { id: 6, img: "https://placehold.co/60", name: "가르시니아", price: 25000, option: "30일", quantity: 1 }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const navigate = useNavigate(); 

  const updateCart = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      let optionMultiplier = item.option === "60일" ? 2 : item.option === "90일" ? 3 : 1;
      totalPrice += item.price * optionMultiplier * item.quantity;
    });
    return totalPrice;
  };

  const handleOptionChange = (itemId) => {
    setCurrentItemId(itemId);
    setShowModal(true);
  };

  const handleSaveOption = () => {
    const newOption = document.getElementById('newOption').value;
  
    setCartItems(cartItems.map(item => {
      if (item.id === currentItemId) {
        let optionMultiplier = newOption === "60일" ? 2 : newOption === "90일" ? 3 : 1;
        return { 
          ...item, 
          option: newOption, 
          total: item.price * optionMultiplier * item.quantity // 옵션 변경 시 총 가격 업데이트
        };
      }
      return item;
    }));
  
    setShowModal(false);
  };
  
  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = () => {
    setCartItems(cartItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]); // 선택 항목 초기화
  };


  const totalPrice = updateCart();
  const shippingFee = 3000;
  const finalPrice = totalPrice + shippingFee;

  return (
    <div className='wrap'>
      <Container style={{paddingTop: '115.19px'}}>
        <h4 className="text-center fw-bold my-5">
          <span className="header-font">1. 장바구니</span>
          <span className="text-secondary mx-5">2. 주문서 작성</span>
          <span className="text-secondary">3. 결제 완료</span>
        </h4>
        <Table className="text-center align-middle mt-5" responsive>
          <thead>
            <tr>
              <th><input type="checkbox" onChange={handleSelectAll} checked={selectedItems.length === cartItems.length && cartItems.length > 0} /></th>
              <th width="10%"></th>
              <th width="50%">상품명</th>
              <th width="10%">구독기간</th>
              <th width="10%">가격</th>
              <th width="10%">수량</th>
              <th width="10%">합계</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-4 fw-bold text-muted">상품을 담아주세요</td></tr>
            ) : (
              cartItems.map(item => (
                <tr key={item.id}>
                  <td><input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} /></td>
                  <td><img src={item.img} alt={item.name} className="img-fluid" /></td>
                  <td>{item.name}</td>
                  <td>
                    <Button variant="light" onClick={() => handleOptionChange(item.id)}>{item.option}</Button>
                  </td>
                  <td>{(item.price * (item.option === '60일' ? 2 : item.option === '90일' ? 3 : 1)).toLocaleString()}원</td>
                  <td>
                    <Form.Control className="text-center" type="number" value={item.quantity} min="1" onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                  </td>
                  <td>{(item.price * (item.option === "60일" ? 2 : item.option === "90일" ? 3 : 1) * item.quantity).toLocaleString()}원</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Button className='btn-pilllaw' onClick={handleDeleteSelected}>선택 삭제</Button>

        <div className="d-flex flex-column align-items-end mt-4">
          <p className="text-end mb-2 fw-bold" style={{ color: "black" }}>전체 주문금액 {totalPrice.toLocaleString()}원</p>
          <p className="text-end mb-2 fw-bold" style={{ color: "black" }}><span className="header-font">(구독 회원은 배송비 무료!) </span>배송비 {shippingFee.toLocaleString()}원</p>
          <p className="text-end mb-4 fw-bold" style={{ color: "black" }}>총 결제 금액 {finalPrice.toLocaleString()}원</p>
        </div>

        <div className="d-flex justify-content-end mb-3">
        <Button className="btn-pilllaw" onClick={() => navigate("/order")}>주문하기</Button>
        </div>

        {/* 옵션 변경 모달 */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>옵션 변경</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newOption">
              <Form.Label>옵션 선택</Form.Label>
              <Form.Control as="select">
                <option value="30일">30일</option>
                <option value="60일">60일</option>
                <option value="90일">90일</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>취소</Button>
            <Button className='btn-pilllaw' onClick={handleSaveOption}>저장</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Cart;
