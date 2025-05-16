import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Form, Spinner } from 'react-bootstrap';
import Cookies from 'js-cookie';

import AdminLogin from '../../components/adminLogin/AdminLogin';
import ProductTable from '../../components/productTable/productTable';
import CustomPagination from '../../components/pagination/CustonPagination';
import ProductModal from '../../components/productModal/ProductModal';
import FeedbackMessageComponent from '../../components/feedback/FeedbackMessageComponent';
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import DeleteConfirmationModal from '../../components/deleteConfirmationModal/DeleteConfirmationModal';
import SearchInput from '../../components/searchInput/SearchInput';
import BlogModal from '../../components/blogModal/BlogModal';
import { useAuth } from '../../hooks/useAuth';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import BlogTable from '../../components/blogTable/BlogTable';
import newsService from '../../services/newsService';
import { NewsFormData } from '../../types/newsType';
import { News } from '../../types/newsType';

const AdminPage: React.FC = () => {
    const { token, setToken, isLoading: isAuthLoading } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const {
        products,
        loading,
        pageInfo,
        feedback,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        setPageInfo,
        setFeedback,
    } = useAdminProducts(selectedCategory, searchTerm);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(undefined);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [productToDelete, setProductToDelete] = useState<any>(null);

    // Estado e lógica para notícias
    const [newsList, setNewsList] = useState<News[]>([]);
    const [newsLoading, setNewsLoading] = useState<boolean>(false);
    const [blogModalVisible, setBlogModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuthLoading && token) {
            fetchProducts();
            loadNews();
        }
    }, [token, isAuthLoading, fetchProducts]);

    const loadNews = async () => {
        try {
            setNewsLoading(true);
            const allNews = await newsService.getAll();
            setNewsList(allNews);
        } catch (error) {
            console.error('Erro ao carregar notícias', error);
        } finally {
            setNewsLoading(false);
        }
    };

    if (isAuthLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
            </div>
        );
    }

    if (!token) {
        return (
            <AdminLogin
                onLoginSuccess={(newToken) => {
                    Cookies.set('jwtToken', newToken, { expires: 0.125, path: '/admin' });
                    setToken(newToken);
                }}
            />
        );
    }

    const handlePageChange = (page: number) => {
        setPageInfo((prev) => ({ ...prev, currentPage: page }));
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageInfo((prev) => ({
            ...prev,
            pageSize: Number(event.target.value),
            currentPage: 0,
        }));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        setPageInfo((prev) => ({ ...prev, currentPage: 0 }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPageInfo((prev) => ({ ...prev, currentPage: 0 }));
    };

    const openModal = (product?: any) => {
        setSelectedProduct(product);
        setIsEditing(!!product);
        setModalVisible(true);
    };

    const closeModal = () => setModalVisible(false);

    const handleSubmitProduct = async (formData: any) => {
        if (isEditing && selectedProduct) {
            await updateProduct(selectedProduct.id, formData);
        } else {
            await createProduct(formData);
        }
        closeModal();
    };

    const handleDeleteClick = (productId: string) => {
        const product = products.find((p: any) => p.id === productId) || null;
        setProductToDelete(product);
    };

    const confirmDeleteProduct = async () => {
        if (productToDelete) {
            await deleteProduct(productToDelete.id);
            setProductToDelete(null);
        }
    };

    const clearFeedback = () => setFeedback({ message: '', type: '' });

    // Notícia handlers
    const openBlogModal = () => setBlogModalVisible(true);
    const closeBlogModal = () => setBlogModalVisible(false);
    const handleSubmitNews = async (formData: NewsFormData) => {
        try {
            await newsService.create(formData);
            await loadNews();
            closeBlogModal();
        } catch (error) {
            console.error('Erro ao criar notícia', error);
        }
    };

    return (
        <Container className="py-4">
            <Card className="w-100">
                <Card.Body>
                    <Row className="mb-4 align-items-center">
                        <Col>
                            <h2 className="mb-0">Gerenciamento de Produtos</h2>
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" onClick={() => openModal()}>
                                Adicionar Produto
                            </Button>
                        </Col>
                    </Row>

                    <FeedbackMessageComponent feedback={feedback} onClear={clearFeedback} />

                    <Row className="mb-4">
                        <Col md={4}>
                            <Form.Group controlId="pageSizeSelect">
                                <Form.Label>Itens por página:</Form.Label>
                                <Form.Select value={pageInfo.pageSize} onChange={handlePageSizeChange}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <CategoryFilter
                                selectedCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                            />
                        </Col>
                    </Row>
                    <div className='my-4 w-25'>
                        <SearchInput value={searchTerm} onChange={handleSearchChange} />
                    </div>

                    {loading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" size="sm" className="me-2" />
                            Carregando produtos...
                        </div>
                    ) : products && products.length > 0 ? (
                        <ProductTable
                            products={products}
                            onEdit={openModal}
                            onDelete={handleDeleteClick}
                            loading={loading}
                        />
                    ) : (
                        <div className="text-center py-4">Nenhum produto encontrado.</div>
                    )}

                    {!loading && products && products.length > 0 && (
                        <CustomPagination
                            currentPage={pageInfo.currentPage}
                            totalPages={pageInfo.totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </Card.Body>
            </Card>

            <Card className='w-100 my-5 bg-secondary-subtle'>
                <Card.Body>
                    <Row className="mb-4 align-items-center">
                        <Col>
                            <h2 className="mb-0">Blog</h2>
                        </Col>
                        <Col xs="auto">
                            <Button variant="secondary" onClick={openBlogModal}>
                                Adicionar notícia
                            </Button>
                        </Col>
                    </Row>

                    <div className="mb-4">
                        <Form.Group controlId="pageSizeSelectBlog" className="w-25">
                            <Form.Label>Itens por página:</Form.Label>
                            <Form.Select value={pageInfo.pageSize} onChange={handlePageSizeChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </Form.Select>
                        </Form.Group>
                    </div>

                    {newsLoading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" size="sm" className="me-2" />
                            Carregando notícias...
                        </div>
                    ) : newsList.length > 0 ? (
                        <BlogTable 
                            news={newsList} 
                            onEdit={(newsItem) => console.log('Edit news:', newsItem)} 
                            onDelete={(newsItem) => console.log('Delete news:', newsItem)} 
                        />
                    ) : (
                        <div className="text-center py-4">Nenhuma notícia encontrada.</div>
                    )}

                    {!newsLoading && newsList.length > 0 && (
                        <CustomPagination
                            currentPage={pageInfo.currentPage}
                            totalPages={pageInfo.totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </Card.Body>
            </Card>

            <ProductModal
                show={modalVisible}
                onHide={closeModal}
                product={selectedProduct}
                isEditing={isEditing}
                onSubmit={handleSubmitProduct}
            />

            <DeleteConfirmationModal
                show={!!productToDelete}
                productName={productToDelete?.name}
                onConfirm={confirmDeleteProduct}
                onCancel={() => setProductToDelete(null)}
            />

            <BlogModal
                show={blogModalVisible}
                onHide={closeBlogModal}
                onSubmit={handleSubmitNews}
            />
        </Container>
    );
};

export default AdminPage;
