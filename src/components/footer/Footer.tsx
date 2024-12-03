import React from "react";
import "./Footer.css";

function Footer() {
    return(
        <footer 
            className="footer text-black pt-1"
            data-bs-spy="scroll" 
            data-bs-target="#navID"
            id='contato'
        >
            <div className="d-flex justify-content-center align-items-center my-3 gap-3">
                <img 
                    src="/src/assets/logo-fight-house-pequeno.png" 
                    alt="Logo da academia fight house" 
                    width={100}
                    height={100}
                />
                <div>
                    <h5 className="font-title text-uppercase fs-4 pb-0 mb-0">Academia fight house</h5>
                    <p className="pb-0 mb-0">Faça parte desta família</p>
                </div>
            </div>
            <div className="divisor mb-3"></div>
            <div className="d-flex flex-column gap-3 ps-4 fs-5">
                <a 
                    href="https://maps.app.goo.gl/LMqMu6hdkqhpQJHt9" 
                    target='_blank' 
                    className="fw-bold link-underline bold link-opacity-50-hover link-underline-opacity-0"
                >
                    <i className="bi bi-geo-alt pe-2"></i>
                    Rua 25 QD 33 Lote 22 - Jardim Oriente
                </a>
                <a 
                    href="https://www.instagram.com/afhramos?igsh=MXNkcGNyazRpMXF6Nw=="
                    target='_blank' 
                    className="fw-bold link-underline bold link-opacity-50-hover link-underline-opacity-0"
                >
                    <i className="bi bi-instagram pe-2"></i>
                    @afhramos
                </a>
                <a 
                    href='https://wa.link/hm1e2n'
                    target='_blank' 
                    className="fw-bold pb-5 link-underline link-opacity-50-hover link-underline-opacity-0"
                >
                    <i className="bi bi-whatsapp pe-2"></i>
                    +55 61 8186-5159
                </a>
            </div>
        </footer>
    )
}

export default Footer;