import React, { useState } from 'react';
import { X, MapPin, Sparkles, Clock, DollarSign, Plus, Check, Compass, Sun, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { formatMoney } from '../services/api';

export const CityDetailModal = ({ city, onClose }) => {
  const { currency, bookmarks, toggleBookmark } = useAuth();
  const { addStop, activeTrip, addActivity } = useTrips();
  const [addedStopSuccess, setAddedStopSuccess] = useState(false);
  const [addedActivityIds, setAddedActivityIds] = useState([]);

  if (!city) return null;
  const isBookmarked = bookmarks.includes(city._id);

  const handleAddCityStop = () => {
    addStop(city);
    setAddedStopSuccess(true);
    setTimeout(() => setAddedStopSuccess(false), 2000);
  };

  const handleAddSingleActivity = (activity) => {
    if (!activeTrip || !activeTrip.stops || activeTrip.stops.length === 0) {
      // If no stop exists yet, add the city stop first
      addStop(city);
    }
    // Find current city stop or create
    const targetStop = activeTrip?.stops?.find((s) => s.cityName.toLowerCase() === city.name.toLowerCase()) || activeTrip?.stops?.[0];
    if (targetStop) {
      addActivity(targetStop._id, {
        title: activity.title,
        category: activity.category,
        cost: activity.estimatedCost,
        scheduledDate: targetStop.arrivalDate,
        startTime: '10:00',
        endTime: '13:00'
      });
      setAddedActivityIds((prev) => [...prev, activity.title]);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header Cover */}
        <div className="modal-city-hero">
          <img src={city.imageUrl} alt={city.name} className="modal-city-hero-img" />
          <div className="modal-city-hero-overlay" />

          {/* Close Button */}
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>

          {/* City Badge Info */}
          <div className="modal-hero-badge-group">

            <span className="badge badge-cyan">{city.region}</span>
            <span className="badge badge-amber">{city.popularityScore}% Popularity</span>
          </div>

          <div className="modal-hero-title-box">
            <h2 className="modal-city-name">{city.name}</h2>
            <p className="modal-city-country">
              <MapPin size={16} />
              <span>{city.country}</span>
            </p>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="modal-body">
          {/* Quick Metrics Bar */}
          <div className="city-metrics-bar glass-panel">
            <div className="metric-col">
              <span className="metric-label">Average Daily Budget</span>
              <span className="metric-value text-amber">{formatMoney(city.averageDailyBudget, currency)} / day</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-col">
              <span className="metric-label">Local Currency</span>
              <span className="metric-value">{city.currency || 'USD'}</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-col">
              <span className="metric-label">Climate / Season</span>
              <span className="metric-value">{city.climate || 'Temperate & Pleasant'}</span>
            </div>
          </div>

          {/* Description */}
          <div className="city-overview-section">
            <h4 className="section-subtitle">About {city.name}</h4>
            <p className="city-description-text">
              {city.description ||
                `${city.name} is a premier global destination offering unparalleled cultural heritage, magnificent viewpoints, vibrant dining, and unforgettable experiences.`}
            </p>
          </div>

          {/* Key Highlights */}
          {city.highlights && city.highlights.length > 0 && (
            <div className="city-highlights-section">
              <h4 className="section-subtitle">Must-See Landmarks</h4>
              <div className="highlights-pills-wrap">
                {city.highlights.map((h, i) => (
                  <span key={i} className="highlight-pill">
                    <Compass size={14} className="text-cyan" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Curated Top Activities */}
          <div className="city-activities-section">
            <div className="activities-title-row">
              <h4 className="section-subtitle">Curated Experiences & Activities</h4>
              <span className="activities-count-badge">{city.topActivities?.length || 0} Recommended</span>
            </div>

            <div className="activities-grid">
              {city.topActivities &&
                city.topActivities.map((act, index) => {
                  const isAdded = addedActivityIds.includes(act.title);
                  return (
                    <div key={index} className="activity-card-item glass-panel">
                      <div className="act-header">
                        <span className="badge badge-violet">{act.category || 'Sightseeing'}</span>
                        <div className="act-duration">
                          <Clock size={13} />
                          <span>{act.durationHours}h</span>
                        </div>
                      </div>

                      <h5 className="act-item-title">{act.title}</h5>

                      <div className="act-footer">
                        <div className="act-cost">
                          <span className="act-cost-label">Est. Cost:</span>
                          <span className="act-cost-val text-amber">{formatMoney(act.estimatedCost, currency)}</span>
                        </div>

                        <button
                          className={`btn btn-sm ${isAdded ? 'btn-cyan' : 'btn-glass'} act-add-btn`}
                          onClick={() => handleAddSingleActivity(act)}
                          title="Add this activity to your itinerary stop"
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={() => toggleBookmark(city._id)}>
            {isBookmarked ? '♥ Saved to Favorites' : '♡ Save for Later'}
          </button>

          <button className="btn btn-glass" onClick={onClose}>
            Close
          </button>

          <button
            className={`btn ${addedStopSuccess ? 'btn-cyan' : 'btn-primary'}`}
            onClick={handleAddCityStop}
          >
            {addedStopSuccess ? (
              <>
                <Check size={18} />
                <span>Added to Active Trip!</span>
              </>
            ) : (
              <>
                <Plus size={18} />
                <span>Add {city.name} as Itinerary Stop</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .modal-city-hero {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          background: #f1f5f9;
        }
        .modal-city-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }
        .modal-close-btn:hover {
          background: #ffe4e6;
          color: #e11d48;
          border-color: #fca5a5;
        }
        .modal-hero-badge-group {
          position: absolute;
          top: 20px;
          left: 24px;
          display: flex;
          gap: 8px;
          z-index: 2;
        }
        .modal-hero-title-box {
          position: absolute;
          bottom: 20px;
          left: 24px;
          z-index: 2;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          padding: 10px 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-md);
        }
        .modal-city-name {
          font-size: 2rem;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .modal-city-country {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: 4px;
          font-weight: 600;
        }
        .city-metrics-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          margin-bottom: 24px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .metric-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .metric-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          font-weight: 700;
        }
        .metric-value {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--text-primary);
        }
        .metric-divider {
          width: 1px;
          height: 36px;
          background: var(--border-subtle);
        }
        .section-subtitle {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 10px;
        }
        .city-overview-section, .city-highlights-section, .city-activities-section {
          margin-bottom: 24px;
        }
        .city-description-text {
          color: var(--text-secondary);
          line-height: 1.65;
          font-size: 0.95rem;
        }
        .highlights-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .highlight-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        .activities-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .activities-count-badge {
          font-size: 0.8rem;
          color: #0284c7;
          font-weight: 700;
        }
        .activities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }
        .activity-card-item {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        .act-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .act-duration {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .act-item-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
        }
        .act-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
        }
        .act-cost {
          display: flex;
          flex-direction: column;
        }
        .act-cost-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
        }
        .act-cost-val {
          font-weight: 800;
          font-size: 0.95rem;
          color: #0284c7;
        }
        .act-add-btn {
          padding: 4px 12px;
          font-size: 0.78rem;
        }
        @media (max-width: 600px) {
          .city-metrics-bar {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          .metric-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
