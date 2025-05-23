import { Container, Card, Image } from 'react-bootstrap';
import logo from '../../assets/logo-fight-house-pequeno.png';

const EmptyState = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="text-center p-4 shadow rounded-4" style={{ maxWidth: '400px', backgroundColor: 'white',}}>
        <Image src={logo} alt="Logo Fight House" rounded style={{ width: '80px', marginBottom: '1rem' }} />
        <Card.Title className="fs-4">Nenhum item encontrado</Card.Title>
        <Card.Text className="text-muted">
          No momento, não há conteúdo para mostrar. Volte mais tarde.
        </Card.Text>
      </div>
    </Container>
  );
};

export default EmptyState;
