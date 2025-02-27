import React, { useEffect, useState } from 'react';
import profile from '../../../resources/image/user-image.png'
import { Col, Modal, Row } from 'react-bootstrap';
import Button from '../../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faGear, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import UseAxios from '../../../hooks/UseAxios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../resources/image/pilllaw_favicon.png';

const MyInfo = ({ activeKey, setActiveKey }) => {
  const [login, setLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [member, setMember] = useState({});
  const [address, setAddress] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const {req} = UseAxios("http://localhost:8080/api");
  const navigate = useNavigate();

  useEffect(() => {
    const storedMno = localStorage.getItem("mno");
    setLogin(!!storedMno);

    // 로그인이 안 되어 있으면 모달 표시
    if (!storedMno) {
      setShowModal(true);
      return;
    }

    const loadUser = async () => {
      try {
        // mno가 있을 때만 API 호출
        if (storedMno) {
          const resp = await req('get', `/member/mypage/myinfo/${storedMno}`);
          console.log("로드된 회원 정보:", resp);

          if (resp) {
            setMember(resp);

            // 이메일 인증 상태 확인
            if (resp.memberDto && resp.memberDto.status) {
              setIsEmailVerified(resp.memberDto.status.includes('VERIFIED'));
            }
            
            // 주소 정보가 있을 경우 설정
            if (resp.addressDto) {
              setAddress(resp.addressDto);
            }
            return;
          }
        }
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
      }
    };

    loadUser();
  }, [login, req]);

  const handleCloseAndRedirect = () => {
    setShowModal(false);
    navigate('/');
  };
  
  // 기본 배송지 등록 화면으로 이동
  const handleAddressRegister = () => {
    setActiveKey('edit-info');
  };

  // 주소 표시 형식 생성 함수
  const formatAddress = () => {
    if (!address) return "등록된 배송지가 없습니다.";
    
    let formattedAddress = "";
    if (address.recipient) {
      formattedAddress += `${address.recipient}`;
    }
    
    if (address.tel) {
      formattedAddress += formattedAddress ? ` (${address.tel})` : address.tel;
    }
    
    if (address.roadAddress) {
      const addrPart = `${address.roadAddress}${address.detailAddress ? ` ${address.detailAddress}` : ''}`;
      formattedAddress += formattedAddress ? ` - ${addrPart}` : addrPart;
    }
    
    return formattedAddress || "등록된 배송지가 없습니다.";
  };

  const handleEmailVerification = (e) => {
    e.preventDefault();
    const email = member.memberDto.email
    navigate(`/verify/email?email=${email}`);
  };

  return (
    <>
      <Row>
        <Col xs="1" />
        <Col xs="2" lg="2" className='text-center'>
          <img src={profile} alt='프로필 사진' width={160} />
          {member.memberDto ? 
            <Button variant='pillllaw' className="btn btn-pilllaw btn-sm mt-3">PILL LAW 구독</Button> : 
            <p className='fw-bold header-font fs-12 mt-3'>소셜 회원은 구독 서비스 이용이 불가능합니다.</p>
          }
          <p className='fs-14 fw-bold text-pilllaw mt-2'>
            <FontAwesomeIcon icon={faCoins} className='text-pilllaw-secondary mx-1' />
            포인트 : 1500P
          </p>
          <Row className='mt-5'>
            <Col className=' '>
              <p className='m-1 px-2 fs-14 fw-bold header-font text-center'>팔로잉</p>
              <p className='m-1 mt-3 px-2 fs-14 fw-bold text-pilllaw text-center'>{member.following || 0}명</p>
            </Col>
            <Col>
              <p className='m-1 px-2 fs-14 fw-bold header-font text-center'>팔로워</p>
              <p className='m-1 mt-3 px-2 fs-14 fw-bold text-pilllaw text-center'>{member.follower || 0}명</p>
            </Col>
          </Row>
        </Col>
        <Col xs="2" />
        <Col xs="5">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className='m-1 fs-14 fw-bold header-font'>이메일</p>
            <p className='m-1 fs-14 fw-bold mt-2'>
              {member.memberDto?.email || 'USER' + localStorage.getItem("mno")}
              {member.memberDto && (
                <span className={`fs-12 ms-2 ${isEmailVerified ? 'text-success' : 'text-secondary'}`}>
                  <FontAwesomeIcon 
                    icon={isEmailVerified ? faCheckCircle : faExclamationCircle} 
                    className="me-1" 
                  />
                  {isEmailVerified ? '인증됨' : '인증되지 않음'}
                </span>
              )}
            </p>
          </div>
          {member.memberDto && !isEmailVerified && (
            <Button 
              variant='pilllaw' 
              className="mt-2 btn btn-secondary btn-sm"
              onClick={handleEmailVerification}
            >
              인증하기
            </Button>
          )}
        </div>

          <p className='m-1 mt-3 fs-14 fw-bold header-font'>전화번호</p>
          <p className='m-1 fs-14 fw-bold mt-2'>{member.memberDto?.tel || '등록된 전화번호가 없습니다.'}</p>
          {/* <Form.Control
            type="text"
            value={member.memberDto?.tel || ''}
            className='bg-pilllaw-form fs-14 fw-bold'
            disabled
            readOnly
          /> */}
          <Row className='mt-2'>
            <Col>
              <p className='m-1 fs-14 fw-bold header-font mt-3'>이름</p>
              <p className='m-1 fs-14 fw-bold mt-2'>{member.memberDto?.name || 'USER' + localStorage.getItem("mno")}</p>
              {/* <Form.Control
                type="text"
                value={member.memberDto?.name || 'USER' + localStorage.getItem("mno")}
                className='bg-pilllaw-form fs-14 fw-bold'
                disabled
                readOnly
              /> */}
            </Col>
            <Col>
              <p className='m-1 fs-14 fw-bold header-font mt-3'>닉네임</p>
              <p className='m-1 fs-14 fw-bold mt-2'>{member.memberDto?.nickname || member.socialDto?.nickname || (member.socialDto?.socialProvider ? `${member.socialDto.socialProvider}_USER` : '')}</p>
              {/* <Form.Control
                type="text"
                value={member.memberDto?.nickname || member.socialDto?.nickname || (member.socialDto?.socialProvider ? `${member.socialDto.socialProvider}_USER` : '')}
                className='bg-pilllaw-form fs-14 fw-bold'
                disabled
                readOnly
              /> */}
            </Col>
          </Row>
          
          <div className="mt-5">
              {/* <p className='m-1 fs-14 fw-bold header-font mt-3'>기본 배송지</p> */}
              <p className='mt-3 mb-2 fw-bold header-font'>기본 배송지</p>
              {!address && <p className='fs-12 fw-bold text-secondary'>기본 배송지가 등록되지 않았습니다.</p>}
              {!address && (
                <Button 
                  variant='pilllaw' 
                  className="btn btn-pilllaw btn-sm my-2"
                  onClick={handleAddressRegister}
                >
                  등록하러 가기
                </Button>
              )}
            {address && 
              <>
                <Row>
                  <Col xs="3">
                    <p className='m-1 fs-14 fw-bold header-font mt-3'>수령인</p>
                    <p className='m-1 fs-14 fw-bold mt-2'>{address?.recipient}</p>
                  </Col>
                  <Col>
                    <p className='m-1 fs-14 fw-bold header-font mt-3'>수령인 연락처</p>
                    <p className='m-1 fs-14 fw-bold mt-2'>{address?.tel}</p>
                  </Col>
                  <Col>
                    <p className='m-1 fs-14 fw-bold header-font mt-3'>우편번호</p>
                    <p className='m-1 fs-14 fw-bold mt-2'>{address?.postalCode}</p>
                  </Col>
                </Row>
                <p className='m-1 fs-14 fw-bold header-font mt-3'>주소</p>
                <p className='m-1 fs-14 fw-bold mt-2'>{address?.roadAddress} <br />{address?.detailAddress}</p>
              </>
            }
            {/* <p className='m-1 fs-14 fw-bold mt-2'>{formatAddress()}</p> */}
            {/* <Form.Control
              as="textarea"
              rows={address && address.detailAddress ? 2 : 1}
              value={formatAddress()}
              className='bg-pilllaw-form fs-14 fw-bold'
              disabled
              readOnly
            /> */}
            {address && (
              <div className="d-flex justify-content-end mt-1">
                <Button 
                  variant='pilllaw' 
                  className="btn btn-pilllaw btn-sm"
                  onClick={handleAddressRegister}
                >
                  수정하기
                </Button>
              </div>
            )}
          </div>
        
          <Link onClick={(e) => { e.preventDefault(); setActiveKey('edit-info'); }}><FontAwesomeIcon icon={faGear} className="fa-2xl header-font float-end mt-5 pt-5" /></Link>
        </Col>
      </Row>
      <Modal
        show={showModal}
        backdrop="static" // 배경 클릭으로 닫히지 않음
        keyboard={false} // Esc키로 닫히지 않음
        centered
        className='bg-pilllaw-modal'
      >
        <Modal.Header className='bg-pilllaw-form'>
          <Modal.Title className='fw-bold header-font'>
            <img src={logo} alt='로고' width={30} className='me-3' />
            PILL LAW
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='fw-bold text-pilllaw bg-pilllaw-form'>로그인이 필요한 서비스입니다.</Modal.Body>
        <Modal.Footer className='bg-pilllaw-form'>
          <Button variant="pilllaw" onClick={handleCloseAndRedirect}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyInfo;