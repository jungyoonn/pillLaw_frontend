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
  const [followersCount, setFollowersCount] = useState(0); // 팔로워 수
  const [followingCount, setFollowingCount] = useState(0); // 팔로잉 수
  const [receiverLetterCount, setReceiverLetterCount] = useState(0); //받은 쪽지 수
  const { req } = UseAxios('');

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };
  
  useEffect(() => {
    const mno = localStorage.getItem("receiverFollowId"); // 현재 로그인한 사용자의 ID
    if (!mno) return; // 로그인하지 않았으면 요청 안 함

    const followAndLetterData = async () => {
      try {
        // 팔로워 수 가져오기
        
        const followersResp = await req('get', `/api/follow/${mno}`);
        // const followersResp = await req(`/api/follow/${mno}`);
        if (followersResp.data) {
          setFollowersCount(followersResp.data.length);
        }

        // // 팔로잉 수 가져오기 (추가적인 API 필요) 추가 수정예정건.
        const followingResp = await req('get', `/api/follow/sender/${mno}`);
        // const followingResp = await req(`/api/follow/following/${mno}`);
        if (followingResp.data) {
          setFollowingCount(followingResp.data.length);
        }
        
        const letterResp = await req('get', `/api/letter/count/${mno}`);
        if (letterResp.data) {
          setReceiverLetterCount(letterResp.data.count); // 쪽지 개수
        }

      } catch (error) {
        console.error("정보 가져오기 실패:", error);
      }
    };

    followAndLetterData();
  }, [localStorage.getItem("senderFollowId")]);
  // }, []);

  return (
    <>
      <Row>
        <Col xs lg="1" className="float-start p-2 pe-0 ms-4"><FontAwesomeIcon icon={faUser} className="fa-xl header-font" /></Col>
        <Col className="mt-2 ms-1">
          <span className="fs-16 fw-bold">{nickname + ' ' || '익명의 사용자 '} </span>
          <span className="fs-14">님, 환영합니다!</span>
        </Col>
        <Col xs lg="2" className="float-end p-2 me-2"><Link to={"/"} className="text-decoration-none"><FontAwesomeIcon icon={faGear} className="fa-xl header-font" /></Link></Col>
      </Row>
      <Row className="card-body p-0">
        <Col xs lg="7">
          <div className="px-2 ms-4 mb-0 fs-14"><FontAwesomeIcon icon={faCoins} className="fw-bold header-font me-1" />&nbsp;포인트 1500p</div>
          <div className="px-2 ms-4 mt-0 fs-14"><FontAwesomeIcon icon={faPaperPlane} className="fw-bold header-font me-1" />&nbsp;쪽지{receiverLetterCount}개</div>
        </Col>
        <Col className="mt-2">
          <Button variant='pilllaw' className="btn btn-pilllaw fs-14" onClick={handleClick} >로그아웃</Button>
        </Col>
      </Row>
      <Row className="row mt-4 d-flex justify-content-center">
        <Col>
          <p className="fs-14 fw-bold text-center ms-2"><Link to={"/"} className="text-pilllaw" >팔로잉 {followingCount}명</Link></p>
        </Col>
        <Col>
          <p className="fs-14 fw-bold text-center me-2"><Link to={"/"} className="text-pilllaw">팔로워 {followersCount}명</Link></p>
        </Col>
      </Row>
    </>
  );
}

export default ProfileCard;
