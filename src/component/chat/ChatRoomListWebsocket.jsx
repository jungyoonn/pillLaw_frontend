import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUserFriends, faCog } from '@fortawesome/free-solid-svg-icons';

const ChatRoomListWebsocket = () => {
  return (
    <div>
      <div style={{ paddingTop: '115.19px' }}>
        <div className="container mt-5">
          <div className="chat-room-list">
            <div className="chat-header">
              <h2>Chat Rooms</h2>
              <button className="add-room-btn">
                <FontAwesomeIcon icon={faCommentDots} />
              </button>
            </div>
            <div className="chat-rooms">
              {/* 채팅방 목록을 여기에 추가 */}
            </div>
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
