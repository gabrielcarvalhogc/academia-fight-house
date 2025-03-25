// CategoryFilter.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (event: React.ChangeEvent<any>) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
    return (
        <Form.Group controlId="categorySelect">
            <Form.Label>Categoria:</Form.Label>
            <Form.Control as="select" value={selectedCategory} onChange={onCategoryChange}>
                <option value="">Todas</option>
                <option value="Luvas">Luvas</option>
                <option value="Caneleiras">Caneleiras</option>
                <option value="Acessorios">Acessorios</option>
                <option value="Manoplas/Aparadores">Manoplas/Aparadores</option>
                <option value="Protetores">Protetores</option>
                <option value="Outros">Outros</option>
            </Form.Control>
        </Form.Group>
    );
};

export default CategoryFilter;
