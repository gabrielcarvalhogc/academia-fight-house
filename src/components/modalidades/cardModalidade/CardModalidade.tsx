import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardModalidade.css';

function CardModalidade({ titulo, imagem, dias, horarios, subtitulo, descricao, isLast }) {
    return (
        <Card  
            className='card text-black mx-auto rounded-4 scroll-reveal-from-left'
        >
            <Card.Title 
                className='card-title text-center text-uppercase fs-3 p-3'
            >
                {titulo}
            </Card.Title>

            <Card.Img src={imagem} className='card-img rounded-0' />
            <Card.ImgOverlay className='d-flex flex-column justify-content-center align-self-center' style={{ marginTop: '73px', width: '350px', height: '150px' }}>
                {isLast ? (
                    <Button 
                        href="https://wa.link/xclo31"
                        target='_blank' 
                        className="personal-button p-3 text-black fw-bold fs-6 m-auto"
                    >
                        <i className="bi bi-whatsapp pe-2"></i> 
                        Falar com personal
                    </Button>
                ) : (
                    <Card.Title 
                        className='text-uppercase fs-4 text-black'
                        style={{ fontFamily: 'var(--font-title)' }}
                    >
                        {dias.map((dia, i) => (
                            <div key={i} className='text-center'>{dia} - {horarios[i]}</div>
                        ))}
                    </Card.Title>
                )}
            </Card.ImgOverlay>
            <Card.Body className='card-body text-center'>
                <Card.Subtitle className='fw-bold fs-4 pb-2'>{subtitulo}</Card.Subtitle>
                <Card.Text>
                    {descricao}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardModalidade;
