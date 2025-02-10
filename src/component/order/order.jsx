import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button, InputGroup, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../resources/css/style.css";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [address, setAddress] = useState({
    postcode: "",
    roadAddress: "",
    detailAddress: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [userMembershipStatus, setUserMembershipStatus] = useState("ACTIVE");
  const [totalPrice, setTotalPrice] = useState(0);
  const [expectedPoints, setExpectedPoints] = useState(0);
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [points, setPoints] = useState(5000);
  const [totalPayment, setTotalPayment] = useState(totalPrice);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, img: "https://placehold.co/60", name: "콜린 미오 이노시톨", price: 20000, option: "30일", quantity: 1 },
    { id: 2, img: "https://placehold.co/60", name: "철분 24mg", price: 15000, option: "60일", quantity: 1 },
    { id: 3, img: "https://placehold.co/60", name: "종합비타민", price: 16000, option: "30일", quantity: 1 },
    { id: 4, img: "https://placehold.co/60", name: "코큐텐", price: 19000, option: "90일", quantity: 2 },
    { id: 5, img: "https://placehold.co/60", name: "루테인 오메가", price: 35000, option: "30일", quantity: 3 },
    { id: 6, img: "https://placehold.co/60", name: "가르시니아", price: 25000, option: "30일", quantity: 1 }
  ]);

  const goToCart = () => {
    navigate("/cart"); // Navigating to the cart page
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력 가능
    let formatted = "";

    if (value.length <= 3) {
      formatted = value;
    } else if (value.length <= 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setPhone(formatted);
  };

  // 1. Kakao 주소 API 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 2. 팝업 방식으로 주소 검색
  const openPostcodePopup = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 팝업의 크기와 위치 설정
    const popupWidth = 600;
    const popupHeight = 500;
    const popupLeft = (window.innerWidth - popupWidth) / 2; // 화면 중앙으로 가게 좌측 위치 계산
    const popupTop = (window.innerHeight - popupHeight) / 2; // 화면 중앙으로 가게 상단 위치 계산

    new window.daum.Postcode({
      width: popupWidth,
      height: popupHeight,
      left: popupLeft, // 중앙 위치 설정
      top: popupTop,   // 중앙 위치 설정
      oncomplete: (data) => {
        let fullAddress = data.roadAddress;
        let extraAddress = "";

        if (data.bname) extraAddress += data.bname;
        if (data.buildingName) extraAddress += extraAddress ? `, ${data.buildingName}` : data.buildingName;
        if (extraAddress) fullAddress += ` (${extraAddress})`;

        setAddress({
          postcode: data.zonecode,
          roadAddress: fullAddress,
          detailAddress: "",
        });
      },
    }).open();
  };


  const handleDeliveryMessageChange = (event) => {
    setDeliveryMessage(event.target.value);
  };

  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      let optionMultiplier = item.option === "60일" ? 2 : item.option === "90일" ? 3 : 1;
      total += item.price * optionMultiplier * item.quantity;
    });
    setTotalPrice(total);

    let pointsRate = userMembershipStatus === "ACTIVE" ? 0.04 : 0.02;
    setExpectedPoints(Math.floor(total * pointsRate));
  }, [cartItems, userMembershipStatus]);



  const savedAddresses = [
    {
      id: 1,
      recipient: "홍길동",
      postcode: "12345",
      roadAddress: "서울특별시 강남구 테헤란로 123",
      detailAddress: "101호",
      phone: "010-1234-5678",
    },
    {
      id: 2,
      recipient: "김철수",
      postcode: "67890",
      roadAddress: "부산광역시 해운대구 해변로 456",
      detailAddress: "202호",
      phone: "010-5678-1234",
    },
    {
      id: 3,
      recipient: "이영희",
      postcode: "54321",
      roadAddress: "대전광역시 서구 둔산로 789",
      detailAddress: "303호",
      phone: "010-8765-4321",
    },
  ];


  // 포인트 input
  const handlePointsChange = (event) => {
    let enteredPoints = event.target.value;

    // 입력값이 0으로 시작하고, 그 뒤에 숫자가 있으면 0을 제거
    if (enteredPoints.startsWith('0') && enteredPoints.length > 1) {
      enteredPoints = enteredPoints.replace(/^0+/, '');
    }

    // 숫자만 입력될 수 있도록 처리 (빈 문자열이 들어오는 경우 방지)
    if (enteredPoints === '') {
      enteredPoints = '0';
    }

    // 값을 숫자로 변환
    enteredPoints = parseInt(enteredPoints, 10);

    // 숫자 범위 제한
    if (enteredPoints > 5000) enteredPoints = 5000;
    if (enteredPoints < 0) enteredPoints = 0;

    setPoints(enteredPoints);
  };

  // 포인트 적용
  const applyPoints = () => {
    const finalPoints = Math.min(points, 5000);
    setTotalPayment(totalPrice - finalPoints);
  };

  // 배송지 선택 시 폼에 자동 입력
  const handleSelectAddress = (selected) => {
    setRecipient(selected.recipient);
    setAddress({
      postcode: selected.postcode,
      roadAddress: selected.roadAddress,
      detailAddress: selected.detailAddress,
    });
    setPhone(selected.phone);
    setShowModal(false); // 모달 닫기
  };

  const handleTermsAgree = () => {
    setIsTermsChecked(true);
    setShowTermsModal(false);
  };


  // 배송지 입력 체크
  const isAddressValid = recipient && address.postcode && address.roadAddress && address.detailAddress && phone;

  // 결제하기 버튼 활성화 조건
  const isOrderValid = totalPayment > 0 && isAddressValid && isTermsChecked;

  return (
    <div className="wrap">
      <Container style={{ paddingTop: '115.19px'}}>
        <h4 className="text-center fw-bold my-5">
          <span className="text-secondary">1. 장바구니</span>
          <span className="header-font mx-5">2. 주문서 작성</span>
          <span className="text-secondary">3. 결제 완료</span>
        </h4>

        <div className="d-flex align-items-center justify-content-between mt-5">
          <h5><strong>배송지</strong></h5>
          <Button className="btn-pilllaw" onClick={() => setShowModal(true)}>
            배송지 불러오기
          </Button>
        </div>
        <hr />
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>받는사람</Form.Label>
                <Form.Control type="text" placeholder="이름을 입력하세요" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>주소</Form.Label>
                <InputGroup>
                  <Form.Control type="text" placeholder="우편번호" value={address.postcode} readOnly />
                  <Button className="btn-pilllaw" onClick={openPostcodePopup}>주소 검색</Button>
                </InputGroup>
                <Form.Control type="text" placeholder="기본주소" className="mt-2" value={address.roadAddress} readOnly />
                <Form.Control type="text" placeholder="상세주소" className="mt-2" value={address.detailAddress} onChange={(e) => setAddress({ ...address, detailAddress: e.target.value })} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>휴대전화</Form.Label>
                <Form.Control type="text" placeholder="하이픈(-) 없이 숫자만 입력하세요" value={phone} onChange={(e) => {
                  setPhone(e.target.value);
                  handlePhoneChange(e);
                }} required />

              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="deliveryMessage">배송 메세지</Form.Label>
                <Form.Select
                  id="deliveryMessage"
                  value={deliveryMessage}
                  onChange={handleDeliveryMessageChange}
                >
                  <option value="선택안함">선택 안함</option>
                  <option value="경비실">경비실에 맡겨주세요</option>
                  <option value="집앞">집 앞에 놔 두세요</option>
                  <option value="택배함">택배함에 맡겨주세요</option>
                  <option value="직접배송">직접 수령할게요</option>
                  <option value="배송전 연락">배송 전 연락해주세요</option>
                  <option value="직접입력">직접 입력</option>
                </Form.Select>

                {/* Conditionally show the textarea for custom message if "직접입력" is selected */}
                {deliveryMessage === "직접입력" && (
                  <Form.Control
                    as="textarea"
                    id="customMessage"
                    className="mt-2"
                    placeholder="직접 입력해 주세요"
                  />
                )}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <hr />

        <h5 className="mt-5"><strong>주문 상품</strong></h5>
        <hr />
        <Table responsive className="text-center align-middle">
          <thead className="table-light">
            <tr>
              <th></th>
              <th>상품명(구독기간)</th>
              <th>가격</th>
              <th>수량</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td><img src={item.img} alt={item.name} className="img-fluid" /></td>
                <td>{item.name} ({item.option})</td>
                <td>{(item.price * (item.option === '60일' ? 2 : item.option === '90일' ? 3 : 1)).toLocaleString()}원</td>
                <td>{item.quantity}</td>
                <td>{(item.price * (item.option === "60일" ? 2 : item.option === "90일" ? 3 : 1) * item.quantity).toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <hr />

        <div className="d-flex justify-content-between mt-3">
          <p className="fw-bold">총 금액(배송비 포함): {totalPrice.toLocaleString()}원</p>
          <p>{expectedPoints.toLocaleString()}P가 적립될 예정입니다(배송 완료 후 1주일 이내)</p>
        </div>
        <div>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">사용 포인트</Form.Label>{" "}
            <small>(보유 포인트: 5000P)</small>
            <div className="d-flex align-items-center" style={{ gap: "1rem" }}>
              <Form.Control type="number" value={points} onChange={handlePointsChange} placeholder="포인트 입력" style={{ width: "12.5%" }} step="100" min="0" />
              <Button onClick={applyPoints} className="btn-pilllaw">적용</Button>
              <small>적용 버튼을 눌러 총 결제 금액을 확인하세요</small>
            </div>
          </Form.Group>
          <p className="fw-bold">
            총 결제금액: {totalPayment.toLocaleString()}원
          </p>
          <Form.Group controlId="termsCheckbox" className="mb-3">
            <Form.Check
              type="checkbox"
              label={<span onClick={() => setShowTermsModal(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>결제 이용약관에 동의합니다</span>}
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
            />
          </Form.Group>
        </div>




        <div className="d-flex justify-content-center">
          <div className="d-flex align-items-center">
            <Button variant="secondary" onClick={goToCart} className="me-3">장바구니로 돌아가기</Button>
            <Button className="btn-pilllaw" disabled={!isOrderValid}>결제하기</Button>
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} style={{ color: "black" }}>
          <Modal.Header closeButton>
            <Modal.Title><strong>배송지 선택</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {savedAddresses.map((addr) => (
              <div key={addr.id} className="border p-3 mb-2">
                <p><strong>받는사람:</strong> {addr.recipient}</p>
                <p><strong>주소:</strong> [{addr.postcode}] {addr.roadAddress}, {addr.detailAddress}</p>
                <p><strong>휴대전화:</strong> {addr.phone}</p>
                <Button className="btn-pilllaw" onClick={() => handleSelectAddress(addr)}>선택</Button>
              </div>
            ))}
          </Modal.Body>
        </Modal>

        <Modal show={showTermsModal} onHide={() => setShowTermsModal(false)} style={{ color: "black" }}>
          <Modal.Header closeButton>
            <Modal.Title><strong>결제 이용약관</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>고객님께서는 결제 진행 시 다음 약관에 동의하게 됩니다.</p>
            <ul>
              <li>결제 완료 후 환불 및 취소는 당사 환불 정책에 따라 진행됩니다.</li>
              <li>개인정보 및 결제 정보는 안전하게 저장 및 보호됩니다.</li>
              <li>상품의 배송은 영업일 기준 3~5일 소요되며, 천재지변 및 기타 사유로 인해 지연될 수 있습니다.</li>
              <li>결제 후 주문 변경은 불가능하며, 변경을 원할 경우 고객센터를 통해 문의해 주세요.</li>
              <li>일부 상품의 경우 주문 후 제작이 시작되므로 단순 변심에 의한 취소가 어려울 수 있습니다.</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-pilllaw" onClick={handleTermsAgree}>동의</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Order;
