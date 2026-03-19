import React, { useEffect, useState } from 'react';
import { orderService } from '../services/productService';
import { Package, Calendar, ChevronRight, ShoppingBag, ArrowLeft, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-loading-state">
        <Coffee className="loading-spinner" size={40} />
        <p>Buscando el historial de tus pedidos...</p>
      </div>
    );
  }

  return (
    <div className="orders-page-container fade-in">
      <header className="orders-header-banner">
        <div className="header-content">
          <Link to="/" className="minimal-back-link">
            <ArrowLeft size={18} /> Volver al Catálogo
          </Link>
          <h1>Mis Pedidos</h1>
          <p>El historial de tus experiencias con Sistema Web Café.</p>
        </div>
      </header>

      <div className="orders-content">
        {orders.length === 0 ? (
          <div className="orders-empty-state">
             <div className="empty-orders-visual">
               <ShoppingBag size={100} strokeWidth={1} />
             </div>
             <h2>Aún no has realizado pedidos</h2>
             <p>Tus granos favoritos te están esperando para ser descubiertos.</p>
             <Link to="/" className="primary-btn glossy">Ir al catálogo</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order: any) => (
              <div key={order.id} className="premium-order-card">
                <div className="order-main-info">
                  <div className="order-brand-icon">
                    <Package size={24} />
                  </div>
                  <div className="order-id-group">
                    <span className="order-label">Pedido</span>
                    <span className="order-id">#{order.id}</span>
                  </div>
                  <div className="order-date-group">
                    <Calendar size={16} />
                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>
                  <div className="order-total-group">
                    <span className="order-total-label">Total</span>
                    <span className="order-total-amount">${order.total_amount}</span>
                  </div>
                  <button className="icon-forward-btn">
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="order-items-preview">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="preview-item">
                      <span className="preview-qty">{item.quantity}x</span>
                      <span className="preview-name">{item.product_details.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .orders-page-container {
            padding-bottom: 80px;
        }

        .fade-in {
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .orders-header-banner {
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/public/espresso-surrounded-by-scattered-coffee-beans-dark-surface 1.png');
            background-size: cover;
            background-position: center 30%; 
            padding: 80px 20px;
            text-align: center;
            border-radius: 0 0 40px 40px;
            margin-bottom: 50px;
        }

        .header-content {
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
        }

        .minimal-back-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            font-size: 0.9rem;
            position: absolute;
            left: 0;
            top: 0;
            transition: color 0.3s;
            font-family: 'Outfit', sans-serif;
        }

        .minimal-back-link:hover {
            color: #d4a373;
        }

        .header-content h1 {
            font-family: 'Playfair Display', serif;
            font-size: 3.5rem;
            margin-bottom: 15px;
            margin-top: 20px;
            color: white;
            text-indent: 0;
            margin-left: 0;
        }

        .header-content p {
            font-family: 'Outfit', sans-serif;
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.8);
        }

        .orders-content {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .orders-list {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }

        .premium-order-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 24px;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .premium-order-card:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(212, 163, 115, 0.3);
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .order-main-info {
            padding: 25px 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
        }

        .order-brand-icon {
            background: rgba(212, 163, 115, 0.1);
            color: #d4a373;
            padding: 15px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .order-id-group {
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 100px;
        }

        .order-label {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.4);
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }

        .order-id {
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
            color: white;
            font-size: 1.1rem;
        }

        .order-date-group {
            display: flex;
            align-items: center;
            gap: 8px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.95rem;
            background: rgba(255, 255, 255, 0.03);
            padding: 8px 16px;
            border-radius: 30px;
        }

        .order-status {
            padding: 6px 16px;
            border-radius: 30px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: capitalize;
            letter-spacing: 0.5px;
        }

        .status-pending { background: rgba(234, 179, 8, 0.15); color: #facc15; border: 1px solid rgba(234, 179, 8, 0.3); }
        .status-paid { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .status-delivered { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }

        .order-total-group {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 4px;
        }

        .order-total-label {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.4);
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }

        .order-total-amount {
            font-weight: 800;
            font-size: 1.3rem;
            color: #d4a373;
            font-family: 'Playfair Display', serif;
        }

        .icon-forward-btn {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.6);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
        }

        .premium-order-card:hover .icon-forward-btn {
            background: #d4a373;
            color: white;
            border-color: #d4a373;
            transform: translateX(3px);
        }

        .order-items-preview {
            background: rgba(0, 0, 0, 0.3);
            padding: 16px 30px;
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .preview-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
            font-family: 'Outfit', sans-serif;
            background: rgba(255, 255, 255, 0.05);
            padding: 6px 14px;
            border-radius: 20px;
        }

        .preview-qty {
            color: #d4a373;
            font-weight: 800;
        }

        .preview-name {
            color: rgba(255, 255, 255, 0.8);
        }

        /* Empty State */
        .orders-empty-state {
            text-align: center;
            padding: 80px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 30px;
            border: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .empty-orders-visual {
            margin-bottom: 25px;
            color: rgba(255, 255, 255, 0.1);
            animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }

        .orders-empty-state h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2.2rem;
            margin-bottom: 15px;
            color: white;
        }

        .orders-empty-state p {
            font-family: 'Outfit', sans-serif;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 30px;
            max-width: 400px;
        }

        .primary-btn {
            background: #d4a373;
            color: white;
            padding: 16px 36px;
            border-radius: 18px;
            text-decoration: none;
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
            transition: all 0.3s;
        }

        .primary-btn.glossy {
            background: linear-gradient(135deg, #d4a373 0%, #a67c52 100%);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .primary-btn.glossy:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 25px rgba(212, 163, 115, 0.4);
        }

        .orders-loading-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 150px 0;
            color: rgba(255, 255, 255, 0.6);
            font-family: 'Outfit', sans-serif;
            min-height: 60vh;
        }

        .loading-spinner {
            color: #d4a373;
            margin-bottom: 20px;
            animation: spin 2s linear infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .order-main-info {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
            .order-brand-icon, .icon-forward-btn {
                display: none;
            }
            .order-date-group, .order-status, .order-total-group {
                width: 100%;
                justify-content: space-between;
                align-items: center;
                flex-direction: row;
            }
            .order-total-group {
                align-items: center;
            }
            .header-content h1 {
                font-size: 2.5rem;
                margin-top: 40px;
            }
            .minimal-back-link {
                position: relative;
                margin-bottom: 20px;
            }
        }
      `}</style>
    </div>
  );
};

export default MyOrders;
