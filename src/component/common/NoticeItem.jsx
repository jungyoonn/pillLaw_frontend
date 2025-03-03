import React, { useEffect } from 'react'
import { Accordion, Col, Container, ListGroup, Row } from 'react-bootstrap';
import UseAxios from '../../hooks/UseAxios';

function NoticeItem({notice}) {
  const {req, loading} = UseAxios();

  useEffect(() => {
    // console.log("전달된 notice:", notice);
  }, [notice]);

  return (
    <Container className='p-3'>
      <Accordion defaultActiveKey="1" className='p-2'>
        <Accordion.Item className='text-center' eventKey="0">
          <Accordion.Header 
            className='text-center fw-bold' 
            onClick={() => req("put", `v1/notice/count/${notice.nno}`)}
          >
            제목 : {notice.title}
          </Accordion.Header>
          <Accordion.Body className='text-dark'>
            <Row className='fs-11'>
              <Col>
                <span className='text-center fw-bold '>조회수 - {notice.count}</span>
              </Col>
              <Col xs="1"> / </Col>
              <Col>
                <span className='text-center fw-bold '>작성자 - {notice.writer}</span>
              </Col>
            <hr className='mt-3'/>
            </Row>
            <Row className='p-3 mb-5'>
              <div className='mt-5 text-start' dangerouslySetInnerHTML={{ __html: notice.content }} />
            </Row>
            <Row className='mt-5 fs-11'>
              <hr className='mb-3'/>
              <Col>
                <span className='text-center fw-bold '>작성일 - {notice.regDate}</span>
              </Col>
              <Col xs="1"> / </Col>
              <Col >
                <span className='text-center fw-bold '>수정일 - {notice.modDate ? notice.modDate : "(원본)"}</span>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  )
}

export default NoticeItem
