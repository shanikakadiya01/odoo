import React, { useState } from 'react';
import { Compass, Globe, MapPin, Calendar, PieChart, Sparkles, User, LogOut, Heart, Plus, ChevronDown, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { useTheme } from '../context/ThemeContext';
import { CURRENCY_RATES } from '../services/api';

export const Navbar = ({ activeTab, setActiveTab, onOpenNewTrip, onOpenAIAssistant }) => {
  const { user, currency, setCurrency, bookmarks, openAuth, logout } = useAuth();
  const { activeTrip } = useTrips();
  const { setThemeModalOpen } = useTheme();
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="navbar-container">
      <div className="container nav-content">
        {/* Brand Logo */}
        <div className="nav-brand" onClick={() => setActiveTab('explore')} role="button" tabIndex={0}>
          <div className="brand-icon-wrapper">
            <Globe className="brand-icon animate-float" size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-title">
              GLOBE<span className="gradient-text-sunset">TROTTER</span>
            </span>
            <span className="brand-tagline">Multi-City Travel Planner</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <button
            className={`nav-btn ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            <Compass size={18} />
            <span>Explore Cities</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveTab('builder')}
          >
            <MapPin size={18} />
            <span>Itinerary Builder</span>
            {activeTrip?.stops?.length > 0 && (
              <span className="nav-badge">{activeTrip.stops.length}</span>
            )}
          </button>

          <button
            className={`nav-btn ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            <PieChart size={18} />
            <span>Budget Analyzer</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'trips' ? 'active' : ''}`}
            onClick={() => setActiveTab('trips')}
          >
            <Calendar size={18} />
            <span>My Trips</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Theme Palette Switcher */}
          <button
            className="btn btn-glass btn-sm theme-toggle-btn"
            onClick={() => setThemeModalOpen(true)}
            title="Choose Background Theme"
          >
            <Palette size={16} className="text-cyan" />
            <span className="hide-mobile">Theme</span>
          </button>

          {/* AI Travel Assistant Trigger */}
          <button className="btn btn-glass btn-sm ai-btn" onClick={onOpenAIAssistant} title="AI Travel Advisor">
            <Sparkles size={16} className="text-cyan" />
            <span className="hide-mobile">AI Advisor</span>
          </button>

          {/* Currency Switcher */}
          <div className="currency-selector-wrapper">
            <button
              className="currency-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              title="Select Display Currency"
            >
              <span>{currency}</span>
              <span className="currency-symbol">{CURRENCY_RATES[currency]?.symbol}</span>
              <ChevronDown size={14} />
            </button>

            {currencyDropdownOpen && (
              <div className="currency-dropdown glass-panel">
                {Object.entries(CURRENCY_RATES).map(([code, meta]) => (
                  <button
                    key={code}
                    className={`currency-option ${currency === code ? 'selected' : ''}`}
                    onClick={() => {
                      setCurrency(code);
                      setCurrencyDropdownOpen(false);
                    }}
                  >
                    <span className="currency-option-symbol">{meta.symbol}</span>
                    <span className="currency-option-code">{code}</span>
                    <span className="currency-option-name">{meta.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Profile */}
          {user ? (
            <div className="user-profile-wrapper">
              <button
                className="user-avatar-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title={user.name}
              >
                <img src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} alt={user.name} className="user-avatar" />
                <span className="user-name-label hide-mobile">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown glass-panel">
                  <div className="user-dropdown-header">
                    <p className="user-dropdown-name">{user.name}</p>
                    <p className="user-dropdown-email">{user.email}</p>
                  </div>
                  <div className="user-dropdown-divider" />
                  <button
                    className="user-dropdown-item"
                    onClick={() => {
                      setActiveTab('trips');
                      setUserDropdownOpen(false);
                    }}
                  >
                    <Calendar size={16} />
                    <span>My Trips</span>
                  </button>
                  <button
                    className="user-dropdown-item"
                    onClick={() => {
                      setActiveTab('explore');
                      setUserDropdownOpen(false);
                    }}
                  >
                    <Heart size={16} />
                    <span>Saved Cities ({bookmarks.length})</span>
                  </button>
                  <div className="user-dropdown-divider" />
                  <button
                    className="user-dropdown-item text-coral"
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn btn-ghost btn-sm" onClick={() => openAuth('login')}>
                Sign In
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => openAuth('register')}>
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--bg-nav);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          transition: all var(--transition-normal);
        }
        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 20px;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }
        .brand-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #0284c7;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
        }
        .brand-icon {
          color: #ffffff;
        }
        .brand-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.04em;
          color: var(--text-primary);
        }
        .brand-tagline {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-secondary);
          padding: 4px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
        }
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .nav-btn:hover {
          color: var(--text-primary);
          background: #ffffff;
        }
        .nav-btn.active {
          color: #0369a1;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
          font-weight: 700;
        }
        .nav-badge {
          background: var(--accent-coral);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: var(--radius-full);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .theme-toggle-btn {
          border-color: var(--border-subtle);
        }
        .theme-toggle-btn:hover {
          border-color: #0284c7;
        }
        .ai-btn {
          border-color: var(--border-subtle);
        }
        .ai-btn:hover {
          border-color: var(--accent-cyan);
        }
        .text-cyan {
          color: var(--accent-cyan);
        }
        .text-coral {
          color: var(--accent-coral);
        }
        .currency-selector-wrapper, .user-profile-wrapper {
          position: relative;
        }
        .currency-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }
        .currency-btn:hover {
          background: var(--bg-secondary);
          border-color: #cbd5e1;
        }
        .currency-symbol {
          color: var(--accent-amber);
          font-weight: 700;
        }
        .currency-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 200px;
          padding: 6px;
          z-index: 110;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg);
        }
        .currency-option {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 10px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
        }
        .currency-option:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .currency-option.selected {
          background: #e0f2fe;
          color: #0369a1;
          font-weight: 600;
        }
        .currency-option-symbol {
          width: 20px;
          font-weight: 700;
          color: var(--accent-amber);
        }
        .currency-option-code {
          font-weight: 600;
        }
        .currency-option-name {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-left: auto;
        }
        .user-avatar-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 4px 10px 4px 4px;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }
        .user-avatar-btn:hover {
          border-color: #cbd5e1;
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          object-fit: cover;
        }
        .user-name-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .user-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 220px;
          padding: 8px;
          z-index: 110;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg);
        }
        .user-dropdown-header {
          padding: 8px 10px;
        }
        .user-dropdown-name {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .user-dropdown-email {
          font-size: 0.75rem;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-dropdown-divider {
          height: 1px;
          background: var(--border-subtle);
          margin: 6px 0;
        }
        .user-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 10px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .user-dropdown-item:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }
          .hide-mobile {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
