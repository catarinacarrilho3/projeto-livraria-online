import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <h2>🛒 Seu Carrinho</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p className="empty-icon">🛍️</p>
          <p>Seu carrinho está vazio.</p>
          <Link to="/" className="btn-continue">Ver Produtos</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-icon">📖</span>
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span className="cart-item-price">R$ {item.price.toFixed(2)}</span>
                </div>
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</span>
              <span className="total-value">R$ {total.toFixed(2)}</span>
            </div>
            <button className="btn-checkout">Finalizar Compra</button>
            <Link to="/" className="btn-continue">← Continuar Comprando</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;