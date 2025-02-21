import React, { useEffect, useState } from "react";
import axios from "axios";
import UseAxios from '../../hooks/UseAxios';

const Followers = () => {
  const [mno, setMno] = useState(null); // 숫자 타입으로 변경
  const [followers, setFollowers] = useState([]); // 배열로 초기화
  const { req } = UseAxios('');

  useEffect(() => {
    const senderFollowId = localStorage.getItem('senderFollowId');

    if (senderFollowId) {
      setMno(senderFollowId); // senderFollowId를 mno로 설정
    }

    const loadFollow = async () => {
      try {
        if (senderFollowId) {
          const resp = await req('get', `/api/follow/${senderFollowId}`);
          
          if (resp && Array.isArray(resp.data)) { // 응답이 배열인지 체크
            setFollowers(resp.data);
          } else {
            setFollowers([]); // 빈 배열로 설정
          }
        }
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
        setFollowers([]); // 오류 발생 시 빈 배열 유지
      }
    };

    loadFollow();
  }, [req]);

  return (
    <div>
      <h2>팔로워</h2>
      <ul>
        {followers.length > 0 ? (
          followers.map(follower => (
            <li key={follower.id}>{follower.name}</li>
          ))
        ) : (
          <p>0</p>
        )}
      </ul>
      <p>총 팔로워: {followers.length}명</p> {/* 총 팔로워 수 표시 */}
    </div>
  );
};

export default Followers;
