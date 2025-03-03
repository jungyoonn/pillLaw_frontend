import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import UseAxios from '../../hooks/UseAxios';
import { useAuth } from '../../hooks/AuthContext';

function NoticeWriter({ show, handleClose, onNoticeAdded }) {
  const { mno } = useAuth(); // 로그인된 회원 ID
  const { loading, req } = UseAxios();

  const [title, setTitle] = useState(""); // 공지사항 제목
  const [content, setContent] = useState(""); // 공지사항 내용

  useEffect(() => {
    // console.log("공지사항 작성 시작 - 작성자:", mno);
  }, [mno]);

  // 공지사항 등록 핸들러
  const handleSubmitNotice = async (e) => {
    e.preventDefault();

    if (!mno) {
      alert("로그인이 필요합니다!");
      return;
    }
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("공지사항 내용을 입력해주세요.");
      return;
    }

    const noticeData = {
      mno,
      title,
      content,
    };

    try {
      console.log("전송:", noticeData);
      const response = await req("post", "v1/notice/register", noticeData, {
        "Content-Type": "application/json",
      });

      // console.log("응답:", response);

      if (response) {
        alert("공지사항이 성공적으로 등록되었습니다!");
        setTitle("");
        setContent("");

        if (onNoticeAdded) {
          onNoticeAdded(response);
        }

        handleClose();
      } else {
        console.error(" 공지사항 등록 대 실패: 응답 없음", response);
        alert("공지사항 등록 실패");
      }
    } catch (error) {
      alert("공지사항 등록 중 오류 발생");
      console.error("공지사항 등록 대 실패:", error.response?.data || error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">공지사항 작성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitNotice}>
          {/* 제목 입력 필드 */}
          <Form.Group controlId="noticeTitle" className="mb-3">
            <Form.Label>공지사항 제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* 공지사항 내용 입력 필드 (TinyMCE Editor) */}
          <Form.Group controlId="noticeContent" className="mb-3">
            <Form.Label>공지사항 내용</Form.Label>
            <Editor
              apiKey={process.env.REACT_APP_TINYMCE_API_KEY} // TinyMCE API 키
              initialValue=""
              init={{
                resize: false,
                height: 250,
                menubar: true,
                plugins: [
                  "advlist", "autolink", "lists", "link", "charmap", "print", "preview", "anchor",
                  "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "paste", "code", "help", "wordcount"
                ], 
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | link image media code",
                branding: false,
                statusbar: false,
              }}
              onEditorChange={(newContent) => setContent(newContent)}
            />

          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              작성 취소
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "등록 중..." : "작성 완료"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NoticeWriter;
