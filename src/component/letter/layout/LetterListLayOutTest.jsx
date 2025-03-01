import React, { useState, useRef, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import UseAxios from '../../../hooks/UseAxios';

const LetterSendComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [receiverId, setReceiverId] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");
  const [content, setContent] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [mutualFollows, setMutualFollows] = useState([]);
  const [sentAt, setSentAt] = useState(null);
  const [readAt, setReadAt] = useState(null);
  const dropdownRef = useRef(null);
  const mno = localStorage.getItem('mno');
  const { req } = UseAxios();

  useEffect(() => {
    if (!mno) return;

    const fetchMutualFollows = async () => {
      try {
        // 맞팔 목록 가져오기
        const response = await req('get', `follow/followBack/${mno}`);
        console.log("맞팔 목록:", response);
        
        if (Array.isArray(response)) {
          setMutualFollows(response);
        }
      } catch (error) {
        console.error("맞팔 목록 가져오기 실패:", error);
      }
    };

    fetchMutualFollows();
  }, [mno, req]);

  const handleRecipientSelect = (user) => {
    setReceiverId(user.sender.mno);
    setReceiverNickname(user.sender.nickname);
    setShowDropdown(false);
  };

  const handleSend = async () => {
    if (!receiverId || content.trim() === "") {
      alert("받는 사람과 쪽지 내용을 모두 입력해주세요");
      return;
    }

    try {
      // 쪽지 보내기 API 호출
      const response = await req('post', 'letter/send', {
        senderId: parseInt(mno),
        receiverId: parseInt(receiverId),
        content: content
      });
      
      console.log("쪽지 전송 응답:", response);
      
      // 응답 데이터 설정
      if (response) {
        setSentAt(response.sentAt);
        setReadAt(response.readAt);
      }

      setShowToast(true);
    } catch (error) {
      console.error("쪽지 전송 실패:", error);
      alert("쪽지 전송에 실패했습니다.");
    }
  };

  const formatDateTime = (dateTime) => {
    return dateTime ? new Date(dateTime).toLocaleString() : "확인되지 않음";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReceiverId("");
    setReceiverNickname("");
    setContent("");
  };

  const handleToastConfirm = () => {
    setShowToast(false);
    handleCloseModal();
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <label className="form-label fw-bold">받는 사람: </label>
            <input
              type="text"
              className="form-control"
              placeholder="받는 사람 선택"
              value={receiverNickname}
              readOnly
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="list-group mt-1 custom-scrollbar" 
                style={{ position: "absolute", zIndex: 1050, width: "100%", border:"1px solid", borderRadius:"5px", maxHeight: "200px", overflowY:"auto"}}>
                {mutualFollows.length > 0 ? (
                  mutualFollows.map((follow) => (
                    <button
                      key={follow.sender.mno}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleRecipientSelect(follow)}
                    >
                      {follow.sender.nickname}
                    </button>
                  ))
                ) : (
                  <div className="list-group-item">맞팔 목록이 없습니다</div>
                )}
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
            <p className="mb-3">쪽지가 {receiverNickname}님에게 전송되었습니다.</p>
            {/* <p>보낸 시간: {formatDateTime(sentAt)}</p>
            <p>읽은 시간: {formatDateTime(readAt)}</p> */}
            <button type="button" className="btn btn-pilllaw" onClick={handleToastConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default LetterSendComponent;