import React, { useEffect, useState } from 'react';
import profile from '../../../resources/image/user-image.png'
import { Col, Form, Modal, Row } from 'react-bootstrap';
import Button from '../../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faGear } from "@fortawesome/free-solid-svg-icons";
import UseAxios from '../../../hooks/UseAxios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../resources/image/pilllaw_favicon.png';

const MyInfo = ({ activeKey, setActiveKey }) => {
  const [login, setLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [member, setMember] = useState({});
  const {req} = UseAxios("http://localhost:8080/api");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedMno = localStorage.getItem("mno");
    setLogin(!!storedMno);

    // 로그인이 안 되어 있으면 모달 표시
    if (!login) {
      setShowModal(true);
    }

    const loadUser = async () => {
      try {
        // mno가 있을 때만 API 호출
        if (storedMno) {
          const resp = await req('get', `?mno=${storedMno}&email=${storedEmail}`);
          console.log(resp)

          // 소셜 체크 추가
          if (resp) {
            setMember(resp);
            return;
          }
        }
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
      }
    };

    loadUser();
  }, [login, req])

  const handleCloseAndRedirect = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <>
      <Row>
        <Col xs="1" />
        <Col xs="2" lg="2" className='text-center'>
          <img src={profile} alt='프로필 사진' width={160} />
          {member.password ? 
            <Button variant='pillllaw' className="btn btn-pilllaw btn-sm mt-3">PILL LAW 구독</Button> : 
            <p className='fw-bold header-font fs-12 mt-3'>소셜 회원은 구독 서비스 이용이 불가능합니다.</p>
          }
          <p className='fs-14 fw-bold text-pilllaw mt-2'>
            <FontAwesomeIcon icon={faCoins} className='text-pilllaw-secondary mx-1' />
            포인트 : 1500P
          </p>
        </Col>
        <Col xs="2" />
        <Col xs="5">
          <p className='m-1 fs-14 fw-bold header-font'>이메일</p>
          <Form.Control
            type="text"
            placeholder={member.email || 'USER' + localStorage.getItem("mno")}
            className='bg-pilllaw-form fs-14 fw-bold'
            disabled
            readOnly
          />
          <Row className='mt-2'>
            <Col>
              <p className='m-1 fs-14 fw-bold header-font'>이름</p>
              <Form.Control
                type="text"
                placeholder={member.name || 'USER' + localStorage.getItem("mno")}
                className='bg-pilllaw-form fs-14 fw-bold'
                disabled
                readOnly
              />
            </Col>
            <Col>
              <p className='m-1 fs-14 fw-bold header-font'>닉네임</p>
              <Form.Control
                type="text"
                placeholder={member.nickname || member.socialProvider + '_USER'}
                className='bg-pilllaw-form fs-14 fw-bold'
                disabled
                readOnly
              />
            </Col>
          </Row>
          <p className='m-1 mt-3 fs-14 fw-bold header-font'>기본 배송지</p>
          <Form.Control
            type="text"
            placeholder="등록된 배송지가 없습니다."
            className='bg-pilllaw-form fs-14 fw-bold'
            disabled
            readOnly
          />
          <Button variant='pillllaw' className="btn btn-pilllaw btn-sm mt-1">등록하러 가기</Button>
          <Row className='mt-5'>
            <Col className=' border-end'>
              <p className='m-1 px-2 fs-14 fw-bold header-font text-center'>팔로우</p>
              <p className='m-1 mt-3 px-2 fs-14 fw-bold text-pilllaw text-center'>15명</p>
            </Col>
            <Col>
              <p className='m-1 px-2 fs-14 fw-bold header-font text-center'>팔로워</p>
              <p className='m-1 mt-3 px-2 fs-14 fw-bold text-pilllaw text-center'>20명</p>
            </Col>
          </Row>
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
