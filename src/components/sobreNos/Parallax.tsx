import React from "react";
import { Button } from "react-bootstrap";
import "./SobreNos.css";

function Parallax() {
    return (
        <div className="sobre-image position-relative mt-4">
            <Button 
                href="https://wa.link/hm1e2n"
                target="_blank"
                className="sobre-button py-3 text-black fw-bold text-uppercase position-absolute top-50 start-50 translate-middle" 
            >
                <i className="bi bi-whatsapp pe-2"></i>
                Fale conosco
            </Button>
        </div>
    );
}

export default Parallax;