import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faCoins, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from './Button';
import { useAuth } from '../../hooks/AuthContext';
import UseAxios from '../../hooks/UseAxios';

const ProfileCard = ({nickname}) => {
  const{logout} = useAuth();
  const [follow, setFollow] = useState([]);// 팔로워 수
  const [following, setFollowing] = useState([]); // 팔로잉 수
  const [receiverId, setReceiverId] = useState([]); //받은 쪽지 수
  const mno = localStorage.getItem('mno');
  const { req } = UseAxios();

  

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };
  
  useEffect(() => {
    if (!mno) return; // 로그인하지 않았으면 요청 안 함

    const fetchData = async () => {
      try {
        const respFollw = await req('get', `follow/count/${mno}`);
        const respLetter = await req('get', `letter/received/${mno}`);
        
        console.log(respLetter);
       
          setFollow(respFollw.follower); // 응답 값 적용
          setFollowing(respFollw.following);
          setReceiverId(respLetter.length); 

      } catch (error) {
        console.error("Error fetching follow list:", error);
      }
    };
    
    fetchData(); // async 함수 실행
  }, [mno]);

  return (
    <>
      <Row>
        <Col xs lg="1" className="float-start p-2 pe-0 ms-4"><FontAwesomeIcon icon={faUser} className="fa-xl header-font" /></Col>
        <Col className="mt-2 ms-1">
          <span className="fs-16 fw-bold">{nickname + ' ' || '익명의 사용자 '} </span>
          <span className="fs-14">님, <br /> 환영합니다!</span>
        </Col>
        <Col xs lg="2" className="float-end p-2 me-2"><Link to={"/"} className="text-decoration-none"><FontAwesomeIcon icon={faGear} className="fa-xl header-font" /></Link></Col>
      </Row>
      <Row className="card-body p-0 mt-2">
        <Col xs lg="7">
          <div className="px-2 ms-4 mb-0 fs-14"><FontAwesomeIcon icon={faCoins} className="fw-bold header-font me-1" />&nbsp;포인트 1500p</div>
          <div className="px-2 ms-4 mt-0 fs-14"><FontAwesomeIcon icon={faPaperPlane} className="fw-bold header-font me-1" />&nbsp;쪽지{receiverId}개</div>
        </Col>
        <Col className="mt-2">
          <Button variant='pilllaw' className="btn btn-pilllaw fs-14" onClick={handleClick} >로그아웃</Button>
        </Col>
      </Row>
      <Row className="row mt-4 d-flex justify-content-center">
        <Col>
          <p className="fs-14 fw-bold text-center ms-2"><Link to={"/followapp"} className="text-pilllaw" >팔로잉 {following}명</Link></p>
        </Col>
        <Col>
          <p className="fs-14 fw-bold text-center me-2"><Link to={"/followerslist"} className="text-pilllaw">팔로워 {follow} 명</Link></p>
        </Col>
      </Row>
    </>
  );
}

export default ProfileCard;
