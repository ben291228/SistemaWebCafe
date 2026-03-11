import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee, Lock, Mail, User, Loader2 } from 'lucide-react';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        repeat_password: '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.repeat_password) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setIsSubmitting(true);
        try {
            await register(formData);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error al registrarse. Inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <Coffee className="auth-logo" size={48} />
                    <h1>Únete a nosotros</h1>
                    <p>Regístrate para disfrutar de la experiencia completa.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}

                    <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre completo"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input
                            type="text"
                            name="username"
                            placeholder="Nombre de usuario"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                name="repeat_password"
                                placeholder="Repetir"
                                value={formData.repeat_password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="auth-button">
                        {isSubmitting ? <Loader2 className="spinner" /> : 'Crear Cuenta'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
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
           max-width: 500px;
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
           text-align: center;
        }

        .auth-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          margin: 15px 0 5px;
          color: #FFF;
          text-indent: 0;
          margin-left: 0;
        }

        .auth-header p {
          font-family: 'Outfit', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          margin-bottom: 30px;
        }

        .auth-logo {
          color: #d4a373;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          padding: 12px;
          border-radius: 12px;
          font-size: 0.85rem;
          margin-bottom: 5px;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: rgba(255, 255, 255, 0.4);
        }

        .input-group input {
          width: 100%;
          padding: 12px 12px 12px 42px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #FFF;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .input-group input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.15);
          border-color: #d4a373;
        }

        .auth-button {
          background: #d4a373;
          color: #FFF;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          margin-left: 0;
          width: 100%;
        }

        .auth-button:hover:not(:disabled) {
          background: #bc8a5f;
          transform: translateY(-2px);
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
          margin-top: 25px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .auth-footer a {
          color: #d4a373;
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .input-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default Register;
