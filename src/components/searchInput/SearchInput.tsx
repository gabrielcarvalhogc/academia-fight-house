import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    placeholder = 'Buscar por nome...',
}) => {
    return (
        <Form.Group controlId="searchInput">
            <InputGroup>
                <InputGroup.Text>
                    <i className="bi bi-search" />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </InputGroup>
        </Form.Group>
    );
};

export default SearchInput;
