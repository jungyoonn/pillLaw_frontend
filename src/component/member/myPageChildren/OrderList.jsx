import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import UseAxios from '../../../hooks/UseAxios';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate'; // 날짜 포맷 함수 임포트

const OrderList = ({ memberId }) => {
    const [orders, setOrders] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const { req } = UseAxios("http://localhost:8080/api/v1/order");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await req('get', `/member/${memberId}`);

                // 주문 데이터를 최신순으로 정렬
                const sortedOrders = response.sort((a, b) => new Date(b.regdate) - new Date(a.regdate));
                setOrders(sortedOrders); // 정렬된 주문 데이터 저장

                // 주문 데이터가 변경되면 visibleCount를 초기화 (10개로 설정)
                setVisibleCount(10);
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
        setVisibleCount(visibleCount + 10);  // 더보기 버튼 클릭 시 10개씩 추가
    };

    return (
        <div>
            <Table className="text-center align-middle mt-1 table-md" responsive >
                <thead>
                    <tr>
                        <th className="fw-bold fs-14 header-font">주문 일자</th> {/* 글씨체 두껍게 변경 */}
                        <th className="fw-bold fs-14 header-font">수령인</th>
                        <th className="fw-bold fs-14 header-font">전화번호</th>
                        <th className="fw-bold fs-14 header-font">결제 금액</th>
                        <th className="fw-bold fs-14 header-font">사용 포인트</th>
                        <th className="fw-bold fs-14 header-font"></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.slice(0, visibleCount).map((order, index) => (
                            <tr key={order.ono}>
                                <td className="fw-bold fs-14">{formatDate(order.regdate)}</td> {/* 주문 일자 */}
                                <td className="fw-bold fs-14">{order.name}</td>
                                <td className="fw-bold fs-14">{order.tel}</td>
                                <td className="fw-bold fs-14">{order.totalAmount} 원</td>
                                <td className="fw-bold fs-14">{order.usingPoint} P</td>
                                <td>
                                    <Button
                                        className="btn-pilllaw btn-sm"
                                        onClick={() => navigate(`/order/detail/${order.ono}`)}
                                    >
                                        상세보기
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center fs-14 text-secondary">
                                주문 내역이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {visibleCount < orders.length && (
                <Button variant="secondary" onClick={loadMoreOrders} className="btn-sm">
                    더보기
                </Button>
            )}
        </div>
    );
};

export default OrderList;
