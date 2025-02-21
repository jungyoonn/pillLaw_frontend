import React, { useState, useRef, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import UseAxios from '../../../hooks/UseAxios';

const SenderLetterPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [sendLetterContent, setSendLetterContent] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [mutualFollows, setMutualFollows] = useState([]);
  const dropdownRef = useRef(null);
  const { req } = UseAxios('');

  useEffect(() => {
    const mno = localStorage.getItem("senderFollowId");
    if (!mno) return;

    const fetchMutualFollows = async () => {
      try {
        const response = await req('get', `/api/follow/mutual/${mno}`);
        if (response.data) {
          setMutualFollows(response.data);
        }
      } catch (error) {
        console.error("상호 팔로우 목록 가져오기 실패:", error);
      }
    };

    fetchMutualFollows();
  }, []);

  const handleRecipientSelect = (user) => {
    setSelectedRecipient(user);
    setShowDropdown(false);
  };

  const handleSend = async () => {
    if (!selectedRecipient || sendLetterContent.trim() === "") {
      alert("받는 사람과 쪽지 내용을 모두 입력해주세요");
      return;
    }

    try {
      const mno = localStorage.getItem("senderFollowId");
      if (!mno) return;

      await req('post', '/api/letter/send', {
        senderId: mno,
        recipientNickname: selectedRecipient,
        content: sendLetterContent
      });

      setShowToast(true);
    } catch (error) {
      console.error("쪽지 전송 실패:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipient("");
    setSendLetterContent("");
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
            <label className="form-label fw-bold">받는 사람:</label>
            <input
              type="text"
              className="form-control"
              placeholder="받는 사람 선택"
              value={selectedRecipient}
              readOnly
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="list-group mt-1 custom-scrollbar" 
                style={{ position: "absolute", zIndex: 1050, width: "100%", border:"1px solid", borderRadius:"5px", maxHeight: "200px", overflowY:"auto"}}>
                {mutualFollows.map((user, index) => (
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
              value={sendLetterContent}
              onChange={(e) => setSendLetterContent(e.target.value)}
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
            <p className="mb-3">쪽지가 {selectedRecipient}님에게 전송되었습니다.</p>
            <button type="button" className="btn btn-pilllaw" onClick={handleToastConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SenderLetterPage;
