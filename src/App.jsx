import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/header/Header';
import SobreNos from './components/sobreNos/SobreNos';
import Modalidades from './components/modalidades/Modalidades';

function App() {

  return (
    <>
      <Header/>
      <main style={{backgroundColor: 'var(--black)'}}>
        <SobreNos/>
        <Modalidades/>
      </main>
    </>
  )
}

export default App
