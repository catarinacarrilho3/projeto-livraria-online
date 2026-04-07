import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const isInCart = (id) => cart.some(item => item.id === id);

  return (
    <div className="product-list">
      <h1>Nossos Livros</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img 
  src={product.image} 
  alt={product.name} 
  className="book-image"
/>
            <h3>{product.name}</h3>
            <p className="price">R$ {product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className={isInCart(product.id) ? 'btn-added' : 'btn-add'}
            >
              {isInCart(product.id) ? '✓ Adicionado' : 'Adicionar ao Carrinho'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;