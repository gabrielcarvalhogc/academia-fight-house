import React, { useState, useEffect, useCallback } from 'react';
import { Card, Spinner, Row, Col, Container } from 'react-bootstrap';
import Header from '../../components/header/Header';
import CustomPagination from '../../components/pagination/CustonPagination';
import newsService from '../../services/newsService';
import { News } from '../../types/newsType';
import Footer from '../../components/footer/Footer';
import EmptyState from '../../components/emptyState/EmptyState';

export default function BlogPage() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const loadPage = useCallback(async () => {
        setLoading(true);
        try {
            const resp = await newsService.getAll(page, pageSize, 'date,desc');
            setNewsList(resp.content);
            setTotalPages(resp.totalPages);
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize]);

    useEffect(() => {
        loadPage();
    }, [loadPage]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <>
            <Header />

            <main
                style={{
                    marginTop: '111px',
                    backgroundColor: 'var(--gray)',
                    fontFamily: 'var(--font-text)',
                    height: 'calc(100vh - 400px)',
                }}
                className="px-3"
            >
                <Container>
                    <h1 style={{ fontFamily: 'var(--font-title)' }} className="py-4">
                        Últimas notícias
                    </h1>

                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" />
                        </div>
                    ) : newsList.length > 0 ? (
                        <>
                            <Row xs={1} md={2} lg={3} className="g-5">
                                {newsList.map((news) => (
                                    <Col key={news.id}>
                                        <div 
                                            className="rounded-4" 
                                            style={{ minWidth: '200px', backgroundColor: 'white', border: "1px solid #000", boxShadow : "5px 5px 8px rgba(0, 0, 0, 0.38)" }}
                                        >
                                            {news.image && (
                                                <Card.Img
                                                    variant="top"
                                                    src={news.image}
                                                    style={{ objectFit: 'cover', height: '200px' }}
                                                    className='rounded-top-4'
                                                />
                                            )}
                                            <Card.Body>
                                                <Card.Title style={{fontFamily: "var(--font-text)"}} className='fs-6 py-3 px-2 text-center'>{news.title}</Card.Title>
                                            </Card.Body>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            <div className="d-flex justify-content-center mt-4">
                                <CustomPagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </>
                    ) : (
                        <EmptyState/>
                    )}
                </Container>
            </main>
            <Footer/>
        </>
    );
}
