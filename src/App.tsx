import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PrivateRoute, PublicRoute } from './components/auth/RouteGuard';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import Layout from './Components/Layout';

import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            {/* Protected Shop Routes */}
            <Route path="/" element={
              <PrivateRoute>
                <Layout>
                  <Catalog />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/product/:slug" element={
              <PrivateRoute>
                <Layout>
                  <ProductDetail />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/cart" element={
              <PrivateRoute>
                <Layout>
                  <Cart />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/orders" element={
              <PrivateRoute>
                <Layout>
                  <MyOrders />
                </Layout>
              </PrivateRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
