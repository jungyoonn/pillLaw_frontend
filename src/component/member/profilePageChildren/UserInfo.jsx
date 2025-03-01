import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import profile from '../../../resources/image/user-image.png'
import Button from '../../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from 'react-router-dom';
import UseAxios from '../../../hooks/UseAxios';

const UserInfo = () => {
  const { id } = useParams();
  const {req} = UseAxios();
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(id);
    const mno = id;
    const mymno = localStorage.getItem('mno');

    const loadUser = async () => {
      try {
        if(mno) {
          const resp = await req('get', `member/userpage/${mno}/${mymno}`);
          console.log(resp);
          
          if(resp) {
            setUser(resp);
            console.log(user);
          }
        }
  
      } catch(error) {
        console.log("fail");
      }
    }
    loadUser();

  }, [req])

  const handleFollowClick = async () => {
    const receiverMno = id;
    const senderMno = localStorage.getItem('mno');
    const resp = await req('get', `follow/toggle/${senderMno}/${receiverMno}`)
    console.log(resp);
    if(resp.followed) {
      setUser({...user, isfollowing: false});
    } else {
      setUser({...user, isfollowing: true})
    }
  }

  return (
    <>
      <Row>
        <Col xs="3" />
        <Col xs="2" lg="2" className='text-center'>
          <img src={profile} alt='프로필 사진' width={120} />
          {user.isfollowing ? 
            <>
              <p className=' mt-3 fw-bold fs-14 text-secondary'>팔로우 중인 회원입니다.</p>
                <Button variant='pilllaw' className="btn btn-secondary btn-sm" onClick={handleFollowClick}>팔로우 취소</Button>
            </> :
            <Button variant='pilllaw' className="mt-4 btn btn-pilllaw btn-sm" onClick={handleFollowClick}>팔로우하기</Button>
          }
          <Row className='mt-4'>
            <Col className=' '>
              <p className='m-1 px-2 fs-14 fw-bold header-font text-center'>팔로잉</p>
              <p className='m-1 mt-3 px-2 fs-14 fw-bold text-pilllaw text-center'>{user.following || 0}명</p>
            </Col>
            <Col>
              <p className='m-1 px-2 fs-14 fw-bold header-font text-center'>팔로워</p>
              <p className='m-1 mt-3 px-2 fs-14 fw-bold text-pilllaw text-center'>{user.follower || 0}명</p>
            </Col>
          </Row>
        </Col>
        <Col xs="1" />
        <Col xs="5">
          <p className='m-1 fs-14 fw-bold header-font mt-3'>닉네임</p>
          <p className='m-1 fs-14 fw-bold mt-2'>{user.nickname || 'USER' + localStorage.getItem("mno")}</p>
          
          <p className='m-1 mt-5 fs-14 fw-bold header-font mt-3'>작성한 리뷰</p>
          <p className='m-1 fs-14 fw-bold mt-2'>{0}개</p>
          
          <p className='m-1 mt-5 fs-14 fw-bold header-font mt-3'>즐겨찾기 상품</p>
          <p className={'m-1 fs-14 fw-bold mt-2 mb-5' }>{0}개</p>

          {user.followBack && <div className='mt-5 mb-5'>
            <FontAwesomeIcon icon={faPaperPlane} className='text-pilllaw' />
            <Link to={"/letterlistlayouttest"} className='text-decoration-none'>
              <span className='fs-14 header-font fw-bold mx-2'>쪽지 보내기</span>
            </Link>
          </div>}
        </Col>
      </Row>
    </>
  );
}

export default UserInfo;
