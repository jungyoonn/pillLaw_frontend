export const formatDate = (dateString) => {
    const date = new Date(dateString); // 서버에서 받은 날짜 문자열을 Date 객체로 변환
    const year = date.getFullYear().toString().slice(-2);  // '25' 형태
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // '02' 형태
    const day = date.getDate().toString().padStart(2, '0');  // '25' 형태
    return `${year}/${month}/${day}`;
  };

  export const formatDateTime = (dateString) => {
    const date = new Date(dateString); // 서버에서 받은 날짜 문자열을 Date 객체로 변환
    const year = date.getFullYear().toString().slice(-2);  // '25' 형태
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // '02' 형태
    const day = date.getDate().toString().padStart(2, '0');  // '25' 형태
    const hours = date.getHours().toString().padStart(2, '0');  // '13' 형태
    const minutes = date.getMinutes().toString().padStart(2, '0');  // '33' 형태
    return `${year}/${month}/${day} ${hours}:${minutes}`;
};