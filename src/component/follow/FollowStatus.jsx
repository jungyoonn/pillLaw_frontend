import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowStatus = ({ senderMno, receiverMno }) => {
  const [status, setStatus] = useState("확인 중...");

  useEffect(() => {
    axios.get(`/api/follow/check?senderMno=${senderMno}&receiverMno=${receiverMno}`)
      .then(response => setStatus(response.data))
      .catch(error => console.error("맞팔 상태 확인 실패:", error));
  }, [senderMno, receiverMno]);

  return <p>{status}</p>;
};

export default FollowStatus;
