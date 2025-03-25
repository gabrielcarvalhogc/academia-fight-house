import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Product, ProductFormData } from '../../types/productTypes';

interface ProductFormProps {
    initialData?: Product;
    isEditing: boolean;
    onSubmit: (formData: ProductFormData) => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    isEditing,
    onSubmit,
    onCancel
}) => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        category: '',
        size: '',
        code: '',
        image: null
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description,
                category: initialData.category,
                size: initialData.size,
                code: initialData.code,
                image: null
            });
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            image: file
        }));
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = 'Nome é obrigatório';
        }

        if (!formData.category.trim()) {
            errors.category = 'Categoria é obrigatória';
        }

        if (!formData.code) {
            errors.code = 'Código é obrigatório';
        } else if (isNaN(Number(formData.code))) {
            errors.code = 'Código deve ser um número';
        }

        if (!formData.image && !isEditing) {
            errors.image = 'Imagem é obrigatória';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nome *</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={!!validationErrors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {validationErrors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Categoria *</Form.Label>
                <Form.Control
                    as="select"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    isInvalid={!!validationErrors.category}
                    placeholder="Selecione uma categoria"
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="luvas">Luvas</option>
                    <option value="caneleiras">Caneleiras</option>
                    <option value="acessorios">Acessórios</option>
                    <option value="manoplas/apareadores">Manoplas/Aparadores</option>
                    <option value="protetores">Protetores</option>
                    <option value="outros">Outros</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {validationErrors.category}
                </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tamanho</Form.Label>
                        <Form.Control
                            type="text"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.size}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Código *</Form.Label>
                        <Form.Control
                            type="number"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.code}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.code}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>
                    Imagem * {isEditing ? '(Deixe em branco para manter a imagem atual)' : ''}
                </Form.Label>
                <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    isInvalid={!!validationErrors.image}
                />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit">
                    {isEditing ? 'Atualizar' : 'Adicionar'}
                </Button>
            </div>
        </Form>
    );
};

export default ProductForm;