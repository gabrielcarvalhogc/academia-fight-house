import React, { useState, useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { productService } from '../../services/productService';
import ProductCard from '../../components/productCard/ProductCard';
import { Product } from '../../types/productTypes';
import { useNavigate } from 'react-router-dom';

interface CategorySliderProps {
    category: string;
    title?: string;
}

const CategoryProductSlider: React.FC<CategorySliderProps> = ({ category, title }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const categoryProducts = await productService.getProductsByCategory(category);
                setProducts(categoryProducts);
            } catch (err) {
                setError('Erro ao carregar produtos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) return <div className="text-center py-5">Carregando produtos...</div>;
    if (error) return <div className="text-center py-5 text-danger">{error}</div>;

    const displayProducts = products.slice(0, 5);

    return (
        <Container fluid className="my-4 px-3">
            <div className='d-flex justify-content-between align-items-center mb-4' style={{ maxWidth: '1100px' }}>
                <h2 className="text-uppercase" id={category} style={{ fontFamily: 'var(--font-title)' }}>
                    {category || title}
                </h2>
                <Button variant="dark" onClick={() => navigate(`/${category}`)}>
                    Ver todos
                </Button>
            </div>
            <div className="position-relative">
                <div
                    ref={sliderRef}
                    className="d-flex overflow-auto py-2 gap-4"
                    style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {displayProducts.map(product => (
                        <div key={product.id} className="flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                            <ProductCardWrapper product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

const ProductCardWrapper: React.FC<{ product: Product }> = ({ product }) => (
    <ProductCard
        imageSrc={product.imageURL}
        title={product.name}
        size={product.size || ''}
        code={`Cód. ${product.code}`}
    />
);

export default CategoryProductSlider;