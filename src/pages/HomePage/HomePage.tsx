import React from "react";
import Header from "../../components/header/Header";
import SobreNos from "../../components/sobreNos/SobreNos";
import Modalidades from "../../components/modalidades/Modalidades";
import Planos from "../../components/planos/Planos";
import Local from "../../components/local/Local";
import Footer from "../../components/footer/Footer";

function HomePage() {
    return (
        <>
            <Header />
            <main>
                <SobreNos />
                <Modalidades />
                <Planos />
                <Local />
            </main>
            <Footer/>
        </>
    )
}

export default HomePage;