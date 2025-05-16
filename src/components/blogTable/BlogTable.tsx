import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { News } from '../../types/newsType';

interface BlogTableProps {
    news: News[];
    onEdit: (item: News) => void;
    onDelete: (item: News) => void;
}

const BlogTable: React.FC<BlogTableProps> = ({ news, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Data</th>
                    <th>Conteúdo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {news.map((item) => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{new Date(item.date).toLocaleDateString('pt-BR')}</td>
                        <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.content}
                        </td>
                        <td>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => onEdit(item)}
                                >
                                    Alterar
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => onDelete(item)}
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

export default BlogTable;
