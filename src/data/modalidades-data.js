import boxe from '../assets/modalidade-boxe.png';
import kickboxing from "../assets/modalidade-kickboxing.jpg";
import kickboxingInfantil from "../assets/modalidade-turma-kids.jpg";
import muaythai from "../assets/modalidade-muaythai.jpg";
import personal from "../assets/modalidade-personal.jpg";

export const modalidades = [
    {
        "titulo": "Boxe",
        "imagem": `${boxe}`,
        "dias": ["seg/qua"],
        "horarios": ["07:00 hrs"],
        "subtitulo": "Sobre o boxe",
        "descricao": "O boxe é uma luta que utiliza apenas os punhos para ataque e defesa. Trabalha resistência, coordenação e agilidade, ideal para quem quer competir ou melhorar a forma física."
    },
    {
        "titulo": "Kickboxing",
        "imagem": `${kickboxing}`,
        "dias": ["seg/qua/sex", "ter/qui", "seg/qua/sex"],
        "horarios": ["08:00 hrs", "07:00 hrs", "19:00 hrs"],
        "subtitulo": "Sobre o kickboxing",
        "descricao": "O kickboxing é uma luta que combina socos e chutes, com até 8 modalidades que variam nas regras e técnicas. A prática é excelente para quem busca competir, melhorar o condicionamento físico e desenvolver força, resistência e coordenação."
    },
    {
        "titulo": "Kickboxing infantil",
        "imagem": `${kickboxingInfantil}`,
        "dias": ["seg/qua/sex"],
        "horarios": ["17:00 hrs"],
        "subtitulo": "Turma infantil",
        "descricao": "A turma infantil de kickboxing, liderada pela professora Jacquelinne, a Tia Jack, é para crianças a partir de 6 anos. As aulas ensinam disciplina, coordenação, respeito e promovem saúde e confiança, ajudando no desenvolvimento físico e emocional desde cedo."
    },
    {
        "titulo": "Muay thai",
        "imagem": `${muaythai}`,
        "dias": ["ter/qui"],
        "horarios": ["20:00 hrs"],
        "subtitulo": "Sobre o Muay thai",
        "descricao": "O Muay Thai é uma arte marcial tailandesa que utiliza golpes com os punhos, cotovelos, joelhos e pernas, conhecida como a “arte das oito armas”. A prática melhora força, resistência e flexibilidade, sendo ideal para defesa pessoal, condicionamento físico e competições."
    },
    {
        "titulo": "Aula personal",
        "imagem":`${personal}`,
        "dias": ["Entre em contato"],
        "horarios": [],
        "subtitulo": "Personal fight",
        "descricao": "Treine com o multicampeão Augusto Sérgio e alcance resultados rápidos com aulas particulares de boxe e kickboxing feitas para você. Com horários totalmente personalizados e treinos exclusivos, você terá atenção total para evoluir de forma eficiente e no seu ritmo. Não perca a chance de transformar sua rotina e alcançar seu melhor desempenho."
    },
];
