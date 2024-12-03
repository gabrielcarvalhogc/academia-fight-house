import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/header/Header';
import SobreNos from './components/sobreNos/SobreNos';
import Modalidades from './components/modalidades/Modalidades';
import Planos from './components/planos/Planos';
import Local from './components/local/Local';
import Footer from './components/footer/Footer';

function App() {

  return (
    <>
      <Header/>
      <main>
        <SobreNos/>
        <Modalidades/>
        <Planos/>
        <Local/>
      </main>
      <Footer/>
    </>
  )
}

export default App
