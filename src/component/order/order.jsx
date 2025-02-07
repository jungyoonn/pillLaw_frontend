import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../resources/css/style.css";

const Order = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, img: "https://placehold.co/60", name: "콜린 미오 이노시톨", price: 20000, option: "30일", quantity: 1 },
    { id: 2, img: "https://placehold.co/60", name: "철분 24mg", price: 15000, option: "60일", quantity: 1 },
    { id: 3, img: "https://placehold.co/60", name: "종합비타민", price: 16000, option: "30일", quantity: 1 },
    { id: 4, img: "https://placehold.co/60", name: "코큐텐", price: 19000, option: "90일", quantity: 2 },
    { id: 5, img: "https://placehold.co/60", name: "루테인 오메가", price: 35000, option: "30일", quantity: 3 },
    { id: 6, img: "https://placehold.co/60", name: "가르시니아", price: 25000, option: "30일", quantity: 1 }
  ]);

  const [userMembershipStatus, setUserMembershipStatus] = useState("ACTIVE");
  const [totalPrice, setTotalPrice] = useState(0);
  const [expectedPoints, setExpectedPoints] = useState(0);
  const [deliveryMessage, setDeliveryMessage] = useState("");
    
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

  return (
    <Container className="mt-5" style={{ color: 'black' }}>
      <h4 className="text-center fw-bold mb-4">
        <span className="text-secondary">1. 장바구니</span>
        <span className="header-font mx-5">2. 주문서 작성</span>
        <span className="text-secondary">3. 결제 완료</span>
      </h4>

      <h5><strong>배송지</strong></h5>
      <hr />
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>받는사람</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>주소</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="우편번호" readOnly />
                <Button className="btn-pilllaw">주소 검색</Button>
              </InputGroup>
              <Form.Control type="text" placeholder="기본주소" className="mt-2" readOnly />
              <Form.Control type="text" placeholder="상세주소" className="mt-2" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>휴대전화</Form.Label>
              <Form.Control type="text" placeholder="010-1234-5678" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="deliveryMessage">배송 메세지</Form.Label>
                <Form.Select 
                    id="deliveryMessage" 
                    value={deliveryMessage} 
                    onChange={handleDeliveryMessageChange}
                >
                    <option value="경비실">경비실</option>
                    <option value="집앞">집앞</option>
                    <option value="택배함">택배함</option>
                    <option value="직접배송">직접배송</option>
                    <option value="배송전 연락">배송전 연락</option>
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

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">사용 포인트</Form.Label> <small>(보유 포인트: 5000P)</small>
        <Form.Control type="number" placeholder="포인트 입력" className="w-25" />
      </Form.Group>
      
      <p className="fw-bold">총 결제금액: {totalPrice.toLocaleString()}원</p>
      
      <div className="d-flex justify-content-center">
        <Button className="btn-pilllaw">결제하기</Button>
      </div>
    </Container>
  );
};

export default Order;
