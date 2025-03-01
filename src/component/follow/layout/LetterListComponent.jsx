// LetterListComponent.jsx 수정
import React, { useEffect, useState } from "react";
import { Container, ListGroup, Nav, Badge, Button } from "react-bootstrap";
import UseAxios from "../../../hooks/UseAxios";
import { Link, useSearchParams } from "react-router-dom";
import profile from '../../../resources/image/user-image.png'; // 프로필 이미지 경로 확인

const LetterListComponent = () => {
  const { req } = UseAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const [receivedLetters, setReceivedLetters] = useState([]);
  const [sendLetters, setSendLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const mno = localStorage.getItem('mno');
  
  // 기본 탭은 'received'로 설정
  const tabType = searchParams.get("type") || "received";

  // 현재 마이페이지 탭 유지
  const currentTab = searchParams.get("tab") || "letterlistcomponent";
  
  // 탭 변경 핸들러
  const handleTabChange = (type) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", type);
    // 쿼리 파라미터 업데이트
    setSearchParams(newParams);

    setSelectedLetters([]); // 탭 변경 시 선택 초기화
  };

  // 데이터 로드
  useEffect(() => {
    if (!mno) return;

    const fetchData = async () => {
      try {
        // 현재 탭에 따라 필요한 데이터만 로드
        if (tabType === "received") {
          const resp = await req('get', `letter/received/${mno}`);
          console.log(resp);
          
          if (Array.isArray(resp)) {
            setReceivedLetters(resp);
          } else {
            console.error("받은 쪽지 API 응답이 배열이 아닙니다:", resp);
            setReceivedLetters([]);
          }
        } else if (tabType === "send") {
          const resp = await req('get', `letter/send/${mno}`);
          if (Array.isArray(resp)) {
            setSendLetters(resp);
          } else {
            console.error("보낸 쪽지 API 응답이 배열이 아닙니다:", resp);
            setSendLetters([]);
          }
        }
      } catch (error) {
        console.error("쪽지 데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [mno, req, tabType]);

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

  // 쪽지 선택 처리
  const handleSelectLetter = (letterId) => {
    setSelectedLetters(prev => {
      if (prev.includes(letterId)) {
        return prev.filter(id => id !== letterId);
      } else {
        return [...prev, letterId];
      }
    });
  };

  // 단일 쪽지 삭제
  const handleDeleteLetter = async (letterId) => {
    try {
      const endpoint = tabType === "send" 
        ? `letter/delete/sender/${letterId}`
        : `letter/delete/receiver/${letterId}`;
      
      await req('put', endpoint);
      
      // 삭제 후 목록에서 제거
      if (tabType === "send") {
        setSendLetters(prev => prev.filter(letter => letter.letterId !== letterId));
      } else {
        setReceivedLetters(prev => prev.filter(letter => letter.letterId !== letterId));
      }
    } catch (error) {
      console.error("쪽지 삭제 오류:", error);
      alert("쪽지 삭제에 실패했습니다.");
    }
  };

  // 선택된 쪽지 일괄 삭제
  const handleDeleteSelected = async () => {
    if (selectedLetters.length === 0) {
      alert("삭제할 쪽지를 선택해주세요.");
      return;
    }

    

    try {
      // 각 선택된 쪽지에 대해 삭제 요청
      const deletePromises = selectedLetters.map(letterId => {
        const endpoint = tabType === "send" 
          ? `letter/delete/sender/${letterId}`
          : `letter/delete/receiver/${letterId}`;
        return req('put', endpoint);
      });

      await Promise.all(deletePromises);
      
      // 삭제 후 목록에서 제거
      if (tabType === "send") {
        setSendLetters(prev => prev.filter(letter => !selectedLetters.includes(letter.letterId)));
      } else {
        setReceivedLetters(prev => prev.filter(letter => !selectedLetters.includes(letter.letterId)));
      }
      
      // 선택 초기화
      setSelectedLetters([]);
      
      alert("선택한 쪽지가 삭제되었습니다.");
    } catch (error) {
      console.error("쪽지 일괄 삭제 오류:", error);
      alert("쪽지 삭제에 실패했습니다.");
    }
  };

  // 읽지 않은 쪽지 개수
  const unreadCount = receivedLetters.filter(letter => !letter.readAt).length;

  return (
    <div className="wrap">
      <Container style={{ paddingTop: '115.19px' }}>
        <Nav fill variant="tabs" defaultActiveKey={tabType}>
          <Nav.Item>
            <Nav.Link 
              onClick={() => handleTabChange("received")} 
              active={tabType === "received"}
              className="btn btn-pilllaw"
            >
              받은 쪽지
              {unreadCount > 0 && (
                <Badge bg="danger" className="ms-2">
                  {unreadCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              onClick={() => handleTabChange("send")} 
              active={tabType === "send"}
              className="btn btn-pilllaw"
            >
              보낸 쪽지
            </Nav.Link>
          </Nav.Item>
        </Nav>
      
        <Container className="mt-3">
          {/* 선택 삭제 버튼 */}
          {selectedLetters.length > 0 && (
            <div className="mb-3 text-end">
              <Button variant="danger" onClick={handleDeleteSelected}>
                선택 삭제 ({selectedLetters.length})
              </Button>
            </div>
          )}

          {/* 받은 쪽지 목록 */}
          {tabType === "received" && (
            <ListGroup>
              {receivedLetters.length > 0 ? (
                receivedLetters.map((letter) => (
                  <ListGroup.Item 
                    key={`received-${letter.letterId}`}
                    className={`d-flex justify-content-between align-items-start ${!letter.readAt ? 'bg-light' : ''}`}
                  >
                    <div className="form-check me-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`check-${letter.letterId}`}
                        checked={selectedLetters.includes(letter.letterId)}
                        onChange={() => handleSelectLetter(letter.letterId)}
                      />
                    </div>
                    <div className="ms-2 me-auto flex-grow-1">
                      <div className="fw-bold">
                        <img src={profile} className="mx-2" alt='프로필 사진' width={25} />
                         {letter.nickName} {/* 임시로 ID만 표시 */}
                        {!letter.readAt && <Badge bg="info" className="ms-2">New</Badge>}
                      </div>
                      <p className="mb-1 text-truncate" style={{ maxWidth: '500px' }}>
                        {letter.content}
                      </p>
                      <small className="text-muted">
                        보낸 시간: {formatDate(letter.sendAt)}
                      </small>
                      <br />
                      <small className="text-muted">
                        읽은 시간: {letter.readAt ? formatDate(letter.readAt) : "읽지 않음"}
                      </small>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <Link 
                        to={`/letterselectview/${letter.letterId}`} 
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
          )}

          {/* 보낸 쪽지 목록 */}
          {/* 보낸 쪽지 목록 */}
{tabType === "send" && (
  <ListGroup>
    {sendLetters.length > 0 ? (
      sendLetters.map((letter) => (
        <ListGroup.Item 
          key={`send-${letter.letterId}`}
          className="d-flex justify-content-between align-items-start"
          >
          <div className="form-check me-2">
            <input
              className="form-check-input"
              type="checkbox"
              id={`check-${letter.letterId}`}
              checked={selectedLetters.includes(letter.letterId)}
              onChange={() => handleSelectLetter(letter.letterId)}
            />
            </div>
            <div className="ms-2 me-auto flex-grow-1">
              <div className="fw-bold">
                <img src={profile} className="mx-2" alt='프로필 사진' width={25} />
                {letter.nickName || `사용자 ${letter.receiverId}`}
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
                  to={`/letterselectview/${letter.letterId}`}
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
          <p>보낸 쪽지가 없습니다.</p>
        </div>
      )}
    </ListGroup>
    )}
        </Container>
      </Container>
    </div>
  );
};

export default LetterListComponent;