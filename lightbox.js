/* ═══════════════════════════════════════════
   lightbox.js — Galería de producto con descripción
   Chao Pescao · Tienda de Mascotas
═══════════════════════════════════════════ */

/* ── DATOS DE PRODUCTOS ──────────────────────
   Aquí defines cada producto con sus fotos y descripción.
   Agrega tantas fotos como quieras en el array "images".
   El primer elemento de "images" es la foto principal.
─────────────────────────────────────────── */
const PRODUCTOS = {
  'agility-gold-gatitos': {
    name:     'Agility Gold Gatitos 1.5Kg',
    category: '🐱 Nutrición felina',
    catColor: '#1A6FC4',
    price:    '$43.000',
    oldPrice: null,
    stars:    5,
    reviews:  47,
    desc:     'Alimento súper premium especialmente formulado para gatitos en crecimiento. Rico en proteínas de alta calidad, vitaminas y minerales esenciales para un desarrollo saludable.',
    features: [
      { icon: '✅', text: 'Fórmula súper premium', color: '#2A9D3B' },
      { icon: '🐟', text: 'Alto contenido de proteína de pescado', color: '#1A6FC4' },
      { icon: '💊', text: 'Vitaminas A, D y E incluidas', color: '#F28C28' },
      { icon: '🧡', text: 'Ideal para gatitos de 2 a 12 meses', color: '#D72638' },
    ],
    images: [
      'Imagenes/Agility_Gold_Gatitos_1_5Kg.png',
      'Imagenes/Agility_Gold_Gatitos_1_5Kg_tabla.png',
    ]
  },
  'alimento-perro-15kg': {
    name:     'Alimento Premium Perro Adulto 15Kg',
    category: '🐶 Nutrición canina',
    catColor: '#F28C28',
    price:    '$85.000',
    oldPrice: '$99.000',
    stars:    5,
    reviews:  83,
    desc:     'Max Máximo Desempeño ofrece una nutrición completa para perros adultos de tamaño mediano y grande.',
    features: [
      { icon: '✅', text: 'Para todas las razas adultas', color: '#2A9D3B' },
      { icon: '💪', text: 'Alto en proteína de carne', color: '#F28C28' },
      { icon: '🦴', text: 'Combina proteínas digestibles, vitaminas equilibradas que fortalece los músculos y mejora la digestión.', color: '#1A6FC4' },
      { icon: '✨', text: 'Proporcionan todos los nutrientes necesarios para llevar una vida activa y llena de energía.', color: '#D72638' },
    ],
    images: [
      'Imagenes/Máximo_Desempeño_PerrosAdultos_Carne_15 Kg_5Kg_1.png',
      'Imagenes/Máximo_Desempeño_PerrosAdultos_Carne_15 Kg_5Kg_tabla.png'
    ]
  },
  'kit-juguetes-x5': {
    name:     'Kit pelotas interactivas X3',
    category: '🎁 Juguetes',
    catColor: '#2A9D3B',
    price:    '$45.000',
    oldPrice: null,
    stars:    4,
    reviews:  29,
    desc:     'Combo pelotas tipo tenis interactivas para Snacks X3',
    features: [
      { icon: '✅', text: 'Están diseñadas para ofrecer diversión, ejercicio y estimulación mental en un solo juguete', color: '#2A9D3B' },
      { icon: '🛡️', text: 'Materiales no tóxicos y seguros', color: '#1A6FC4' },
      { icon: '🐾', text: 'Para gatos y perros pequeños', color: '#F28C28' },
      { icon: '🧠', text: 'Estimulación mental y física', color: '#D72638' },
    ],
    images: [
      'Catalogo productos/Pelota_morada.png',
    ]
  },
  'Shampoo Petys 235ml': {
    name:     'Shampoo Petys 235ml',
    category: '✨ Higiene',
    catColor: '#D72638',
    price:    '$28.000',
    oldPrice: '$38.000',
    stars:    5,
    reviews:  61,
    desc:     'Es el producto ideal para las mascotas, perros y gatos, porque protege y cuida el pelo de tu mascota, es hipo alergénico, reduce las probabilidades de generar alergias o afecciones en la piel.',
    features: [
      { icon: '✅', text: 'Fórmula hipoalergénica pH neutro', color: '#2A9D3B' },
      { icon: '🌿', text: 'Ingredientes naturales sin parabenos', color: '#1A6FC4' },
      { icon: '🐶', text: 'Apto para perros y gatos', color: '#F28C28' },
      { icon: '💧', text: 'Hidrata y suaviza el pelaje', color: '#D72638' },
    ],
    images: [
      'Imagenes/Shampoo_petys.png',
    ]
  }
};

/* ── ESTADO ── */
let lbCurrentProduct = null;
let lbCurrentIndex   = 0;

/* ── CREAR ESTRUCTURA HTML DEL LIGHTBOX ── */
function createLightboxHTML() {
  const html = `
    <div class="lb-overlay" id="lbOverlay" onclick="closeLightbox()"></div>
    <button class="lb-close" id="lbClose" onclick="closeLightbox()">✕</button>
    <div class="lb-modal" id="lbModal">
      <div class="lb-box">

        <!-- Galería izquierda -->
        <div class="lb-gallery">
          <div class="lb-main-img">
            <img id="lbMainImg" src="" alt="" />
            <button class="lb-arrow prev" id="lbPrev" onclick="lbNavigate(-1)">‹</button>
            <button class="lb-arrow next" id="lbNext" onclick="lbNavigate(1)">›</button>
            <div class="lb-counter" id="lbCounter">1 / 1</div>
          </div>
          <div class="lb-thumbs" id="lbThumbs"></div>
        </div>

        <!-- Info derecha -->
        <div class="lb-info">
          <div class="lb-category" id="lbCategory"></div>
          <div class="lb-name" id="lbName"></div>
          <div class="lb-stars" id="lbStars"></div>
          <div class="lb-price-row">
            <span class="lb-price" id="lbPrice"></span>
            <span class="lb-price-old" id="lbOldPrice"></span>
          </div>
          <div class="lb-divider"></div>
          <div class="lb-desc-title">Descripción</div>
          <div class="lb-desc" id="lbDesc"></div>
          <div class="lb-desc-title">Características</div>
          <div class="lb-features" id="lbFeatures"></div>
          <button class="lb-add-btn" id="lbAddBtn" onclick="lbAddToCart()">
            🛒 Agregar al carrito
          </button>
        </div>

      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);
}

/* ── ABRIR LIGHTBOX ── */
function openLightbox(productId) {
  const product = PRODUCTOS[productId];
  if (!product) return;

  lbCurrentProduct = productId;
  lbCurrentIndex   = 0;

  // Llenar datos
  document.getElementById('lbCategory').textContent  = product.category;
  document.getElementById('lbCategory').style.color  = product.catColor;
  document.getElementById('lbName').textContent      = product.name;
  document.getElementById('lbPrice').textContent     = product.price;

  const oldEl = document.getElementById('lbOldPrice');
  oldEl.textContent = product.oldPrice || '';

  // Estrellas
  const filled  = '★'.repeat(product.stars);
  const empty   = '☆'.repeat(5 - product.stars);
  document.getElementById('lbStars').innerHTML =
    `<span>${filled}${empty}</span><span class="lb-reviews">(${product.reviews} reseñas)</span>`;

  document.getElementById('lbDesc').textContent = product.desc;

  // Características
  const featEl = document.getElementById('lbFeatures');
  featEl.innerHTML = product.features.map(f => `
    <div class="lb-feature">
      <div class="lb-feature-dot" style="background:${f.color}"></div>
      <span>${f.icon} ${f.text}</span>
    </div>
  `).join('');

  // Imágenes
  renderLbGallery();

  // Reset botón
  const btn = document.getElementById('lbAddBtn');
  btn.textContent = '🛒 Agregar al carrito';
  btn.classList.remove('added');

  // Abrir
  document.getElementById('lbOverlay').classList.add('open');
  document.getElementById('lbClose').classList.add('open');
  document.getElementById('lbModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ── CERRAR LIGHTBOX ── */
function closeLightbox() {
  document.getElementById('lbOverlay').classList.remove('open');
  document.getElementById('lbClose').classList.remove('open');
  document.getElementById('lbModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── RENDERIZAR GALERÍA ── */
function renderLbGallery() {
  const product = PRODUCTOS[lbCurrentProduct];
  const images  = product.images;

  // Imagen principal
  const mainImg = document.getElementById('lbMainImg');
  mainImg.src = images[lbCurrentIndex];
  mainImg.alt = product.name;

  // Contador
  document.getElementById('lbCounter').textContent =
    `${lbCurrentIndex + 1} / ${images.length}`;

  // Flechas — ocultar si solo hay 1 foto
  const prev = document.getElementById('lbPrev');
  const next = document.getElementById('lbNext');
  if (images.length <= 1) {
    prev.classList.add('hidden');
    next.classList.add('hidden');
  } else {
    prev.classList.remove('hidden');
    next.classList.remove('hidden');
  }

  // Thumbnails
  const thumbsEl = document.getElementById('lbThumbs');
  thumbsEl.innerHTML = images.map((src, i) => `
    <div class="lb-thumb ${i === lbCurrentIndex ? 'active' : ''}"
         onclick="lbGoTo(${i})">
      <img src="${src}" alt="Foto ${i+1}" loading="lazy" />
    </div>
  `).join('');
}

/* ── NAVEGAR CON FLECHAS ── */
function lbNavigate(dir) {
  const images = PRODUCTOS[lbCurrentProduct].images;
  lbCurrentIndex = (lbCurrentIndex + dir + images.length) % images.length;
  lbChangeImage();
}

/* ── IR A THUMBNAIL ── */
function lbGoTo(index) {
  lbCurrentIndex = index;
  lbChangeImage();
}

/* ── CAMBIAR IMAGEN CON ANIMACIÓN ── */
function lbChangeImage() {
  const mainImg = document.getElementById('lbMainImg');
  mainImg.classList.add('fade');
  setTimeout(() => {
    renderLbGallery();
    mainImg.classList.remove('fade');
  }, 200);
}

/* ── AGREGAR AL CARRITO DESDE LIGHTBOX ── */
function lbAddToCart() {
  if (!lbCurrentProduct) return;

  // Buscar la tarjeta del producto en el DOM y usar la función addToCart existente
  const card = document.querySelector(`[data-product-id="${lbCurrentProduct}"]`);
  if (card) {
    addToCart(
      card.dataset.productId,
      card.dataset.productName,
      card.dataset.productPrice,
      card.dataset.productEmoji || '🐾'
    );
  }

  // Feedback visual en el botón del lightbox
  const btn = document.getElementById('lbAddBtn');
  btn.textContent = '✓ ¡Agregado al carrito!';
  btn.classList.add('added');
  setTimeout(() => {
    btn.textContent = '🛒 Agregar al carrito';
    btn.classList.remove('added');
  }, 2000);
}

/* ── CONECTAR CLICKS EN IMÁGENES DE PRODUCTO ── */
function initLightboxTriggers() {
  document.querySelectorAll('.p-img-area, .p-img-contain').forEach(area => {
    area.addEventListener('click', function(e) {
      // No abrir si hicieron clic en el corazón favorito
      if (e.target.closest('.p-fav')) return;
      const card = this.closest('[data-product-id]');
      if (!card) return;
      openLightbox(card.dataset.productId);
    });
  });
}

/* ── CERRAR CON ESC ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  lbNavigate(-1);
  if (e.key === 'ArrowRight') lbNavigate(1);
});

/* ── INICIALIZAR ── */
document.addEventListener('DOMContentLoaded', () => {
  createLightboxHTML();
  initLightboxTriggers();
});