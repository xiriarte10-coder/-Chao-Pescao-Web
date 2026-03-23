/* misScripts.js — Chao Pescao */

/* 1. SCROLL REVEAL */
const io = new IntersectionObserver(entries => {
  entries.forEach((e,i) => { if(e.isIntersecting) setTimeout(()=>e.target.classList.add('in'),i*60); });
},{threshold:0.08});
document.querySelectorAll('.rev').forEach(el=>io.observe(el));

/* 2. FAVORITOS */
document.querySelectorAll('.p-fav').forEach(f=>{
  f.addEventListener('click',e=>{e.stopPropagation();f.textContent=f.textContent==='🤍'?'❤️':'🤍';});
});

/* 3. CARRITO */
const CART_KEY='chaopescao-cart';
const FREE_SHIPPING=100000;
let cart=loadCart();

function loadCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[];}catch(e){return [];}}
function saveCart(){try{localStorage.setItem(CART_KEY,JSON.stringify(cart));}catch(e){}}
function formatPrice(n){'$'+Number(n).toLocaleString('es-CO');}
function fmt(n){return '$'+Number(n).toLocaleString('es-CO');}

function openCart(){
  document.getElementById('cartPanel').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow='hidden';
  renderCart();
}
function closeCart(){
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart();});

function addToCart(id,name,price,emoji){
  const idx=cart.findIndex(i=>i.id===id);
  if(idx>=0){cart[idx].qty++;}else{cart.push({id,name,price:parseInt(price),emoji,qty:1});}
  saveCart();updateBadge();
  showToast('¡'+emoji+' '+name.split(' ').slice(0,3).join(' ')+' agregado!');
  animateFab();
}
function removeOne(id){
  const idx=cart.findIndex(i=>i.id===id);
  if(idx<0)return;
  cart[idx].qty--;
  if(cart[idx].qty<=0)cart.splice(idx,1);
  saveCart();updateBadge();renderCart();
}
function addOne(id){
  const idx=cart.findIndex(i=>i.id===id);
  if(idx<0)return;
  cart[idx].qty++;saveCart();updateBadge();renderCart();
}
function removeItem(id){
  cart=cart.filter(i=>i.id!==id);saveCart();updateBadge();renderCart();
}
function clearCart(){cart=[];saveCart();updateBadge();renderCart();}

function updateBadge(){
  const total=cart.reduce((s,i)=>s+i.qty,0);
  const badge=document.getElementById('cartCountBadge');
  if(badge)badge.textContent=total;
}
function animateFab(){
  const fab=document.querySelector('.cart-fab');
  if(!fab)return;
  fab.classList.remove('bounce');void fab.offsetWidth;fab.classList.add('bounce');
}
function showToast(msg){
  const toast=document.getElementById('cartToast');
  if(!toast)return;
  toast.textContent=msg;toast.classList.add('show');
  clearTimeout(toast._t);toast._t=setTimeout(()=>toast.classList.remove('show'),2400);
}
function renderCart(){
  const itemsEl=document.getElementById('cartItems');
  const emptyEl=document.getElementById('cartEmpty');
  const footerEl=document.getElementById('cartFooter');
  const totalEl=document.getElementById('cartTotal');
  const shipEl=document.getElementById('cartShippingBar');
  if(!itemsEl)return;
  if(cart.length===0){
    emptyEl.style.display='flex';footerEl.style.display='none';
    shipEl.textContent='🚚 Envío gratis desde '+fmt(FREE_SHIPPING);
    shipEl.style.color='';
    Array.from(itemsEl.children).forEach(c=>{if(c!==emptyEl)c.remove();});
    return;
  }
  emptyEl.style.display='none';footerEl.style.display='block';
  Array.from(itemsEl.children).forEach(c=>{if(c!==emptyEl)c.remove();});
  let subtotal=0;
  cart.forEach(item=>{
    subtotal+=item.price*item.qty;
    const row=document.createElement('div');
    row.className='cart-item';
    row.innerHTML=`
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price*item.qty)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-qty-btn" onclick="removeOne('${item.id}')">−</button>
        <span class="cart-qty">${item.qty}</span>
        <button class="cart-qty-btn" onclick="addOne('${item.id}')">+</button>
        <button class="cart-remove" onclick="removeItem('${item.id}')">🗑</button>
      </div>`;
    itemsEl.appendChild(row);
  });
  totalEl.textContent=fmt(subtotal);
  const remaining=FREE_SHIPPING-subtotal;
  if(remaining>0){shipEl.textContent='🚚 Te faltan '+fmt(remaining)+' para envío gratis';shipEl.style.color='';}
  else{shipEl.textContent='🎉 ¡Tienes envío gratis!';shipEl.style.color='#2A9D3B';}
}

/* Conectar botones + */
document.querySelectorAll('.add-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    const card=this.closest('[data-product-id]');
    if(!card)return;
    addToCart(card.dataset.productId,card.dataset.productName,card.dataset.productPrice,card.dataset.productEmoji||'🐾');
    this.textContent='✓';this.style.background='var(--green)';
    setTimeout(()=>{this.textContent='+';this.style.background='var(--blue)';},1400);
  });
});

updateBadge();