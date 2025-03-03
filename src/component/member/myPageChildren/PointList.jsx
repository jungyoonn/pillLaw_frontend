import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import UseAxios from '../../../hooks/UseAxios';
import { formatDateTime } from '../../../utils/formatDate'; // 날짜 포맷 함수 임포트

const PointHistory = ({ memberId }) => {
    const [pointHistory, setPointHistory] = useState([]);  // 포인트 내역
    const [totalPoints, setTotalPoints] = useState(0);  // 총 포인트
    const [visibleCount, setVisibleCount] = useState(5);  // 보이는 포인트 내역 수
    const { req } = UseAxios("https://pilllaw.eeerrorcode.com/api/v1");

    useEffect(() => {
        const fetchPointData = async () => {
            try {
                // 포인트 이력 조회
                const historyResponse = await req('get', `/point/member/${memberId}`);

                // 최신순 정렬 (날짜가 최신인 순)
                const sortedHistory = historyResponse.sort((a, b) => new Date(b.regdate) - new Date(a.regdate));
                setPointHistory(sortedHistory);

                // 총 포인트 조회
                const totalResponse = await req('get', `/point/${memberId}/total`);
                setTotalPoints(totalResponse);
            } catch (error) {
                console.error('포인트 내역을 가져오는 데 실패했습니다:', error);
            }
        };

        if (memberId) {
            fetchPointData();
        }
    }, [memberId, req]);


    const loadMorePoints = () => {
        setVisibleCount(visibleCount + 5);  // 더보기 버튼 클릭 시 10개씩 추가
    };

    return (
        <div>
            <p className='mt-3 mb-2 fw-bold header-font'>고객님의 총 보유 포인트는 {totalPoints.toLocaleString()}P 입니다.</p>
            <Table className="text-center align-middle mt-1 table-md table-custom-bg" responsive>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </thead>
                <tbody style={{ backgroundColor: "#F8F9FA" }}>
                    {pointHistory.length > 0 ? (
                        pointHistory.slice(0, visibleCount).map((point) => (
                            <tr key={point.pono}>
                                <td className="fw-bold fs-14" style={{ width: '120px' }}>
                                    <Button variant={point.status === "EARNED" ? "secondary" : point.status === "USED" ? "outline-secondary" : "secondary"} className="btn-sm" disabled>
                                        {point.status === "EARNED" ? "적립" : point.status === "USED" ? "사용" : point.status}
                                    </Button>
                                </td>
                                <td className="fw-bold fs-14" style={{ width: '180px' }}>{point.point > 0 ? `+${point.point.toLocaleString()}` : point.point.toLocaleString()}P</td>

                                <td className="fw-bold fs-14 text-end text-muted ">{formatDateTime(point.regdate)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center fs-14 text-secondary">포인트 내역이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {visibleCount < pointHistory.length && (<Button onClick={loadMorePoints} className="btn-pilllaw btn-sm">더보기</Button>)}
        </div>
    );
};

export default PointHistory;
