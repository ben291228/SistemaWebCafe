import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Info } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number | string;
    name: string;
    price: number;
    image: string;
    description: string;
    category_name: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image || '/coffee-placeholder.png'} alt={product.name} className="product-image" />
        <div className="product-overlay">
          <button className="icon-btn" title="Ver detalles">
            <Info size={20} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category_name}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price}</p>

        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          <Plus size={18} />
          <span>Añadir al carrito</span>
        </button>
      </div>

      <style>{`
        .product-card {
           background: rgba(255, 255, 255, 0.03);
           backdrop-filter: blur(10px);
           border: 1px solid rgba(255, 255, 255, 0.05);
           border-radius: 20px;
           overflow: hidden;
           transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
           display: flex;
           flex-direction: column;
           height: 100%;
        }

        .product-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(212, 163, 115, 0.3);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
        }

        .product-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .icon-btn {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon-btn:hover {
          background: #d4a373;
          border-color: #d4a373;
        }

        .product-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-category {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #d4a373;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }

        .product-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          color: white;
          margin: 0 0 10px 0;
          line-height: 1.3;
        }

        .product-price {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
          margin-top: auto;
        }

        .add-to-cart-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 12px;
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-to-cart-btn:hover {
          background: #d4a373;
          border-color: #d4a373;
          box-shadow: 0 4px 15px rgba(212, 163, 115, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
