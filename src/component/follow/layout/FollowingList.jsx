import React, { useEffect, useState } from "react";
import FollowHeaderButtonsArea from "./FollowHeaderButtonsArea";
import SendLetterPage from "../../letter/SendLetterPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UseAxios from '../../../hooks/UseAxios';
import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import profile from '../../../resources/image/user-image.png'

const FollowingList = () => {
  const {req} = UseAxios();
  const [follow, setFollow] = useState([]);
  const mno = localStorage.getItem('mno');
    
  useEffect (() => {
    console.log("mno before useEffect:", mno);
    console.log(mno);

    const fetchData = async () => {
      try {
        const resp = await req('get', `follow/following/${mno}`);
        console.log(resp);
        console.log("배열 여부:", Array.isArray(resp));
        setFollow([...resp]);
        console.log(follow);
        
      } catch (error) {
        console.error("Error fetching follow list:", error);
      }
    };
    fetchData(); // async 함수 실행
  }, [])
  return (
    <Container className="mt-3">
      
      {/* 여기에 팔로워 목록 내용 추가 */}
      <div className="container main-content"> 
      <div className="follow-item">
        <div className="user-profile">
          <ListGroup variant="flush">
            {follow.map((follow) => (
            <Link
              key={follow.followId}  // sender.mno를 키로 설정
              to={`/userpage/${follow.receiver.mno}`}  // sender.mno 사용
              className="list-group-bg list-group-item fs-14 fw-bold"
            >
              <img src={profile} className="mx-2" alt='프로필 사진' width={25} />
              {follow.receiver.nickname}  {/* sender.nickname 사용 */}
            </Link>
          ))}
          </ListGroup>
        </div>
        {/* <button className="btn btn-primary">팔로우</button> */}
      </div>
    </div>
    </Container>
  );
};

export default FollowingList;