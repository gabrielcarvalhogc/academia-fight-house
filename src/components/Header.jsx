import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoFightHouse from '../assets/logo-fight-house-pequeno.png'
import './Header.css';

function Header() {
    return (
        <header style={{backgroundColor: 'var(--yellow)', fontFamily: 'var(--font-text)'}}>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={LogoFightHouse} alt="Logo da academia fight house" height={85} width={80}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto fw-bold">
                            <Nav.Link href="#sobre">Sobre</Nav.Link>
                            <Nav.Link href="#modalidades">Modalidades</Nav.Link>
                            <Nav.Link href="#nossosPlanos">Nossos planos</Nav.Link>
                            <Nav.Link href="#localizacao">Localização</Nav.Link>
                            <Nav.Link href="#contato">Contato</Nav.Link>                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;