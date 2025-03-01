import React, { useState, useRef, useEffect } from "react";
import { Container, Modal, Card, Row, Col, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUserFriends, faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
    <Container style={{paddingTop: '115.19px'}} className="pb-5">
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center py-5">
              <FontAwesomeIcon icon={faEnvelope} className="text-pilllaw fa-3x mb-3" />
              <h3 className="fw-bold text-pilllaw mb-4">쪽지 보내기</h3>
              <p className="text-muted mb-4">맞팔로우한 친구들에게 쪽지를 보내보세요!</p>
              <button className="btn btn-pilllaw btn-lg px-4 py-2" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                새 쪽지 작성하기
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {mutualFollows.length > 0 && (
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faUserFriends} className="text-pilllaw me-2" />
                  맞팔로우 중인 친구들 <Badge bg="secondary">{mutualFollows.length}</Badge>
                </h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  {mutualFollows.map((follow) => (
                    <Col key={follow.sender.mno} xs={12} md={6} lg={4}>
                      <Card className="h-100 border shadow-sm" style={{ cursor: 'pointer' }} 
                        onClick={() => {
                          setReceiverId(follow.sender.mno);
                          setReceiverNickname(follow.sender.nickname);
                          setShowModal(true);
                        }}>
                        <Card.Body className="d-flex align-items-center">
                          <div className="rounded-circle bg-light text-pilllaw p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                            {follow.sender.nickname.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h6 className="mb-1">{follow.sender.nickname}</h6>
                            <small className="text-muted">클릭하여 쪽지 보내기</small>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-pilllaw">쪽지 작성하기</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <div className="mb-4 position-relative" ref={dropdownRef}>
            <label className="form-label fw-bold">받는 사람</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FontAwesomeIcon icon={faUserFriends} className="text-pilllaw" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="받는 사람 선택"
                value={receiverNickname}
                readOnly
                onClick={() => setShowDropdown(!showDropdown)}
              />
            </div>
            {showDropdown && (
              <div className="list-group mt-1 custom-scrollbar shadow-sm" 
                style={{ position: "absolute", zIndex: 1050, width: "100%", border:"1px solid #dee2e6", borderRadius:"5px", maxHeight: "200px", overflowY:"auto"}}>
                {mutualFollows.length > 0 ? (
                  mutualFollows.map((follow) => (
                    <button
                      key={follow.sender.mno}
                      className="list-group-item list-group-item-action border-0 d-flex align-items-center"
                      onClick={() => handleRecipientSelect(follow)}
                    >
                      <div className="rounded-circle bg-light text-pilllaw p-2 me-2 d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                        {follow.sender.nickname.charAt(0).toUpperCase()}
                      </div>
                      {follow.sender.nickname}
                    </button>
                  ))
                ) : (
                  <div className="list-group-item text-center py-3">맞팔 목록이 없습니다</div>
                )}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">쪽지 내용</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="전하고 싶은 메시지를 입력해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <button className="btn btn-secondary me-2" onClick={handleCloseModal}>
            취소
          </button>
          <button className="btn btn-pilllaw px-4" onClick={handleSend}>
            <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
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
          <div className="bg-white p-4 rounded shadow-lg" style={{ minWidth: "350px", textAlign: "center" }}>
            <div className="rounded-circle bg-success mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
              <FontAwesomeIcon icon={faPaperPlane} className="text-white fa-2x" />
            </div>
            <h5 className="mb-3">쪽지 전송 완료</h5>
            <p className="mb-4">쪽지가 <strong>{receiverNickname}</strong>님에게 전송되었습니다.</p>
            <button type="button" className="btn btn-pilllaw w-100" onClick={handleToastConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default LetterSendComponent;