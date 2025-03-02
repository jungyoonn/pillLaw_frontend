import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../resources/css/style.css';
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import UseAxios from "../../../hooks/UseAxios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTrash, faTimes, faCalendarAlt, faPaperPlane, faInbox } from "@fortawesome/free-solid-svg-icons";

const LetterSelectViewPage = ({ onClose }) => {
  const mno = localStorage.getItem("mno");
  const [letter, setLetter] = useState(null);
  const [senderNickname, setSenderNickname] = useState("로딩 중...");
  const [receiverNickname, setReceiverNickname] = useState("로딩 중...");
  const { req } = UseAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  
  // mno를 의존성 배열에서 제거하고 내부에서 직접 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      // 함수 내에서 mno 직접 가져오기
      const currentMno = localStorage.getItem("mno");
      
      try {
        // 쪽지 정보 가져오기
        const letterResponse = await req('get', `letter/letterselectview/${id}`);
        setLetter(letterResponse);
        console.log("쪽지 데이터:", letterResponse);
        
        // 발신자 닉네임 설정
        if (letterResponse.nickName) {
          setSenderNickname(letterResponse.nickName);
        } else {
          setSenderNickname(`사용자 ${letterResponse.senderId}`);
        }
        
        // 수신자 ID로 별도 API 호출하지 않고 ID 표시
        setReceiverNickname(`사용자 ${letterResponse.receiverId}`);
        
        // 다른 방법으로 시도: 사용자 정보 API가 다른 경로일 수 있음
        try {
          if (letterResponse.receiverId) {
            const memberResp = await req('get', `member/userpage/${letterResponse.receiverId}/${currentMno}`);
            if (memberResp && memberResp.nickname) {
              setReceiverNickname(memberResp.nickname);
            }
          }
        } catch (memberError) {
          console.log("수신자 추가 정보 조회 실패 - 무시됨");
        }
      } catch (error) {
        console.error("Error fetching letter:", error);
      }
    };

    fetchData();
  }, [id, req]); // mno 제거
  
  // 쪽지 삭제 함수
  const handleDelete = async () => {
    if (!letter) return;
    
    try {
      // 현재 로그인한 사용자가 발신자인지 수신자인지 확인
      if (letter.senderId.toString() === mno) {
        // 발신자가 삭제
        await req('put', `letter/delete/sender/${id}`);
      } else {
        // 수신자가 삭제
        await req('put', `letter/delete/receiver/${id}`);
      }
      alert("쪽지가 삭제되었습니다.");
      
      // onClose가 있으면 호출, 없으면 뒤로 가기
      if (typeof onClose === 'function') {
        onClose();
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error deleting letter:", error);
      alert("쪽지 삭제 중 오류가 발생했습니다.");
    }
  };

  // 날짜 형식 변환 함수
  const formatDate = (dateString) => {
    if (!dateString) return "없음";
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // 닫기 함수
  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      navigate(-1);
    }
  };
  
  // 닉네임의 첫 글자를 가져오는 함수 (안전하게 처리)
  const getInitial = (nickname) => {
    if (!nickname) return "?";
    const firstChar = nickname.charAt(0).toUpperCase();
    return firstChar || "?";
  };
  
  return (
    <Container style={{ paddingTop: '115.19px' }} className="pb-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 pt-4 pb-0">
              <div className="d-flex justify-content-center mb-3">
                <div className="rounded-circle bg-pilllaw d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                  <FontAwesomeIcon icon={faEnvelope} className="text-white fa-2x" />
                </div>
              </div>
              <h4 className="text-center text-pilllaw">쪽지 내용</h4>
            </Card.Header>
            
            <Card.Body className="p-4">
              {/* 보낸 사람 정보 */}
              <div className="mb-4">
                <label className="form-label fw-bold d-flex align-items-center mb-2">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-pilllaw me-2" />
                  보낸 사람
                </label>
                <div className="input-group align-items-center border rounded bg-white ps-3">
                  <div className="rounded-circle bg-light text-pilllaw p-2 me-2 d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                    {getInitial(senderNickname)}
                  </div>
                  <span className="py-2">{senderNickname}</span>
                </div>
              </div>

              {/* 받는 사람 정보 */}
              <div className="mb-4">
                <label className="form-label fw-bold d-flex align-items-center mb-2">
                  <FontAwesomeIcon icon={faInbox} className="text-pilllaw me-2" />
                  받는 사람
                </label>
                <div className="input-group align-items-center border rounded bg-white ps-3">
                  <div className="rounded-circle bg-light text-pilllaw p-2 me-2 d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                    {getInitial(receiverNickname)}
                  </div>
                  <span className="py-2">{receiverNickname}</span>
                </div>
              </div>

              {/* 시간 정보 */}
              <div className="mb-4">
                <label className="form-label fw-bold d-flex align-items-center mb-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-pilllaw me-2" />
                  보낸 시간
                </label>
                <div className="input-group align-items-center border rounded bg-white ps-3 py-2">
                  {letter?.sentAt ? formatDate(letter.sentAt) : "기록 없음"}
                </div>
              </div>

              {/* 쪽지 내용 */}
              <div className="mb-4">
                <label className="form-label fw-bold">쪽지 내용</label>
                <div className="form-control bg-white p-3" style={{ minHeight: '150px', whiteSpace: 'pre-wrap' }}>
                  {letter?.content || ""}
                </div>
              </div>

              {/* 읽은 시간 표시 */}
              {letter?.readAt && (
                <div className="text-end text-muted mb-3">
                  <small>읽은 시간: {formatDate(letter.readAt)}</small>
                </div>
              )}
            </Card.Body>
            
            <Card.Footer className="bg-white border-0 pb-4 text-center">
              <Button 
                variant="secondary"
                className="btn-sm px-4 me-3"
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faTimes} className="me-2" />
                닫기
              </Button>
              <Button 
                variant="pilllaw"
                className="btn-sm px-4"
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faTrash} className="me-2" />
                삭제
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LetterSelectViewPage;