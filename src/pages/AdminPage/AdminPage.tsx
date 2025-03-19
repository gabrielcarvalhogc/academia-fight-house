import React, { useCallback, useEffect, useState } from 'react';
import AdminLogin from '../../components/adminLogin/AdminLogin';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useAuth } from '../../hooks/useAuth.ts';
import { Product, ProductFormData } from '../../types/productTypes.ts';
import productService from '../../services/productService.ts';
import ProductTable from '../../components/productTable/productTable.tsx';
import CustomPagination from '../../components/pagination/CustonPagination.tsx';
import ProductModal from '../../components/productModal/ProductModal.tsx';
import FeedbackMessageComponent from '../../components/feedback/FeedbackMessageComponent.tsx';
import { FeedbackMessage } from '../../types/feedback.ts';


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

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<FeedbackMessage>({
        message: '',
        type: ''
    });

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);            
            const response = await productService.getProducts(
                pageInfo.currentPage,
                pageInfo.pageSize
            );
            
            //console.log('Resposta da API:', JSON.stringify(response));
            
            // Verificação para diferentes formatos de resposta
            if (response) {
                if (Array.isArray(response)) {
                    // Se a resposta já é um array, use-a diretamente
                    setProducts(response);
                    setPageInfo({
                        ...pageInfo,
                        totalPages: 1 // Assume uma única página se não há informação de paginação
                    });
                } else if (response && Array.isArray(response.content)) {
                    // Se a resposta é um objeto com a propriedade content como array
                    setProducts(response.content);
                    setPageInfo({
                        currentPage: response.number || 0,
                        totalPages: response.totalPages || 1,
                        pageSize: response.size || 10
                    });
                } else {
                    console.warn('Formato de resposta não reconhecido:', response);
                    setProducts([]); 
                }
            } else {
                console.warn('Resposta da API vazia');
                setProducts([]);
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
    }, [pageInfo.currentPage, pageInfo.pageSize]);

    useEffect(() => {
    }, [token]);

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
                    // Armazena o token em um cookie com expiração de 3 horas (3/24 = 0.125 dias)
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

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await productService.deleteProduct(id);
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
            <Card>
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

                    {loading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" size="sm" className="me-2" />
                            Carregando produtos...
                        </div>
                    ) : products && products.length > 0 ? (
                        <ProductTable
                            products={products}
                            onEdit={openEditModal}
                            onDelete={handleDeleteProduct}
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
        </Container>
    );
};

export default AdminPage;