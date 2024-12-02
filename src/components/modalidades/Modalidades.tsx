import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { modalidades } from '../../data/modalidades-data';
import CardModalidade from './cardModalidade/CardModalidade';

function Modalidades() {
    useEffect(() => {
        const revealCards = () => {
            const cards = document.querySelectorAll('.scroll-reveal-from-left');
            cards.forEach((card) => {
                const cardTop = card.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (cardTop < windowHeight + 200) {
                    card.classList.add('show');
                }
            });
        };

        window.addEventListener('scroll', revealCards);
        revealCards();

        return () => window.removeEventListener('scroll', revealCards);
    }, []);

    return (
        <Row className="g-4 justify-content-md-center mt-5">
            <h2 className='text-center text-uppercase my-5 fs-1 fw-bold text-white' style={{fontFamily: "var(--font-title)"}}>Nossas modalidades:</h2>
            {modalidades.map((mod, index) => (
                <Col xs={12} sm={8} md={6} lg={4} key={index} className='mx-auto'> 
                    <CardModalidade
                        titulo={mod.titulo}
                        imagem={mod.imagem}
                        dias={mod.dias}
                        horarios={mod.horarios}
                        subtitulo={mod.subtitulo}
                        descricao={mod.descricao}
                        isLast={index === modalidades.length - 1}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default Modalidades;
