import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserFriends, faCog, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Image, Badge, ListGroup } from 'react-bootstrap';

const ChatTestList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 임의로 API 호출 (실제로는 axios를 사용하거나 fetch를 사용할 수 있음)
    const fetchChatRooms = async () => {
      try {
        // (실제로는 API 호출)
        const data = [
          { id: 1, name: '비빔비빔', img: '/images/room1.jpg', message: 'Hello!', time: '10:30 AM', unread: 2 },
          { id: 2, name: '퇴근 시켜줘', img: '/images/room2.jpg', message: '퇴근시켜줘ㅓㅓㅓ', time: '10:15 PM', unread: 0 },
          { id: 3, name: '월급은 내 통장을 스쳐가지', img: '/images/room3.jpg', message: 'How are you(월급 얼마 남음)?', time: '12:45 PM', unread: 5 },
          { id: 4, name: 'ㅎㅇ', img: '/images/room4.jpg', message: 'Good night!', time: '01:20 AM', unread: 1 },
        ];
        setChatRooms(data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []); // 컴포넌트가 마운트될 때 한번만 호출

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
      <div style={{ paddingTop: '115.19px' }}>
      <div className="container mt-5">
      {/* ✅ Chat Rooms 버튼 (모달을 여는 버튼) */}
   
      <button onClick={handleShowModal} className='btn btn-pillaw'> <FontAwesomeIcon icon={faCommentDots} /></button>
             
      {/* ✅ 모달 내부에 채팅 리스트 및 + 버튼 추가 */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          {/* ✅ Chat Rooms 제목 & + 버튼을 한 줄로 정렬 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h2 style={{ margin: 0 }}>채팅</h2>
            <button style={{ background: 'none', border: 'none', width: '100px', fontSize: '24px', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </Modal.Header>

        <Modal.Body>
          {/* ✅ 채팅방 리스트 */}
          <ListGroup>
            {chatRooms.length === 0 ? (
              <p>채팅방이 없습니다.</p>
            ) : (
              chatRooms.map((chat) => (
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
              ))
            )}
          </ListGroup>
        </Modal.Body>

        {/* ✅ 모달 하단 버튼 (Friends, Chat Rooms, Settings) */}
        <Modal.Footer>
          <div style={footerButtonContainer}>
            <button style={footerButtonStyle}>
              <FontAwesomeIcon icon={faUserFriends} />
            </button>
            <button style={footerButtonStyle}>
              <FontAwesomeIcon icon={faCommentDots} />
            </button>
            <button style={footerButtonStyle}>
              <FontAwesomeIcon icon={faCog} />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  </div>
  );
};

export default ChatTestList;
