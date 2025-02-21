import React, { useEffect, useState } from "react";
import UseAxios from '../../hooks/UseAxios';

// const ChatList = () => {
//   const [nickname, getNicname] = useState();
//   const [creatorId, getCreatorId] = useState();
  
//   useEffect = (() => {
//     // const mno = Local 

//   })

// }

// export default ChatList;

// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const follows = [
    { id: 1, href: "SendLetterPage", label: "치킨" },
    { id: 2, href: "#", label: "피자" },
    { id: 3, href: "#", label: "딸기모찌" },
    { id: 4, href: "#", label: "재즈맨" },
    { id: 5, href: "#", label: "쿠키" },
    { id: 6, href: "#", label: "초코쿠키" },
    { id: 7, href: "#", label: "딸기쿠키" },
    { id: 8, href: "#", label: "파인애플" },
  ];
  // 채팅방 목록을 API로 받아오는 함수
  const fetchChatRooms = async () => {
    try {
      const response = await fetch('/api/chat-rooms');  // 채팅방 리스트를 가져오는 API
      const data = await response.json();
      setChatRooms(data);  // 데이터 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch chat rooms", error);
    }
  };

  useEffect(() => {
    fetchChatRooms();  // 컴포넌트가 마운트될 때 채팅방 목록을 가져옴
  }, []);

  return (
    <div>
      <h2>채팅방 목록</h2>
      <ul>
        {chatRooms.map(room => (
          <li key={room.chat_room_id}>
            {/* 각 채팅방을 클릭하면 해당 채팅방 상세 페이지로 이동 */}
            <Link to={`/chat-room/${room.chat_room_id}`}>
              <div className="chat-room">
                <div className="chat-room-info">
                  <h3>{room.creator_id}</h3> {/* 생성자 ID (이름으로 변경 가능) */}
                  <p>{room.last_msg_content}</p> {/* 마지막 메시지 내용 */}
                </div>
                <div className="chat-room-time">
                  <p>{new Date(room.last_message).toLocaleTimeString()}</p> {/* 마지막 메시지 시간 */}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
