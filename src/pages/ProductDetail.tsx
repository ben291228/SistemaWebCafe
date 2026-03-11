import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart as useCartContext } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductDetail: React.FC = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCartContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProduct(slug!);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <div className="detail-loading">Cargando detalles...</div>;
    if (!product) return <div className="detail-error">Producto no encontrado.</div>;

    return (
        <div className="detail-container">
            <Link to="/" className="back-link"><ArrowLeft size={20} /> Volver</Link>

            <div className="product-view">
                <div className="product-gallery">
                    <img src={product.image || '/coffee-placeholder.png'} alt={product.name} />
                </div>

                <div className="product-info-panel">
                    <span className="category-badge">{product.category_name}</span>
                    <h1>{product.name}</h1>
                    <p className="price-tag">${product.price}</p>

                    <div className="description">
                        <h3>Descripción</h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="stock-info">
                        <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                            {product.stock > 0 ? `Disponible: ${product.stock} unidades` : 'Agotado'}
                        </span>
                    </div>

                    <button
                        className="buy-btn"
                        disabled={product.stock <= 0}
                        onClick={() => {
                            addToCart(product);
                            navigate('/cart');
                        }}
                    >
                        <ShoppingCart size={20} />
                        Añadir y Comprar ahora
                    </button>

                    <div className="features">
                        <div className="feature">
                            <Truck size={20} />
                            <span>Envío express en 24h</span>
                        </div>
                        <div className="feature">
                            <ShieldCheck size={20} />
                            <span>Garantía de calidad garantizada</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .detail-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #d4a373;
          text-decoration: none;
          margin-bottom: 30px;
          font-family: 'Outfit', sans-serif;
        }

        .product-view {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .product-gallery img {
          width: 100%;
          border-radius: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .category-badge {
          color: #d4a373;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .product-info-panel h1 {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          margin: 10px 0;
          text-indent: 0;
          margin-left: 0;
        }

        .price-tag {
          font-size: 2rem;
          font-weight: 700;
          color: #FFF;
          margin-bottom: 30px;
        }

        .description {
          margin-bottom: 30px;
        }

        .description h3 {
          font-family: 'Playfair Display', serif;
          color: rgba(255,255,255,0.6);
          margin-bottom: 10px;
        }

        .description p {
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          font-family: 'Outfit', sans-serif;
        }

        .stock-info {
          margin-bottom: 30px;
          font-family: 'Outfit', sans-serif;
        }

        .in-stock { color: #4ade80; font-weight: 600; }
        .out-of-stock { color: #f87171; font-weight: 600; }

        .buy-btn {
          width: 100%;
          background: #d4a373;
          color: white;
          border: none;
          padding: 18px;
          border-radius: 15px;
          font-size: 1.2rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-left: 0;
        }

        .buy-btn:hover {
          background: #bc8a5f;
          transform: translateY(-2px);
        }

        .features {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .product-view { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default ProductDetail;
