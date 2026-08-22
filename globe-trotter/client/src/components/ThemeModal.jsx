import React, { useState } from 'react';
import { X, Check, Palette, Sparkles, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeModal = () => {
  const {
    currentThemeId,
    selectTheme,
    customColor,
    applyCustomColor,
    themeModalOpen,
    setThemeModalOpen,
    themes,
  } = useTheme();

  const [inputHex, setInputHex] = useState(customColor);

  if (!themeModalOpen) return null;

  const handleCustomChange = (e) => {
    setInputHex(e.target.value);
    applyCustomColor(e.target.value);
  };

  return (
    <div className="modal-overlay" onClick={() => setThemeModalOpen(false)}>
      <div className="modal-content theme-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="theme-modal-title-row">
            <div className="theme-icon-wrap">
              <Sun size={20} className="theme-icon-sun" />
            </div>
            <div>
              <h2 className="modal-heading">Light Background Themes</h2>
              <p className="modal-subheading">
                Select a light background hue with high-contrast text and zero gradients
              </p>
            </div>
          </div>
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => setThemeModalOpen(false)}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body theme-modal-body">
          {/* Preset Swatches Grid */}
          <div className="theme-presets-label">
            <Palette size={15} />
            <span>Curated Light Palettes</span>
          </div>

          <div className="theme-cards-grid">
            {themes.map((t) => {
              const isSelected = currentThemeId === t.id;
              return (
                <div
                  key={t.id}
                  className={`theme-card ${isSelected ? 'active' : ''}`}
                  onClick={() => selectTheme(t.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className="theme-swatch"
                    style={{ backgroundColor: t.primary, border: `2px solid ${t.border}` }}
                  >
                    {isSelected && <Check size={18} className="theme-check-icon" />}
                  </div>
                  <div className="theme-card-info">
                    <div className="theme-card-name-row">
                      <span className="theme-card-name">{t.name}</span>
                      {isSelected && <span className="theme-active-tag">Active</span>}
                    </div>
                    <p className="theme-card-desc">{t.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Color Selector Section */}
          <div className="custom-theme-section">
            <div className="custom-theme-header">
              <div>
                <h3 className="custom-title">Custom Light Hue</h3>
                <p className="custom-desc">
                  Pick any custom light background color for a personalized look
                </p>
              </div>
              <div className="custom-picker-wrap">
                <input
                  type="color"
                  className="custom-color-input"
                  value={inputHex}
                  onChange={handleCustomChange}
                  title="Choose custom background color"
                />
                <span className="custom-hex-label">{inputHex.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={() => setThemeModalOpen(false)}>
            Done
          </button>
        </div>
      </div>

      <style>{`
        .theme-modal-box {
          max-width: 620px;
        }
        .theme-modal-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .theme-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: #f1f5f9;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .theme-icon-sun {
          color: #d97706;
        }
        .theme-modal-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .theme-presets-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .theme-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .theme-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          background: var(--bg-secondary);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .theme-card:hover {
          border-color: #0284c7;
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .theme-card.active {
          border-color: #0284c7;
          background: #ffffff;
          box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.2);
        }
        .theme-swatch {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }
        .theme-check-icon {
          color: #0284c7;
        }
        .theme-card-info {
          flex: 1;
          min-width: 0;
        }
        .theme-card-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }
        .theme-card-name {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .theme-active-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: #0284c7;
          background: #e0f2fe;
          padding: 2px 6px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
        .theme-card-desc {
          font-size: 0.76rem;
          color: var(--text-muted);
          margin-top: 2px;
          line-height: 1.3;
        }
        .custom-theme-section {
          padding: 16px;
          background: var(--bg-secondary);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .custom-theme-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .custom-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .custom-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .custom-picker-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          padding: 6px 12px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
        }
        .custom-color-input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 32px;
          height: 32px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          border-radius: 50%;
        }
        .custom-color-input::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        .custom-color-input::-webkit-color-swatch {
          border: 1px solid var(--border-subtle);
          border-radius: 50%;
        }
        .custom-hex-label {
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        @media (max-width: 600px) {
          .theme-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
