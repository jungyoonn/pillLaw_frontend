import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import '../../resources/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import UserInfo from './profilePageChildren/UserInfo';
import FavoriteProducts from './profilePageChildren/FavoriteProducts';
import UserReviews from './profilePageChildren/UserReviews';
import UseAxios from '../../hooks/UseAxios';

const ProfilePageLayout = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("info");
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const {req} = UseAxios();
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(id);
    const mno = id;

    const loadUser = async () => {
      try {
        if(mno) {
          const resp = await req('get', `member/userpage/${mno}`);
          
          if(resp) {
            setUser(resp);
            console.log(user);
          }
        }
  
      } catch(error) {
        console.log("fail");
      }
    }
    loadUser();

    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveKey(tabParam);
    }
  }, [searchParams]);

  // activeKey 변경 시 URL 쿼리 파라미터 업데이트
  const handleTabChange = (selectedKey) => {
    setActiveKey(selectedKey);
    setSearchParams({ tab: selectedKey });
  };

  // 현재 activeKey에 따라 다른 컴포넌트 렌더링
  const renderContent = () => {
    console.log('renderContent called, activeKey:', activeKey);
    switch (activeKey) {
      case "info":
        return <UserInfo activeKey={activeKey} setActiveKey={handleTabChange} user={user} />;
      case "likes" :
        return <FavoriteProducts activeKey={activeKey} setActiveKey={handleTabChange} />;
      case "reviews" :
        return <UserReviews activeKey={activeKey} setActiveKey={handleTabChange} />;
      default:
        return <div>선택된 메뉴가 없습니다.</div>;
    }
  };

  return (
    <Container style={{ paddingTop: '115.19px' }}>
      <Row>
        <Col xs="1" lg="2" />
        <Col xs="1" lg="1" className='text-center'>
          <Link to={"#"} onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}>
            <FontAwesomeIcon icon={faArrowLeft} className='fa-xl text-pilllaw' />
          </Link>
        </Col>
        <Col className='text-center'>
          <h4 className='text-pilllaw fw-bold'>{user.nickname + ' '}님의 페이지</h4>
        </Col>
        <Col xs="1" lg="1" className='text-center'>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} className='fa-xl text-pilllaw' />
          </Link>
        </Col>
        <Col xs="1" lg="2" />
      </Row>
      <Row className='mt-5'>
        <Col xs="1" lg="2" className='text-center'>
          <Nav
            activeKey={activeKey}
            // onSelect={(selectedKey) => setActiveKey(selectedKey)}
            onSelect={handleTabChange}
            className="flex-column text-pilllaw custom-nav"
            variant="tabs">
            <Nav.Link eventKey="info">내 정보</Nav.Link>
            <br />
            <Nav.Link eventKey="likes">즐겨찾기 상품</Nav.Link>
            <Nav.Link eventKey="reviews">후기 모아보기</Nav.Link>
          </Nav>
        </Col>
        <Col>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePageLayout;
