import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Row, Col, Card } from 'react-bootstrap';
import UseAxios from '../../../hooks/UseAxios';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatDateTime } from '../../../utils/formatDate'; // 날짜 포맷 함수 임포트

const OrderList = ({ memberId }) => {
    const [orders, setOrders] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const [orderItems, setOrderItems] = useState([]); // 주문 아이템 상태 추가
    const [showModal, setShowModal] = useState(false); // 모달 상태 관리
    const [selectedOrder, setSelectedOrder] = useState(null); // 선택된 주문
    const [deliveryInfo, setDeliveryInfo] = useState(null);  // 배송 정보 상태
    const { req } = UseAxios();


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await req('get', `v1/order/member/${memberId}`);

                // 주문 데이터를 최신순으로 정렬
                const sortedOrders = response.sort((a, b) => new Date(b.regdate) - new Date(a.regdate));
                setOrders(sortedOrders); // 정렬된 주문 데이터 저장

                // 주문 데이터가 변경되면 visibleCount를 초기화 (10개로 설정)
                setVisibleCount(5);
                console.log("주문 데이터:", sortedOrders);  // 데이터 확인용 로그
            } catch (error) {
                console.error('주문 내역을 가져오는 데 실패했습니다:', error);
            }
        };

        if (memberId) {
            fetchOrders();
        }
    }, [memberId, req]);

    const loadMoreOrders = () => {
        setVisibleCount(visibleCount + 5);  // 더보기 버튼 클릭 시 10개씩 추가
    };

    const fetchOrderItems = async (ono) => {
        try {
            const response = await req('GET', `v1/order/${ono}/items`);
            console.log('주문 아이템 응답:', response); // 여기서 데이터가 잘 오는지 확인
            // 상품 정보를 각 주문 아이템에 추가
            const itemsWithProductInfo = await Promise.all(
                response.map(async (item) => {
                    try {
                        // 상품 정보를 pno로 가져오기
                        const productResponse = await req('GET', `v1/product/${item.pno}`);
                        const product = productResponse?.product;

                        if (!product) {
                            return {
                                ...item,
                                name: "알수없음",  // 상품명이 없을 경우
                                option: item.subday || "없음",  // 옵션 설정
                            };
                        }

                        return {
                            ...item,
                            name: product.pname || "알수없음",  // 상품명
                            option: item.subday || "없음",  // 옵션 설정
                        };
                    } catch (error) {
                        console.error(`상품 정보 요청 중 오류 발생 (pno: ${item.pno})`, error);
                        return {
                            ...item,
                            name: "알수없음",
                            option: item.subday || "없음",
                        };
                    }
                })
            );

            setOrderItems(itemsWithProductInfo);  // 상태 업데이트
        } catch (error) {
            console.error("주문 아이템을 가져오는 데 실패했습니다:", error);
        }
    };

    const fetchDeliveryInfo = async (ono) => {
        try {
            const response = await req('GET', `v1/delivery/${ono}`);
            setDeliveryInfo(response);
        } catch (error) {
            console.error("배송 정보를 가져오는 데 실패했습니다:", error);
        }
    };

    // 상세보기 클릭 시 모달 열기
    const handleOrderDetail = async (order) => {
        setSelectedOrder(order);
        await fetchOrderItems(order.ono);  // 주문 아이템 불러오기
        await fetchDeliveryInfo(order.ono);  // 배송 정보 불러오기
        setShowModal(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setShowModal(false);
        setOrderItems([]);  // 모달 닫을 때 상태 초기화
        setDeliveryInfo(null);
    };

    return (
        <div>
            <Table className="text-center align-middle mt-1 table-md table-custom-bg" responsive>
                <thead style={{ backgroundColor: "#F8F9FA" }}>
                    <tr>
                        <th className="fw-bold fs-14 header-font">주문일자</th> {/* 글씨체 두껍게 변경 */}
                        <th className="fw-bold fs-14 header-font">수령인</th>
                        <th className="fw-bold fs-14 header-font">전화번호</th>
                        <th className="fw-bold fs-14 header-font">주문금액</th> {/* 추가 */}
                        <th className="fw-bold fs-14 header-font">사용포인트</th>
                        <th className="fw-bold fs-14 header-font">실결제금액</th>
                        <th className="fw-bold fs-14 header-font"></th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#F8F9FA" }}>
                    {orders.length > 0 ? (
                        orders.slice(0, visibleCount).map((order) => (
                            <tr key={order.ono}>
                                <td className="fw-bold fs-14">{formatDate(order.regdate)}</td> {/* 주문 일자 */}
                                <td className="fw-bold fs-14">{order.name}</td>
                                <td className="fw-bold fs-14">{order.tel}</td>
                                <td className="fw-bold fs-14">{(order.totalAmount + order.usingPoint).toLocaleString()}원</td> {/* 추가 */}
                                <td className="fw-bold fs-14">{order.usingPoint.toLocaleString()}P</td>
                                <td className="fw-bold fs-14">{order.totalAmount.toLocaleString()}원</td>
                                <td>
                                    <Button variant="outline-secondary" className="btn-sm" onClick={() => handleOrderDetail(order)}>상세보기</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center fs-14 text-secondary">주문 내역이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {visibleCount < orders.length && (<Button className="btn-pilllaw btn-sm" onClick={loadMoreOrders}>더보기</Button>)}


            {/* 주문 아이템 모달 */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="md">
                <Modal.Header closeButton>
                    <Modal.Title><h5 className="card-title fw-bold text-center header-font">주문 상세</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <>
                            <Row className="mb-1">
                                <Col xs={3} className="fw-bold">주문번호</Col>
                                <Col xs={9}>{selectedOrder.ono}</Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={3} className="fw-bold">주문일자</Col>
                                <Col xs={9}>{formatDateTime(selectedOrder.regdate)}</Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={3} className="fw-bold">수령인</Col>
                                <Col xs={9}>{selectedOrder.name}</Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={3} className="fw-bold">전화번호</Col>
                                <Col xs={9}>{selectedOrder.tel}</Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={3} className="fw-bold">주문금액</Col>
                                <Col xs={9}>{(selectedOrder.totalAmount + selectedOrder.usingPoint).toLocaleString()}원</Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={3} className="fw-bold">사용포인트</Col>
                                <Col xs={9}>{selectedOrder.usingPoint.toLocaleString()}P</Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={3} className="fw-bold">실결제금액</Col>
                                <Col xs={9}>{selectedOrder.totalAmount.toLocaleString()}원</Col>
                            </Row>



                            <hr></hr>

                            {deliveryInfo && (
                                <>
                                    <Row className="mb-1">
                                        <Col xs={3} className="fw-bold">배송지</Col>
                                        <Col xs={9}>
                                            {deliveryInfo.address
                                                ? `[${deliveryInfo.address.postalCode}] ${deliveryInfo.address.roadAddress} ${deliveryInfo.address.detailAddress}`
                                                : '주소 정보 없음'}
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Col xs={3} className="fw-bold">배송상태</Col>
                                        <Col xs={9}>
                                            {deliveryInfo.deliveryStatus === 'READY' && '결제 완료(배송 준비중)'}
                                            {deliveryInfo.deliveryStatus === 'CANCELLED' && '결제 취소'}
                                            {deliveryInfo.deliveryStatus === 'SHIPPED' && '배송 중'}
                                            {deliveryInfo.deliveryStatus === 'FINISHED' && '배송완료'}
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Col xs={3} className="fw-bold">운송장번호</Col>
                                        <Col xs={9}>{deliveryInfo.trackingNumber || '배송이 시작되면 알려드립니다.'}</Col>
                                    </Row>
                                </>
                            )}

                            <Card className='mt-3'>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>주문상품목록</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderItems.length > 0 ? (
                                            orderItems.map((item) => (
                                                <tr key={item.itemId}>
                                                    <td>{item.name}({item.subday}일)</td>
                                                    <td>{item.quantity}개</td>
                                                    <td>{item.price.toLocaleString()}원</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">주문 아이템이 없습니다.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-pilllaw' onClick={handleCloseModal}>확인</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default OrderList;
