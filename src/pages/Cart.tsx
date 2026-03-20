import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/productService';
import {
  Trash2, Plus, Minus, CreditCard as PaymentIcon, ShoppingBag,
  ArrowLeft, CheckCircle, Truck, ShieldCheck,
  Package, Info, Gift, Coffee
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  const playBellSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playTone = (freq: number, startTime: number, duration: number, vol: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
        gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
        gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
      };

      playTone(1318.51, 0, 1.5, 0.15); // E6
      playTone(1661.22, 0.1, 1.5, 0.15); // G#6
      playTone(1975.53, 0.2, 2.0, 0.15); // B6
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  const handleReturnToCatalog = () => {
    playBellSound();
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

  // Free shipping threshold
  const freeShippingThreshold = 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const items = cart.map(item => ({
        product: item.id,
        quantity: item.quantity
      }));
      await orderService.createOrder(items);
      clearCart();
      setOrderSuccess(true);
    } catch (error: any) {
      alert("Error al procesar el pedido: " + (error.response?.data?.error || error.message));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cart-page-container fade-in">
      <div className="cart-header-section">
        <Link to="/" className="minimal-back-link">
          <ArrowLeft size={18} /> Volver al Catálogo
        </Link>
        <h1>Mi Selección <span className="item-count">({cart.length} productos)</span></h1>
      </div>

      {orderSuccess ? (
        <div className="cart-empty-state">
          <div className="success-lottie-container">
            <CheckCircle size={100} className="success-icon pulse" />
          </div>
          <h2>¡Pedido Realizado con Éxito!</h2>
          <p>Tu selección de café está siendo preparada por nuestros expertos baristas.</p>
          <div className="success-actions">
            <Link to="/orders" className="primary-btn glossy">Ver mis pedidos</Link>
            <Link to="/" className="secondary-btn">Ir al catálogo</Link>
          </div>
        </div>
      ) : cart.length === 0 ? (
        <div className="cart-empty-state interactive-empty-cart">
          <div className="cart-icon-wrapper">
            <ShoppingBag size={140} strokeWidth={0.5} className="floating-bag" />
            <div className="cart-shadow"></div>
            
            <div className="coffee-bean-particle bean-1"><Coffee size={24} /></div>
            <div className="coffee-bean-particle bean-2"><Coffee size={18} /></div>
            <div className="coffee-bean-particle bean-3"><Coffee size={20} /></div>
          </div>
          
          <h2 className="empty-title">Tu carrito está vacío</h2>
          <p className="empty-subtitle">Parece que aún no has descubierto tu café favorito para hoy. Explora nuestra selección de granos premium.</p>
          
          <button onClick={handleReturnToCatalog} className="primary-btn glossy return-catalog-btn">
            <span>Descubrir Productos</span>
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="main-cart-column">
            <div className="shipping-promo-card">
              <div className="shipping-info-text">
                {amountToFreeShipping > 0 ? (
                  <p>Faltan <strong>${amountToFreeShipping.toFixed(2)}</strong> para <span>Envío Gratis</span></p>
                ) : (
                  <p className="free-shipping-unlocked"><Truck size={18} /> ¡Envío gratuito desbloqueado!</p>
                )}
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${shippingProgress}%` }}></div>
              </div>
            </div>

            <div className="cart-items-wrapper">
              {cart.map((item) => (
                <div key={item.id} className="premium-cart-item">
                  <div className="item-image-box">
                    <img src={item.image || '/coffee-placeholder.png'} alt={item.name} />
                  </div>
                  <div className="item-main-details">
                    <div className="item-title-row">
                      <h3>{item.name}</h3>
                      <button className="icon-only-btn delete" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="item-meta">Tueste Medio • 250g</p>
                    <div className="item-bottom-row">
                      <div className="quantity-luxury-selector">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <Minus size={14} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="item-price-display">
                        <span className="unit-price">${item.price} c/u</span>
                        <span className="total-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="checkout-summary-column">
            <div className="order-card sticky-summary">
              <h3>Resumen del Pedido</h3>

              <div className="summary-list">
                <div className="summary-item">
                  <span className="label"><Package size={16} /> Subtotal</span>
                  <span className="value">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span className="label"><Truck size={16} /> Envío</span>
                  <span className="value free-text">{cartTotal >= freeShippingThreshold ? 'Gratis' : '$5.00'}</span>
                </div>
                <div className="summary-item discount">
                  <span className="label"><Gift size={16} /> Descuento</span>
                  <span className="value">-$0.00</span>
                </div>
              </div>

              <div className="summary-total-luxury">
                <span className="label">Total</span>
                <div className="total-amount-box">
                  <span className="currency">USD</span>
                  <span className="amount">${(cartTotal + (cartTotal >= freeShippingThreshold ? 0 : 5)).toFixed(2)}</span>
                </div>
              </div>

              <button
                className="luxury-checkout-btn"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="loader"></span>
                ) : (
                  <>
                    <span>Realizar Pago Seguro</span>
                    <PaymentIcon size={20} />
                  </>
                )}
              </button>

              <div className="trust-badges">
                <div className="badge">
                  <ShieldCheck size={16} />
                  <span>Garantía de Satisfacción</span>
                </div>
                <div className="badge">
                  <PaymentIcon size={16} />
                  <span>Encriptación SSL 256-bit</span>
                </div>
              </div>

              <div className="promo-code-box">
                <button className="promo-toggle">¿Tienes un código de descuento? <Info size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
                .cart-page-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 60px 20px;
                    min-height: 80vh;
                }

                .fade-in {
                    animation: fadeIn 0.8s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .cart-header-section {
                    margin-bottom: 40px;
                }

                .minimal-back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    color: rgba(255, 255, 255, 0.5);
                    text-decoration: none;
                    font-size: 0.9rem;
                    margin-bottom: 20px;
                    transition: color 0.3s;
                }

                .minimal-back-link:hover {
                    color: #d4a373;
                }

                .cart-header-section h1 {
                    font-family: 'Playfair Display', serif;
                    font-size: 2.5rem;
                    display: flex;
                    align-items: baseline;
                    gap: 15px;
                }

                .item-count {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.4);
                    font-weight: 400;
                    font-family: 'Outfit', sans-serif;
                }

                .cart-layout {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 50px;
                    align-items: start;
                }

                /* Shipping Promo */
                .shipping-promo-card {
                    background: rgba(212, 163, 115, 0.1);
                    border: 1px solid rgba(212, 163, 115, 0.2);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 30px;
                }

                .shipping-info-text p {
                    font-family: 'Outfit', sans-serif;
                    margin-bottom: 12px;
                    color: rgba(255, 255, 255, 0.8);
                }

                .shipping-info-text span {
                    color: #d4a373;
                    font-weight: 700;
                }

                .free-shipping-unlocked {
                    color: #4ade80 !important;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                }

                .progress-bar-bg {
                    height: 6px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .progress-bar-fill {
                    height: 100%;
                    background: #d4a373;
                    border-radius: 10px;
                    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Cart Items */
                .cart-items-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .premium-cart-item {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 20px;
                    display: flex;
                    gap: 25px;
                    transition: transform 0.3s, background 0.3s;
                }

                .premium-cart-item:hover {
                    background: rgba(255, 255, 255, 0.04);
                    transform: translateX(5px);
                }

                .item-image-box {
                    width: 120px;
                    height: 120px;
                    border-radius: 18px;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.05);
                }

                .item-image-box img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .item-main-details {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .item-title-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 5px;
                }

                .item-title-row h3 {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.4rem;
                }

                .item-meta {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.85rem;
                    margin-bottom: auto;
                }

                .item-bottom-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 15px;
                }

                .quantity-luxury-selector {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 30px;
                    padding: 4px;
                    gap: 15px;
                }

                .quantity-luxury-selector button {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .quantity-luxury-selector button:hover:not(:disabled) {
                    background: #d4a373;
                }

                .quantity-luxury-selector button:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .qty-val {
                    font-weight: 600;
                    min-width: 20px;
                    text-align: center;
                }

                .item-price-display {
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                }

                .unit-price {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.4);
                }

                .total-item-price {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #d4a373;
                }

                .icon-only-btn {
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.2);
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 50%;
                    transition: all 0.2s;
                }

                .icon-only-btn:hover.delete {
                    color: #f87171;
                    background: rgba(248, 113, 113, 0.1);
                }

                /* Checkout Summary */
                .sticky-summary {
                    position: sticky;
                    top: 120px;
                }

                .order-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 32px;
                    padding: 35px;
                }

                .order-card h3 {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.75rem;
                    margin-bottom: 25px;
                }

                .summary-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 25px;
                }

                .summary-item {
                    display: flex;
                    justify-content: space-between;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1rem;
                }

                .summary-item .label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .free-text {
                    color: #4ade80;
                    font-weight: 600;
                }

                .discount .value {
                    color: #f87171;
                }

                .summary-total-luxury {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 25px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }

                .summary-total-luxury .label {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: white;
                }

                .total-amount-box {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                }

                .total-amount-box .currency {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.4);
                }

                .total-amount-box .amount {
                    font-size: 2.2rem;
                    font-weight: 800;
                    color: #d4a373;
                    font-family: 'Playfair Display', serif;
                }

                .luxury-checkout-btn {
                    width: 100%;
                    padding: 20px;
                    border-radius: 20px;
                    border: none;
                    background: linear-gradient(135deg, #d4a373 0%, #a67c52 100%);
                    color: white;
                    font-weight: 700;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 30px rgba(212, 163, 115, 0.2);
                    margin-bottom: 20px;
                }

                .luxury-checkout-btn:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(212, 163, 115, 0.3);
                }

                .trust-badges {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 25px;
                }

                .badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.3);
                }

                .promo-code-box .promo-toggle {
                    background: transparent;
                    border: none;
                    color: #d4a373;
                    font-size: 0.85rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 0;
                }

                /* Empty & Success states */
                .cart-empty-state {
                    text-align: center;
                    padding: 80px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 30px;
                    border: 1px dashed rgba(255, 255, 255, 0.1);
                    margin-top: 40px;
                }

                .interactive-empty-cart {
                    perspective: 1000px;
                }

                .cart-icon-wrapper {
                    position: relative;
                    margin-bottom: 40px;
                    width: 200px;
                    height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .floating-bag {
                    color: rgba(212, 163, 115, 0.8);
                    animation: magicalFloat 4s ease-in-out infinite;
                    z-index: 2;
                    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .cart-icon-wrapper:hover .floating-bag {
                    transform: scale(1.1) rotate(-5deg);
                    color: #d4a373;
                }

                .cart-shadow {
                    position: absolute;
                    bottom: 10px;
                    width: 80px;
                    height: 10px;
                    background: rgba(0, 0, 0, 0.4);
                    border-radius: 50%;
                    filter: blur(8px);
                    animation: shadowPulse 4s ease-in-out infinite;
                }

                .coffee-bean-particle {
                    position: absolute;
                    color: #a67c52;
                    opacity: 0;
                    z-index: 1;
                    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .bean-1 { top: 40%; left: 30%; transform: rotate(0deg); }
                .bean-2 { top: 30%; right: 25%; transform: rotate(45deg); }
                .bean-3 { bottom: 30%; right: 35%; transform: rotate(-30deg); }

                .cart-icon-wrapper:hover .bean-1 {
                    opacity: 0.8;
                    transform: translate(-60px, -40px) rotate(-45deg);
                }
                
                .cart-icon-wrapper:hover .bean-2 {
                    opacity: 0.6;
                    transform: translate(60px, -50px) rotate(90deg);
                }

                .cart-icon-wrapper:hover .bean-3 {
                    opacity: 0.7;
                    transform: translate(50px, 40px) rotate(-80deg);
                }

                @keyframes magicalFloat {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.02); }
                }

                @keyframes shadowPulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(0.6); opacity: 0.2; }
                }

                .empty-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 2.5rem;
                    background: linear-gradient(135deg, #fff 0%, #d4a373 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 20px;
                }
                
                .empty-subtitle {
                    color: rgba(255, 255, 255, 0.6);
                    max-width: 450px;
                    margin: 0 auto 40px;
                    line-height: 1.6;
                    font-family: 'Outfit', sans-serif;
                }

                .return-catalog-btn {
                    position: relative;
                    overflow: hidden;
                    border: none;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .return-catalog-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
                    transform: skewX(-25deg);
                    animation: shine 3s infinite;
                }

                @keyframes shine {
                    0% { left: -100%; }
                    20% { left: 200%; }
                    100% { left: 200%; }
                }

                .return-catalog-btn:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(212, 163, 115, 0.3);
                }
                
                .return-catalog-btn:active {
                    transform: translateY(1px);
                }

                .empty-cart-visual {
                    margin-bottom: 30px;
                    color: rgba(255, 255, 255, 0.1);
                    animation: magicalFloat 4s ease-in-out infinite;
                }

                .cart-empty-state h2 {
                    font-family: 'Playfair Display', serif;
                    font-size: 2.5rem;
                    margin-bottom: 15px;
                }

                .success-icon {
                    color: #4ade80;
                    margin-bottom: 30px;
                }

                .pulse {
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .primary-btn {
                    background: #d4a373;
                    color: white;
                    padding: 18px 40px;
                    border-radius: 18px;
                    text-decoration: none;
                    font-weight: 700;
                    transition: all 0.3s;
                }

                .primary-btn.glossy {
                    background: linear-gradient(135deg, #d4a373 0%, #a67c52 100%);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }

                .secondary-btn {
                    padding: 18px 40px;
                    color: white;
                    text-decoration: none;
                    font-weight: 600;
                }

                @media (max-width: 1024px) {
                    .cart-layout {
                        grid-template-columns: 1fr;
                    }
                    .sticky-summary {
                        position: static;
                    }
                }

                @media (max-width: 640px) {
                    .premium-cart-item {
                        flex-direction: column;
                    }
                    .item-image-box {
                        width: 100%;
                        height: 200px;
                    }
                }
            `}</style>
    </div>
  );
};

export default Cart;
