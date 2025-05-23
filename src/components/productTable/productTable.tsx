import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Product } from '../../types/productTypes';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    loading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
    products,
    onEdit,
    onDelete,
    loading
}) => {
    if (loading) {
        return <div className="text-center py-4">Carregando produtos...</div>;
    }

    if (!products || products.length === 0) {
        console.log(products);
        return <div className="text-center py-4">Nenhum produto encontrado.</div>;
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Tamanho</th>
                    <th>Código</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.size}</td>
                        <td>{product.code}</td>
                        <td>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => onEdit(product)}
                                >
                                    Alterar
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => onDelete(product.id)}
                                >
                                    Excluir
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProductTable;