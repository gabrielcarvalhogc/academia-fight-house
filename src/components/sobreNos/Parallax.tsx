import React from "react";
import { Button } from "react-bootstrap";
import backgroundImage from "../../assets/academia-background.png";

function Parallax() {
    return (
        <div className="position-relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                minHeight: '200px',
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <Button 
                href="#" 
                className="py-3 text-black fw-bold text-uppercase position-absolute top-50 start-50 translate-middle" 
                style={{backgroundColor: "var(--yellow)", fontFamily: "var(--font-text)"}}
            >
                <i className="bi bi-whatsapp pe-2"></i>
                Fale conosco
            </Button>
        </div>
    );
}

export default Parallax;