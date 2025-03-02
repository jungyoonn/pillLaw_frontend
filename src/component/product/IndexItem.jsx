import React from "react";
import { Link } from "react-router-dom";

const IndexItem = ({ product }) => {
  return (
    <Link to={`/product/detail/${product.pno}`} className="text-decoration-none text-black text-center d-block">
      {product.imageUrl ? (
        <img className="img-fluid mx-2" src={product.imageUrl} alt={product.pname} />
      ) : (
        <div style={{ width: "80px", height: "80px", backgroundColor: "#f0f0f0", borderRadius: "10px" }}></div>
      )}

      <p className="m-0 mt-1 fs-12 fw-bold">{product.pname}</p>
    </Link>
  );
};

export default IndexItem;
