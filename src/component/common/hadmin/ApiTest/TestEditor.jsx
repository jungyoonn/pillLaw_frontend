import React from 'react';

const TestEditor = () => {
  const editorRef = useRef(null);

  const logContent = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div>
      <Editor
        apiKey="uzb7mzqvze4iw0jm2jl00qyohdciwzmoq47xt1j3pjoxmok9" // API 키 입력 (없어도 동작은 함)
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>여기에 글을 작성하세요!</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
      />
      <button onClick={logContent}>콘솔에 내용 출력</button>
    </div>
     );
};

export default TestEditor;
