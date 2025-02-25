import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useAxios from "./useAxios";

const ReviewEditor = ({ productId }) => {
  const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용 상태
  const [loading, setLoading] = useState(false);
  const { req } = useAxios(); // useAxios 활용

  // 🔹 TINYMCE 이미지 업로드 핸들러
  const handleImageUpload = async (blobInfo, success, failure) => {
    try {
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append("files", file);

      // 🔥 useAxios의 req 함수 사용
      const response = await req("POST", "v1/file/upload", formData, {
        "Content-Type": "multipart/form-data",
      });

      if (response.length > 0) {
        success(response[0].url); // 업로드된 이미지 URL을 에디터에 삽입
      } else {
        failure("업로드 실패!");
      }
    } catch (error) {
      console.error("이미지 업로드 실패: ", error);
      failure("업로드 중 오류 발생");
    }
  };

  // 🔹 리뷰 등록 요청
  const handleSubmitReview = async () => {
    if (!reviewContent.trim()) {
      alert("리뷰 내용을 입력해주세요!");
      return;
    }

    setLoading(true);
    try {
      // 🔥 useAxios의 req 함수 사용
      await req("POST", "v1/review", {
        productId,
        content: reviewContent,
      });

      alert("리뷰가 성공적으로 등록되었습니다!");
      setReviewContent(""); // 입력 필드 초기화
    } catch (error) {
      console.error("리뷰 등록 실패: ", error);
      alert("리뷰 등록 중 오류 발생!");
    }
    setLoading(false);
  };

  return (
    <div>
      <Editor
        apiKey="your-tinymce-api-key"
        value={reviewContent}
        onEditorChange={setReviewContent}
        init={{
          height: 500,
          menubar: false,
          plugins: "image code",
          toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code image",
          images_upload_handler: handleImageUpload, // 이미지 업로드 핸들러 추가
        }}
      />
      <button onClick={handleSubmitReview} disabled={loading}>
        {loading ? "등록 중..." : "리뷰 등록"}
      </button>
    </div>
  );
};

export default ReviewEditor;
