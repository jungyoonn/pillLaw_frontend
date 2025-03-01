import React, { useEffect } from 'react'
import { Accordion, Col, Container, ListGroup, Row } from 'react-bootstrap';

function NoticeItem({notice}) {

  useEffect(() => {
    console.log("전달된 notice:", notice);
  }, [notice]);

  return (
    <Container className='p-3'>
      <Accordion defaultActiveKey="1" className='p-2'>
        <Accordion.Item eventKey="0">
          <Accordion.Header> 제목 : {notice.title}</Accordion.Header>
          <Accordion.Body className='bg-pilllaw text-white'>
            <Row className='fs-11'>
              <Col>
                <span className='text-center fw-bold text'>조회수 - {notice.count}</span>
              </Col>
              <Col>
                <span className='text-center fw-bold text'>작성자 - {notice.writer}</span>
              </Col>
            </Row>
            <Row className='p-3 mb-3'>
              <hr className='text-white'/>
              {notice.content}
            </Row>
            <Row className='mt-5 p-3'>
              <hr className='text-white'/>
              <Col>
                <span className='text-center fw-bold text'>작성일 - {notice.count}</span>
              </Col>
              <Col>
                <span className='text-center fw-bold text'>수정일 - {notice.writer}</span>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  )
}

export default NoticeItem
