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
  const [showWriter, setShowWriter] = useState(false);
  const [roles, setRoles] = useState([]);
  const [notice, setNotice] = useState([]);

  const mno = localStorage.getItem("mno");

  useEffect(() => {
    // console.log(mno);

    const fetchNotices = async () => {
      try {
        const response = await req("get", "v1/notice/list");
        // console.log("공지사항 응답:", response);
        setNotice(response);
      } catch (error) {
        console.error("공지사항 불러오기 실패:", error);
      }
    };

    const fetchMemberRoles = async () => {
      try {
        if (mno) {
          const response = await req("get", `member/mypage/myinfo/${mno}`);
          // console.log("멤버 응답:", response);
          if (response?.memberDto?.roles) {
            setRoles(response.memberDto.roles);
          }
        }
      } catch (error) {
        console.error("멤버 불러오기 실패:", error);
      }
    };

    fetchNotices();
    fetchMemberRoles();
  }, [mno]);  


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
          {notice?.content?.length > 0 ? (
            notice.content
              .filter((n) => n.title.includes(searchTerm))
              .map((n) => (
                <NoticeItem key={n.nno} notice={n} />
              ))
          ) : (
            <p>공지사항이 없습니다.</p>
          )}
        </Row>

        {roles?.some(role => role.includes("ADMIN")) ? ( 
            <Row className='mt-5'>
              <Col className="text-end">
                <Button className="btn-pilllaw" onClick={() => setShowWriter(true)}>
                  작성하기
                </Button>
              </Col>
            </Row>
          ) : null}
        <NoticeWriter show={showWriter} handleClose={() => setShowWriter(false)} />
      </Container>

    </div>
  );
}

export default Notice;
