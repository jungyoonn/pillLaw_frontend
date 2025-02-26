import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAxios from '../../../hooks/UseAxios';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import Button from '../../common/Button';
import logo from '../../../resources/image/pilllaw_favicon.png';
import AddressApi from '../../common/AddressApi';  // 주소 API 컴포넌트 추가

const ModifyInfo = ({ activeKey }) => {
  const [login, setLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [member, setMember] = useState({});
  const [social, setSocial] = useState({});
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);  // 주소 모달 상태 추가
  const [address, setAddress] = useState({  // 주소 상태 추가
    zipCode: '',
    address: '',
    addressDetail: ''
  });
  const {req} = UseAxios("http://localhost:8080/api");
  const navigate = useNavigate();

  useEffect(() => {
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
          const resp = await req('get', `/member/mypage/myinfo/${storedMno}`);
          console.log(resp);
          
          if (resp) {
            setMember(resp);
            // 사용자 정보로 상태 초기화
            setName(resp.memberDto?.name || '');
            setNickname(resp.memberDto?.nickname || resp.socialDto?.nickname || '');
            
            // 주소 정보가 있다면 설정
            if (resp.memberDto?.address) {
              setAddress({
                zipCode: resp.memberDto.zipCode || '',
                address: resp.memberDto.address || '',
                addressDetail: resp.memberDto.addressDetail || ''
              });
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

  const handleOnClickCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // 주소 검색 버튼 클릭 핸들러
  const handleAddressSearch = () => {
    setShowAddressModal(true);
  };

  // 주소 선택 완료 핸들러
  const handleAddressComplete = (addressData) => {
    setAddress({
      ...address,
      zipCode: addressData.zipCode,
      address: addressData.address
    });
  };

  // 상세 주소 변경 핸들러
  const handleAddressDetailChange = (e) => {
    setAddress({
      ...address,
      addressDetail: e.target.value
    });
  };

  const handleOnClickSubmit = async (e) => {
    e.preventDefault();
    
    // 비밀번호 확인 검증
    if(!!member.socialDto) {
      if (password && password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    try {
      const finalData = {
        memberInfo : {
          name,
          nickname,
          address: address.address,
          addressDetail: address.addressDetail,
          zipCode: address.zipCode
        },
        socialInfo: {
          nickname,
          address: address.address,
          addressDetail: address.addressDetail,
          zipCode: address.zipCode
        },
        addressInfo: {
          address: address.address,
          addressDetail: address.addressDetail,
          zipCode: address.zipCode
        }
      }

      // const memberInfo = {
      //   name,
      //   nickname,
      //   address: address.address,
      //   addressDetail: address.addressDetail,
      //   zipCode: address.zipCode
      // };

      // const socialInfo = {
      //   nickname,
      //   address: address.address,
      //   addressDetail: address.addressDetail,
      //   zipCode: address.zipCode
      // }

      // 비밀번호가 입력된 경우에만 추가
      // if (password) {
      //   memberInfo.password = password;
      // }

      const storedMno = localStorage.getItem("mno");
      // const response = await req('put', `/member/mypage/update/${storedMno}`, memberInfo);
      
      // if (response) {
      //   alert('회원 정보가 성공적으로 수정되었습니다.');
      //   navigate('/mypage');
      // }
    } catch (error) {
      console.error('회원 정보 수정 실패:', error);
      alert('회원 정보 수정에 실패했습니다.');
    }
  };

  return (
    <>
      <Row>
        <Col xs="1" />
        <Col xs="4">
          <p className='m-1 fs-14 fw-bold header-font'>이메일</p>
          <Form.Control
            type="text"
            placeholder={member.memberDto?.email || 'USER' + localStorage.getItem("mno")}
            className='bg-pilllaw-form fs-14 fw-bold'
            disabled
            readOnly
          />
          <p className='m-1 mt-4 fs-14 fw-bold header-font'>비밀번호</p>
          <Form.Control
            type="password"
            placeholder="**********"
            className='bg-pilllaw-form fs-14 fw-bold'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!!member.socialDto} // 소셜 로그인 시 비활성화
          />
          <p className='m-1 mt-4 fs-14 fw-bold header-font'>비밀번호 확인</p>
          <Form.Control
            type="password"
            className='bg-pilllaw-form fs-14 fw-bold'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!!member.socialDto} // 소셜 로그인 시 비활성화
          />
          <p className='m-1 mt-4 fs-14 fw-bold header-font'>이름</p>
          <Form.Control
            type="text"
            placeholder={member.memberDto?.name || 'USER' + localStorage.getItem("mno")}
            className='bg-pilllaw-form fs-14 fw-bold'
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!!member.socialDto} // 소셜 로그인 시 비활성화
          />
          <p className='m-1 mt-4 fs-14 fw-bold header-font'>닉네임</p>
          <Form.Control
            type="text"
            placeholder={member.memberDto?.nickname || member.socialDto?.nickname || member.socialDto?.socialProvider + '_USER'}
            className='bg-pilllaw-form fs-14 fw-bold'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Col>
        <Col xs="1" />
        <Col xs="5">
          <p className='m-1 fs-14 fw-bold header-font'>우편번호</p>
          <div className='mb-2'>
            <Form.Control
              type="text"
              value={address.zipCode}
              placeholder="우편번호"
              className='bg-pilllaw-form fs-14 fw-bold me-2'
              readOnly
            />
            <Button 
              variant='pilllaw' 
              className="btn btn-pilllaw btn-sm px-3 mt-1"
              onClick={handleAddressSearch}
            >
              주소 검색
            </Button>
          </div>
          
          <p className='m-1 fs-14 fw-bold header-font'>주소</p>
          <Form.Control
            type="text"
            value={address.address}
            placeholder="주소"
            className='bg-pilllaw-form fs-14 fw-bold mb-2'
            readOnly
          />
          
          <p className='m-1 fs-14 fw-bold header-font'>상세 주소</p>
          <Form.Control
            type="text"
            value={address.addressDetail}
            placeholder="상세 주소를 입력해주세요"
            className='bg-pilllaw-form fs-14 fw-bold'
            onChange={handleAddressDetailChange}
          />
          
          <div className='mt-5 pt-5'>
            <div className='mt-5 pt-5'>
              <div className='mt-5 pt-5'>
                <Button 
                  variant='secondary' 
                  onClick={handleOnClickCancel} 
                  className="btn btn-secondary btn-sm mx-1 mt-1 px-4 float-end"
                >
                  취소
                </Button>
                <Button 
                  variant='pilllaw' 
                  className="btn btn-pilllaw btn-sm mt-1 px-4 float-end"
                  onClick={handleOnClickSubmit}
                >
                  수정
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col xs="1" />
      </Row>
      
      {/* 로그인 필요 모달 */}
      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
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
      
      {/* 주소 검색 모달 */}
      <AddressApi
        show={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onComplete={handleAddressComplete}
      />
    </>
  );
}

export default ModifyInfo;