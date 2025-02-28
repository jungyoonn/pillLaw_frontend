import React from 'react';
import { Col, Row } from 'react-bootstrap';
import profile from '../../../resources/image/user-image.png'

const UserInfo = ({user}) => {

  return (
    <>
      <Row>
        <Col xs="3" />
        <Col xs="2" lg="2" className='text-center'>
          <img src={profile} alt='프로필 사진' width={120} />
          <Row className='mt-5'>
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
          <p className='m-1 fs-14 fw-bold mt-2 mb-5'>{0}개</p>
        </Col>
      </Row>
    </>
  );
}

export default UserInfo;
