import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";

const ReviewForm = ({ show, handleClose, addReview }) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // 📌 이미지 파일 배열
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result); // 📌 이미지 미리보기 URL 저장
        if (newImages.length === files.length) {
          setImages([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index)); // 📌 선택한 이미지 삭제
  };

  const handleSubmit = () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const newReview = {
      id: Date.now(),
      title,
      content,
      rating,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD 형식
      likes: 0,
      images, // 📌 업로드된 이미지 포함
    };

    addReview(newReview);
    setTitle("");
    setContent("");
    setImages([]);
    handleClose(); // 모달 닫기
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>리뷰 작성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* 리뷰 제목 */}
          <Form.Group controlId="reviewTitle">
            <Form.Label>리뷰 제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* 리뷰 내용 (TinyMCE 에디터) */}
          <Form.Group controlId="reviewContent" className="mt-3">
            <Form.Label>리뷰 내용</Form.Label>
            <Editor
              apiKey="uzb7mzqvze4iw0jm2jl00qyohdciwzmoq47xt1j3pjoxmok9"
              initialValue=""
              init={{
                resize: false,
                height: 250,  
                menubar: true,
                plugins: ["advlist autolink lists link charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
                toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link",
                branding: false,
                content_style: "body { max-height: 500px; overflow-y: auto; }",
              }}
              onEditorChange={(content) => setContent(content)}
            />
          </Form.Group>

          {/* 별점 선택 */}
          <Form.Group controlId="reviewRating" className="mt-3">
            <Form.Label>별점</Form.Label>
            <Row>
              {[1, 2, 3, 4, 5].map((star) => (
                <Col key={star} className="text-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className={star <= rating ? "text-warning" : "text-secondary"}
                    onClick={() => setRating(star)}
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>

          {/* 이미지 업로드 */}
          <Form.Group controlId="reviewImages" className="mt-3">
            <Form.Label>사진 업로드</Form.Label>
            <div className="d-flex">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} />
            </div>

            {/* 이미지 미리보기 */}
            <Row className="mt-3">
              {images.map((img, index) => (
                <Col xs={3} key={index} className="position-relative">
                  <img src={img} alt={`review-${index}`} className="img-fluid rounded" />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="position-absolute top-0 end-0 text-danger"
                    onClick={() => removeImage(index)}
                    style={{ cursor: "pointer", backgroundColor: "white", borderRadius: "50%" }}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          작성 완료
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewForm;
