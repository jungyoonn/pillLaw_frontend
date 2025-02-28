import { useState, useEffect } from 'react';
import { UseAxios } from './UseAxios'; // useAxios 훅 가져오기

export const useTotalPoints = (mno) => {
  const { req } = UseAxios(); // useAxios 훅에서 req 가져오기
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const pointsResponse = await req("GET", `v1/point/${mno}/total`);
        setTotalPoints(pointsResponse); // 포인트 상태 업데이트
      } catch (error) {
        console.error("❌ 포인트 불러오기 실패:", error);
      }
    };

    if (mno) {
      fetchPoints();
    }
  }, [mno, req]); // req를 의존성 배열에 추가

  return totalPoints;
};