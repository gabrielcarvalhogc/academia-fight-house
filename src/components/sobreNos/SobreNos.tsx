import React from "react";
import Parallax from "./Parallax";
import "./SobreNos.css";

function SobreNos() {
    return (
        <section aria-labelledby="sobre-nos-title" id='sobre'>
            <h1 
                className="sobre-title text-center text-uppercase py-3 fs-1 text-white"
                data-bs-spy="scroll" 
                data-bs-target="#navID"
            >Sobre nós</h1>
            <p className="text-center lh-base text-white px-5 my-2 fs-5">A Fight House é referência em artes marciais há mais de 15 anos em Valparaíso de Goiás, sendo uma das academias pioneiras da região. Com uma trajetória marcada pela dedicação e excelência, participamos ativamente dersos eventos e competições em variadas modalidades.
            Fundada pelo professor Sérgio Ramos, ao lado de sua esposa Jacquelinne Vasconcellos, nossa academia tem como missão transformar vidas por meio do esporte, promovendo disciplina, saúde e superação.
            Venha fazer parte da nossa história e descobrir o verdadeiro espírito das artes marciais!
            </p>
            
            <Parallax/>
        </section>
    )
}

export default SobreNos;