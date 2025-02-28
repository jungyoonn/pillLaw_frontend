import { useEffect, useState } from "react";
import { Container, ListGroup, Badge } from "react-bootstrap";
import UseAxios from "../../../hooks/UseAxios";
import { Link } from "react-router-dom";
import LetterHeader from "./LetterHeader";

// 받은 쪽지 목록 컴포넌트
const LetterReceivedListTest = () => {
  const { req } = UseAxios();
  const [letters, setLetters] = useState([]);
  const mno = localStorage.getItem('mno');

  useEffect(() => {
    if (!mno) return; // mno가 없으면 실행하지 않음

    const fetchLetters = async () => {
      try {
        const resp = await req('get', `/api/letter/received/${mno}`);
        if (Array.isArray(resp)) {
          // 삭제되지 않은 쪽지만 표시
          const filteredLetters = resp.filter(letter => !letter.deletedByReceiver);
          setLetters(filteredLetters);
        } else {
          console.error("받은 쪽지 API 응답이 배열이 아닙니다:", resp);
          setLetters([]);
        }
      } catch (error) {
        console.error("받은 쪽지 데이터 가져오기 오류:", error);
        setLetters([]);
      }
    };
    
    fetchLetters();
  }, [mno, req]);

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

  // 쪽지 삭제 함수
  const handleDeleteLetter = async (letterId) => {
    try {
      await req('put', `/api/letter/delete/receiver/${letterId}`);
      
      // 삭제 후 목록 갱신
      setLetters(prev => prev.filter(letter => letter.letterId !== letterId));
    } catch (error) {
      console.error("쪽지 삭제 오류:", error);
      alert("쪽지 삭제에 실패했습니다.");
    }
  };

  return (
    <Container className="mt-3">
      <LetterHeader />
      <h4 className="mb-4 text-center p-5" >받은 쪽지함</h4>
      
      <div className="letter-list">
        <ListGroup>
          {letters.length > 0 ? (
            letters.map((letter) => (
              <ListGroup.Item 
                key={`received-${letter.letterId}`}
                className={`d-flex justify-content-between align-items-start ${!letter.readAt ? 'bg-light' : ''}`}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    보낸 사람: {letter.senderId}
                    {!letter.readAt && <Badge bg="info" className="ms-2">New</Badge>}
                  </div>
                  <p className="mb-1 text-truncate" style={{ maxWidth: '500px' }}>
                    {letter.content}
                  </p>
                  <small className="text-muted">
                    보낸 시간: {formatDate(letter.sentAt)}
                  </small>
                  <br />
                  <small className="text-muted">
                    읽은 시간: {letter.readAt ? formatDate(letter.readAt) : "읽지 않음"}
                  </small>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <Link 
                    to={`/letter/view/${letter.letterId}`} 
                    className="btn btn-sm btn-outline-primary mb-2"
                  >
                    보기
                  </Link>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteLetter(letter.letterId)}
                  >
                    삭제
                  </button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <div className="text-center p-5">
              <p>받은 쪽지가 없습니다.</p>
            </div>
          )}
        </ListGroup>
      </div>
    </Container>
  );
};

export default LetterReceivedListTest;