/* ═══════════════════════════════════════════
   hamburger.js — Menú móvil Chao Pescao
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // Insertar botón hamburguesa en el navbar
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Crear botón
  const btn = document.createElement('button');
  btn.className = 'nav-hamburger';
  btn.setAttribute('aria-label', 'Menú');
  btn.innerHTML = `<span></span><span></span><span></span>`;
  nav.appendChild(btn);

  // Crear menú móvil
  const menu = document.createElement('div');
  menu.className = 'nav-mobile-menu';
  menu.innerHTML = `
    <a href="#categorias" onclick="closeMobileMenu()">Categorías</a>
    <a href="#productos"  onclick="closeMobileMenu()">Productos</a>
    <a href="#nosotros"   onclick="closeMobileMenu()">Nosotros</a>
    <a href="#contacto"   onclick="closeMobileMenu()">Contacto</a>
    <a href="#" class="nav-mobile-cta"
       onclick="event.preventDefault(); closeMobileMenu(); openCart()">
      🛒 Carrito
    </a>
  `;
  document.body.insertBefore(menu, document.body.firstChild);

  // Toggle
  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      menu.classList.add('open');
      btn.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  // Cerrar al hacer scroll
  window.addEventListener('scroll', closeMobileMenu, { passive: true });
});

function closeMobileMenu() {
  const menu = document.querySelector('.nav-mobile-menu');
  const btn  = document.querySelector('.nav-hamburger');
  if (!menu) return;
  menu.classList.remove('open');
  if (btn) btn.classList.remove('open');
  document.body.style.overflow = '';
}