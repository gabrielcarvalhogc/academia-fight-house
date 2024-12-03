import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoFightHouse from '../../assets/logo-fight-house-pequeno.png';
import './Header.css';

function Header() {
    const [expanded, setExpanded] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        // Calcula a altura do header para ajustar o scroll
        const headerElement = document.getElementById('navID');
        if (headerElement) {
            setHeaderHeight(headerElement.offsetHeight);
        }
    }, []);

    const handleLinkClick = (event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - headerHeight - 10;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        setExpanded(false);
    };

    return (
        <header>
            <Navbar expand="lg" fixed="top" className="header" id="navID" expanded={expanded}>
                <Container>
                    <Navbar.Brand href="/">
                        <img src={LogoFightHouse} alt="Logo da academia Fight House" height={85} width={80} />
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        onClick={() => setExpanded(!expanded)}
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto fw-bold">
                            <Nav.Link
                                href="#sobre"
                                onClick={(e) => handleLinkClick(e, 'sobre')}
                                className="text-black"
                            >
                                Sobre
                            </Nav.Link>
                            <Nav.Link
                                href="#modalidades"
                                onClick={(e) => handleLinkClick(e, 'modalidades')}
                                className="text-black"
                            >
                                Modalidades
                            </Nav.Link>
                            <Nav.Link
                                href="#nossosPlanos"
                                onClick={(e) => handleLinkClick(e, 'nossosPlanos')}
                                className="text-black"
                            >
                                Nossos Planos
                            </Nav.Link>
                            <Nav.Link
                                href="#localizacao"
                                onClick={(e) => handleLinkClick(e, 'localizacao')}
                                className="text-black"
                            >
                                Localização
                            </Nav.Link>
                            <Nav.Link
                                href="#contato"
                                onClick={(e) => handleLinkClick(e, 'contato')}
                                className="text-black"
                            >
                                Contato
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
