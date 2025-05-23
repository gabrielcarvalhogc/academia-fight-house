import React from 'react';
import { Modal } from 'react-bootstrap';
import ProductForm from '../productForm/ProductForm';
import { Product, ProductFormData } from '../../types/productTypes';

interface ProductModalProps {
    show: boolean;
    onHide: () => void;
    product?: Product;
    isEditing: boolean;
    onSubmit: (formData: ProductFormData) => Promise<void>;
}

const ProductModal: React.FC<ProductModalProps> = ({
    show,
    onHide,
    product,
    isEditing,
    onSubmit
}) => {
    const handleFormSubmit = async (formData: ProductFormData) => {
        try {
            await onSubmit(formData);
            onHide();
        } catch (error) {
            // O erro será tratado pelo componente pai
            console.error('Erro ao submeter formulário:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            backdrop="static"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProductForm
                    initialData={product}
                    isEditing={isEditing}
                    onSubmit={handleFormSubmit}
                    onCancel={onHide}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;