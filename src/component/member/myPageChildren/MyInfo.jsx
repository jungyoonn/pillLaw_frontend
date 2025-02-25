import React from 'react';
import { Card } from 'react-bootstrap';

const MyInfo = ({ activeKey }) => {
  return (
    <Card>
      <Card.Header>내 정보</Card.Header>
      <Card.Body>
        <p>여기에 내 정보 내용이 표시됩니다.</p>
        <p>현재 선택된 메뉴: {activeKey}</p>
      </Card.Body>
    </Card>
  );
}

export default MyInfo;
