import React, { useEffect, useState } from 'react';
import UseAxios from '../../hooks/UseAxios';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import NoticeItem from './NoticeItem';
import NoticeWriter from './NoticeWriter';
import SearchBar from "../common/SearchBar";

function Notice() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, req, loading, err } = UseAxios();
  const [showWriter, setShowWriter] = useState(false); // 모달 상태 관리

  useEffect(() => {
    console.log("📌 공지사항 리스트 요청 시작");
    req("get", "v1/notice/list"); 
  }, [req]);  

  if (err) {
    return <div><h1>Error Occurred!</h1></div>;
  }

  if (loading) {
    return (
      <Container className="text-center" style={{ paddingTop: "115.19px" }}>
        <h1 className="fw-bold my-5">공지사항</h1>
        <Spinner className="text-center" animation="border" variant="info" />
        <p className="mt-2 text-secondary">공지사항을 불러오는 중...</p>
      </Container>
    );
  }

  return (
    <div className="wrap">
      <Container className="text-center" style={{ paddingTop: "115.19px" }}>
        <h1 className="fw-bold my-5"> 공지사항 </h1>

        {/* 검색창 */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <hr className="text-pilllaw" />

        {/* 공지 리스트 */}
        <Row className="text-center container-fluid mt-4">
          {data?.content?.length > 0 ? (
            data.content
              .filter((notice) => notice.title.includes(searchTerm))
              .map((notice) => (
                <NoticeItem key={notice.nno} notice={notice} />
              ))
          ) : (
            <p>공지사항이 없습니다.</p>
          )}
        </Row>

        {/* 공지사항 작성 버튼 */}
        <Row className='mt-5'>
          <Col className="text-end">
            <Button className="btn-pilllaw" onClick={() => setShowWriter(true)}>
              작성하기
            </Button>
          </Col>
        </Row>
        <NoticeWriter show={showWriter} handleClose={() => setShowWriter(false)} />
      </Container>
    </div>
  );
}

export default Notice;
