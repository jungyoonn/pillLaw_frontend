import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../../../hooks/AuthContext';
import Button from '../../common/Button';
import logo from '../../../resources/image/pilllaw_favicon.png';

const Logout = () => {
  const [showModal, setShowModal] = useState(true);
  const {logout} = useAuth();

  const handleCloseAndRedirect = () => {
    setShowModal(false);
    logout();
    // navigate('/');
  };

  return (
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
      <Modal.Body className='fw-bold text-pilllaw bg-pilllaw-form'>로그아웃 되었습니다.</Modal.Body>
      <Modal.Footer className='bg-pilllaw-form'>
        <Button variant="pilllaw" onClick={handleCloseAndRedirect}>
          메인으로 돌아가기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Logout;
