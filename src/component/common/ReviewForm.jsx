import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthContext";
import useAxios from '../../hooks/UseAxios';
import config from "../../config";

const ReviewForm = ({ show, handleClose, productId, onReviewAdded }) => {
  // console.log("🔹 ReviewForm에 전달된 productId:", productId);
  
  const { mno } = useAuth();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // 파일 리스트 (미리보기용)
  const [uploadedFiles, setUploadedFiles] = useState([]); // S3 업로드된 파일 URL 리스트
  const {loading, req } = useAxios();

  useEffect(() => {
    // console.log("ReviewForm에 전달된 productId:", productId);
  }, [productId]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // 선택한 파일 리스트 저장
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  
  
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!mno) {
      alert("로그인이 필요합니다!");
      return;
    }
    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
  
    const formData = new FormData();
    formData.append("pno", productId);
    formData.append("mno", mno);
    formData.append("content", content);
    formData.append("rating", rating);
    images.forEach((file) => formData.append("files", file));
  
    try {
      const response = await req("post", "v1/product/detail/review/register", formData, 
        { "Content-Type": "multipart/form-data" }, true);
  
  
      if (response && response.review) {
        alert("리뷰가 성공적으로 등록되었습니다!");
        setContent("");
        setImages([]);
  
        if (onReviewAdded) {
          onReviewAdded(response.review);
        }
  
        handleClose();
      } else if (response && response.reviewId) {
        req("get", `v1/product/detail/review/list/${productId}`)
          .then((updatedReviews) => {
            if (onReviewAdded) {
              updatedReviews.forEach((rev) => onReviewAdded(rev));
            }
          })
          .catch((err) => console.error("리뷰 새로고침 실패:", err));
  
        alert("리뷰가 성공적으로 등록되었습니다!");
        handleClose();
      } else {
        console.error("리뷰 등록 실패: response.review가 없음", response);
        alert("리뷰 등록 실패");
      }
    } catch (error) {
      alert("리뷰 등록 오류 발생");
      console.error("리뷰 등록 실패:", error.response?.data || error.message);
    }
  };
  

  const handleImageUpload = async (blobInfo, success, failure) => {  
    try {
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append("files", file);

      const response = await req("post", "v1/file/upload", formData, {'Content-Type' : 'multipart/form-data'}, true);

      if (response.data.length > 0) {
        const imageUrl = response.data[0].url;
        success(imageUrl);
      } else {
        failure("이미지 업로드 실패!");
      }
    } catch (error) {
      console.error("이미지 업로드 실패: ", error);
      failure("업로드 중 오류 발생");
    }
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>리뷰 작성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* 리뷰 내용 (TinyMCE 에디터) */}
          <Form.Group controlId="reviewContent" className="mt-3">
            <Form.Label>리뷰 내용</Form.Label>
            <Editor
              // apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
              apiKey={config.TINYMCE_API_KEY}
              initialValue=""
              init={{
                resize: false,
                height: 250,
                menubar: true,
                plugins: [
                  "advlist autolink lists link charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media code",
                branding: false,
                statusbar: false,
                content_style: "body { max-height: 500px; overflow-y: auto; }",
                images_upload_handler: handleImageUpload,
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
                  <img src={URL.createObjectURL(img)} alt={`review-${index}`} className="img-fluid rounded" />
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
        <Button variant="primary" onClick={handleSubmitReview} disabled={loading}>
          {loading ? "등록 중..." : "작성 완료"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewForm;
