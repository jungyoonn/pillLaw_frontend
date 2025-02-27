import React, { useEffect, useState } from "react";
import FollowHeaderButtonsArea from "./FollowHeaderButtonsArea";
import UseAxios from '../../../hooks/UseAxios';
import { Link } from "react-router-dom";

const FollowersList = () => {
  const { req } = UseAxios();
  const [follows, setFollows] = useState([]);
  const mno = localStorage.getItem('mno');

  useEffect(() => {
    if (!mno) return; // mno가 없으면 실행하지 않음

    const fetchData = async () => {
      try {
        const resp = await req('get', `follow/${mno}`);
        if (Array.isArray(resp)) {
          setFollows(resp);
        } else {
          console.error("API 응답이 배열이 아닙니다:", resp);
        }
      } catch (error) {
        console.error("Error fetching follow list:", error);
      }
    };

    fetchData();
  }, [mno]); // mno가 변경될 때 다시 실행

  return (
    <div className="container main-content">
      <FollowHeaderButtonsArea />
      <div className="list-group m-4">
        {follows.map((follow) => (
          <Link
            key={follow.sender.mno}  // sender.mno를 키로 설정
            to={`/followsenderpage/${follow.sender.mno}`}  // sender.mno 사용
            className="list-group-item"
          >
            <img
              src="../../resources/followImage/사본 -freepik__adjust__7192.png"
              alt="프로필"
              style={{ marginRight: "8px" }}
            />
            {follow.sender.nickname}  {/* sender.nickname 사용 */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FollowersList;
