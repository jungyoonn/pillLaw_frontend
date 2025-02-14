import React from 'react';
import { Link } from 'react-router-dom';
import '../../resources/css/style.css';

const Header = () => {
  return (
    <div>
      <div className="container clearfix mb-0 row" style="position: fixed; background-color: #F8F9FA; ">
        <div className="container clearfix">
          <div className="row">
            <div className="col-3 p-0">
              <Link to="#" className="float-start m-2"><img className="img-fluid header-icon" src="../../resources/image/pilllaw_icon_crop.png" alt="아이콘" /></Link>
              <h2 className="float-start mt-4 ms-3 pt-3 fw-bold"><Link className="text-decoration-none header-font " to="#">PILL LAW</Link></h2>
            </div>
            <div className="col">
              <div className="float-start py-4 ps-5">
                <h6 className="float-start m-4 text-center fw-bold"><Link className="text-decoration-none header-font pt-4" to="#">전체 상품</Link></h6>
                <h6 className="float-start m-4 text-center fw-bold"><Link className="text-decoration-none header-font pt-4" to="#">구독하기</Link></h6>
                <h6 className="float-start m-4 text-center fw-bold"><Link className="text-decoration-none header-font pt-4" to="#">필로</Link></h6>
                <h6 className="float-start m-4 text-center fw-bold"><Link className="text-decoration-none header-font pt-4" to="#">마이페이지</Link></h6>
              </div>
              <div className="float-end py-4">
                <i className="fa-solid fa-user fa-lg header-font float-end mx-2 pt-4 text-center"></i>
                <i className="fa-solid fa-cart-shopping fa-lg header-font float-end mx-2 pt-4 text-center"></i>
                <i className="fa-solid fa-bell fa-lg header-font float-end mx-2 pt-4 text-center"></i>
                <i className="fa-solid fa-magnifying-glass fa-lg header-font float-end mx-2 pt-4 text-center"></i>
                <i className="fa-solid fa-comment-dots fa-lg header-font float-end mx-2 pt-4 text-center"></i>
                <p className="float-end mx-2 pt-4 text-center fw-bold fs-12"><Link className="header-font pt-3" to="#">회원가입</Link></p>
                <p className="float-end pt-4 text-center fw-bold fs-12"><Link className="header-font pt-3" to="#">로그인</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
