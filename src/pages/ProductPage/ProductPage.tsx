import React, { useEffect, useState } from "react";
import ProductPageHeader from "../../components/productPageHeader/ProductPageHeader";
import CategoryNavBar from "../../components/categoryNavBar/CategoryNavBar";
import productService from "../../services/productService";
import { Container } from "react-bootstrap";
import CategoryProductSlider from "../../components/productCategorySlider/ProductCategorySlider";

function ProductPage() {

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // This is a simplified example. You might need to implement 
        // a specific endpoint that returns all categories
        const products = await productService.getProducts(0, 100);

        // Extract unique categories from products
        const uniqueCategories = [...new Set(
          products._embedded?.productResponseDTOList?.map(product => product.category) || []
        )];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setLoading(false);
      }
    };

    loadCategories();
  }, []);
  if (loading) {
    return <Container className="py-5 text-center">Carregando categorias de produtos...</Container>;
  }
  return (
    <>
      <ProductPageHeader />
      <main className="" style={{ backgroundColor: "#F5F5F5" }}>
        <CategoryNavBar />
        <h1 className="text-center fw-bold py-4" style={{ fontFamily: "var(--font-title)" }}>PRODUTOS PULSER</h1>
        <Container fluid className="py-4">
          {categories.map(category => (
            <CategoryProductSlider
              key={category}
              category={category}
              title={category.toUpperCase()}
            />
          ))}
        </Container>
      </main>
    </>
  );
}

export default ProductPage;
