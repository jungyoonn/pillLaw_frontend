import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserFriends, faCog, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Image, Badge, ListGroup } from 'react-bootstrap';

const ChatListTest = () => {
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: 'Room 1', img: '/images/room1.jpg', message: 'Hello!', time: '10:30 AM', unread: 2 },
    { id: 2, name: 'Room 2', img: '/images/room2.jpg', message: 'See you later', time: '11:15 AM', unread: 0 },
    { id: 3, name: 'Room 3', img: '/images/room3.jpg', message: 'How are you?', time: '12:45 PM', unread: 5 },
    { id: 4, name: 'Room 4', img: '/images/room4.jpg', message: 'Good night!', time: '01:20 AM', unread: 1 },
  ]);
  
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
  
    // ✅ 하단 버튼 스타일
    const footerButtonContainer = {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      padding: '10px 0',
    };
  
    const footerButtonStyle = {
      background: 'none',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px', // 아이콘과 텍스트 간격
    };
  
    return (
      <div>
        {/* ✅ 기존의 모달을 여는 버튼 (메인 화면에서는 안 보이게) */}
        <button onClick={handleShowModal} style={{ display: 'none' }}>Open Chat Rooms</button>
  
        {/* ✅ 모달 내부에 채팅 리스트 및 + 버튼 추가 */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            {/* ✅ Chat Rooms 제목 & + 버튼을 한 줄로 정렬 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <h2 style={{ margin: 0 }}>Chat Rooms</h2>
              <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </Modal.Header>
  
          <Modal.Body>
            {/* ✅ 한 줄씩 리스트 형태 유지 */}
            <ListGroup>
              {chatRooms.map((chat) => (
                <ListGroup.Item key={chat.id} className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                  {/* 채팅방 프로필 이미지 */}
                  <Image src={chat.img} roundedCircle width={50} height={50} className="me-3" />
                  
                  {/* 채팅방 정보 */}
                  <div className="flex-grow-1">
                    <strong>{chat.name}</strong>
                    <p className="mb-0 text-muted">{chat.message}</p>
                  </div>
  
                  {/* 오른쪽 정보 (시간, 읽지 않은 메시지) */}
                  <div className="text-end">
                    <small className="text-muted d-block">{chat.time}</small>
                    {chat.unread > 0 && <Badge bg="danger">{chat.unread}+</Badge>}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
  
          {/* ✅ 모달 하단 버튼 (Friends, Chat Rooms, Settings) */}
          <Modal.Footer>
            <div style={footerButtonContainer}>
              <button style={footerButtonStyle}>
                <FontAwesomeIcon icon={faUserFriends} /> Friends
              </button>
              <button style={footerButtonStyle}>
                <FontAwesomeIcon icon={faCommentDots} /> Chat Rooms
              </button>
              <button style={footerButtonStyle}>
                <FontAwesomeIcon icon={faCog} /> Settings
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

export default ChatListTest;
