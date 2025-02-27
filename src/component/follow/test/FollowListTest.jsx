// import React, { useEffect, useState } from "react";
// import FollowHeaderButtonsArea from "../layout/FollowHeaderButtonsArea";
// import SendLetterPage from "../../letter/SendLetterPage";
// import UseAxios from '../../../hooks/UseAxios';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import FollowHeaderButtonsAreatest from "./FollowHeaderButtonsAreaTest";


// const FollowListButtonTest = () => {
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
//     <>
//     <h2>맞팔로우 목록</h2>
//     {/* 여기에 맞팔로우 목록 내용 추가 */}
//     <div className="follow-item">
//       <div className="user-profile">
//         <img src="/api/placeholder/50/50" alt="프로필 이미지" className="profile-img" />
//         <div className="user-info">
//           <p className="username">사용자1</p>
//           <p className="bio">맞팔로우 사용자입니다.</p>
//         </div>
//       </div>
//       <button className="btn btn-outline-primary">팔로잉</button>
//     </div>
//   </>
// );
// };

// export default FollowListButtonTest;
