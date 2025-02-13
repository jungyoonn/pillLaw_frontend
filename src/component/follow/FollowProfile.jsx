import React, { useState } from "react";
import { Container } from "react-bootstrap";

const UserProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="wrap">
      <Container style={{paddingTop: '115.19px'}} >
    <div style={styles.container}>
      {/* 프로필 이미지 */}
      <img
        style={styles.profileImage}
        src="../../resources/followImage/사본 -freepik__adjust__7192.png"
        alt="프로필"
      />

      {/* 프로필 정보 */}
      <div style={styles.infoContainer}>
        <input type="text" value="참돌이" readOnly style={styles.input} />
        <div style={styles.buttonContainer}>
        </div>
          <button className="btn btn-pilllaw"  onClick={openModal}>
            쪽지 보내기
          </button>
      </div>

      {/* 쪽지 보내기 모달 */}
      {isModalOpen && <SendLetter onClose={closeModal} />}
    </div>
</Container>
</div>
  );
};

const SendLetter = ({ onClose }) => {
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

  const [recipientInput, setRecipientInput] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [showToast, setShowToast] = useState(false);

  const filteredRecipients = mutualFollows.filter((user) =>
    user.toLowerCase().includes(recipientInput.toLowerCase())
  );

  const handleRecipientSelect = (user) => {
    setSelectedRecipient(user);
    setRecipientInput(user);
  };

  const handleSend = () => {
    if (!selectedRecipient || messageContent.trim() === "") {
      alert("받는 사람과 쪽지 내용을 모두 입력해주세요.");
      return;
    }
    setShowToast(true);
  };

  const handleToastConfirm = () => {
    setShowToast(false);
    setMessageContent("");
    setSelectedRecipient("");
    setRecipientInput("");
    onClose();
  };

  return (
      <div style={styles.modalOverlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2>쪽지 보내기</h2>

          {/* 받는 사람 입력 */}
          <div style={styles.inputContainer}>
            <label style={styles.label}>받는 사람:</label>
            <input
              type="text"
              style={styles.input}
              placeholder="받는 사람을 검색해주세요"
              value={recipientInput}
              onChange={(e) => {
                setRecipientInput(e.target.value);
                setSelectedRecipient("");
              }}
            />
            {/* 검색 목록 */}
            {recipientInput && !selectedRecipient && (
              <ul style={styles.list}>
                {filteredRecipients.length > 0 ? (
                  filteredRecipients.map((user, index) => (
                    <li key={index} style={styles.listItem} onClick={() => handleRecipientSelect(user)}>
                      {user}
                    </li>
                  ))
                ) : (
                  <li style={styles.listItem}>일치하는 사용자가 없습니다.</li>
                )}
              </ul>
            )}
          </div>

          {/* 쪽지 내용 입력 */}
          <div style={styles.inputContainer}>
            <label style={styles.label}>쪽지 내용:</label>
            <textarea
              style={styles.textarea}
              rows="5"
              placeholder="쪽지 내용을 입력해주세요"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </div>

          {/* 보내기 버튼 */}
          <button  className="btn btn-pilllaw display: flex"  onClick={handleSend}>
            보내기
          </button>

          {/* 쪽지 발송 확인 모달 */}
          {showToast && (
            <div style={styles.toastOverlay}>
              <div style={styles.toast}>
                <p>쪽지가 발송되었습니다.</p>
                <button className="btn btn-pilllaw" display="flex" onClick={handleToastConfirm}>
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

// 스타일 객체
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "8px",
    objectFit: "cover",
    marginRight: "20px",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  viewButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer",
  },
  messageButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#ffa500",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    position: "relative",
  },
  inputContainer: {
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    maxHeight: "100px",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
  listItem: {
    padding: "8px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  sendButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ffa500",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toastOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toast: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
};

export default UserProfile;
