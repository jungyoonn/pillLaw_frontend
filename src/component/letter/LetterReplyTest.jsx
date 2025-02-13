// src/components/ProfilePage.jsx
import React, { useState } from "react";
import { useParams,Container } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//컨테이너 안먹어서 수정예정
const LetterReplyTest = () => {
  const { username } = useParams(); // URL 파라미터에서 username 추출
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <div className="wrap">
    {/* <Container style={{paddingTop: '115.19px'}} > */}
    <div className="row">
     <div className="container mt-5">
      <h2>{username}님의 프로필</h2>
      <div className="card p-4 my-4">
        <div className="d-flex align-items-center mb-3">
          <img
            src="https://via.placeholder.com/80"
            alt="profile"
            className="rounded-circle me-3"
            style={{ width: "80px", height: "80px" }}
          />
          <div>
            <h4>{username}</h4>
            {/* <p className="text-muted">@{username.toLowerCase()}</p> */}
          </div>
        </div>
        <div>
          <h5>쪽지 보내기</h5>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSend}>
              전송
            </button>
          </div>
          {messages.length > 0 && (
            <div className="mt-3">
              <h6>보낸 메시지</h6>
              <ul className="list-group">
                {messages.map((msg, idx) => (
                  <li key={idx} className="list-group-item">
                    {msg}
                  </li>
                ))}
              </ul>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
    {/* </Container> */}
  </div>
  );
};

export default LetterReplyTest;
