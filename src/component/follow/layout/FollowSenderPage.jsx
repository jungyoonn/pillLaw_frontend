// import { useState } from "react";
// import profile from '../../../resources/image/user-image.png'
// import Button from '../../common/Button';
// import { Col, Container, Nav, Row } from 'react-bootstrap';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
// import { Link ,useNavigate } from "react-router-dom";
// import UseAxios from '../../../hooks/UseAxios';

// const FollwSenderPage = () => {
//   const {req} = UseAxios();
//   const navigate = useNavigate();
//   const [member, setMember] = useState({});
//   const [activeKey, setActiveKey] = useState("myinfo");
//   const mno = localStorage.getItem('mno');
//   const renderContent = () => {
//     console.log('renderContent called, activeKey:', activeKey);
//     // switch(activeKey) {
//     //   case 'follow':
//     //     return <FollowList activeKey={activeKey} />
//     //   default:
//     //     return <div>선택된 메뉴가 없습니다.</div>;
//     // }
//   };

//   return (
//     <Container style={{paddingTop: '115.19px'}}>
//       <Row>
//         <Col xs="1" lg="2" />
//         <Col xs="1" lg="1" className='text-center'>
//           <Link to={"#"} onClick={(e) => {
//               e.preventDefault();
//               navigate(-1);
//             }}>
//             <FontAwesomeIcon icon={faArrowLeft} className='fa-xl text-pilllaw' />
//           </Link>
//         </Col>
//         <Col className='text-center'>
//           <h4 className='text-pilllaw fw-bold'>마이 페이지</h4>
//         </Col>
//         <Col xs="1" lg="1" className='text-center'>
//           <Link to={"/"}>
//             <FontAwesomeIcon icon={faHouse} className='fa-xl text-pilllaw' />
//           </Link>
//         </Col>
//         {/* <Col xs="1" lg="2" /> */}
//       </Row>
//       <Row className='mt-5'>
//         <Col xs="1" lg="2" className='text-center'>
          
//         <img src={profile} alt='프로필 사진' width={160} />
//           {member.memberDto ? 
//             <Button variant='pillllaw' className="btn btn-pilllaw btn-sm mt-3">PILL LAW 구독</Button> : 
//             <p className='fw-bold header-font fs-12 mt-3'>소셜 회원은 구독 서비스 이용이 불가능합니다.</p>
//           }
        
//           <Nav 
//             activeKey={activeKey}
//             onSelect={(selectedKey) => setActiveKey(selectedKey)}
//             className="flex-column text-pilllaw custom-nav" 
//             variant="tabs">
//             <Nav.Link eventKey="link-2">로그아웃</Nav.Link>
//             <Nav.Link eventKey="link-2">회원 탈퇴</Nav.Link>
//           </Nav>
//         </Col>
//         <Col>
//           {renderContent()}
//         </Col>
//       </Row>
//     </Container>
//   );
// };
// export default FollwSenderPage;

