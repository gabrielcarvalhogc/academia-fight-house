import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/header/Header';
import SobreNos from './components/sobreNos/SobreNos';
import Modalidades from './components/modalidades/Modalidades';
import Planos from './components/planos/Planos';

function App() {

  return (
    <>
      <Header/>
      <main style={{backgroundColor: 'var(--black)'}}>
        <SobreNos/>
        <Modalidades/>
        <Planos/>
      </main>
    </>
  )
}

export default App
