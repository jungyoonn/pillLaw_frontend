import { useEffect, useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import UseAxios from "../../../hooks/UseAxios";
import { Link } from "react-router-dom";
import profile from '../../../resources/image/user-image.png';

// 팔로워 목록 컴포넌트
const FollowersList = () => {
  const { req } = UseAxios();
  const [follows, setFollows] = useState([]);
  const [followBackList, setFollowBackList] = useState([]);
  const mno = localStorage.getItem('mno');
  
  // 데이터 새로고침 함수
  const refreshData = async () => {
    if (!mno) return;

    try {
      // 팔로워 목록 가져오기 (나를 팔로우하는 사람들)
      const resp = await req('get', `follow/${mno}`);
      console.log(resp);
      
      if (Array.isArray(resp)) {
        // 중복 제거 (필요한 경우)
        const uniqueFollows = resp.filter((follow, index, self) => 
          index === self.findIndex(f => f.sender.mno === follow.sender.mno)
        );
        
        setFollows(uniqueFollows);
        
        // 맞팔 목록 가져오기 
        const followBackResp = await req('get', `follow/followBack/${mno}`);
        
        if (Array.isArray(followBackResp)) {
          // 맞팔 목록의 sender.mno 값들만 추출
          const followBackIds = followBackResp.map(follow => follow.sender.mno);
          setFollowBackList(followBackIds);
        }
      } else {
        console.error("API 응답이 배열이 아닙니다:", resp);
      }
    } catch (error) {
      console.error("Error fetching follow list:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, [mno, req]);

  // 팔로우 상태 변경 함수 (GET 메서드로 변경)
 // 팔로우 상태 변경 함수 (기존 API 활용)
 const handleToggleFollow = async (receiverMno) => {
  try {
    // 서버의 toggle API 사용
    const resp = await req('get', `follow/toggle/${mno}/${receiverMno}`);
    console.log(resp);
    
    // 서버에서 반환된 실제 상태를 사용하여 상태 업데이트
    // resp.followed가 true인 경우 '팔로잉' 상태, false인 경우 '맞팔로우 하기' 상태
    // setFollows(prevFollows => prevFollows.map(follow => {
    //   if (follow.sender.mno === receiverMno) {
    //     return {
    //       ...follow,
    //       isFollowBack: resp.followed // 서버에서 반환된 실제 상태 사용
    //     };
    //   }
    //   return follow;
    // }));
    
    // 필요한 경우 맞팔 목록도 업데이트
    if (resp.followed) {
      // 맞팔 추가
      if (!followBackList.includes(receiverMno)) {
        setFollowBackList(prev => [...prev, receiverMno]);
      }
    } else {
      // 맞팔 제거
      setFollowBackList(prev => prev.filter(id => id !== receiverMno));
    }
    refreshData();
    // 데이터를 완전히 새로고침하려면 유지
    // setTimeout(refreshData, 300);
  } catch (error) {
    console.error("팔로우 상태 변경 오류:", error);
  }
};

  // 맞팔 여부 확인
  // const isFollowBack = (senderMno) => {
  //   return followBackList.includes(senderMno);
  // };

  return (
    <Container>
      <div className="container main-content">
        <div className="follow-item">
          <div className="user-profile">
            <ListGroup variant="flush">
              {follows.map((follow, index) => (
                <ListGroup.Item 
                  key={`follower-${follow.sender.mno}-${index}`} // 인덱스 추가하여 고유한 키 생성
                  className="d-flex justify-content-between align-items-center list-group-bg fs-14 fw-bold"
                >
                  <Link
                    to={`/userpage/${follow.sender.mno}`}
                    className="d-flex align-items-center text-decoration-none text-dark"
                  >
                    <img src={profile} className="mx-2" alt='userprofile' width={25} />
                    <span>{follow.sender.nickname}</span>
                  </Link>
                  
                  {/* 맞팔 상태에 따른 버튼 */}
                  {follow.isFollowBack ? (
                    <Button 
                      variant="pilllaw" 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleToggleFollow(follow.sender.mno)}
                    >
                      팔로잉
                    </Button>
                  ) : (
                    <Button 
                      variant="pilllaw" 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleToggleFollow(follow.sender.mno)}
                    >
                      맞팔로우 하기
                    </Button>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FollowersList;