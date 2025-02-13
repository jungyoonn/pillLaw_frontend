import React, { useState, useRef, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";

const SendLetterPage = () => {
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태
  const [selectedRecipient, setSelectedRecipient] = useState(""); // 선택된 받는 사람
  const [messageContent, setMessageContent] = useState(""); // 쪽지 내용
  const [showToast, setShowToast] = useState(false); // 전송 완료 모달
  const dropdownRef = useRef(null);

  const mutualFollows = [
    "치킨",
    "피자",
    "딸기모찌",
    "재즈맨",
    "쿠키",
    "초코쿠키",
    "딸기쿠키",
    "파인애플",
  ];

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 받는 사람 선택
  const handleRecipientSelect = (user) => {
    setSelectedRecipient(user);
    setShowDropdown(false); // 선택 후 드롭다운 닫기
  };

  // 쪽지 전송
  const handleSend = () => {
    if (!selectedRecipient || messageContent.trim() === "") {
      alert("받는 사람과 쪽지 내용을 모두 입력해주세요");
      return;
    }
    setShowToast(true); // 전송 완료 모달 표시
  };

  // 모달 닫기 & 입력 초기화
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipient("");
    setMessageContent("");
  };

  // 전송 완료 모달 닫기
  const handleToastConfirm = () => {
    setShowToast(false);
    handleCloseModal(); // 전체 모달 닫기
  };

  return (
    <Container style={{paddingTop: '115.19px'}}>
      <div className="profile-container text-center">
        {/* 프로필 정보 */}
        {/* <img src="../../resources/followImage/사본 -freepik__adjust__7192.png" alt="프로필" className="profile-img" /> */}
        <h3>참돌이</h3>
        <p>ID: CHAM</p>

        {/* 쪽지 보내기 버튼 */}
        <button className="btn btn-pilllaw" onClick={() => setShowModal(true)}>
          쪽지 보내기
        </button>
      </div>

      {/* ✅ 쪽지 보내기 모달 */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>쪽지 보내기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* 받는 사람 드롭다운 */}
          <div className="mb-3" ref={dropdownRef}>
            <label className="form-label fw-bold">받는 사람:</label>
            <input
              type="text"
              className="form-control"
              placeholder="받는 사람 선택"
              value={selectedRecipient}
              readOnly
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {/* 드롭다운 리스트 */}
            {showDropdown && (
              <div className="list-group mt-1" style={{ position: "absolute", zIndex: 1000, width: "100%" }}>
                {mutualFollows.map((user, index) => (
                  <button
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleRecipientSelect(user)}
                  >
                    {user}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 쪽지 내용 입력 */}
          <div className="mb-3">
            <label className="form-label fw-bold">쪽지 내용:</label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="쪽지 내용을 입력해주세요"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>

        {/* 보내기 버튼 */}
        <Modal.Footer>
          <button className="btn btn-pilllaw d-block mx-auto" onClick={handleSend}>
            보내기
          </button>
        </Modal.Footer>
      </Modal>

      {/* ✅ 쪽지 전송 완료 모달 */}
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

export default SendLetterPage;
