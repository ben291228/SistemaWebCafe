import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee, Lock, Mail, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login({ email, password });
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error al iniciar sesión. Inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <Coffee className="auth-logo" size={48} />
                    <h1>Sistema Web Café</h1>
                    <p>Bienvenido de nuevo, un café te espera.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}

                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="auth-button">
                        {isSubmitting ? <Loader2 className="spinner" /> : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
                </div>
            </div>

            <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-card {
           background: rgba(255, 255, 255, 0.05);
           backdrop-filter: blur(15px);
           -webkit-backdrop-filter: blur(15px);
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 24px;
           padding: 40px;
           width: 100%;
           max-width: 450px;
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
           text-align: center;
        }

        .auth-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          margin: 15px 0 5px;
          color: #FFF;
          text-indent: 0;
          margin-left: 0;
        }

        .auth-header p {
          font-family: 'Outfit', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          margin-bottom: 30px;
        }

        .auth-logo {
          color: #d4a373;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          padding: 12px;
          border-radius: 12px;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: rgba(255, 255, 255, 0.4);
        }

        .input-group input {
          width: 100%;
          padding: 14px 14px 14px 48px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          color: #FFF;
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .input-group input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.15);
          border-color: #d4a373;
          box-shadow: 0 0 0 4px rgba(212, 163, 115, 0.1);
        }

        .auth-button {
          background: #d4a373;
          color: #FFF;
          border: none;
          padding: 14px;
          border-radius: 14px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 0;
          width: 100%;
        }

        .auth-button:hover:not(:disabled) {
          background: #bc8a5f;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }

        .auth-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .auth-footer {
          margin-top: 30px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
        }

        .auth-footer a {
          color: #d4a373;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
};

export default Login;
