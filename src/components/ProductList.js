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
    <section className="product-list" aria-label="Catálogo de livros">

      <h1>Nossos Livros</h1>

      <div className="products-grid" role="list">

        {products.map((product, index) => (

          <article
            key={product.id}
            className="product-card"
            role="listitem"
          >
            <img
              src={product.image}
              alt={`Capa do livro ${product.name}`}
              className="book-image"
              /* PERFORMANCE: apenas a primeira imagem carrega imediatamente (eager)
                 as demais carregam só quando o usuário rolar a página (lazy) */
              loading={index === 0 ? 'eager' : 'lazy'}
              /* PERFORMANCE: dimensões explícitas evitam Cumulative Layout Shift (CLS) */
              width="200"
              height="220"
              /* PERFORMANCE: hint de decodificação assíncrona para não travar o browser */
              decoding="async"
            />

            <h2 className="product-card h2">{product.name}</h2>

            <p className="price">
              <span className="sr-only">Preço:</span>
              R$ {product.price.toFixed(2)}
            </p>

            <button
              onClick={() => addToCart(product)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isInCart(product.id)) {
                  e.preventDefault();
                  addToCart(product);
                }
              }}
              disabled={isInCart(product.id)}
              className={isInCart(product.id) ? 'btn-added' : 'btn-add'}
              aria-label={
                isInCart(product.id)
                  ? `${product.name} já adicionado ao carrinho`
                  : `Adicionar ${product.name} ao carrinho`
              }
              aria-pressed={isInCart(product.id)}
              tabIndex="0"
            >
              {isInCart(product.id)
                ? <><span aria-hidden="true">✓</span> Adicionado</>
                : 'Adicionar ao Carrinho'
              }
            </button>

          </article>
        ))}

      </div>
    </section>
  );
};

export default ProductList;