import api from './api';

const PRODUCT_API_URL = 'http://localhost:8000/api/products/';

export const productService = {
    getCategories: async () => {
        const response = await api.get(`${PRODUCT_API_URL}categories/`);
        return response.data;
    },
    getProducts: async (categorySlug?: string) => {
        const url = categorySlug ? `${PRODUCT_API_URL}products/?category=${categorySlug}` : `${PRODUCT_API_URL}products/`;
        const response = await api.get(url);
        return response.data;
    },
    getProduct: async (slug: string) => {
        const response = await api.get(`${PRODUCT_API_URL}products/${slug}/`);
        return response.data;
    }
};

export const orderService = {
    createOrder: async (items: { product: number; quantity: number }[]) => {
        const response = await api.post('http://localhost:8000/api/sales/orders/', { items });
        return response.data;
    },
    getUserOrders: async () => {
        const response = await api.get('http://localhost:8000/api/sales/orders/');
        return response.data;
    }
};
