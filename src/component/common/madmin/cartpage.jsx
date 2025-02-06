import React, { useState } from 'react';
import { Button, Modal, Table, Form, Row, Col } from 'react-bootstrap';
import { FaUser, FaCartShopping, FaBell, FaMagnifyingGlass, FaCommentDots } from 'react-icons/fa';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, img: "https://placehold.co/60", name: "상품 A", price: 20000, option: "30일", quantity: 1 },
    { id: 2, img: "https://placehold.co/60", name: "상품 B", price: 15000, option: "60일", quantity: 1 }
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [newOption, setNewOption] = useState('30일');

  // 장바구니 테이블 업데이트
  const updateCart = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      let optionMultiplier = 1;
      if (item.option === "60일") optionMultiplier = 2;
      else if (item.option === "90일") optionMultiplier = 3;

      totalPrice += item.price * optionMultiplier * item.quantity;
    });
    return totalPrice;
  };

  // 수량 변경
  const handleQuantityChange = (id, quantity) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedItems);
  };

  // 옵션 변경
  const handleOptionChange = (id, option) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, option } : item
    );
    setCartItems(updatedItems);
  };

  // 선택된 아이템 삭제
  const deleteSelectedItems = () => {
    const updatedItems = cartItems.filter(item => !selectedItems.includes(item.id));
    setCartItems(updatedItems);
    setSelectedItems([]);
  };

  // 주문 완료
  const handleOrder = () => {
    alert("주문이 완료되었습니다!");
  };

  return (
    <div className="wrap">
      <header className="container-fluid mb-0" style={{ position: 'fixed', backgroundColor: '#F8F9FA' }}>
        <div className="container clearfix">
          <div className="row">
            <div className="col-3 p-0">
              <a href="#" className="float-start m-2"><img className="img-fluid header-icon" src="../../../resources/image/pilllaw_icon_crop.png" alt="아이콘" /></a>
              <h2 className="float-start mt-4 ms-3 pt-3 fw-bold"><a className="text-decoration-none header-font" href="#">PILL LAW</a></h2>
            </div>
            <div className="col">
              <div className="float-start py-4 ps-5">
                <h6 className="float-start m-4 text-center fw-bold"><a className="text-decoration-none header-font pt-4" href="#">전체 상품</a></h6>
                <h6 className="float-start m-4 text-center fw-bold"><a className="text-decoration-none header-font pt-4" href="#">구독하기</a></h6>
                <h6 className="float-start m-4 text-center fw-bold"><a className="text-decoration-none header-font pt-4" href="#">필로</a></h6>
                <h6 className="float-start m-4 text-center fw-bold"><a className="text-decoration-none header-font pt-4" href="#">마이페이지</a></h6>
              </div>
              <div className="float-end py-4">
                <FaUser className="header-font float-end mx-2 pt-4" />
                <FaCartShopping className="header-font float-end mx-2 pt-4" />
                <FaBell className="header-font float-end mx-2 pt-4" />
                <FaMagnifyingGlass className="header-font float-end mx-2 pt-4" />
                <FaCommentDots className="header-font float-end mx-2 pt-4" />
                <p className="float-end mx-2 pt-4 text-center fw-bold fs-12"><a className="header-font pt-3" href="#">회원가입</a></p>
                <p className="float-end pt-4 text-center fw-bold fs-12"><a className="header-font pt-3" href="#">로그인</a></p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-0" style={{ paddingTop: '115.19px' }}>
        <h2 className="text-center fw-bold mb-4 header-font">장바구니</h2>
        <Table className="text-center align-middle">
          <thead className="table-light">
            <tr>
              <th><input type="checkbox" onChange={(e) => {
                const checkboxes = document.querySelectorAll('.item-checkbox');
                checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
              }} /></th>
              <th className="header-font">장바구니 상품</th>
              <th width="50%">상품명</th>
              <th>구독기간</th>
              <th>가격</th>
              <th width="10%">수량</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => {
              const optionMultiplier = item.option === "60일" ? 2 : item.option === "90일" ? 3 : 1;
              const itemTotal = item.price * optionMultiplier * item.quantity;

              return (
                <tr key={item.id}>
                  <td><input type="checkbox" className="item-checkbox" onChange={(e) => {
                    setSelectedItems(prev => e.target.checked 
                      ? [...prev, item.id] 
                      : prev.filter(id => id !== item.id)
                    );
                  }} /></td>
                  <td><img src={item.img} className="img-fluid" alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td>
                    <Button variant="outline-secondary" size="sm" onClick={() => {
                      setCurrentItemId(item.id);
                      setNewOption(item.option);
                      setShowOptionModal(true);
                    }}>
                      {item.option}
                    </Button>
                  </td>
                  <td>{(item.price * optionMultiplier).toLocaleString()}원</td>
                  <td>
                    <Form.Control 
                      type="number" 
                      value={item.quantity} 
                      min="1" 
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
                    />
                  </td>
                  <td>{itemTotal.toLocaleString()}원</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between mb-3">
          <Button className="btn-pilllaw" onClick={deleteSelectedItems}>선택 삭제</Button>
        </div>

        <div className="d-flex flex-column align-items-end mt-4">
          <p className="text-end mb-2 fw-bold">전체 주문금액: <span id="totalPrice">{updateCart().toLocaleString()}</span>원</p>
          <p className="text-end mb-2 fw-bold"><span className="header-font">(구독 회원은 배송비 무료!) </span>배송비: <span id="shippingFee">3,000</span>원</p>
          <p className="text-end mb-4 fw-bold">총 결제 금액: <span id="finalPrice">{(updateCart() + 3000).toLocaleString()}</span>원</p>
        </div>

        <div className="d-flex justify-content-end mb-3">
          <Button variant="pilllaw" onClick={handleOrder}>주문하기</Button>
        </div>
      </main>

      {/* 옵션 변경 모달 */}
      <Modal show={showOptionModal} onHide={() => setShowOptionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>옵션 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="newOption">옵션 선택</Form.Label>
          <Form.Select id="newOption" value={newOption} onChange={(e) => setNewOption(e.target.value)}>
            <option value="30일">30일</option>
            <option value="60일">60일</option>
            <option value="90일">90일</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOptionModal(false)}>취소</Button>
          <Button variant="primary" onClick={() => {
            handleOptionChange(currentItemId, newOption);
            setShowOptionModal(false);
          }}>저장</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default CartPage;