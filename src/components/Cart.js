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
    //  section com aria-label identifica a região do carrinho
    <section className="cart-page" aria-label="Carrinho de compras">

      {/*  h1 como título principal da página do carrinho */}
      <h1>
        {/*  ícone decorativo oculto de leitores de tela */}
        <span aria-hidden="true">🛒</span> Seu Carrinho
      </h1>

      {/*  aria-live anuncia dinamicamente mudanças no conteúdo do carrinho */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {cart.length === 0
          ? 'Seu carrinho está vazio.'
          : `${cart.length} ${cart.length === 1 ? 'item' : 'itens'} no carrinho. Total: R$ ${total.toFixed(2)}`}
      </div>

      {cart.length === 0 ? (

        <div className="empty-cart" role="status">
          {/* ícone decorativo oculto de leitores de tela */}
          <p className="empty-icon" aria-hidden="true">🛍️</p>
          <p>Seu carrinho está vazio.</p>
          <Link to="/" className="btn-continue">Ver Produtos</Link>
        </div>

      ) : (
        <>
          {/*  ul/li com semântica correta de lista para os itens do carrinho */}
          <ul className="cart-items" aria-label="Itens no carrinho">

            {cart.map(item => (
              <li key={item.id} className="cart-item">

                {/*  ícone decorativo oculto de leitores de tela */}
                <span className="cart-item-icon" aria-hidden="true">📖</span>

                <div className="cart-item-info">
                  {/* h2 para o nome de cada item, hierarquia h1 → h2 */}
                  <h2 className="cart-item-name">{item.name}</h2>
                  <span className="cart-item-price">
                    {/*  label oculto para o preço */}
                    <span className="sr-only">Preço:</span>
                    R$ {item.price.toFixed(2)}
                  </span>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item)}
                  //  onKeyDown garante acionamento explícito via teclado (Enter e Space)
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      removeFromCart(item);
                    }
                  }}
                  //  aria-label contextual com o nome do livro
                  aria-label={`Remover ${item.name} do carrinho`}
                  //  tabIndex garante foco via teclado
                  tabIndex="0"
                >
                  Remover
                </button>

              </li>
            ))}

          </ul>

          {/*  aside com role="complementary" para o resumo da compra */}
          <aside className="cart-summary" aria-label="Resumo da compra">

            <div className="summary-row">
              <span>
                {cart.length} {cart.length === 1 ? 'item' : 'itens'}
              </span>
              {/*  aria-label no total para leitura mais clara */}
              <span
                className="total-value"
                aria-label={`Total: R$ ${total.toFixed(2)}`}
              >
                R$ {total.toFixed(2)}
              </span>
            </div>

            <button
              className="btn-checkout"
              //  aria-label descritivo no botão de finalizar compra
              aria-label="Finalizar compra"
              //  onKeyDown garante acionamento explícito via teclado (Enter e Space)
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                }
              }}
              tabIndex="0"
            >
              Finalizar Compra
            </button>

            <Link to="/" className="btn-continue">
              {/* ícone decorativo oculto de leitores de tela */}
              <span aria-hidden="true">←</span> Continuar Comprando
            </Link>

          </aside>
        </>
      )}

    </section>
  );
};

export default Cart;
