// LetterHeader.js
import React from "react";
import { Container, Nav, Badge } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const LetterHeaderTest = ({ unreadCount = 0 }) => {
  // useSearchParams 훅 사용
  const [searchParams, setSearchParams] = useSearchParams();
  
  // tab 쿼리 파라미터 가져오기
  const tabType = searchParams.get("tab") || "received";
  
  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  return (
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
    </Container>
  );
};

export default LetterHeaderTest;