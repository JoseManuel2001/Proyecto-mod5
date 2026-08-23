import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import mochilaBeige from './assets/mochila-beige.png';
import bolsaNegra from './assets/bolsa-negra.png';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}

const products = [
  {
    id: 1,
    name: 'Mochila Casual Beige',
    category: 'Bolsos',
    price: 800,
    image: mochilaBeige,
    badge: 'Nuevo',
    description: 'Diseño ligero y versátil para acompañarte todos los días.',
  },
  {
    id: 2,
    name: 'Bolsa Tote Negra',
    category: 'Bolsas',
    price: 1000,
    image: bolsaNegra,
    badge: 'Nuevo',
    description: 'Un básico elegante con espacio para todo lo que necesitas.',
  },
];

function Icon({ name, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M4.8 20c.8-3.2 3.2-5 7.2-5s6.4 1.8 7.2 5" /></>,
    bag: <><path d="M5 8.5h14l-1 11H6l-1-11Z" /><path d="M9 9V6.5a3 3 0 0 1 6 0V9" /></>,
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    truck: <><path d="M3 6h11v10H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.2 8.4-8 10-4.8-1.6-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    heart: <path d="M20.8 8.7c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function Logo() {
  return (
    <a className="brand" href="#inicio" aria-label="ByGaby Studio">
      <span className="brand-script">ByGaby</span>
      <span className="brand-heart">♡</span>
      <span className="brand-subtitle">STUDIO</span>
    </a>
  );
}

function Header({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#coleccion" onClick={closeMenu}>Colección</a>
          <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>

        <div className="header-actions">
          <button type="button" aria-label="Buscar"><Icon name="search" /></button>
          <button type="button" aria-label="Mi cuenta"><Icon name="user" /></button>
          <button type="button" className="cart-button" aria-label="Carrito">
            <Icon name="bag" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow">BYGABY STUDIO · COLECCIÓN 2026</p>
        <h1>
          Estilo que
          <span>te acompaña</span>
        </h1>
        <p className="hero-description">
          Bolsos y accesorios seleccionados para complementar
          <br className="desktop-only" />
          tu estilo único.
        </p>
        <a className="primary-button" href="#coleccion">
          Ver colección
          <Icon name="arrow" size={18} />
        </a>
      </div>

      <div className="hero-product">
        <div className="hero-glow" />
        <img src={mochilaBeige} alt="Mochila casual beige ByGaby" />
        <span className="hero-heart">♡</span>
      </div>
    </section>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="favorite-button" type="button" aria-label={`Agregar ${product.name} a favoritos`}>
          <Icon name="heart" size={20} />
        </button>
        <img className="product-image" src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-bottom">
          <strong>${product.price.toLocaleString('es-MX')} MXN</strong>
          <button type="button" className="add-button" onClick={() => onAdd(product)}>
            <Icon name="bag" size={17} />
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

function Collection({ onAdd }) {
  return (
    <section className="collection-section" id="coleccion">
      <div className="section-heading">
        <span />
        <div>
          <p className="eyebrow">SELECCIÓN BYGABY</p>
          <h2>Nuestra colección</h2>
        </div>
        <span />
      </div>

      <div className="collection-toolbar">
        <p>Esenciales para cada momento.</p>
        <button type="button">Ver todo <Icon name="arrow" size={16} /></button>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    ['truck', 'Envíos a todo México', 'Recibe tu pedido hasta la puerta de tu casa.'],
    ['shield', 'Compra segura', 'Tus datos siempre estarán protegidos.'],
    ['heart', 'Calidad seleccionada', 'Piezas elegidas con cuidado y estilo.'],
  ];

  return (
    <section className="features">
      {features.map(([icon, title, text]) => (
        <div className="feature" key={title}>
          <div className="feature-icon"><Icon name={icon} size={28} /></div>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function About() {
  return (
    <section className="about" id="nosotros">
      <div className="about-image">
        <div className="about-image-card">
          <img src={bolsaNegra} alt="Bolsa tote negra ByGaby Studio" />
        </div>
      </div>

      <div className="about-copy">
        <p className="eyebrow">SOBRE BYGABY</p>
        <h2>Tu estilo también cuenta una historia.</h2>
        <p>
          ByGaby Studio nace para encontrar piezas que se sientan tan especiales
          como la persona que las lleva. Una selección de bolsos y accesorios
          pensada para combinar con tu día a día sin perder personalidad.
        </p>
        <a href="#contacto" className="text-link">
          Conoce más <Icon name="arrow" size={17} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Moda · Estilo · Tú</p>
          <div className="socials">
            <a href="#contacto" aria-label="Instagram">ig</a>
            <a href="#contacto" aria-label="Facebook">f</a>
            <a href="#contacto" aria-label="TikTok">tk</a>
          </div>
        </div>

        <div>
          <h4>Enlaces</h4>
          <a href="#inicio">Inicio</a>
          <a href="#coleccion">Colección</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </div>

        <div>
          <h4>Ayuda</h4>
          <a href="#contacto">Preguntas frecuentes</a>
          <a href="#contacto">Términos y condiciones</a>
          <a href="#contacto">Política de privacidad</a>
          <a href="#contacto">Envíos</a>
        </div>

        <div className="newsletter">
          <h4>Suscríbete</h4>
          <p>Recibe novedades y promociones especiales.</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="Tu correo electrónico" aria-label="Correo electrónico" />
            <button type="submit">Suscribirme</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          <p>Contacto</p>
          <p>Gabriela Martinez Gomez</p>
          <p>+52 55 3641 3438</p>
        </span>
        <span />
        <p>© 2026 ByGaby Studio. Todos los derechos reservados.</p>
        <span />
      </div>
    </footer>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState('');

  const handleAdd = (product) => {
    setCartCount(count => count + 1);
    setNotice(`${product.name} se agregó al carrito`);
    window.clearTimeout(window.__byGabyNotice);
    window.__byGabyNotice = window.setTimeout(() => setNotice(''), 2600);
  };

  return (
    <>
      <Header cartCount={cartCount} />
      <main>
        <Hero />
        <Collection onAdd={handleAdd} />
        <Features />
        <About />
      </main>
      <Footer />

      {notice && <div className="cart-notice">{notice}</div>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
