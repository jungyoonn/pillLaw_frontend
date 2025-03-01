import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../resources/css/style.css';
import { Button, Container, Form } from "react-bootstrap";
import UseAxios from "../../../hooks/UseAxios";
import { useParams } from "react-router-dom";

const LetterSelectViewPage = ({ onClose }) => {
  // const letterId = localStorage.getItem("letterId");
  const mno = localStorage.getItem("mno");
  const [letter, setLetter] = useState(null);
  const [senderName, setSenderName] = useState("");
  const { req } = UseAxios();
  const { id } = useParams();
  
  useEffect(() => {
    const fetchLetter = async () => {
      console.log(id);
      if (id) {
        
        try {
          // 백엔드 API 엔드포인트와 일치시킴
          const response = await req('get', `letter/letterselectview/${id}`);
          setLetter(response);
          console.log("받은 쪽지 데이터:", response);
          setSenderName(response.nickName || "알수없음")
          // 보낸 사람 정보 가져오기 (필요한 경우)
          try {
            // const memberResponse = await req('get', `member/${response.nickname}`);
            // setSenderName(response.nickName || "알 수 없음");
          } catch (memberError) {
            console.error("Error fetching sender info:", memberError);
            setSenderName("알 수 없음");
          }
        } catch (error) {
          console.error("Error fetching letter:", error);
        }
      }
    };

    fetchLetter();
  }, [id, req]);
  
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
      onClose(); // 창 닫기
    } catch (error) {
      console.error("Error deleting letter:", error);
      alert("쪽지 삭제 중 오류가 발생했습니다.");
    }
  };
  
  return (
    <Container style={{ paddingTop: '115.19px' }}>
      <div className="wrap">
        <h4 className="text-center mb-3">쪽지 내용</h4>
          <Form.Group className="mb-3">
            <Form.Label>보낸 사람</Form.Label>
            <Form.Control 
              type="text" 
              className="text-bg-light" 
              value={letter?.nickName || senderName || `사용자 ${letter?.senderId || ""}`}
              // value={senderName || ""}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              className="text-bg-light"
              rows={5}
              value={letter?.content || ""}
              disabled
            />
          </Form.Group>
          <hr />

          <div className="text-center mt-4 mb-3">
            <Button 
              variant="pilllaw"
              className="btn btn-pilllow btn-sm me-4"
              onClick={onClose}
            >
              닫기
            </Button>
            <Button 
              variant="pilllaw"
              className="btn btn-secondary btn-sm"
              size="sm"
              onClick={handleDelete}
            >
              삭제
            </Button>
            </div>
        </div>
    </Container>
  );
};

export default LetterSelectViewPage;