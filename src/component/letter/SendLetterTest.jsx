import React,{useState ,useRef, useEffect} from 'react';
import {Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

// const SendLetter = () => {
//    // 맞팔로우 된 사람
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

const SendLetter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const dropdownRef = useRef(null);
  const [showToast, setShowToast] = useState(false);

  const mutualFollows = [
    "치킨",
    "피자",
    "딸기모찌",
    "재즈맨",
    "쿠키",
    "초코쿠키",
    "딸기쿠키",
    "파인애플",
  ];

  // const filteredRecipients = mutualFollows.filter((user) =>
  //   user.toLowerCase().includes(recipientInput.toLowerCase())
  // );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // 받는 사람 선택
  const handleRecipientSelect = (user) => {
   setSelectedRecipient(user);
   setShowDropdown(false); // 선택 후 드롭다운 닫기
 };

  // const handleRecipientSelect = (user) => {
  //   setSelectedRecipient(user);
  //   // setRecipientInput(user);
  //   setShowDropdown(false);
  // };

  const handleSend = () => {
    if (!selectedRecipient || messageContent.trim() === "") {
      alert("받는 사람과 쪽지 내용을 모두 입력해주세요");
      return;
    }
    alert(`쪽지가 ${selectedRecipient}님에게 전송되었습니다.`);
    setMessageContent("");
    setSelectedRecipient("");
  };

  // 토스트 확인 버튼
  const handleToastConfirm = () => {
    setShowToast(false);
    setMessageContent("");
    setSelectedRecipient("");
    // setRecipientInput("");
  };

  return (
    <div className="wrap">
    {/* <Button variant="primary" onClick={handleShow}>
        쪽지보내기
    </Button> */}
    <Container style={{paddingTop: '115.19px'}} >
    <div className="container mt-5">
      {/*  받는 사람 */}
      <div className="mb-3">
        <label className="form-label fw-bold">받는 사람:</label>
        <input
          type="text"
          className="form-control"
          placeholder="받는 사람을 검색해주세요"
          value={selectedRecipient}
          readOnly
            onClick={() => setShowDropdown(!showDropdown)}
            
          // onChange={(e) => {
          //   setRecipientInput(e.target.value);
          //   setSelectedRecipient(""); // 검색 시 선택된 받는 사람 초기화
          // }}
        />
       
       
        {/* 검색 목록 */}
        {/* {recipientInput && !selectedRecipient && (
          <ul className="list-group mt-1">
            {filteredRecipients.length > 0 ? (
              filteredRecipients.map((user, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRecipientSelect(user)}
                >
                  {user}
                </li>
              ))
            ) : (
              <li className="list-group-item">일치하는 사용자가 없습니다.</li>
            )}
          </ul>
        )}
      </div> */}
        {showDropdown && (
            <div className="list-group mt-1" style={{ position: "absolute", zIndex: 1000, width: "100%" }}>
              {mutualFollows.map((user, index) => (
                <button
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleRecipientSelect(user)}
                >
                  {user}
                </button>
              ))}
            </div>
          )}
        </div>

      {/*쪽지 내용 입력 폼 */}
      <div className="mb-3">
        <label className="form-label fw-bold">쪽지 내용:</label>
        <textarea
          className="form-control"
          rows="5"
          placeholder="쪽지 내용을 입력해주세요"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        ></textarea>
      </div>

      {/*보내기 버튼 */}
      <div className="text-center">
        <button className="btn btn-pilllaw d-block mx-auto" onClick={handleSend}>
          보내기
        </button>
      </div>

      {/* 완료토스트 */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ minWidth: "300px", textAlign: "center" }}
          >
            <p className="mb-3">${selectedRecipient}님에게 쪽지가 발송되었습니다.</p>
            <button type="button" className="btn btn-pilllaw" onClick={handleToastConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
      </div>
        </Container>
      </div>
  );
};

export default SendLetter;
