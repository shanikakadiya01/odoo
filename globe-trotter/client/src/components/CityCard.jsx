import React, { useState } from 'react';
import { Heart, Plus, MapPin, Sparkles, Clock, Check, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { formatMoney } from '../services/api';

export const CityCard = ({ city, onOpenDetail }) => {
  const { currency, bookmarks, toggleBookmark } = useAuth();
  const { addStop, activeTrip } = useTrips();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isBookmarked = bookmarks.includes(city._id);

  const handleAddStop = (e) => {
    e.stopPropagation();
    addStop(city);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    toggleBookmark(city._id);
  };

  return (
    <div className="city-card glass-panel" onClick={() => onOpenDetail(city)} role="button" tabIndex={0}>
      {/* Image Banner */}
      <div className="card-image-wrapper">
        <img src={city.imageUrl} alt={city.name} className="card-image" loading="lazy" />

        {/* Top Floating Badges */}
        <div className="card-top-badges">
          <span className="badge badge-coral">{city.costIndex} Cost</span>
          <span className="badge badge-cyan">{city.region}</span>
        </div>

        {/* Bookmark Heart Button */}
        <button
          className={`card-bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={handleBookmarkToggle}
          title={isBookmarked ? 'Remove from Saved' : 'Save to Favorites'}
        >
          <Heart size={18} fill={isBookmarked ? '#e11d48' : 'none'} color={isBookmarked ? '#e11d48' : '#0f172a'} />
        </button>

        {/* Popularity Score Pill */}
        <div className="card-popularity-pill">
          <Sparkles size={12} className="text-amber" />
          <span>{city.popularityScore}% Match</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="card-title-row">
          <div>
            <h3 className="city-title">{city.name}</h3>
            <p className="city-country">
              <MapPin size={13} />
              <span>{city.country}</span>
            </p>
          </div>
          <div className="budget-tag-box">
            <span className="budget-tag-label">Avg / Day</span>
            <span className="budget-tag-val">{formatMoney(city.averageDailyBudget, currency)}</span>
          </div>
        </div>

        {/* Activity Pills */}
        {city.topActivities && city.topActivities.length > 0 && (
          <div className="card-activities-preview">
            <span className="activities-header-label">Top Highlights:</span>
            <div className="activity-tags-list">
              {city.topActivities.slice(0, 2).map((act, i) => (
                <div key={i} className="activity-mini-tag">
                  <span className="act-dot" />
                  <span className="act-title">{act.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="card-footer">
          <button className="btn btn-ghost btn-sm view-details-btn">
            Details & Activities
          </button>

          <button
            className={`btn ${addedAnimation ? 'btn-cyan' : 'btn-primary'} btn-sm add-stop-btn`}
            onClick={handleAddStop}
            title={`Add ${city.name} to active trip`}
          >
            {addedAnimation ? (
              <>
                <Check size={16} />
                <span>Added to Trip!</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add Stop</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .city-card {
          background: #ffffff;
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-normal);
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }
        .city-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: var(--shadow-lg);
        }
        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 210px;
          overflow: hidden;
          background: #f1f5f9;
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms ease;
        }
        .city-card:hover .card-image {
          transform: scale(1.04);
        }
        .card-top-badges {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }
        .card-bookmark-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }
        .card-bookmark-btn:hover {
          background: #ffe4e6;
          border-color: #fca5a5;
          transform: scale(1.08);
        }
        .card-popularity-pill {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
          z-index: 2;
          box-shadow: var(--shadow-sm);
        }
        .text-amber {
          color: #d97706;
        }
        .card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 14px;
          background: #ffffff;
        }
        .card-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }
        .city-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .city-country {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .budget-tag-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .budget-tag-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }
        .budget-tag-val {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: #0284c7;
        }
        .card-activities-preview {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .activities-header-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          font-weight: 700;
        }
        .activity-tags-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .activity-mini-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .act-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0284c7;
        }
        .act-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }
        .view-details-btn {
          font-size: 0.82rem;
          padding: 6px 8px;
          color: var(--text-secondary);
        }
        .view-details-btn:hover {
          color: var(--text-primary);
        }
        .add-stop-btn {
          padding: 7px 16px;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};
