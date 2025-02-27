import React, { useState, useRef, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import UseAxios from '../../../hooks/UseAxios';

const LetterListLayOutTest = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isFollowBack, setIsFollowBack] = useState([]);
  const [sentAt, setSentAt] = useState(null);
  const [readAt, setReadAt] = useState(null);
  const dropdownRef = useRef(null);
  const mno = localStorage.getItem('mno');
  const { req } = UseAxios('');

  useEffect(() => {
    const mno = localStorage.getItem("senderFollowId");
    if (!mno) return;

    const fetchIsBackFollows = async () => {
      try {
        const response = await req('get', `/api/follow/${mno}/${mno}`);
        if (response.data) {
          setIsFollowBack(response.data);
        }
      } catch (error) {
        console.error("상호 팔로우 목록 가져오기 실패:", error);
      }
    };

    fetchIsBackFollows();
  }, []);

  const handleRecipientSelect = (mno) => {
    setReceiverId(mno);
    setShowDropdown(false);
  };

  const handleSend = async () => {
    if (!receiverId || content.trim() === "") {
      alert("받는 사람과 쪽지 내용을 모두 입력해주세요");
      return;
    }

    try {
      const senderId = localStorage.getItem("senderFollowId");
      if (!senderId) return;

      const response = await req ('post', '/api/letter/send', {
        senderId: senderId,
        receiverId: receiverId,
        content: content
      });
      if (response.data) {
        setSentAt(response.data.sentAt);
        setReadAt(response.data.readAt);
      }

      setShowToast(true);
    } catch (error) {
      console.error("쪽지 전송 실패:", error);
    }
  };
  const formatDateTime = (dateTime) => {
    return dateTime ? new Date(dateTime).toLocaleString() : "확인되지 않음";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReceiverId("");
    setContent("");
  };

  const handleToastConfirm = () => {
    setShowToast(false);
    handleCloseModal();
  };

  return (
    <Container style={{paddingTop: '115.19px'}}>
      <div className="profile-container text-center">
        <h3>쪽지 보내기</h3>
        <button className="btn btn-pilllaw" onClick={() => setShowModal(true)}>
          쪽지 보내기
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>쪽지 보내기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 position-relative" ref={dropdownRef}>
            <label className="form-label fw-bold">받는 사람:{receiverId} </label>
            <input
              type="text"
              className="form-control"
              placeholder="받는 사람 선택"
              value={receiverId}
              readOnly
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="list-group mt-1 custom-scrollbar" 
                style={{ position: "absolute", zIndex: 1050, width: "100%", border:"1px solid", borderRadius:"5px", maxHeight: "200px", overflowY:"auto"}}>
                {isFollowBack.map((user, index) => (
                  <button
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleRecipientSelect(user.nickname)}
                  >
                    {user.nickname}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">쪽지 내용:</label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="쪽지 내용을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-pilllaw d-block mx-auto" onClick={handleSend}>
            보내기
          </button>
        </Modal.Footer>
      </Modal>

      {showToast && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="bg-white p-4 rounded shadow" style={{ minWidth: "300px", textAlign: "center" }}>
            <p className="mb-3">쪽지가 {receiverId}님에게 전송되었습니다.</p>
            <p>보낸 시간: {formatDateTime(sentAt)}</p>
            <p>읽은 시간: {formatDateTime(readAt)}</p>
            <button type="button" className="btn btn-pilllaw" onClick={handleToastConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default LetterListLayOutTest;
