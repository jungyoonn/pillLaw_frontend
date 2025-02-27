import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import UseAxios from "../../../hooks/UseAxios";
import { Link } from "react-router-dom";

// 보낸 쪽지 목록 컴포넌트
const LetterSenderListTest = () => {
  const { req } = UseAxios();
  const [letter, setLetter] = useState([]);
  const mno = localStorage.getItem('mno');

  useEffect(() => {
    if (!mno) return; // mno가 없으면 실행하지 않음

    const fetchLetter = async () => {
      try {
        const resp = await req('get', `/api/letters/sent/${mno}`);
        if (Array.isArray(resp)) {
          setLetter(resp);
        } else {
          console.error("API 응답이 배열이 아닙니다:", resp);
        }
      } catch (error) {
        console.error("Error fetching sent letter list:", error);
      }
    };
    fetchLetter();
  }, [mno]); // mno가 변경될 때 다시 실행

  return (
    <Container className="mt-3">
      <div className="container main-content"> 
        <div className="letter-item">
          <div className="user-profile">
            <ListGroup variant="flush">
              {letter.map((letter) => (
                <Link
                  key={letter.letterId}
                  to={`/letter/${letter.letterId}`}
                  className="list-group-item"
                >
                  <div>
                    <strong>받는 사람:</strong> {letter.receiverId} <br />
                    <strong>내용:</strong> {letter.content} <br />
                    <strong>보낸 시간:</strong> {new Date(letter.sentAt).toLocaleString()} <br />
                    {letter.readAt && <strong>읽은 시간:</strong>} {letter.readAt ? new Date(letter.readAt).toLocaleString() : "읽지 않음"}
                  </div>
                </Link>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LetterSenderListTest;
