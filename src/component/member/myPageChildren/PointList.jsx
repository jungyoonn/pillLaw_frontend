import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import UseAxios from '../../../hooks/UseAxios';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate'; // 날짜 포맷 함수 임포트

const PointHistory = ({ memberId }) => {
    const [pointHistory, setPointHistory] = useState([]);  // 포인트 내역
    const [totalPoints, setTotalPoints] = useState(0);  // 총 포인트
    const [visibleCount, setVisibleCount] = useState(10);  // 보이는 포인트 내역 수
    const { req } = UseAxios("http://localhost:8080/api/v1");
    const navigate = useNavigate();

    // 포인트 이력 및 총 포인트 조회
    useEffect(() => {
        const fetchPointData = async () => {
            try {
                // 포인트 이력 조회
                const historyResponse = await req('get', `/point/member/${memberId}`);
                setPointHistory(historyResponse);

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
        setVisibleCount(visibleCount + 10);  // 더보기 버튼 클릭 시 10개씩 추가
    };

    return (
        <div>
            <h4>총 포인트: {totalPoints} P</h4>
            <Table className="text-center align-middle mt-1 table-md" responsive>
                <thead>
                    <tr>
                        <th className="fw-bold fs-14 header-font">포인트 일자</th>
                        <th className="fw-bold fs-14 header-font">포인트</th>
                        <th className="fw-bold fs-14 header-font">상태</th>
                        <th className="fw-bold fs-14 header-font">만료일</th>
                    </tr>
                </thead>
                <tbody>
                    {pointHistory.length > 0 ? (
                        pointHistory.slice(0, visibleCount).map((point, index) => (
                            <tr key={point.pono}>
                                <td className="fw-bold fs-14">{formatDate(point.regdate)}</td>
                                <td className="fw-bold fs-14">{point.point} P</td>
                                <td className="fw-bold fs-14">{point.status}</td>
                                <td className="fw-bold fs-14">{formatDate(point.endDate)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center fs-14 text-secondary">
                                포인트 내역이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {visibleCount < pointHistory.length && (
                <Button variant="secondary" onClick={loadMorePoints} className="btn-sm">
                    더보기
                </Button>
            )}
        </div>
    );
};

export default PointHistory;
