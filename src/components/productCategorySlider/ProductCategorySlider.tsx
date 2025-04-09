import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { productService } from '../../services/productService';
import ProductCard from '../../components/productCard/ProductCard';
import { Product } from '../../types/productTypes';

interface CategorySliderProps {
    category: string;
    title?: string;
}

const CategoryProductSlider: React.FC<CategorySliderProps> = ({ category, title }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Fetch products by category
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const categoryProducts = await productService.getProductsByCategory(category);
                setProducts(categoryProducts);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar produtos');
                setLoading(false);
                console.error(err);
            }
        };

        fetchProducts();
    }, [category]);
    
    if (loading) {
        return <div className="text-center py-5">Carregando produtos...</div>;
    }

    if (error) {
        return <div className="text-center py-5 text-danger">{error}</div>;
    }

    if (products.length === 0) {
        return <div className="text-center py-3">Nenhum produto encontrado nesta categoria.</div>;
    }

    // Display only first 5 products
    const displayProducts = products.slice(0, 5);

    return (
        <Container fluid className="my-4 px-3">
            <h2 className="text-uppercase mb-4" id={category} style={{ fontFamily: "var(--font-title)" }}>{title || category}</h2>

            <div className="position-relative">
                <div
                    ref={sliderRef}
                    className="d-flex overflow-auto py-2 gap-4"
                    style={{
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {displayProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex-shrink-0"
                            style={{
                                scrollSnapAlign: 'start',
                            }}
                        >
                            <ProductCardWrapper product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

// Wrapper for your ProductCard that passes the proper props
const ProductCardWrapper: React.FC<{ product: Product }> = ({ product }) => {
    // This component adapts your existing ProductCard to work with the data structure
    return (
        <ProductCard
            imageSrc={product.imageURL}
            title={product.name}
            size={product.size || ''}
            code={`Cód. ${product.code}`}
        />
    );
};

export default CategoryProductSlider;