import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Figure, Spinner, Container } from 'react-bootstrap';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import newsService from '../../services/newsService';
import { News } from '../../types/newsType';

export default function NewsPage() {
    const { id, slug } = useParams<{ id: string, slug: string }>();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        newsService
            .getById(Number(id), slug ?? '')
            .then((data) => setNews(data))
            .catch((err) => console.error('Erro ao buscar notícia:', err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    if (!news) {
        return <p className="text-center py-5">Notícia não encontrada.</p>;
    }

    return (
        <>
            <Header />
            <main
                style={{
                    marginTop: '111px',
                    backgroundColor: 'var(--gray)',
                    fontFamily: 'var(--font-text)',
                }}
                className="px-3 py-4"
            >
                <Container>
                    <Breadcrumb className="py-3 ps-3 bg-transparent">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/blog' }}>
                            Últimas notícias
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Atual</Breadcrumb.Item>
                    </Breadcrumb>

                    <p className="ps-3 text-body-secondary">
                        Publicado em: {news.date}
                    </p>

                    <h1
                        style={{ fontFamily: 'var(--font-title)' }}
                        className="px-3 text-center fs-3"
                    >
                        {news.title}
                    </h1>

                    <Figure className="w-100 d-flex justify-content-center mb-4">
                        <Figure.Image
                            alt="Imagem de capa do blog"
                            src={news.image}
                            className="img-fluid rounded-4"
                        />
                    </Figure>

                    <Container 
                        className="px-3"
                        style={{
                            whiteSpace: 'pre-line',
                            lineHeight: 1.4,
                            marginBottom: '1rem',
                        }}
                    >
                        <p>{news.content}</p>
                        <p className="m-0 fw-bold text-end pe-3 pb-3">{news.author}</p>
                    </Container>
                </Container>
            </main>
            <Footer />
        </>
    );
}
