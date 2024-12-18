import React from "react";
import "./Local.css";

function Local() {
    return (
        <section 
            className="mb-5"
            data-bs-spy="scroll" 
            data-bs-target="#navID"
            id='localizacao'
            aria-labelledby="localizacao-title"
        >
            <h2 className="local-titulo fs-1 text-uppercase text-white text-center p-5">Localização:</h2>
            <div className="local-container rounded-5">
                <h3 className="local-titulo py-3 text-center text-uppercase fs-1">Local</h3>
                <div className="ratio ratio-16x9">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.4605601691858!2d-47.991295428728066!3d-16.073674280311945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935985933b156fe9%3A0x3200b266cdfd5c95!2sAcademia%20de%20Lutas%20Fight%20House!5e0!3m2!1spt-BR!2sbr!4v1732904945823!5m2!1spt-BR!2sbr"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <address className="local-end p-3 fs-5 text-center">
                    <i className="bi bi-geo-alt"></i>
                    Rua 25 QD 33 Lote 22 - Jardim Oriente - Valparaíso de Goiás
                </address>
            </div>
        </section>
    )
}

export default Local;