import React from "react";
import { Card } from "react-bootstrap";

interface ProductCardProps {
    imageSrc: string;
    title: string;
    size: string;
    code: string;
}
function ProductCard({ imageSrc, title, size, code }: ProductCardProps) {
    return (
        <Card style={{width: "180px", backgroundColor: "var(--white)", border: "none" }} className="rounded-4 " >
            <Card.Img variant="top" src={imageSrc} className="rounded-top-4"/>
            <Card.Body className="text-center d-flex flex-column justify-content-evenly align-items-center">
                <Card.Title style={{ fontFamily: "var(--font-text)" }} className="fs-6">{title}</Card.Title>
                {size && <Card.Text className="mb-1">{size}</Card.Text>}
                <div style={{ height: "1px", width: "90%", backgroundColor: "#000000", margin: "0 auto" }}></div>
                <Card.Text className="mt-1 fs-6">{code}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;