import React from "react";
import { Link } from "react-router-dom";

const IndexItem = ({ product }) => {
  return (
    <Link to={`/product/detail/${product.pno}`} className="text-decoration-none text-black">
      <img className="img-fluid mx-2" src={product.imageUrl} alt={product.pname} />
      <p className="m-0 mt-1 fs-14 fw-bold">{product.pname}</p>
    </Link>
  );
};

export default IndexItem;
