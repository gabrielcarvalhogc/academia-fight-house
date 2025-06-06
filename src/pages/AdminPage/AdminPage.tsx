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
import { useAdminNews } from '../../hooks/useAdminNews';
import BlogTable from '../../components/blogTable/BlogTable';

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

    const {
        newsList,
        loading: newsLoading,
        feedback: newsFeedback,
        modalVisible: newsModalVisible,
        deleteConfirmVisible,
        selectedNews,
        isEditing: isEditingNews,
        toDelete: newsToDelete,
        openCreate: openNewsCreate,
        openEdit: openNewsEdit,
        closeModal: closeNewsModal,
        handleSubmit: submitNews,
        openDeleteConfirm: openNewsDeleteConfirm,
        confirmDelete: confirmNewsDelete,
        clearFeedback: clearNewsFeedback,
        newsPageInfo,
        setNewsPageInfo,
    } = useAdminNews();

    useEffect(() => {
        if (!isAuthLoading && token) {
            fetchProducts();
        }
    }, [token, isAuthLoading, fetchProducts]);

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

    const handleNewsPageChange = (newPage: number) => {
        setNewsPageInfo(prev => ({ ...prev, currentPage: newPage }));
    };
    const handleNewsPageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewsPageInfo(prev => ({ ...prev, pageSize: Number(e.target.value), currentPage: 0 }));
    };

    const clearFeedback = () => setFeedback({ message: '', type: '' });

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

            <Card className="w-100 my-5 bg-secondary-subtle">
                <Card.Body>
                    <Row className="mb-4 align-items-center">
                        <Col><h2 className="mb-0">Blog</h2></Col>
                        <Col xs="auto">
                            <Button variant="secondary" onClick={openNewsCreate}>
                                Adicionar notícia
                            </Button>
                        </Col>
                    </Row>

                    <FeedbackMessageComponent feedback={newsFeedback} onClear={clearNewsFeedback} />

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Group controlId="newsPageSizeSelect">
                                <Form.Label>Itens por página:</Form.Label>
                                <Form.Select value={newsPageInfo.pageSize} onChange={handleNewsPageSizeChange}>
                                    {[5, 10, 20, 50].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    {newsLoading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" size="sm" className="me-2" />
                            Carregando notícias...
                        </div>
                    ) : newsList.length > 0 ? (
                        <>
                            <BlogTable
                                news={newsList}
                                onEdit={openNewsEdit}
                                onDelete={openNewsDeleteConfirm}
                            />

                            <div className="d-flex justify-content-center mt-3">
                                <CustomPagination
                                    currentPage={newsPageInfo.currentPage}
                                    totalPages={newsPageInfo.totalPages}
                                    onPageChange={handleNewsPageChange}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-4">Nenhuma notícia encontrada.</div>
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
                show={newsModalVisible}
                onHide={closeNewsModal}
                onSubmit={submitNews}
                newsItem={selectedNews}
                isEditing={isEditingNews}
            />

            <DeleteConfirmationModal
                show={deleteConfirmVisible}
                productName={newsToDelete?.title || 'notícia'}
                onConfirm={confirmNewsDelete}
                onCancel={closeNewsModal}
            />
        </Container>
    );
};

export default AdminPage;