import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button, InputGroup, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../resources/css/style.css";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
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
      <Container style={{ paddingTop: '115.19px' }}>
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
              label={<span onClick={() => setShowTermsModal(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>전자금융거래 이용약관에 동의합니다</span>}
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

        <Modal show={showTermsModal} onHide={() => setShowTermsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title><strong>전자금융거래 이용약관</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className="bg-white w-full h-[400px] p-4 rounded-lg overflow-hidden">
              <div className="mt-2 h-full overflow-y-auto border p-2">
                <p>제1조(목적)</p>
                <p>본 약관은 PILLLAW(필로)가 제공하는 전자금융거래서비스를 회원이 이용함에 있어 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.</p>

                <p className="mt-2">제2조(정의)</p>
                <p>① ‘전자금융거래’란 회사가 전자적 방식으로 제공하는 금융상품 및 서비스를 회원이 이용하는 거래를 말합니다.</p>
                <p>② ‘회원’이란 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 전자금융거래서비스를 이용하는 자를 말합니다.</p>

                <p className="mt-2">제3조(약관의 명시 및 변경)</p>
                <p>① 회사는 본 약관을 회원이 알 수 있도록 회사의 홈페이지 등에 게시합니다.</p>
                <p>② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</p>

                <p className="mt-2">제4조(전자금융거래서비스의 종류)</p>
                <p>회사가 제공하는 전자금융거래서비스의 종류는 다음과 같습니다.</p>
                <ul className="list-disc list-inside">
                  <li>인터넷뱅킹</li>
                  <li>모바일뱅킹</li>
                  <li>전자지급결제대행서비스</li>
                </ul>

                <p className="mt-2">제5조(이용시간)</p>
                <p>전자금융거래서비스는 24시간 이용 가능함을 원칙으로 하나, 회사의 사정에 따라 이용이 제한될 수 있습니다.</p>

                <p className="mt-2">제6조(거래지시의 철회)</p>
                <p>회원은 전자금융거래법에서 정한 바에 따라 전자금융거래지시를 철회할 수 있습니다.</p>

                <p className="mt-2">제7조(책임)</p>
                <p>회원이 자신의 관리 소홀로 인해 발생한 손해에 대해서는 회사가 책임지지 않습니다.</p>

                <p className="mt-2">제8조(기타)</p>
                <p>본 약관에서 정하지 아니한 사항은 관련 법령 및 회사의 이용약관을 따릅니다.</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-pilllaw" onClick={handleTermsAgree}>동의</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default MyOrder;
