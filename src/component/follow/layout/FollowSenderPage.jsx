import { useState, useEffect } from "react";
import profile from "../../../resources/image/user-image.png";
import Button from "../../common/Button";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import UseAxios from "../../../hooks/UseAxios";

const FollowSenderPage = () => {
  const { req } = UseAxios();
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  const [follow, setFollow] = useState([]);
  const { senderMno } = useParams();
  const mno = localStorage.getItem("mno");

  useEffect(() => {
    const fetchFollowInfo = async () => {
      try {
        const response = await req("get", `/api/follow/${mno}/${senderMno}`);
        if (response.status === 200) {
          console.log("API 응답 데이터:", response.data);
          if (Array.isArray(response.data)) {
            setFollow(response.data); // ✅ 배열이면 그대로 저장
          } else {
            setFollow([]); // ✅ 배열이 아니면 빈 배열로 설정
          }
          setIsFollow(response.data.isFollow);
        }
      } catch (error) {
        console.error("팔로우 정보 가져오기 오류:", error);
        setFollow([]); // ✅ 오류 발생 시 빈 배열 설정
      }
    };
  
    fetchFollowInfo();
  }, [mno, senderMno, req]);

  const toggleFollow = async () => {
    try {
      const response = await req("POST", `/api/follow/${mno}/${senderMno}`);
      if (response.status === 200) {
        setIsFollow(!isFollow);
      }
    } catch (error) {
      console.error("팔로우 상태 변경 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <Container style={{ paddingTop: "115.19px" }}>
      {/* 🔹 헤더 */}
      <Row className="justify-content-center">
        <Col xs="1" lg="1" className="text-center">
          <Link
            to={"#"}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="fa-xl text-pilllaw" />
          </Link>
        </Col>
        <Col xs="10" lg="8" className="text-center">
          <h5 align="center" className="mt-2 fw-bold text-pilllaw">
            {follow[0]?.sender?.nickname || "닉네임 없음"}
          </h5>
        </Col>
        <Col xs="1" lg="1" className="text-center">
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} className="fa-xl text-pilllaw" />
          </Link>
        </Col>
      </Row>

      {/* 🔹 본문 */}
      <Row className="justify-content-center mt-5">
        <Col xs="12" lg="8" className="text-center">
          <div className="d-flex flex-column align-items-center">
            {/* 🔹 팔로우 리스트 */}
            <div className="w-100 mt-3">
              {follow.length > 0 ? (
                follow.map((f, index) => (
                  <a
                    key={`${f.followId}-${index}`}
                    href={f.href}
                    className="list-group-item d-flex align-items-center"
                  >
                    <img
                      src="../../resources/followImage/사본 -freepik__adjust__7192.png"
                      alt="프로필"
                      width={30}
                      height={30}
                      className="me-2 rounded-circle"
                    />
                    {f.receiverMno?.nickname || "닉네임 없음"}
                  </a>
                ))
              ) : (
                <p className="text-pilllaw">팔로우 하시겠습니까?</p>
              )}
            </div>

            {/* 🔹 프로필 사진 */}
            <img src={profile} alt="프로필 사진" width={160} className="mt-3" />
            <h5 align="center" className="mt-2 fw-bold text-pilllaw">
              {follow.length > 0 ? follow[0].receiverMno?.nickname : "닉네임 없음"}
            </h5>

            {/* 🔹 팔로우 버튼 */}
            <Button
              variant="pillllaw"
              className="btn btn-pilllaw btn-sm mt-3"
              onClick={toggleFollow}
            >
              {isFollow ? "팔로우 취소" : "팔로우 하기"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FollowSenderPage;
