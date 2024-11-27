import React from "react";
import Parallax from "./Parallax";

function SobreNos() {
    return (
        <>
            <h2 
                className="text-center fw-bold text-uppercase py-3"
                style={{fontFamily: 'var(--text-title)', color: 'var(--yellow)'}}
            >Sobre nós</h2>
            <p className="text-center lh-base text-white px-4">A Fight House é referência em artes marciais há mais de 15 anos em Valparaíso de Goiás, sendo uma das academias pioneiras da região. Com uma trajetória marcada pela dedicação e excelência, participamos ativamente dersos eventos e competições em variadas modalidades.
            Fundada pelo professor Sérgio Ramos, ao lado de sua esposa Jacquelinne Vasconcellos, nossa academia tem como missão transformar vidas por meio do esporte, promovendo disciplina, saúde e superação.
            Venha fazer parte da nossa história e descobrir o verdadeiro espírito das artes marciais!
            </p>
            
            <Parallax/>
        </>
    )
}

export default SobreNos;