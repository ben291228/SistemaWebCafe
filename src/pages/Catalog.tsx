import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../Components/ProductCard';
import { Search, Coffee as CoffeeIcon } from 'lucide-react';
import { playBellSound } from '../utils/sounds';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category_name: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

const Catalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    productService.getProducts(),
                    productService.getCategories()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching shop data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        playBellSound();
    }, []);

    const handleCategoryChange = async (slug: string | null) => {
        setLoading(true);
        setActiveCategory(slug);
        try {
            // Fix: slug can be null, but getProducts expects string | undefined
            const data = await productService.getProducts(slug || undefined);
            setProducts(data);
        } catch (error) {
            console.error("Error filtering products:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="catalog-container">
            <header className="catalog-header">
                <div className="header-content">
                    <h1>Nuestra Selección de Café</h1>
                    <p>Desde granos artesanales hasta las máquinas más avanzadas.</p>
                </div>
            </header>

            <div className="catalog-controls">
                <div className="category-list">
                    <button
                        className={`category-btn ${!activeCategory ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(null)}
                    >
                        Todos
                    </button>
                    {categories.map((cat: Category) => (
                        <button
                            key={cat.id}
                            className={`category-btn ${activeCategory === cat.slug ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(cat.slug)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="search-bar">
                    <Search size={20} />
                    <input type="text" placeholder="Buscar productos..." />
                </div>
            </div>

            {loading ? (
                <div className="loading-state">
                    <CoffeeIcon className="loading-spinner" size={40} />
                    <p>Preparando el catálogo...</p>
                </div>
            ) : (
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="no-products">
                            <p>No se encontraron productos en esta categoría.</p>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                .catalog-container {
                    padding-bottom: 60px;
                }

                .catalog-header {
                    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/public/espresso-surrounded-by-scattered-coffee-beans-dark-surface 1.png');
                    background-size: cover;
                    background-position: center; 
                    padding: 100px 20px;
                    text-align: center;
                    border-radius: 0 0 40px 40px;
                    margin-bottom: 40px;
                }

                .header-content h1 {
                    font-family: 'Playfair Display', serif;
                    font-size: 3.5rem;
                    margin-bottom: 10px;
                    text-indent: 0;
                    margin-left: 0;
                }

                .header-content p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.8);
                }

                .catalog-controls {
                    max-width: 1200px;
                    margin: 0 auto 40px;
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .category-list {
                    display: flex;
                    gap: 12px;
                    overflow-x: auto;
                    padding-bottom: 10px;
                }

                .category-btn {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 30px;
                    cursor: pointer;
                    font-family: 'Outfit', sans-serif;
                    white-space: nowrap;
                    transition: all 0.3s ease;
                    margin-left: 0;
                }

                .category-btn:hover, .category-btn.active {
                    background: #d4a373;
                    border-color: #d4a373;
                }

                .search-bar {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 30px;
                    padding: 8px 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                    max-width: 350px;
                    color: rgba(255, 255, 255, 0.6);
                }

                .search-bar input {
                    background: transparent;
                    border: none;
                    color: white;
                    width: 100%;
                    font-family: 'Outfit', sans-serif;
                }

                .search-bar input:focus {
                    outline: none;
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 30px;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .loading-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 100px 0;
                    color: rgba(255, 255, 255, 0.6);
                    font-family: 'Outfit', sans-serif;
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

                .no-products {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 100px 0;
                    color: rgba(255, 255, 255, 0.4);
                    font-style: italic;
                }

                @media (max-width: 768px) {
                    .header-content h1 {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Catalog;
