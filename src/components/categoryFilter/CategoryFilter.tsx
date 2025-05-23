import React from 'react';
import { Form } from 'react-bootstrap';
import { productCategories } from '../../data/product-category';

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
                {productCategories.map((category, index) => (
                    <option key={index} value={category.value}>{category.name}</option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default CategoryFilter;
