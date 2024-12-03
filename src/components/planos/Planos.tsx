import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Planos.css';
import { Col, Row } from 'react-bootstrap';

function Planos() {
    return (
        <>
            <h2
                className='card-title text-center text-uppercase my-5 fs-1 fw-bold  text-white'
                data-bs-spy="scroll" 
                data-bs-target="#navID"
                id='nossosPlanos'
            >Nossos Planos:</h2>

            <Row >

                <Col xs={12} md={6} className='mb-5' >
                    <Card className="text-center mx-auto bg-white rounded-4">
                        <Card.Header className='card-header text-uppercase p-3 rounded-top-4'>
                            <Card.Title className='card-title fs-3'>Plano mensal</Card.Title>
                        </Card.Header>
                        <Card.Body className='fs-5 text-uppercase'>
                            <Card.Text>
                                1 Modalidade:<br />
                                <i className="bi bi-cash-stack fw-bold fs-4">  R$100,00</i>
                            </Card.Text>
                            <Card.Text>
                                2 Modalidades:<br />
                                <i className="bi bi-cash-stack fw-bold fs-4">  R$145,00</i>
                            </Card.Text>
                            <Card.Text>
                                3 Modalidades:<br />
                                <i className="bi bi-cash-stack fw-bold fs-4">  R$165,00</i>
                            </Card.Text>
                            <Card.Text className='fs-6 text-lowercase'>Agende uma aula experimental</Card.Text>
                            <Button 
                                className='button p-3 rounded-4 text-black fw-bold text-uppercase'
                                href='https://wa.link/hm1e2n'
                                target='_blank'
                            >Quero começar</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} className='mb-5'>
                    <Card className="text-center mx-auto bg-white rounded-4">
                        <Card.Header className='card-header text-uppercase p-3 rounded-top-4'>
                            <Card.Title className='card-title fs-3'>Plano família</Card.Title>
                        </Card.Header>
                        <Card.Body className='fs-5 text-uppercase'>
                            <Card.Text>
                                2 Pessoas:<br />
                                <i className="bi bi-cash-stack fw-bold fs-4">  R$160,00</i>
                            </Card.Text>
                            <Card.Text>
                                3 Pessoas:<br />
                                <i className="bi bi-cash-stack fw-bold fs-4">  R$210,00</i>
                            </Card.Text>
                            <Card.Text>
                                4 Pessoas:<br />
                                <i className="bi bi-cash-stack fw-bold fs-4">  R$230,00</i>
                            </Card.Text>
                            <Card.Text className='fs-6 text-lowercase'>Agende uma aula experimental</Card.Text>
                            <Button 
                                className='button p-3 rounded-4 text-black fw-bold text-uppercase'
                                href='https://wa.link/hm1e2n'
                                target='_blank'
                            >Quero começar</Button>
                        </Card.Body>
                    </Card>
                </Col >
            </Row>
        </>
    );
}

export default Planos;