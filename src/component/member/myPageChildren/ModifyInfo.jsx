import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAxios from '../../../hooks/UseAxios';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import Button from '../../common/Button';
import ToastMsg from '../../common/ToastMsg';
import logo from '../../../resources/image/pilllaw_favicon.png';
import AddressApi from '../../common/AddressApi';  // 주소 API 컴포넌트 추가

const ModifyInfo = ({ activeKey }) => {
  const [login, setLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [member, setMember] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [tel, setTel] = useState('');
  const [firstLogin, setFirstLogin] = useState(false);
  const [roles, setRoles] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [pwErr, setPwErr] = useState('');
  const [roadAddressError, setRoadAddressError] = useState(false);
  const [detailAddressError, setDetailAddressError] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newPasswordMismatchError, setNewPasswordMismatchError] = useState(false);
  const [address, setAddress] = useState({
    addrno: '',
    recipient: '',
    tel: '',
    postalCode: '',
    roadAddress: '',
    detailAddress: '',
    defaultAddr: false,
    mno: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState({
    title: "",
    msg: "",
    state: false,
    nav: ""
  });

  // 유효성 검증 상태
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [telError, setTelError] = useState(false);
  const [recipientError, setRecipientError] = useState(false);
  const [recipientTelError, setRecipientTelError] = useState(false);
  
  // 정규식 패턴
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const nameRegex = /^[가-힣]{2,4}$/;
  const nicknameRegex = /^([가-힣]{2,5}|[a-zA-Z]{4,10})$/;
  const telRegex = /^010[0-9]{8}$/;

  const {req} = UseAxios("https://pilllaw.eeerrorcode.com/api");
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
        if (storedMno) {
          const resp = await req('get', `/member/mypage/myinfo/${storedMno}`);
          console.log("로드된 회원 정보:", resp);
          
          if (resp) {
            setMember(resp);
            
            // 모든 필드를 초기화 (memberDto가 있을 경우 memberDto 사용, 없으면 socialDto 사용)
            const memberData = resp.memberDto || {};
            const socialData = resp.socialDto || {};
            const addressData = resp.addressDto || {};
            
            // 이메일 초기화
            setEmail(memberData.email || 'USER' + storedMno || '');
            
            // 이름 초기화 
            setName(memberData.name || 'USER' + storedMno || '');
            
            // 닉네임 초기화
            setNickname(memberData.nickname || socialData.nickname || socialData.socialProvider + '_USER' || '');

            // 전화번호 초기화
            setTel(memberData.tel ? memberData.tel.replace(/-/g, '') : '');

            // 첫 로그인 여부 초기화
            setFirstLogin(true);

            // roles, accounts, status 초기화
            setRoles(memberData.roles || []);
            setAccounts(memberData.accounts || []);
            setStatus(memberData.status || []);
            
            // 주소 정보 초기화
            setAddress({
              addrno: addressData.addrno || '',
              recipient: addressData.recipient || '',
              tel: addressData.tel ? addressData.tel.replace(/-/g, '') : '',
              postalCode: addressData.postalCode || '',
              roadAddress: addressData.roadAddress || '',
              detailAddress: addressData.detailAddress || '',
              defaultAddr: addressData.defaultAddr || false,
              mno: storedMno || ''
            });
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
      postalCode: addressData.zipCode,
      roadAddress: addressData.address
    });
    setHasAddress(true);
  };

  // 주소 관련 필드 변경 핸들러
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'recipient') {
      setRecipientError(!value.trim());
    } else if (name === 'tel') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setRecipientTelError(numericValue.length > 0 && !telRegex.test(numericValue));
      setAddress({
        ...address,
        tel: numericValue
      });
      return;
    }

    setAddress({
      ...address,
      [name]: type === 'checkbox' ? checked : value
    });
    setHasAddress(true);
  };

  // 이메일 변경 핸들러
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value.trim() !== '' && !emailRegex.test(value));
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value.trim() !== '' && !passwordRegex.test(value));
    
    if (confirmPassword.trim() !== '') {
      setPasswordMismatchError(confirmPassword !== value);
    }
  };
  
  // 비밀번호 확인 변경 핸들러
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMismatchError(password !== value);
  };

  // 새 비밀번호 처리
  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordError(value.trim() !== '' && !passwordRegex.test(value));
    
    if (confirmNewPassword.trim() !== '') {
      setNewPasswordMismatchError(confirmNewPassword !== value);
    }
  };

  // 새 비밀번호 확인 처리
  const handleConfirmNewPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmNewPassword(value);
    setNewPasswordMismatchError(newPassword !== value);
  };
  
  // 이름 변경 핸들러
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(value.trim() !== '' && !nameRegex.test(value));
  };
  
  // 닉네임 변경 핸들러
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setNicknameError(value.trim() !== '' && !nicknameRegex.test(value));
  };
  
  // 전화번호 변경 핸들러
  const handleTelChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setTel(value);
    setTelError(value.trim() !== '' && !telRegex.test(value));
  };

  const validateForm = () => {
    let isValid = true;
    
    // 이메일 검증
    if (!emailRegex.test(email)) {
      setEmailError(true);
      isValid = false;
    }
    
    // 비밀번호를 입력한 경우에만 검증
    if (password.trim() !== '') {
      if (!passwordRegex.test(password)) {
        setPasswordError(true);
        isValid = false;
      }
    }
    
    // 이름 검증
    if (!nameRegex.test(name)) {
      setNameError(true);
      isValid = false;
    }
    
    // 닉네임 검증
    if (!nicknameRegex.test(nickname)) {
      setNicknameError(true);
      isValid = false;
    }
    
    // 전화번호 검증
    if (tel.trim() !== '' && !telRegex.test(tel)) {
      setTelError(true);
      isValid = false;
    }
    
    // 주소 관련 검증
    // 하나라도 입력됐다면 모두 입력되어야 함
    const isAnyAddressFieldFilled = 
    address.recipient.trim() !== '' || 
    address.tel.trim() !== '' || 
    address.roadAddress.trim() !== '' ||
    address.detailAddress.trim() !== '';

    // 각 필드별 오류 상태 초기화
    setRecipientError(false);
    setRecipientTelError(false);
    let roadAddressError = false;
    let detailAddressError = false;

    if (isAnyAddressFieldFilled) {
    // 수령인 검증
    if (address.recipient.trim() === '') {
      setRecipientError(true);
      isValid = false;
    }

    // 연락처 검증
    if (address.tel.trim() === '') {
      setRecipientTelError(true);
      isValid = false;
    } else if (!telRegex.test(address.tel)) {
      setRecipientTelError(true);
      isValid = false;
    }

    // 주소 검증
    if (address.roadAddress.trim() === '') {
      roadAddressError = true;
      isValid = false;
    }

    // 상세 주소 검증
    if (address.detailAddress.trim() === '') {
      detailAddressError = true;
      isValid = false;
    }
    }

    setRoadAddressError(roadAddressError);
    setDetailAddressError(detailAddressError);
    
    return isValid;
  };

  const handleOnClickSubmit = async (e) => {
    e.preventDefault();

    if(!!member.memberDto) {
      // 비밀번호 확인이 비어있는지 체크
      if (!confirmPassword || confirmPassword.trim() === '') {
        setPwErr('현재 비밀번호를 입력해야 정보를 수정할 수 있습니다.');
        return;
      }

      // 새 비밀번호를 입력했다면 확인도 필요
      if (newPassword.trim() !== '' && (newPassword !== confirmNewPassword)) {
        setNewPasswordMismatchError(true);
        // setPwErr('새 비밀번호가 일치하지 않습니다.');
        return;
      }

      if (!validateForm()) {
        console.log("정규식 조건 부합 x")
        return;
      }
    }

    try {
      const storedMno = localStorage.getItem("mno");
      
      if (!storedMno) {
        alert('로그인 정보가 없습니다.');
        navigate('/');
        return;
      }

      // 소셜 로그인 또는 일반 로그인에 따라 데이터 구성
      const isSocialLogin = !!member.socialDto;
      
      let updateData = {};
      
      if (isSocialLogin) {
        // 소셜 로그인 사용자의 경우
        updateData = {
          socialDto: {
            providerId: member.socialDto.providerId,
            mno: parseInt(storedMno),
            socialProvider: member.socialDto.socialProvider, 
            nickname
          }
        };
      } else {
        // 일반 로그인 사용자의 경우
        updateData = {
          memberDto: {
            mno: parseInt(storedMno),
            email,
            name,
            nickname,
            tel: tel ? tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : null,
            firstLogin,
            roles,
            accounts,
            status,
          },
          confirmPassword,
          newPassword: newPassword || ''
        };
        
        // // 비밀번호가 입력된 경우에만 추가
        // if (password && password.trim() !== '') {
        //   updateData.memberDto.password = password;
        //   console.log("비밀번호 설정됨:", password);
        // } else {
        //   console.log("비밀번호 설정 안됨: 빈 값이거나 undefined");
        // }
      }
      
      // 주소 정보
      if(hasAddress) {
        updateData.addressDto = {
          addrno: address.addrno,
          recipient: address.recipient,
          tel: address.tel ? address.tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : null,
          postalCode: address.postalCode,
          roadAddress: address.roadAddress,
          detailAddress: address.detailAddress,
          defaultAddr: true,
          mno: storedMno
        };
      }


      console.log("전송될 데이터:", JSON.stringify(updateData, null, 2));
      
      const response = await req('put', `/member/mypage/modify/${storedMno}`, updateData);
      console.log("응답")
      console.log(response);
      
      if (response.ok) {
        // 성공 토스트 메시지 표시
        setToastMsg({
          title: "수정 완료!",
          msg: "정보 수정이 완료되었습니다.",
          state: true,
          nav: "/mypage?tab=myinfo"
        });
        setShowToast(true);
      } else {
        setPwErr(response.msg);
      }
    } catch (error) {
      console.error('회원 정보 수정 실패:', error);
      // 실패 토스트 메시지 표시
      setToastMsg({
        title: "수정 실패",
        msg: "회원 정보 수정에 실패했습니다.",
        state: true,
        nav: ""
      });
      setShowToast(true);
    }
  };

  return (
    <>
      <Row>
        <Col xs="1" />
        <Col xs="4">
          <p className='m-1 fs-14 fw-bold header-font'>이메일</p>
          {!!member.memberDto && <p className='m-1 fs-11 fw-bold text-secondary'>이미 인증된 이메일을 수정할 경우 재인증이 필요할 수 있습니다.</p>}
          <Form.Control
            type="text"
            value={email}
            onChange={handleEmailChange}
            className={`bg-pilllaw-form fs-14 fw-bold ${emailError ? 'border-danger' : ''}`}
            disabled={!!member.socialDto} // 소셜 로그인 시 비활성화
          />
          {emailError && 
            <p className="fs-12 fw-bold text-danger">유효한 이메일을 입력해 주세요.</p>
          }
          <p className='fs-12 text-secondary fw-bold'>
            {!!member.socialDto && 
              '소셜 로그인 사용자는 이메일을 설정할 수 없습니다.'}
          </p>
          
          <p className='m-1 mt-3 fs-14 fw-bold header-font'>비밀번호 {!!member.memberDto && <span className='text-danger fs-11'>&nbsp; * 필수 입력</span>}</p>
          <Form.Control
            type="password"
            className={`bg-pilllaw-form fs-14 fw-bold`}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            disabled={!!member.socialDto} // 소셜 로그인 시 비활성화
          />
          {!!pwErr && member.memberDto && <p className='text-danger fs-12 fw-bold'>{pwErr}</p>}
          
          <p className='m-1 mt-3 fs-14 fw-bold header-font'>새 비밀번호</p>
          <Form.Control
            type="password"
            className={`bg-pilllaw-form fs-14 fw-bold ${passwordError ? 'border-danger' : ''}`}
            value={newPassword}
            onChange={handleNewPasswordChange}
            disabled={!!member.socialDto} // 소셜 로그인 시 비활성화
            placeholder=""
          />
          {passwordError && 
            <p className="fs-12 fw-bold text-danger">비밀번호는 영어 대소문자, 숫자 조합 8자 이상이어야 합니다.</p>
          }

          <p className='m-1 mt-3 fs-14 fw-bold header-font'>새 비밀번호 확인</p>
          <Form.Control
            type="password"
            className={`bg-pilllaw-form fs-14 fw-bold ${newPasswordMismatchError ? 'border-danger' : ''}`}
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            disabled={!!member.socialDto} // 소셜 로그인 시 비활성화
            placeholder=""
          />
          {newPasswordMismatchError && 
            <p className="fs-12 fw-bold text-danger">새 비밀번호가 일치하지 않습니다.</p>
          }

          <p className='fs-12 text-secondary fw-bold'>
            {!!member.socialDto && 
              '소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.'}
          </p>
          
          <p className='m-1 mt-3 fs-14 fw-bold header-font'>이름</p>
          <Form.Control
            type="text"
            className={`bg-pilllaw-form fs-14 fw-bold ${nameError ? 'border-danger' : ''}`}
            value={name}
            onChange={handleNameChange}
            disabled={!!member.socialDto} // 소셜 로그인 시 비활성화
          />
          {nameError && 
            <p className="fs-12 fw-bold text-danger">이름은 2-4글자의 한글만 입력 가능합니다.</p>
          }
          <p className='fs-12 text-secondary fw-bold'>
            {!!member.socialDto && 
              '소셜 로그인 사용자는 이름을 설정할 수 없습니다.'}
          </p>
          
          <p className='m-1 mt-3 fs-14 fw-bold header-font'>닉네임</p>
          <Form.Control
            type="text"
            className={`bg-pilllaw-form fs-14 fw-bold ${nicknameError ? 'border-danger' : ''}`}
            value={nickname}
            onChange={handleNicknameChange}
          />
          {nicknameError && 
            <p className="fs-12 fw-bold text-danger">닉네임은 2-5글자의 한글 혹은 4-10글자의 영문만 입력 가능합니다.</p>
          }
          
          <p className='m-1 mt-3 fs-14 fw-bold header-font'>전화번호</p>
          <Form.Control
            type="tel"
            className={`bg-pilllaw-form fs-14 fw-bold ${telError ? 'border-danger' : ''}`}
            value={tel}
            onChange={handleTelChange}
            maxLength={11}
            disabled={!!member.socialDto} // 소셜 로그인 시 비활성화
          />
          {telError && 
            <p className="fs-12 fw-bold text-danger">올바른 휴대전화 번호를 입력해 주세요.</p>
          }
          <p className='fs-12 text-secondary fw-bold'>
            {!!member.socialDto && 
              '소셜 로그인 사용자는 전화번호를 설정할 수 없습니다.'}
          </p>
        </Col>
        <Col xs="1" />
        <Col xs="5">
          <h5 className='mt-1 mb-2 fw-bold header-font'>기본 배송지</h5>
          {!address.defaultAddr && <p className='fs-12 fw-bold text-secondary'>기본 배송지가 등록되지 않았습니다.</p>}
          <hr className='mt-0' />

          <p className='m-1 fs-14 fw-bold header-font'>수령인</p>
          <Form.Control
            type="text"
            name="recipient"
            value={address.recipient}
            placeholder="수령인 이름을 입력해주세요"
            className={`bg-pilllaw-form fs-14 fw-bold mb-2 ${recipientError ? 'border-danger' : ''}`}
            onChange={handleAddressChange}
          />
          {recipientError && 
            <p className="fs-12 fw-bold text-danger">수령인 이름을 입력해주세요.</p>
          }

          <p className='m-1 fs-14 fw-bold header-font'>수령인 연락처</p>
          <Form.Control
            type="tel"
            name="tel"
            value={address.tel}
            placeholder="수령인 연락처를 입력해주세요"
            className={`bg-pilllaw-form fs-14 fw-bold mb-2 ${recipientTelError ? 'border-danger' : ''}`}
            onChange={handleAddressChange}
            maxLength={11}
          />
          {recipientTelError && 
            <p className="fs-12 fw-bold text-danger">
              {address.tel.trim() === '' ? '수령인 연락처를 입력해주세요.' : '올바른 휴대전화 번호를 입력해 주세요.'}
            </p>
          }

          <p className='m-1 fs-14 fw-bold header-font'>우편번호</p>
          <div className='mb-2'>
            <Form.Control
              type="text"
              value={address.postalCode}
              placeholder="우편번호"
              className={`bg-pilllaw-form fs-14 fw-bold me-2 ${roadAddressError ? 'border-danger' : ''}`}
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
          {roadAddressError && 
            <p className="fs-12 fw-bold text-danger">주소를 검색해주세요.</p>
          }

          <p className='m-1 fs-14 fw-bold header-font'>도로명 주소</p>
          <Form.Control
            type="text"
            value={address.roadAddress}
            placeholder="도로명 주소"
            className={`bg-pilllaw-form fs-14 fw-bold mb-2 ${roadAddressError ? 'border-danger' : ''}`}
            readOnly
          />

          <p className='m-1 fs-14 fw-bold header-font'>상세 주소</p>
          <Form.Control
            type="text"
            name="detailAddress"
            value={address.detailAddress}
            placeholder="상세 주소를 입력해주세요"
            className={`bg-pilllaw-form fs-14 fw-bold mb-2 ${detailAddressError ? 'border-danger' : ''}`}
            onChange={handleAddressChange}
          />
          {detailAddressError && 
            <p className="fs-12 fw-bold text-danger">상세 주소를 입력해주세요.</p>
          }
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

      {showToast && (
        <ToastMsg 
          title={toastMsg.title}
          msg={toastMsg.msg}
          state={toastMsg.state}
          nav={toastMsg.nav}
        />
      )}
    </>
  );
}

export default ModifyInfo;