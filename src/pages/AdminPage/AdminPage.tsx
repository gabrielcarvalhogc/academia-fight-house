import React, { useCallback, useEffect, useState } from 'react';
import AdminLogin from '../../components/adminLogin/AdminLogin';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useAuth } from '../../hooks/useAuth.ts';
import { Product, ProductFormData } from '../../types/productTypes.ts';
import productService from '../../services/productService.ts';
import ProductTable from '../../components/productTable/productTable.tsx';
import CustomPagination from '../../components/pagination/CustonPagination.tsx';
import ProductModal from '../../components/productModal/ProductModal.tsx';
import FeedbackMessageComponent from '../../components/feedback/FeedbackMessageComponent.tsx';
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import { FeedbackMessage } from '../../types/feedback.ts';
import DeleteConfirmationModal from '../../components/deleteConfirmationModal/DeleteConfirmationModal'; // Importe o modal criado

const AdminPage: React.FC = () => {
    const { token, setToken, isLoading: isAuthLoading } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageInfo, setPageInfo] = useState<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
    }>({
        currentPage: 0,
        totalPages: 1,
        pageSize: 10
    });
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<FeedbackMessage>({
        message: '',
        type: ''
    });
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            if (selectedCategory) {
                const filteredProducts = await productService.getProductsByCategory(selectedCategory);
                setProducts(filteredProducts);
                setPageInfo({
                    currentPage: 0,
                    totalPages: 1,
                    pageSize: filteredProducts.length || 10
                });
            } else {
                const response = await productService.getProducts(
                    pageInfo.currentPage,
                    pageInfo.pageSize
                );

                if (response && response._embedded && response._embedded.productResponseDTOList) {
                    setProducts(response._embedded.productResponseDTOList);

                    if (response.page) {
                        setPageInfo({
                            currentPage: response.page.number,
                            totalPages: response.page.totalPages,
                            pageSize: response.page.size
                        });
                    }
                } else {
                    console.warn('Formato de resposta não reconhecido ou lista vazia:', response);
                    setProducts([]);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            setFeedback({
                message: 'Não foi possível carregar os produtos. Por favor, tente novamente.',
                type: 'danger'
            });
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [pageInfo.currentPage, pageInfo.pageSize, selectedCategory]);

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
                    Cookies.set("jwtToken", newToken, { expires: 0.125, path: "/admin" });
                    setToken(newToken);
                }}
            />
        );
    }

    const handlePageChange = (page: number) => {
        setPageInfo(prev => ({
            ...prev,
            currentPage: page
        }));
    };

    const handlePageSizeChange = (event: React.ChangeEvent<any>) => {
        const target = event.target as HTMLSelectElement;
        setPageInfo(prev => ({
            ...prev,
            pageSize: Number(target.value),
            currentPage: 0
        }));
    };

    const handleCategoryChange = (event: React.ChangeEvent<any>) => {
        const target = event.target as HTMLSelectElement;
        setSelectedCategory(target.value);
        setPageInfo(prev => ({ ...prev, currentPage: 0 }));
    };

    const openAddModal = () => {
        setSelectedProduct(undefined);
        setIsEditing(false);
        setModalVisible(true);
    };

    const openEditModal = (product: Product) => {
        setSelectedProduct(product);
        setIsEditing(true);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleCreateProduct = async (formData: ProductFormData) => {
        try {
            await productService.createProduct(formData);
            setFeedback({
                message: 'Produto criado com sucesso!',
                type: 'success'
            });
            fetchProducts();
            closeModal();
        } catch (error) {
            setFeedback({
                message: 'Erro ao criar produto. Por favor, tente novamente.',
                type: 'danger'
            });
            throw error;
        }
    };

    const handleUpdateProduct = async (formData: ProductFormData) => {
        if (!selectedProduct) return;

        try {
            await productService.updateProduct(selectedProduct.id, formData);
            setFeedback({
                message: 'Produto atualizado com sucesso!',
                type: 'success'
            });
            fetchProducts();
            closeModal();
        } catch (error) {
            setFeedback({
                message: 'Erro ao atualizar produto. Por favor, tente novamente.',
                type: 'danger'
            });
            throw error;
        }
    };

    const handleDeleteClick = (productId: string) => {
        const product = products.find(p => p.id === productId) || null;
        setProductToDelete(product);
    };

    const confirmDeleteProduct = async () => {
        if (productToDelete) {
            try {
                await productService.deleteProduct(productToDelete.id);
                setFeedback({
                    message: 'Produto excluído com sucesso!',
                    type: 'success'
                });
                fetchProducts();
            } catch (error) {
                setFeedback({
                    message: 'Erro ao excluir produto. Por favor, tente novamente.',
                    type: 'danger'
                });
            } finally {
                setProductToDelete(null);
            }
        }
    };

    const handleSubmitProduct = async (formData: ProductFormData) => {
        if (isEditing) {
            await handleUpdateProduct(formData);
        } else {
            await handleCreateProduct(formData);
        }
    };

    const clearFeedback = () => {
        setFeedback({ message: '', type: '' });
    };

    return (
        <Container className="py-4">
            <Card className='w-100'>
                <Card.Body>
                    <Row className="mb-4 align-items-center">
                        <Col>
                            <h2 className="mb-0">Gerenciamento de Produtos</h2>
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" onClick={openAddModal}>
                                Adicionar Produto
                            </Button>
                        </Col>
                    </Row>

                    <FeedbackMessageComponent
                        feedback={feedback}
                        onClear={clearFeedback}
                    />

                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group controlId="pageSizeSelect">
                                <Form.Label>Itens por página:</Form.Label>
                                <Form.Control as="select" value={pageInfo.pageSize} onChange={handlePageSizeChange}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <CategoryFilter
                                selectedCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                            />
                        </Col>
                    </Row>

                    {loading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" size="sm" className="me-2" />
                            Carregando produtos...
                        </div>
                    ) : products && products.length > 0 ? (
                        <ProductTable
                            products={products}
                            onEdit={openEditModal}
                            onDelete={handleDeleteClick}
                            loading={false}
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
        </Container>
    );
};

export default AdminPage;