import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MyEditor = () => {
  const editorRef = useRef(null);
  
  // const handleImageUpload = async (blobInfo, success, failure) => {
  //   console.log("업로드 시작:", blobInfo.filename());
  
  //   const tempImageUrl = URL.createObjectURL(blobInfo.blob());
  //   console.log("임시 이미지 URL:", tempImageUrl);
  
  //   try {
  //     success(tempImageUrl); // 문자열 형태로 전달
  //   } catch (error) {
  //     console.error("이미지 업로드 실패:", error);
  //     failure("업로드 실패: " + error.message);
  //   }
  // };

  const handleImageUpload = (blobInfo) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
  
      fetch('http://localhost:8080/api/upload-image', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: { 'Accept': 'application/json' },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`서버에서 이미지 업로드 실패 (HTTP ${response.status})`);
          }
          return response.json();
        })
        .then((data) => {
          if (!data.url) {
            throw new Error("서버 응답에 'url' 값이 없습니다!");
          }
          const resultUrl = "http://localhost:8080" + data.url;
          resolve(resultUrl);
        })
        .catch((error) => {
          console.error("이미지 업로드 실패:", error);
          reject("업로드 실패: " + error.message);
        });
    });
  };

  return (
    <Editor
      apiKey="uzb7mzqvze4iw0jm2jl00qyohdciwzmoq47xt1j3pjoxmok9"
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height: 500,
        menubar: true,
        plugins: 'image',
        toolbar: 'undo redo | bold italic underline strikethrough | image link',
        images_upload_handler: handleImageUpload,
        automatic_uploads: true,
        relative_urls: false,
        remove_script_host: false,
        convert_urls: false,
      }}
    />
  );
};

export default MyEditor;
