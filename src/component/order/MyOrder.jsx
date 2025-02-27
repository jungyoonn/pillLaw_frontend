import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button, InputGroup, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../resources/css/style.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/AuthContext';
import UseAxios from '../../hooks/UseAxios'; // axios 훅

const MyOrder = () => {
  const { mno, email, token } = useAuth();
  const { req, loading, error } = UseAxios();  // useAxios 훅을 사용하여 HTTP 요청을 처리
  const [address, setAddress] = useState({ postcode: "", roadAddress: "", detailAddress: "", });
  const [savedAddresses, setSavedAddresses] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [userMembershipStatus, setUserMembershipStatus] = useState("ACTIVE");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0); // 포인트 상태 추가
  const [expectedPoints, setExpectedPoints] = useState(0);
  const [deliveryMessage, setDeliveryMessage] = useState("선택 안함");
  const [points, setPoints] = useState(0);
  const [totalPayment, setTotalPayment] = useState(totalPrice);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!mno) return;

    // ✅ 포인트 조회 함수
    const fetchTotalPoints = async () => {
      try {
        const pointsResponse = await req("GET", `v1/point/${mno}/total`);
        setTotalPoints(pointsResponse); // 포인트 상태 업데이트
      } catch (error) {
        console.error("❌ 포인트 불러오기 실패:", error);
      }
    };

    const fetchCartItems = async () => {
      try {
        // 장바구니 항목을 가져오기
        const cartResponse = await req('GET', `v1/cart/${mno}/items`);

        // 각 항목에 대해 상품 정보를 추가하여 상태 업데이트
        const itemsWithProductInfo = await Promise.all(
          cartResponse.map(async (item) => {
            try {
              // 상품 정보를 pno로 가져오기
              const productResponse = await req('GET', `v1/product/${item.pno}`);
              const product = productResponse?.product; // 상품명 가져오기

              // 상품명이나 상품 정보가 없을 경우 '알수없음' 처리
              const productName = product ? product.pname : "알수없음";
              const productImage = "https://placehold.co/60";  // 기본 이미지

              return {
                ...item,
                name: productName,  // 상품명
                img: productImage,   // 이미지
                option: item.subday === 30 ? "30일" : item.subday === 60 ? "60일" : "90일", // 옵션 설정
              };
            } catch (error) {
              console.error(`상품 정보 요청 중 오류 발생 (pno: ${item.pno})`, error);
              return {
                ...item,
                name: "알수없음", // 상품명
                img: "https://placehold.co/60", // 기본 이미지
                option: item.subday === 30 ? "30일" : item.subday === 60 ? "60일" : "90일",
              };
            }
          })
        );

        // 상태 업데이트
        setCartItems(itemsWithProductInfo);
      } catch (error) {
        console.error("❌ 장바구니 불러오기 실패:", error);
      }
    };

    // ✅ 주소 조회 함수
    const fetchAddresses = async () => {
      try {
        const addressResponse = await req("GET", `v1/address/${mno}`);
        setSavedAddresses(addressResponse); // 주소 상태 업데이트
        console.log("✅ 주소 불러오기 성공:", addressResponse);
      } catch (error) {
        console.error("❌ 주소 불러오기 실패:", error);
      }
    };

    fetchTotalPoints();
    fetchCartItems();
    fetchAddresses();
  }, [mno]); // mno가 변경될 때마다 실행



  const handleOrder = async () => {
    if (!mno) {
      alert("로그인 후 주문이 가능합니다.");
      return;
    }

    const orderData = {
      mno, // 로그인된 사용자의 mno
      name: recipient,
      tel: phone,
      request: deliveryMessage,
      totalAmount: totalPayment,
      usingPoint: points,
    };
    try {
      // 2️⃣ 주문 요청 → ono 응답받음
      console.log('🟡 주문 요청 중...');
      const ono = await req('POST', 'v1/order/', orderData);
      console.log('✅ 주문 성공, ono:', ono);

      if (!ono) {
        throw new Error('주문 번호(ono)를 받아올 수 없습니다.');
      }

      // 3️⃣ 주소 데이터 생성 (AddressDto 기반)
      const addressData = {
        mno,
        recipient,
        tel: phone,
        postalCode: address.postcode,
        roadAddress: address.roadAddress,
        detailAddress: address.detailAddress,
        defaultAddr: false,
      };

      // 4️⃣ 주소 정보 저장 요청
      console.log('🟡 주소 저장 중...');
      const addrno = await req('POST', 'v1/address/', addressData);
      console.log('✅ 주소 저장 완료, addrno:', addrno);

      // 서버에서 중복 주소가 있으면 addrno가 null이므로 그 경우에만 건너뜀
      if (addrno) {
        console.log('✅ 주소 저장 완료, addrno:', addrno);
      } else {
        console.log('중복된 주소이므로 주소 저장을 건너뜁니다.');
      }

      // 5️⃣ 결제 진행
      handlePayment(ono, totalPayment, points, addrno);


    } catch (err) {
      console.error('❌ 주문 처리 중 오류 발생:', err);
      // 중복 주소로 인한 실패는 알리지 않음
      if (err.message !== '주소 저장에 실패했습니다.') {
        alert('주문 또는 주소 저장에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };


  const handlePayment = (ono, amount, usedPoints, addrno) => {
    const { IMP } = window;
    IMP.init("imp24587612");

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: `order_${ono}`, // 📌 ono 사용
        name: "PILL LAW(필로우)",
        amount: amount,
        buyer_email: email,
        buyer_name: recipient,
        buyer_tel: phone,
      },
      async (response) => {
        if (response.success) {
          console.log("✅ 결제 성공, imp_uid:", response.imp_uid);

          try {
            // 📌 1️⃣ 결제 정보 저장 (결제 요청)
            const payResponse = await req("POST", "pay/req", {
              ono,
              method: "카드",
              totalPrice: amount,
              impUid: response.imp_uid,
            });

            console.log("🔹 결제 정보 저장 응답:", payResponse);

            if (!payResponse || !payResponse.no) {
              alert("❌ 결제 정보 저장 실패");
              navigate("/order/fail");
              return;
            }

            // 📌 2️⃣ 결제 검증 요청 (IAMPORT 결제 확인)
            const paymentResponse = await req("POST", "pay/complete", {
              ono,
              imp_uid: response.imp_uid,
              method: "카드",
            });

            console.log("🔹 결제 검증 응답:", paymentResponse);

            // 📌 3️⃣ 검증 성공 시, 결제 완료 처리
            if (!paymentResponse || paymentResponse.status !== "완료") {
              alert("❌ 결제 완료 처리 실패. 고객센터에 문의하세요.");
              navigate("/order/fail");
              return;
            }
            // 📌 4️⃣ 결제 성공 후 포인트 차감
            if (usedPoints > 0) {
              await req("POST", `v1/point/${mno}/use?pointAmount=${usedPoints}`);
              setTotalPoints((prev) => prev - usedPoints); // 프론트엔드에서도 차감
              setPoints(0); // 입력 필드 초기화
            }

            // 📌 5️⃣ 배송 정보 생성 요청
          const deliveryResponse = await req("POST", "v1/delivery/create", {
            ono,
            addrno,
            trackingNumber: null,
          });

          console.log("🔹 배송 정보 생성 응답:", deliveryResponse);

          if (!deliveryResponse || !deliveryResponse.dno) {
            alert("❌ 배송 정보 생성 실패");
            navigate("/order/fail");
            return;
          }
            // 📌 4️⃣ 최종 결제 성공 처리
            // alert("🎉 결제가 완료되었습니다!");
            navigate("/order/success", {
              state: {
                receiver: recipient,
                phone: phone,
                address: `${address.roadAddress} ${address.detailAddress}`,
                message: deliveryMessage,
                amount: totalPayment
              }
            });

          } catch (error) {
            alert(`❌ 결제 확인 요청 중 오류 발생: ${error.message}`);
            navigate("/order/fail");
          }
        } else {
          alert(`❌ 결제 실패: ${response.error_msg}`);
          navigate("/order/fail");
        }
      }
    );
  };

  const goToCart = () => {
    navigate("/cart");
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
    const maxUsablePoints = Math.min(totalPoints, totalPrice);
    if (enteredPoints > maxUsablePoints) enteredPoints = maxUsablePoints;
    if (enteredPoints < 0) enteredPoints = 0;

    setPoints(enteredPoints);
  };

  // 포인트 적용
  const applyPoints = () => {
    const maxUsablePoints = Math.min(points, totalPoints, totalPrice);
    setTotalPayment(totalPrice - maxUsablePoints);
  };

  // 배송지 선택 시 폼에 자동 입력
  const handleSelectAddress = (selected) => {
    setRecipient(selected.recipient);
    setAddress({
      postcode: selected.postalCode,
      roadAddress: selected.roadAddress,
      detailAddress: selected.detailAddress,
    });
    setPhone(selected.tel);
    setShowModal(false); // 모달 닫기
  };

  const handleTermsAgree = () => {
    setIsTermsChecked(true);
    setShowTermsModal(false);
  };

  const handleDeliveryMessageChange = (e) => {
    const message = e.target.value;
    setDeliveryMessage(message);
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
          <Button className="btn-pilllaw" onClick={() => setShowModal(true)}>배송지 불러오기</Button>
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
                <Form.Control type="text" placeholder="하이픈(-) 없이 숫자만 입력하세요" value={phone} onChange={(e) => { setPhone(e.target.value); handlePhoneChange(e); }} required />

              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="deliveryMessage">배송 메세지</Form.Label>
                <Form.Select id="deliveryMessage" value={deliveryMessage} onChange={handleDeliveryMessageChange}>
                  <option value="선택 안함">선택 안함</option>
                  <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                  <option value="집 앞에 놔 두세요">집 앞에 놔 두세요</option>
                  <option value="택배함에 맡겨주세요">택배함에 맡겨주세요</option>
                  <option value="직접 수령할게요">직접 수령할게요</option>
                  <option value="배송 전 연락해주세요">배송 전 연락해주세요</option>
                </Form.Select>
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
            <small>(보유 포인트: {totalPoints.toLocaleString()}P)</small>
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
            <Form.Check type="checkbox" label={<span onClick={() => setShowTermsModal(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>전자금융거래 이용약관에 동의합니다</span>}
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex align-items-center">
            <Button variant="secondary" onClick={goToCart} className="me-3">장바구니로 돌아가기</Button>
            <Button onClick={handleOrder} className="btn-pilllaw" disabled={!isOrderValid}>결제하기</Button>
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
                <p><strong>주소:</strong> [{addr.postalCode}] {addr.roadAddress}, {addr.detailAddress}</p>
                <p><strong>휴대전화:</strong> {addr.tel}</p>
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
