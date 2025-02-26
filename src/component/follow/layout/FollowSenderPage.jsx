import { useState } from "react";
import profile from '../../../resources/image/user-image.png';
import Button from '../../common/Button';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import UseAxios from '../../../hooks/UseAxios';

const FollwSenderPage = () => {
  const { req } = UseAxios();
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false); // 팔로우 상태 관리
  const [activeKey, setActiveKey] = useState("myinfo");
  const mno = localStorage.getItem('mno');
  const renderContent = () => {
    console.log('renderContent called, activeKey:', activeKey);
    // switch(activeKey) {
    //   case 'follow':
    //     return <FollowList activeKey={activeKey} />
    //   default:
    //     return <div>선택된 메뉴가 없습니다.</div>;
    // }
  };

  const toggleFollow = async () => {
    const senderMno = localStorage.getItem('mno'); // 현재 사용자 번호
    try {
      const response = await req(`/api/follow/${mno}/${mno}`, 'GET');
      if (response.status === 200) {
        setIsFollow(!isFollow); // 팔로우 상태 변경
      }
    } catch (error) {
      console.error("팔로우 상태 변경 중 오류가 발생했습니다.", error);
    }
  };


  return (
    <Container style={{ paddingTop: '115.19px' }}>
      <Row className="justify-content-center">
        <Col xs="1" lg="1" className='text-center'>
          <Link to={"#"} onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}>
            <FontAwesomeIcon icon={faArrowLeft} className='fa-xl text-pilllaw' />
          </Link>
        </Col>
        <Col xs="10" lg="8" className='text-center'>
          <h4 className='text-pilllaw fw-bold'>마이 페이지</h4>
        </Col>
        <Col xs="1" lg="1" className='text-center'>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} className='fa-xl text-pilllaw' />
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs="12" lg="8" className="text-center">
          <div className="d-flex flex-column align-items-center">
            <img src={profile} alt='프로필 사진' width={160} />
            <Button 
              variant='pillllaw' 
              className="btn btn-pilllaw btn-sm mt-3" 
              onClick={toggleFollow}
            >
              {isFollow ? '팔로우 취소' : '팔로우 하기'}
            </Button>
          </div>
        </Col>
        <Col xs="12" lg="8">
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default FollwSenderPage;
