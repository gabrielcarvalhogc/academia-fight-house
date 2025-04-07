import React from "react";
import ProductPageHeader from "../../components/productPageHeader/ProductPageHeader";
import CategoryNavBar from "../../components/categoryNavBar/CategoryNavBar";

function ProductPage() {
  return (
    <>
      <ProductPageHeader />
      <CategoryNavBar/>
      <h1 className="text-center fw-bold py-4" style={{fontFamily: "var(--font-title)"}}>PRODUTOS PULSER</h1>
    </>
  );
}

export default ProductPage;
