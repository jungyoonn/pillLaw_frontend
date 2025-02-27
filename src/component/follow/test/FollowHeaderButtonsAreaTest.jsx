// import React from "react";
// import { Container, Nav } from "react-bootstrap";
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
// const FollowHeaderButtonsAreatest = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
  
//   // 기본 탭은 'followers'로 설정
//   const tabType = searchParams.get("tab") || "followers";
  
//   // 탭 변경 핸들러
//   const handleTabChange = (tab) => {
//     setSearchParams({ tab: tab });
//   };

//   return (
//     <div className="wrap">
//       <Container style={{ paddingTop: '115.19px' }}>
//         <Nav fill variant="tabs" defaultActiveKey={tabType }>
//           <Nav.Item>
//             <Nav.Link 
//               onClick={() => handleTabChange("/followlist")} 
//               active={tabType  === "/followlist"}
//               className="btn btn-pilllaw"
//             >
//               맞팔로우
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link 
//               onClick={() => handleTabChange("/followerslist")} 
//               active={tabType  === "/followers"}
//               className="btn btn-pilllaw"
//             >
//               팔로워
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link 
//               onClick={() => handleTabChange("/followinglist")} 
//               active={tabType  === "/followinglist"}
//               className="btn btn-pilllaw"
//             >
//               팔로잉
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </Container>
//     </div>
//   );
// };

// export default FollowHeaderButtonsAreatest;