import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import UseAxios from "../../../hooks/UseAxios";
import { Link } from "react-router-dom";
import profile from '../../../resources/image/user-image.png'

// 팔로워 목록 컴포넌트
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
    <Container>
      {/* 여기에 팔로워 목록 내용 추가 */}
      <div className="container main-content"> 
      <div className="follow-item">
        <div className="user-profile">
          <ListGroup variant="flush">
            {follows.map((follow) => (
              <Link
              key={follow.sender.mno}  // sender.mno를 키로 설정
              to={`/followsenderpage/${follow.sender.mno}`}  // sender.mno 사용
              className="list-group-bg list-group-item fs-14 fw-bold"
            >
              <img src={profile} className="mx-2" alt='프로필 사진' width={25} />
              {follow.sender.nickname}  {/* sender.nickname 사용 */}
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
export default FollowersList;