import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUserFriends, faCog } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

const ChatRoomListWebsocket = () => {
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: 'Room 1', participants: 3 },
    { id: 2, name: 'Room 2', participants: 5 },
    { id: 3, name: 'Room 3', participants: 2 },
    { id: 4, name: 'Room 4', participants: 7 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // ✅ 스타일 객체 정의
  const modalHeaderStyle = {
    display: "flex",
    justifyContent: "center", // 가로 가운데 정렬
    alignItems: "center", // 세로 가운데 정렬
    fontSize: "24px",
    fontWeight: "bold",
    padding: "15px 0"
  };

  const tableContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // 가로 가운데 정렬
    width: "100%",
    padding: "20px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center"
  };

  const footerButtonContainer = {
    display: "flex",
    justifyContent: "space-around", // 버튼들을 균등하게 배치
    padding: "15px 0",
    borderTop: "1px solid #ddd"
  };

  return (
    <div>
      <div style={{ paddingTop: '115.19px' }}>
        <div className="container mt-5">
          <div className="chat-room-list">
            <button className="add-room-btn" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faCommentDots} />
            </button>

            {/* 모달 */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
              <Modal.Header closeButton>
                
                <div style={modalHeaderStyle}>Chat Rooms</div>
              </Modal.Header>
              <Modal.Body>
                <div style={tableContainerStyle}>
                  <table style={tableStyle}>
                    <thead>
                      <tr >
                        <th>Room Name</th>
                        {/* <th>Participants</th>
                        <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {chatRooms.map((room) => (
                        <tr key={room.id}>
                          <a href='#' className='btn btn-pillaw'>
                          <td>{room.name}</td>
                          </a>
                          {/* <td>{room.participants}</td> */}
                          <td>
                            {/* <button style={{ backgroundColor: "#007bff", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer" }}>
                              Enter
                            </button> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Modal.Body>
              <Modal.Footer style={footerButtonContainer}>
                {/* <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button> */}
                <Button variant="pilllaw" onClick={handleCloseModal}>
                  Create New Room
                </Button>
              </Modal.Footer>
               {/* 하단 버튼 */}
            <div style={footerButtonContainer}>
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
            </Modal>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomListWebsocket;
