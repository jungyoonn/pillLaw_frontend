// import React, { useEffect, useState } from "react";
// import FollowHeaderButtonsArea from "./FollowHeaderButtonsArea";
// import SendLetterPage from "../../letter/SendLetterPage";
// import UseAxios from '../../../hooks/UseAxios';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import { Container } from "react-bootstrap";

// const FollowTest = () => {
//   const {req} = UseAxios();
//   const [follows, setFollows] = useState([]);
//   const mno = localStorage.getItem('mno');
  
//   useEffect (() => {
//     console.log("mno before useEffect:", mno);
//     console.log(mno);

//     const fetchData = async () => {
//       try {
//         const resp = await req('get', `follow/followBack/${mno}`);
//         console.log(resp);
//         console.log("배열 여부:", Array.isArray(resp));
//         setFollows([...resp]);
//         console.log(follows);
        
//       } catch (error) {
//         console.error("Error fetching follow list:", error);
//       }
//     };

//     fetchData(); // async 함수 실행
    
//   }, [])
//   return (
//     <div className="container main-content">
//       <div className="wrap">
//         {/* <FollowHeaderButtonsArea /> */}
//         <Container className="mt3">
//         {/* 상단 버튼 영역 */}
//         <div className="follow-item">
//         {follows.map((follow) => (
//         <a key={follow.followId}
//           href={follow.href}
//           />
//         ))}
//         {follows.map((follow) => (
//           <a key={follow.followId} href="#" className="list-group-item">
//             {follow.sender.nickname} {/* 맞팔된 상대방 mno 표시 */}
//           </a>
//         ))}
//           <div className="user-profile">
//             <div className="user-info">
//               {follows.map((follow) => (
//               <a key={follow.followId} href="#" className="list-group-item">
//                 <p className="username"> {follow.sender.nickname}</p>
//                 {/* <p className="bio">맞팔로우 사용자입니다.</p> */}
//                 <button className="btn btn-outline-primary">팔로잉</button>
//               </a>
//               ))}
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     </div>

//   );
// };

// export default FollowTest;
