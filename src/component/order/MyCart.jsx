import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Axios 추가
import { useAuth } from '../../hooks/AuthContext';
import UseAxios from '../../hooks/UseAxios'; // axios 훅

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentOption, setCurrentOption] = useState('30일'); // 모달 기본값
  const navigate = useNavigate();

  const { req } = UseAxios(); // 'req' 함수 가져오기
  const { mno, email, token } = useAuth();

  useEffect(() => {
    const getOption = (subday) => {
      if (subday === 30) return "30일";
      if (subday === 60) return "60일";
      return "90일";
    };

    const fetchCartItems = async () => {
      try {
        // 장바구니 항목을 가져오기
        const cartResponse = await req('GET', `v1/cart/${mno}/items`);

        // 각 항목에 대해 상품 정보를 가져오기
        const itemsWithProductInfo = await Promise.all(
          cartResponse.map(async (item) => {
            try {
              // 상품 정보를 pno로 가져오기
              const productResponse = await req('GET', `v1/product/${item.pno}`);
              const product = productResponse?.product;

              if (!product) {
                console.error(`상품 정보가 없습니다. pno: ${item.pno}`);
                return {
                  ...item,
                  name: "알수없음",  // 상품명이 없을 경우
                  img: "https://placehold.co/60",  // 기본 이미지
                  option: getOption(item.subday),  // 옵션 설정
                };
              }

              // 상품명과 관련된 다른 데이터가 있으면 정상적으로 반환
              return {
                ...item,
                name: product.pname || "알수없음",  // 상품명
                img: "https://placehold.co/60",  // 기본 이미지
                option: getOption(item.subday),  // 옵션 설정
              };
            } catch (error) {
              console.error(`상품 정보 요청 중 오류 발생 (pno: ${item.pno})`, error);
              return {
                ...item,
                name: "알수없음",  // 상품명
                img: "https://placehold.co/60",  // 기본 이미지
                option: getOption(item.subday),  // 옵션 설정
              };
            }
          })
        );

        // 상태 업데이트
        setCartItems(itemsWithProductInfo);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };

    fetchCartItems();
  }, [mno]); // mno가 변경될 때마다 실행


  const updateCart = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      let optionMultiplier = item.option === "60일" ? 2 : item.option === "90일" ? 3 : 1;
      totalPrice += item.price * optionMultiplier * item.quantity;
    });
    return totalPrice;
  };

  const handleOptionChange = (cino) => {
    const selectedItem = cartItems.find(item => item.cino === cino);
    setCurrentItemId(cino);
    setCurrentOption(selectedItem.option);
    setShowModal(true);
  };


  const handleSaveOption = async () => {
    const newOption = currentOption;
    const subdayValue = newOption === "60일" ? 60 : newOption === "90일" ? 90 : 30;

    console.log(`📌 [요청] 옵션 변경 요청 - 상품 ID: ${currentItemId}, 변경 옵션: ${newOption}, subday: ${subdayValue}`);

    try {
      const response = await req('PUT', `v1/cart/items/${currentItemId}`, {
        cino: currentItemId,  // 장바구니 아이템 ID (cino)
        subday: subdayValue
      });

      console.log(`✅ [성공] 응답 데이터:`, response.data);

      // 상태 업데이트 - 변경된 옵션 즉시 반영
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cino === currentItemId ? { ...item, option: newOption, subday: subdayValue } : item
        )
      );

      setShowModal(false); // 모달 닫기
    } catch (error) {
      console.error("❌ [실패] 옵션 업데이트 오류", error.response ? error.response.data : error);
    }
  };



  const handleQuantityChange = async (cino, quantity) => {
    const updatedQuantity = Math.max(1, parseInt(quantity, 10));

    console.log(`📌 [요청] 수량 변경 요청 - 상품 ID: ${cino}, 변경 수량: ${updatedQuantity}`);

    try {
      const response = await req('PUT', `v1/cart/items/${cino}`, {
        cino: cino,  // 장바구니 아이템 ID를 그대로 전송
        quantity: updatedQuantity
      });

      console.log(`✅ [성공] 응답 데이터:`, response.data);

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cino === cino ? { ...item, quantity: updatedQuantity } : item
        )
      );
    } catch (error) {
      console.error("❌ [실패] 수량 업데이트 오류", error.response ? error.response.data : error);
    }
  };



  const handleSelectItem = (cino) => {
    setSelectedItems(prev =>
      prev.includes(cino) ? prev.filter(item => item !== cino) : [...prev, cino]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map(item => item.cino));  // cino 사용
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }

    try {
      await Promise.all(
        selectedItems.map(async (cino) => {
          await req('DELETE', `v1/cart/items/${cino}`); // axios.delete 대신 req 사용
        })
      );

      // 삭제된 항목을 UI에서도 반영
      setCartItems(prevItems => prevItems.filter(item => !selectedItems.includes(item.cino)));
      setSelectedItems([]); // 선택 항목 초기화

      console.log("✅ 선택한 항목이 삭제되었습니다.");
    } catch (error) {
      console.error("❌ 장바구니 항목 삭제 중 오류 발생", error);
    }
  };


  const totalPrice = updateCart();
  const shippingFee = 3000;
  const finalPrice = totalPrice + shippingFee;

  return (
    <div className='wrap'>
      <Container style={{ paddingTop: '115.19px' }}>
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
                <tr key={item.cino}>
                  <td>
                    <input type="checkbox" checked={selectedItems.includes(item.cino)} onChange={() => handleSelectItem(item.cino)}/>
                  </td>
                  <td><img src={item.img} alt={item.name} className="img-fluid" /></td>
                  <td>{item.name}</td>
                  <td>
                    <Button variant="light" onClick={() => handleOptionChange(item.cino)}>{item.option}</Button>
                  </td>
                  <td>{(item.price * (item.option === '60일' ? 2 : item.option === '90일' ? 3 : 1)).toLocaleString()}원</td>
                  <td>
                    <Form.Control className="text-center" type="number" value={item.quantity} min="1" onChange={(e) => handleQuantityChange(item.cino, e.target.value)}/>
                  </td>
                  <td>{(item.price * (item.option === "60일" ? 2 : item.option === "90일" ? 3 : 1) * item.quantity).toLocaleString()}원</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {cartItems.length > 0 && (
          <>
            <Button className='btn-pilllaw' onClick={handleDeleteSelected}>선택 삭제</Button>

            <div className="d-flex flex-column align-items-end mt-4">
              <p className="text-end mb-2 fw-bold" style={{ color: "black" }}>전체 주문금액 {totalPrice.toLocaleString()}원</p>
              <p className="text-end mb-2 fw-bold" style={{ color: "black" }}>
                <span className="header-font">(구독 회원은 배송비 무료!) </span>배송비 {shippingFee.toLocaleString()}원</p>
              <p className="text-end mb-4 fw-bold" style={{ color: "black" }}>총 결제 금액 {finalPrice.toLocaleString()}원</p>
            </div>

            <div className="d-flex justify-content-end mb-3"><Button className="btn-pilllaw" onClick={() => navigate("/order")}>주문하기</Button></div>
          </>
        )}

        {/* 옵션 변경 모달 */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>옵션 변경</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newOption">
              <Form.Label>옵션 선택</Form.Label>
              <Form.Control as="select" value={currentOption} onChange={(e) => setCurrentOption(e.target.value)}  >
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

export default MyCart;
