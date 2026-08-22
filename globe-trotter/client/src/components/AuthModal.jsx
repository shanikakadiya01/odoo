import React, { useState } from 'react';
import { X, Sparkles, User, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login, loginDemo, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await register({ firstName, lastName, phone, city, country, additionalInfo, email, password });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginDemo();
    } catch (err) {
      setError('Demo login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="modal-content auth-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="auth-title">
              {authMode === 'login' ? 'Welcome Back Traveler' : 'Join Globe Trotter'}
            </h3>
            <p className="auth-subtitle">
              {authMode === 'login'
                ? 'Sign in to access your custom multi-city itineraries and saved destinations.'
                : 'Create an account to start curating global adventures with smart budgeting.'}
            </p>
          </div>

          <button className="modal-close-btn" onClick={() => setAuthModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Quick Demo Login Option */}
        <div className="demo-login-callout">
          <div className="demo-info">
            <Sparkles size={18} className="text-cyan" />
            <div>
              <span className="demo-title">Test Drive with 1-Click Guest Demo</span>
              <p className="demo-desc">Instantly load sample trips (Paris, Tokyo, Bali) without registering.</p>
            </div>
          </div>
          <button className="btn btn-cyan btn-sm" onClick={handleDemoLogin} disabled={loading}>
            <span>Demo Login</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="auth-divider-wrap">
          <span className="auth-divider-line" />
          <span className="auth-divider-text">or continue with email</span>
          <span className="auth-divider-line" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error-box">{error}</div>}

          {authMode === 'register' && (
            <>
              <div className="input-row" style={{ display: 'flex', gap: '10px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label className="input-label">First Name</label>
                  <div className="input-icon-wrap">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      className="input-field with-icon"
                      placeholder="Alex"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label className="input-label">Last Name</label>
                  <div className="input-icon-wrap">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      className="input-field with-icon"
                      placeholder="Johnson"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <div className="input-icon-wrap">
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="+1 234 567 8900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-row" style={{ display: 'flex', gap: '10px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label className="input-label">City</label>
                  <div className="input-icon-wrap">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="New York"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label className="input-label">Country</label>
                  <div className="input-icon-wrap">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="USA"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Additional Information (Optional)</label>
                <textarea
                  className="input-field"
                  placeholder="Any dietary restrictions, accessibility needs, etc."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows="2"
                  style={{ resize: 'none' }}
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-icon-wrap">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                className="input-field with-icon"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                className="input-field with-icon"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
            {loading ? 'Please wait...' : authMode === 'login' ? 'Sign In to Globe Trotter' : 'Create Account'}
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="auth-modal-footer">
          {authMode === 'login' ? (
            <p className="switch-mode-text">
              Don't have an account?{' '}
              <button className="switch-mode-btn" onClick={() => setAuthMode('register')}>
                Sign up free
              </button>
            </p>
          ) : (
            <p className="switch-mode-text">
              Already have an account?{' '}
              <button className="switch-mode-btn" onClick={() => setAuthMode('login')}>
                Log in
              </button>
            </p>
          )}
        </div>
      </div>

      <style>{`
        .auth-modal-box {
          max-width: 480px;
          background: #ffffff;
        }
        .auth-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .auth-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .demo-login-callout {
          margin: 20px 24px 0 24px;
          padding: 14px 16px;
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .demo-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .demo-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: #0284c7;
          display: block;
        }
        .demo-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .auth-divider-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 24px 0 24px;
        }
        .auth-divider-line {
          flex: 1;
          height: 1px;
          background: var(--border-subtle);
        }
        .auth-divider-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .auth-form {
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .input-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .input-field.with-icon {
          padding-left: 42px;
        }
        .w-full {
          width: 100%;
        }
        .auth-error-box {
          padding: 10px 14px;
          background: #ffe4e6;
          border: 1px solid #fecdd3;
          border-radius: var(--radius-sm);
          color: #e11d48;
          font-size: 0.85rem;
        }
        .auth-modal-footer {
          padding: 14px 24px 20px 24px;
          text-align: center;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
        }
        .switch-mode-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .switch-mode-btn {
          background: transparent;
          border: none;
          color: #0284c7;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .switch-mode-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
