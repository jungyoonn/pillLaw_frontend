import React, { useEffect, useState } from 'react';
import '../../resources/css/style.css';
import mainImage from '../../resources/image/main_image_2.jpg';
import product1 from '../../resources/image/product1.jpg';
import product2 from '../../resources/image/product2.jpg';
import tag1 from '../../resources/image/main_tag1.png';
import tag2 from '../../resources/image/main_tag2.png';
import tag4 from '../../resources/image/main_tag4.png';
import tag6 from '../../resources/image/main_tag6.png';
import tag7 from '../../resources/image/main_tag7.png';
import slider from '../../resources/image/main_slider.jpg';
import IndexSelector from '../product/IndexSelector';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faGreaterThan, faCrown, faStar, faCircle } from "@fortawesome/free-solid-svg-icons";
import ProfileCard from './ProfileCard';
import LoginCard from './LoginCard';
import UseAxios from '../../hooks/UseAxios';
import IndexSlider from "../common/IndexSlider";
import IndexPromoSlider from './IndexPromoSlider';

const Index = () => {
  const [login, setLogin] = useState(false);
  const [nickname, setNickname] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const {req} = UseAxios("http://localhost:8080/api");

  useEffect(() => {
    const storedMno = localStorage.getItem('mno');
    const storedEmail = localStorage.getItem('email');
    setLogin(!!storedMno);

    console.log(storedMno);
    console.log(storedEmail);

    const loadUser = async () => {
      try {
        // mno가 있을 때만 API 호출
        if (storedMno) {
          const resp = await req('get', `?mno=${storedMno}&email=${storedEmail}`);
          console.log(resp)

          // 소셜 체크 추가
          if (resp &&  resp.nickname !== '') {
            setNickname(resp.nickname || resp.socialProvider + "_USER");
            return;
          }

          // setNickname(resp.socialProvider + "_USER");
        }
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
      }
    };

    loadUser();
  }, [login, req]);

  return (
    <div className='wrap'>
      <Container style={{paddingTop: '115.19px'}}>
        <img className="img-fluid p-0 pb-2" src={mainImage} alt='메인 이미지' />
        <Row>
          <IndexSelector/>
          <Col className="me-2 p-0">
            <div className="card pilllaw-profile p-2">
              <div className="clearfix">
                <div className="card-body p-0">
                  {login ? (
                    <ProfileCard nickname={nickname} />
                  ) : (
                    <LoginCard />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <IndexPromoSlider className="mt-5"/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Index;
