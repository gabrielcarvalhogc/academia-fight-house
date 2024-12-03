import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoFightHouse from '../../assets/logo-fight-house-pequeno.png';
import './Header.css';

function Header() {
    const [expanded, setExpanded] = useState(false);

    const handleLinkClick = () => setExpanded(false);

    return (   
        <header> 
            <Navbar 
                expand="lg" 
                fixed="top" 
                className='header' 
                id="navID" 
                expanded={expanded}
            >
                <Container>
                    <Navbar.Brand href="/">
                        <img src={LogoFightHouse} alt="Logo da academia fight house" height={85} width={80} />
                    </Navbar.Brand>
                    <Navbar.Toggle 
                        aria-controls="basic-navbar-nav" 
                        onClick={() => setExpanded(!expanded)}
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto fw-bold ">
                            <Nav.Link href="#sobre" onClick={handleLinkClick} className='text-black'>Sobre</Nav.Link>
                            <Nav.Link href="#modalidades" onClick={handleLinkClick} className='text-black'>Modalidades</Nav.Link>
                            <Nav.Link href="#nossosPlanos" onClick={handleLinkClick} className='text-black'>Nossos planos</Nav.Link>
                            <Nav.Link href="#localizacao" onClick={handleLinkClick} className='text-black'>Localização</Nav.Link>
                            <Nav.Link href="#contato" onClick={handleLinkClick} className='text-black'>Contato</Nav.Link>                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
