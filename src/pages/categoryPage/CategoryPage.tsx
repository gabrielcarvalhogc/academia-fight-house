import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Breadcrumb, Row, Col } from 'react-bootstrap';
import { productService } from '../../services/productService';
import ProductCard from '../../components/productCard/ProductCard';
import { Product } from '../../types/productTypes';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                if (category) {
                    const items = await productService.getProductsByCategory(category);
                    setProducts(items);
                    console.log(products)
                }
            } catch (err) {
                setError('Erro ao carregar produtos da categoria');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [category]);

    if (loading) return <div className="text-center py-5">Carregando produtos...</div>;
    if (error) return <div className="text-center py-5 text-danger">{error}</div>;

    return (
        <>
            <Header />
            <Container style={{ marginTop: "130px", marginBottom: "15px" }}>
                <h1 className="text-uppercase" style={{ fontFamily: 'var(--font-title)' }}>{category}</h1>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                        Voltar
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{category}</Breadcrumb.Item>
                </Breadcrumb>

                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {products.map(product => (
                        <Col key={product.id} className="d-flex justify-content-center">
                            <ProductCard
                                imageSrc={product.imageURL}
                                title={product.name}
                                size={product.size || ''}
                                code={`Cód. ${product.code}`}
                                available={product.available}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default CategoryPage;