import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Modal } from 'react-bootstrap';
import Button from '../common/Button';

/**
 * 카카오 주소 검색 API 컴포넌트
 * @param {Object} props
 * @param {boolean} props.show - 모달 표시 여부
 * @param {Function} props.onClose - 모달 닫기 함수
 * @param {Function} props.onComplete - 주소 선택 완료 시 호출될 함수
 */
const AddressApi = ({ show, onClose, onComplete }) => {
  // 주소 선택 완료 핸들러
  const handleComplete = (data) => {
    // 주소 데이터 형식화
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    // 우편번호와 주소 정보를 상위 컴포넌트로 전달
    onComplete({
      zipCode: data.zonecode,
      address: fullAddress,
      addressDetail: '',
    });

    // 모달 닫기
    onClose();
  };

  const postCodeStyle = {
    width: '100%',
    height: '400px',
    padding: '0',
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="md"
    >
      <Modal.Header className='bg-pilllaw-form'>
        <Modal.Title className='fw-bold header-font'>주소 검색</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-0'>
        <DaumPostcode
          style={postCodeStyle}
          onComplete={handleComplete}
          autoClose={false}
        />
      </Modal.Body>
      <Modal.Footer className='bg-pilllaw-form'>
        <Button variant="secondary" className="btn btn-secondary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressApi;