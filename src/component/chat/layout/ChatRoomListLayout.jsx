import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUserFriends, faCog } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap'; // React Bootstrap 모달 사용

const ChatRoomListWebsocket = () => {
  // 채팅방 데이터 예시
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: 'Room 1', participants: 3 },
    { id: 2, name: 'Room 2', participants: 5 },
    { id: 3, name: 'Room 3', participants: 2 },
    { id: 4, name: 'Room 4', participants: 7 },
  ]);

  // 모달 상태 관리
  const [showModal, setShowModal] = useState(false);

  // 모달 열기/닫기 함수
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <div style={{ paddingTop: '115.19px' }}>
        <div className="container mt-5">
          <div className="chat-room-list">
            <div className="chat-header">
              <h2>Chat Rooms</h2>
              {/* 채팅방 아이콘 클릭 시 모달 열기 */}
              <button className="add-room-btn" onClick={handleShowModal}>
                <FontAwesomeIcon icon={faCommentDots} />
              </button>
            </div>
            
            {/* 모달 시작 */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Chat Rooms</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* 채팅방 리스트 테이블 */}
                <table className="table">
                  <thead>
                    <tr>
                      <th>Room Name</th>
                      <th>Participants</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chatRooms.map((room) => (
                      <tr key={room.id}>
                        <td>{room.name}</td>
                        <td>{room.participants}</td>
                        <td>
                          <button>Enter</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCloseModal}>
                  Create New Room
                </Button>
              </Modal.Footer>
            </Modal>
            {/* 모달 끝 */}
            
            <div className="footer-buttons">
              <button>
                <FontAwesomeIcon icon={faUserFriends} /> Friends
              </button>
              <button>
                <FontAwesomeIcon icon={faCommentDots} /> Chat Rooms
              </button>
              <button>
                <FontAwesomeIcon icon={faCog} /> Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomListWebsocket;
