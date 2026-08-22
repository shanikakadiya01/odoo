import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckSquare, Square, Package, Zap, Lightbulb, Compass, Loader } from 'lucide-react';
import { getAISuggestions } from '../services/api';
import { useTrips } from '../context/TripContext';

export const AIAssistantModal = ({ onClose }) => {
  const { activeTrip } = useTrips();
  const [loading, setLoading] = useState(false);
  const [travelStyle, setTravelStyle] = useState('Balanced');
  const [suggestions, setSuggestions] = useState(null);
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('gt_packed_items');
    return saved ? JSON.parse(saved) : {};
  });

  const destinationSummary = activeTrip?.stops?.map((s) => s.cityName).join(', ') || 'Global Destinations';
  const durationDays = activeTrip?.stops?.length ? activeTrip.stops.length * 4 : 7;

  useEffect(() => {
    localStorage.setItem('gt_packed_items', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const data = await getAISuggestions({
        destination: destinationSummary,
        budget: activeTrip?.totalBudget || 3000,
        travelStyle,
        durationDays
      });
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, [travelStyle]);

  const togglePackingItem = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="ai-modal-title">
            <div className="ai-badge-icon">
              <Sparkles size={18} className="text-cyan" />
            </div>
            <div>
              <h3 className="modal-heading">AI Travel Advisor & Packing Checklist</h3>
              <p className="modal-subheading">Intelligent route optimization and checklist for {destinationSummary}</p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Style Selector */}
          <div className="style-selector-row">
            <span className="style-label">Select Journey Pace:</span>
            <div className="style-chips">
              {['Action-Packed High Energy', 'Balanced', 'Relaxed & Immersive'].map((style) => (
                <button
                  key={style}
                  className={`style-chip ${travelStyle === style ? 'active' : ''}`}
                  onClick={() => setTravelStyle(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="ai-loading-box">
              <Loader size={36} className="animate-spin text-cyan" />
              <p>Analyzing route details and assembling recommendations...</p>
            </div>
          ) : suggestions ? (
            <div className="ai-results-wrapper">
              {/* Overview Box */}
              <div className="overview-callout glass-panel">
                <Compass size={20} className="text-cyan" />
                <p className="overview-text">{suggestions.overview}</p>
              </div>

              <div className="ai-grid">
                {/* Packing Checklist */}
                <div className="glass-panel ai-card">
                  <h4 className="ai-card-title">
                    <Package size={18} className="text-coral" /> Interactive Packing Checklist
                  </h4>
                  <p className="ai-card-subtitle">
                    Check off essential items as you pack for your multi-city journey:
                  </p>

                  <div className="packing-list">
                    {suggestions.packingRecommendations?.map((pack, i) => {
                      const isChecked = !!checkedItems[pack.item];
                      return (
                        <div
                          key={i}
                          className={`packing-item ${isChecked ? 'checked' : ''}`}
                          onClick={() => togglePackingItem(pack.item)}
                        >
                          {isChecked ? (
                            <CheckSquare size={18} className="text-cyan" />
                          ) : (
                            <Square size={18} className="text-muted" />
                          )}
                          <span className="pack-name">{pack.item}</span>
                          <span className="badge badge-cyan pack-cat">{pack.category}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Highlights & Savings */}
                <div className="ai-side-col">
                  <div className="glass-panel ai-card mb-3">
                    <h4 className="ai-card-title">
                      <Zap size={18} className="text-amber" /> Essential Itinerary Highlights
                    </h4>
                    <ul className="advice-list">
                      {suggestions.mustDoHighlights?.map((h, i) => (
                        <li key={i} className="advice-list-item">
                          <span className="dot bg-amber" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-panel ai-card">
                    <h4 className="ai-card-title">
                      <Lightbulb size={18} className="text-cyan" /> Local Expert Travel Hacks
                    </h4>
                    <ul className="advice-list">
                      {suggestions.budgetSavingTips?.map((tip, i) => (
                        <li key={i} className="advice-list-item">
                          <span className="dot bg-cyan" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Done & Return to Builder
          </button>
        </div>
      </div>

      <style>{`
        .ai-modal-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ai-badge-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: #e0f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-heading {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .modal-subheading {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .style-selector-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .style-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .style-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .style-chip {
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .style-chip:hover {
          background: #ffffff;
          border-color: #cbd5e1;
          color: var(--text-primary);
        }
        .style-chip.active {
          background: #0284c7;
          border-color: #0284c7;
          color: #ffffff;
        }
        .ai-loading-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 50px 20px;
          color: var(--text-secondary);
        }
        .overview-callout {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 20px;
          margin-bottom: 20px;
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: var(--radius-md);
        }
        .overview-text {
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.5;
        }
        .ai-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }
        .ai-card {
          padding: 20px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }
        .mb-3 {
          margin-bottom: 16px;
        }
        .ai-card-title {
          font-size: 1.05rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .ai-card-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 14px;
        }
        .packing-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .packing-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          cursor: pointer;
          user-select: none;
          transition: all var(--transition-fast);
        }
        .packing-item:hover {
          background: #ffffff;
          border-color: #cbd5e1;
        }
        .packing-item.checked .pack-name {
          text-decoration: line-through;
          color: var(--text-muted);
        }
        .pack-name {
          flex: 1;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .pack-cat {
          font-size: 0.68rem;
        }
        .advice-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .advice-list-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
          background: #0284c7;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
