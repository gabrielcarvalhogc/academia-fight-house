import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/header/Header';
import SobreNos from './components/sobreNos/SobreNos';

function App() {

  return (
    <>
      <Header/>
      <main style={{backgroundColor: 'var(--black)'}}>
        <SobreNos/>
      </main>
    </>
  )
}

export default App
