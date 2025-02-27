// import { useState } from "react";
// import { Button } from "react-bootstrap";

// const mno = localStorage.getItem('mno');
// const FollowIsBack = ({ follow }) => {
//   const [isFollow, setIsFollow] = useState(follow.isFollowBack); // 맞팔 여부 확인
  
//   const toggleFollow = async () => {
//     try {
//       // API 호출 (예제, 실제 API 경로 확인 필요)
//       // const response = await req(`/api/follow/toggle/${follower.mno}`, "POST");
//       setIsFollow(!isFollow);
//     } catch (error) {
//       console.error("팔로우 상태 변경 중 오류 발생", error);
//     }
//   };
  
//   return (
//     <div className="d-flex justify-content-between align-items-center">
//       {/* 🔹 프로필 사진 & 닉네임 */}
//       <div className="d-flex align-items-center">
//         <img
//           src={follow.profileImage || "../../resources/followImage/default.png"}
//           alt="프로필"
//           width={30}
//           height={30}
//           className="me-2 rounded-circle"
//         />
//         <span>{follow.send.nickname}</span>
//       </div>

//       {/* 🔹 맞팔 여부에 따른 버튼 변경 */}
//       {isFollow ? (
//         <Button variant="success" className="btn-sm" onClick={toggleFollow}>맞팔로우</Button>
//       ) : (
//         <Button variant="primary" className="btn-sm" onClick={toggleFollow}>팔로우 하기</Button>
//       )}
//     </div>
//   );
// };

// export default FollowIsBack;
