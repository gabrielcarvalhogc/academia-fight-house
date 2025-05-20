import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { NewsFormData, News } from '../../types/newsType';

interface BlogModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (data: NewsFormData) => void;
    newsItem?: News;
    isEditing?: boolean;
}

const BlogModal: React.FC<BlogModalProps> = ({
    show,
    onHide,
    onSubmit,
    newsItem,
    isEditing = false
}) => {
    const [formData, setFormData] = useState<NewsFormData>({
        title: '',
        imageFile: undefined,
        author: '',
        date: '',
        content: '',
    });

    useEffect(() => {
        if (isEditing && newsItem) {
            setFormData({
                title: newsItem.title,
                author: newsItem.author,
                date: newsItem.date,
                content: newsItem.content,
                imageFile: undefined
            });
        } else {
            setFormData({
                title: '',
                imageFile: undefined,
                author: '',
                date: '',
                content: '',
            });
        }
    }, [isEditing, newsItem, show]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData((prev) => ({ ...prev, imageFile: file }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Form onSubmit={handleSubmit}>
                <Modal.Header className="bg-primary text-white" closeButton>
                    <Modal.Title>
                        {isEditing ? 'Editar notícia' : 'Criar nova notícia'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="newsTitle">
                        <Form.Label>Título da Notícia</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o título da notícia"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="newsImage">
                        <Form.Label>
                            {isEditing ? 'Atualizar imagem de capa' : 'Imagem de capa'}
                            {isEditing && <small className="text-muted ms-2">(Deixe em branco para manter a imagem atual)</small>}
                        </Form.Label>
                        <Form.Control
                            type="file"
                            name="imageFile"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="newsAuthor">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="newsDate">
                                <Form.Label>Data</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="date"
                                    placeholder="dd/mm/aaaa"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="newsContent">
                        <Form.Label>Conteúdo da notícia</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            placeholder="Escreva aqui o texto completo da notícia"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        {isEditing ? 'Atualizar' : 'Publicar'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default BlogModal;