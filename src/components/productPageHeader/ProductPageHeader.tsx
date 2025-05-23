import React, { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import LogoFightHouse from '../../assets/logo-fight-house-pequeno.png';
import { Spinner, Alert } from 'react-bootstrap';

interface NavScrollExampleProps {
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    onSearchSubmit: (e: FormEvent) => void;
    loading: boolean;
}

function ProductPageHeader({ searchTerm, onSearchTermChange, onSearchSubmit, loading }: NavScrollExampleProps) {
    return (
        <header>
            <Navbar style={{ backgroundColor: 'var(--yellow)' }}>
                <Container fluid className='d-flex justify-content-between'>
                    <Navbar.Brand href='/'>
                        <img
                            src={LogoFightHouse}
                            alt='Logo da Fight House'
                            height={85}
                            width={80}
                        />
                    </Navbar.Brand>

                    <Navbar.Collapse id='navbarScroll' className='justify-content-end'>
                        <Form onSubmit={onSearchSubmit} className='d-flex'>
                            <Form.Control
                                type='search'
                                placeholder='Procurando por algo?'
                                className='me-2'
                                aria-label='Search'
                                value={searchTerm}
                                onChange={e => onSearchTermChange(e.currentTarget.value)}
                            />
                            <Button type='submit' variant='dark' disabled={loading}>
                                {loading ? <Spinner animation='border' size='sm' /> : 'Pesquisar'}
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default ProductPageHeader;