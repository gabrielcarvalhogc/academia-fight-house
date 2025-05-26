import React from "react";
import { Button, Card } from "react-bootstrap";

interface ProductCardProps {
    imageSrc: string;
    title: string;
    size: string;
    code: string;
    available: boolean;
}
function ProductCard({ imageSrc, title, size, code, available }: ProductCardProps) {
    return (
        <Card style={{width: "200px", backgroundColor: "var(--white)", border: "none" }} className="rounded-4 mx-3" >
            <Card.Img variant="top" src={imageSrc} className="rounded-top-4"/>
            <Card.Body className="text-center d-flex flex-column justify-content-evenly align-items-center">
                <Card.Title style={{ fontFamily: "var(--font-text)" }} className="fs-6">{title}</Card.Title>
                {size && <Card.Text className="mb-1">{size}</Card.Text>}
                {!available && <Card.Text className="p-2 bg-primary rounded-3 position-absolute top-0 start-0 mt-2 ms-2 text-light">Indisponível</Card.Text>}
                <div style={{ height: "1px", width: "90%", backgroundColor: "#000000", margin: "0 auto" }}></div>
                <Card.Text className="mt-1 fs-6">{code}</Card.Text>
                <Button 
                    href={`https://wa.me/+5561983695608?text=Ol%C3%A1+gostaria+de+encomendar+o+material:+${title}.+Cód:+${code}`} 
                    target="_blank"
                    className='p-3 rounded-4 text-black fw-bold fs-6 border'
                    style={{ backgroundColor: "var(--yellow)", fontFamily: "var(--font-text)" }}
                >
                    <i className="bi bi-whatsapp pe-1"></i>
                    Encomendar
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;