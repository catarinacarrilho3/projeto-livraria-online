import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const products = [
  { 
    id: 1, 
    name: 'Amar se Aprende Amando', 
    price: 29.90,
    image: 'https://cdn.iset.io/assets/52438/produtos/36492/amar_se_aprende_amando.jpg'
  },
  { 
    id: 2, 
    name: '1984', 
    price: 39.90,
    image: 'https://m.media-amazon.com/images/I/71wANojhEKL._AC_UF1000,1000_QL80_.jpg'
  },
  { 
    id: 3, 
    name: 'O Alquimista', 
    price: 25.00,
    image: 'https://m.media-amazon.com/images/I/81slUinjTlS.jpg'
  },
  { 
    id: 4, 
    name: 'A Hora da Estrela', 
    price: 35.90,
    image: 'https://veja.abril.com.br/wp-content/uploads/2024/02/1977-A-hora-da-estrela.jpg?quality=70&strip=info&w=157'
  },
];

const Header = () => {
  const cart = useSelector(state => state.cart);
  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-icon">📚</span>
        <span className="header-title">Livraria Aurora</span>
      </div>
      <nav className="header-nav">
        <Link to="/" className="nav-link">Catálogo</Link>
        <Link to="/cart" className="nav-link nav-cart">
          🛒 Carrinho
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>
      </nav>
    </header>
  );
};

const App = () => (
  <Router>
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </main>
  </Router>
);

export default App;