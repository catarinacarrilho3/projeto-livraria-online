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
    image: '/amar.jpg'
  },
  {
    id: 2,
    name: '1984',
    price: 39.90,
    image: '/1984.jpg'
  },
  {
    id: 3,
    name: 'O Alquimista',
    price: 25.00,
    image: '/alquimista.jpg'
  },
  {
    id: 4,
    name: 'A Hora da Estrela',
    price: 35.90,
    image: '/hora-estrela.jpg'
  },
];

const Header = () => {
  const cart = useSelector(state => state.cart);

  return (
    // <header> já é semântico; adicionado aria-label para identificar a região
    <header className="header" aria-label="Cabeçalho da Livraria Aurora">

      <div className="header-brand">
   
        <span className="header-icon" aria-hidden="true">📚</span>
        <span className="header-title">Livraria Aurora</span>
      </div>

      <nav className="header-nav" aria-label="Navegação principal">

        <Link to="/" className="nav-link">Catálogo</Link>

        <Link to="/cart" className="nav-link nav-cart" aria-label={`Carrinho de compras, ${cart.length} ${cart.length === 1 ? 'item' : 'itens'}`}>
          {/*  ícone decorativo oculto de leitores de tela */}
          <span aria-hidden="true">🛒</span> Carrinho
          {cart.length > 0 && (
            //  aria-hidden no badge pois a info já está no aria-label do link acima
            <span className="cart-badge" aria-hidden="true">{cart.length}</span>
          )}
        </Link>

      </nav>

      {/* região aria-live anuncia mudanças no carrinho para leitores de tela */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {cart.length > 0
          ? `${cart.length} ${cart.length === 1 ? 'item' : 'itens'} no carrinho`
          : 'Carrinho vazio'}
      </div>

    </header>
  );
};

const App = () => (
  <Router>
    <Header />
    {/*  <main> com aria-label identifica o conteúdo principal da página */}
    <main className="main" aria-label="Conteúdo principal">
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </main>
  </Router>
);

export default App;
