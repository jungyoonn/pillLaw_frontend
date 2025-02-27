import React, { useEffect, useState } from "react";
import FollowHeaderButtonsArea from "../layout/FollowHeaderButtonsArea";
import SendLetterPage from "../../letter/SendLetterPage";
import UseAxios from '../../../hooks/UseAxios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";


const FollowList = () => {
  const {req} = UseAxios();
  const [follows, setFollows] = useState([]);
  const mno = localStorage.getItem('mno');
  
  useEffect (() => {
    console.log("mno before useEffect:", mno);
    console.log(mno);

    const fetchData = async () => {
      try {
        const resp = await req('get', `follow/followBack/${mno}`);
        console.log(resp);
        console.log("배열 여부:", Array.isArray(resp));
        setFollows([...resp]);
        console.log(follows);        
      } catch (error) {
        console.error("Error fetching follow list:", error);
      }
    };
    fetchData(); // async 함수 실행    
  }, [])
  return (
    <Container className="mt-3">
      <div className="wrap">

      {/* <FollowHeaderButtonsArea /> */}
      {/* 상단 버튼 영역 */}
      
      {/* 팔로우 리스트 영역 */}

      <ListGroup variant="flush">
        {follows.map((follow) => (
          <Link key={follow.followId} to="#" className="list-group-item">
            {follow.sender.nickname} {/* 맞팔된 상대방 mno 표시 */}
          </Link>
        ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default FollowList;
