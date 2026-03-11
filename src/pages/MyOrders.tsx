import React, { useEffect, useState } from 'react';
import { orderService } from '../services/productService';
import { Package, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
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
      <div className="orders-loading">
        <Package className="animate-bounce" size={40} />
        <p>Cargando tus pedidos...</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1>Mis Pedidos</h1>
        <p>Historial de tus experiencias con Sistema Web Café.</p>
      </header>

      {orders.length === 0 ? (
        <div className="no-orders">
          <ShoppingBag size={60} />
          <h2>Aún no has realizado pedidos</h2>
          <p>Tus granos favoritos te están esperando.</p>
          <Link to="/" className="primary-btn">Ir al catálogo</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order: any) => (
            <div key={order.id} className="order-card">
              <div className="order-main-info">
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
                  <span className="order-total">${order.total_amount}</span>
                </div>
                <ChevronRight size={20} className="expand-icon" />
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

      <style>{`
        .orders-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .orders-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .orders-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          margin-left: 0;
          text-indent: 0;
        }

        .orders-header p {
          font-family: 'Outfit', sans-serif;
          color: rgba(255, 255, 255, 0.6);
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .order-card {
           background: rgba(255, 255, 255, 0.03);
           backdrop-filter: blur(10px);
           border: 1px solid rgba(255, 255, 255, 0.05);
           border-radius: 20px;
           overflow: hidden;
           cursor: pointer;
           transition: all 0.3s ease;
        }

        .order-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(212, 163, 115, 0.3);
        }

        .order-main-info {
          padding: 20px;
          display: grid;
          grid-template-columns: 120px 150px 1fr 120px 40px;
          align-items: center;
          gap: 20px;
        }

        .order-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          display: block;
          text-transform: uppercase;
        }

        .order-id {
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
        }

        .order-date-group {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .order-status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          width: fit-content;
        }

        .status-pending { background: rgba(234, 179, 8, 0.2); color: #facc15; }
        .status-paid { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
        .status-delivered { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }

        .order-total {
          font-weight: 700;
          font-size: 1.1rem;
          color: #d4a373;
        }

        .order-items-preview {
          background: rgba(0, 0, 0, 0.2);
          padding: 15px 20px;
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .preview-item {
          display: flex;
          gap: 8px;
          font-size: 0.85rem;
          font-family: 'Outfit', sans-serif;
        }

        .preview-qty {
          color: #d4a373;
          font-weight: 700;
        }

        .preview-name {
          color: rgba(255, 255, 255, 0.7);
        }

        .no-orders {
          text-align: center;
          padding: 100px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .no-orders h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
        }

        .primary-btn {
          background: #d4a373;
          color: white;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
        }

        .orders-loading {
          padding: 100px 0;
          text-align: center;
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
          .order-main-info {
            grid-template-columns: 1fr 1fr;
          }
          .expand-icon { display: none; }
        }
      `}</style>
    </div>
  );
};

export default MyOrders;
