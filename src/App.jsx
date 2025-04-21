import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage/AdminPage';
import ProductsPage from './pages/ProductPage/ProductPage';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/categoryPage/CategoryPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/produtos-pulser" element={<ProductsPage />} />
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
    </Router>
  );
}

export default App;
