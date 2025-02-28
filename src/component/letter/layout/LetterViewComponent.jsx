import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import UseAxios from "../../../hooks/UseAxios";

const LetterViewComponent = () => {
  const { req } = UseAxios();
  const { letterId } = useParams();
  const navigate = useNavigate();
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mno = localStorage.getItem('mno');

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        setLoading(true);
        const resp = await req('get', `letter/${letterId}`);
        setLetter(resp);
      } catch (error) {
        console.error("쪽지 상세 정보 가져오기 오류:", error);
        setError("쪽지를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (letterId) {
      fetchLetter();
    }
  }, [req, letterId]);

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

  // 삭제 처리
  const handleDelete = async () => {
    try {
      // 받은 쪽지인지 보낸 쪽지인지 확인
      const isSentByMe = letter.senderId === parseInt(mno);
      const endpoint = isSentByMe 
        ? `letter/delete/sender/${letterId}`
        : `letter/delete/receiver/${letterId}`;

      await req('put', endpoint);
      alert("쪽지가 삭제되었습니다.");
      navigate("/letter?tab=" + (isSentByMe ? "sent" : "received"));
    } catch (error) {
      console.error("쪽지 삭제 오류:", error);
      alert("쪽지 삭제에 실패했습니다.");
    }
  };

  // 답장 작성 화면으로 이동
  const handleReply = () => {
    // 받은 쪽지일 경우만 답장 가능
    if (letter.receiverId === parseInt(mno)) {
      navigate(`/letter/compose?to=${letter.senderId}`);
    }
  };

  // 목록으로 돌아가기
  const handleGoBack = () => {
    const isSentByMe = letter.senderId === parseInt(mno);
    navigate("/letter?tab=" + (isSentByMe ? "sent" : "received"));
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>쪽지를 불러오는 중...</p>
      </Container>
    );
  }

  if (error || !letter) {
    return (
      <Container className="mt-5 text-center">
        <p className="text-danger">{error || "쪽지를 찾을 수 없습니다."}</p>
        <Button variant="secondary" onClick={() => navigate("/letter")}>
          쪽지함으로 돌아가기
        </Button>
      </Container>
    );
  }

  const isSentByMe = letter.senderId === parseInt(mno);

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">쪽지 상세 보기</h5>
          <Button variant="secondary" size="sm" onClick={handleGoBack}>
            목록으로
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <strong>{isSentByMe ? "받는 사람" : "보낸 사람"}:</strong> {isSentByMe ? letter.receiverId : letter.senderId}
          </div>
          
          <div className="mb-3">
            <strong>보낸 시간:</strong> {formatDate(letter.sentAt)}
          </div>
          
          {letter.readAt && (
            <div className="mb-3">
              <strong>읽은 시간:</strong> {formatDate(letter.readAt)}
            </div>
          )}
          
          <hr />
          
          <div className="letter-content p-3 bg-light rounded">
            {letter.content}
          </div>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          {!isSentByMe && (
            <Button variant="primary" className="me-2" onClick={handleReply}>
              답장
            </Button>
          )}
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LetterViewComponent;