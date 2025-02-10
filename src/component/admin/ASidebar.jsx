import React from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ASidebar = () => {
  return (
    <>
      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        <div className="sidebar">
          <h4 className="text-center">관리자</h4>
          <p className="text-center">admin01</p>
          <hr />
          <div className="d-flex flex-row justify-content-center gap-3">
            <Nav.Link href="/">홈페이지</Nav.Link>
            <Nav.Link href="#">로그아웃</Nav.Link>
          </div>
          <hr />
          <SidebarSection title="회원" links={["회원 조회", "탈퇴 회원", "권한 관리", "구독 이력 조회"]} />
          <SidebarSection title="매출" links={["매출 조회", "매출 비교 조회"]} />
          <SidebarSection title="주문" links={["주문 관리", "환불 관리"]} />
          <SidebarSection title="상품" links={["상품 관리", "구독자 전용 상품 관리"]} />
          <SidebarSection title="게시물" links={["작성한 글 관리", "리뷰 관리"]} />
        </div>
      </div>
    </>
  );
};

const SidebarSection = ({ title, links }) => (
  <>
    <h5 className="mt-3 mb-2">{title}</h5>
    {links.map((link, index) => (
      <Nav.Link key={index} href="#" className="d-block text-black">
        {link}
      </Nav.Link>
    ))}
    <hr />
  </>
);

export default ASidebar;
