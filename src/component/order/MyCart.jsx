import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/AuthContext';
import UseAxios from '../../hooks/UseAxios'; // axios 훅
import logo from '../../resources/image/pilllaw_favicon.png';
import ToastMsg from '../common/ToastMsg';


const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentOption, setCurrentOption] = useState('30일'); // 모달 기본값
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");

  const navigate = useNavigate();

  const { req } = UseAxios(); // 'req' 함수 가져오기
  const { mno} = useAuth();

  useEffect(() => {

    if (!mno) {
      setShowLoginModal(true);
      return;
    }

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
                img: product.imageUrl || "https://placehold.co/60",  // 실제 이미지 URL로 변경
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
      }
    };

    fetchCartItems();
  }, [mno, req]); // mno가 변경될 때마다 실행

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false); // 3초 후 토스트 닫기
      }, 3000);

      return () => clearTimeout(timer); // 클린업 (안전하게 정리)
    }
  }, [showToast]);


  const handleCloseAndRedirect = () => {
    setShowModal(false);
    navigate('/');
  };


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
    try {
      await req('PUT', `v1/cart/items/${currentItemId}`, {
        cino: currentItemId,
        subday: subdayValue
      });
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cino === currentItemId ? { ...item, option: newOption, subday: subdayValue } : item
        )
      );
      setShowModal(false);
      setErrorMessage(""); // 성공 시 에러 메시지 초기화
    } catch (error) {
      let message = "옵션 변경 중 오류가 발생했습니다.";
      if (error.response) {
        if (error.response.data) {
          if (typeof error.response.data === "string") {
            message = error.response.data; // 문자열 응답 처리
          } else if (error.response.data.message) {
            message = error.response.data.message;
          }
        }
      }
      // 중복된 상품인 경우 알림
      if (message.includes("이미 동일한 상품이 장바구니에 존재합니다")) {
        message = "이미 장바구니에 존재하는 상품입니다.";
      }
      setErrorMessage(message);
    }
  };

  const handleQuantityChange = async (cino, quantity) => {
    const updatedQuantity = Math.max(1, parseInt(quantity, 10));

    try {
      await req('PUT', `v1/cart/items/${cino}`, {
        cino: cino,  // 장바구니 아이템 ID를 그대로 전송
        quantity: updatedQuantity
      });

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cino === cino ? { ...item, quantity: updatedQuantity } : item
        )
      );
    } catch (error) {
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
      setToastMessage("선택된 항목이 없습니다.");
      setToastTitle("실패");
      setShowToast(true);
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
    } catch (error) {
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
        <Table className="text-center align-middle mt-5 table-custom-bg" responsive>
          <thead style={{ backgroundColor: "#F8F9FA" }}>
            <tr>
              <th><input type="checkbox" onChange={handleSelectAll} checked={selectedItems.length === cartItems.length && cartItems.length > 0} /></th>
              <th width="10%"></th>
              <th width="50%">상품명</th>
              <th width="10%">섭취기간</th>
              <th width="10%">가격</th>
              <th width="10%">수량</th>
              <th width="10%">합계</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#F8F9FA" }}>

            {cartItems.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-4 fw-bold text-muted">상품을 담아주세요</td></tr>
            ) : (
              cartItems.map(item => (
                <tr key={item.cino}>
                  <td>
                    <input type="checkbox" checked={selectedItems.includes(item.cino)} onChange={() => handleSelectItem(item.cino)} />
                  </td>
                  <td><img src={item.img} alt={item.name} className="img-fluid" /></td>
                  <td>{item.name}</td>
                  <td>
                    <Button variant="light" onClick={() => handleOptionChange(item.cino)}>{item.option}</Button>
                  </td>
                  <td>{(item.price * (item.option === '60일' ? 2 : item.option === '90일' ? 3 : 1)).toLocaleString()}원</td>
                  <td>
                    {/* <Form.Control className="text-center" type="number" value={item.quantity} min="1" onChange={(e) => handleQuantityChange(item.cino, e.target.value)} /> */}
                    <Form.Control
                      className="text-center"
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.cino, e.target.value)}
                      style={{ backgroundColor: "#F8F9FA" }}
                    />
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
                <span className="header-font"></span>배송비 {shippingFee.toLocaleString()}원</p>
              <p className="text-end mb-4 fw-bold" style={{ color: "black" }}>총 결제 금액 {finalPrice.toLocaleString()}원</p>
            </div>

            <div className="d-flex justify-content-end mb-3"><Button className="btn-pilllaw" onClick={() => navigate("/order")}>주문하기</Button></div>
          </>
        )}

        {/* 옵션 변경 모달 */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>
              <h5 className="card-title fw-bold text-center header-font">섭취기간 선택</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newOption">
              <Form.Control as="select" value={currentOption} onChange={(e) => setCurrentOption(e.target.value)}  >
                <option value="30일">30일</option>
                <option value="60일">60일</option>
                <option value="90일">90일</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {errorMessage && <span style={{ color: "gray", marginLeft: "10px" }}>{errorMessage}</span>}
            <Button variant="secondary" onClick={() => setShowModal(false)}>취소</Button>
            <Button className='btn-pilllaw' onClick={handleSaveOption}>저장</Button>
          </Modal.Footer>
        </Modal>

        {/* 로그인 필요 모달 */}
        <Modal
          show={showLoginModal}
          backdrop="static"
          keyboard={false}
          centered
          className='bg-pilllaw-modal'
        >
          <Modal.Header className='bg-pilllaw-form'>
            <Modal.Title className='fw-bold header-font'>
              <img src={logo} alt='로고' width={30} className='me-3' />
              PILL LAW
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='fw-bold text-pilllaw bg-pilllaw-form'>로그인이 필요한 서비스입니다.</Modal.Body>
          <Modal.Footer className='bg-pilllaw-form'>
            <Button variant="pilllaw" onClick={handleCloseAndRedirect}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {showToast && (
        <ToastMsg
          title={toastTitle}
          msg={toastMessage}
          state={showToast}  // 토스트 표시 상태
          nav={null}
        />
      )}

    </div>
  );
};

export default MyCart;
