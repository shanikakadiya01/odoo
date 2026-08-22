import React, { useState } from 'react';
import { X, Copy, Check, Share2, Globe, Calendar, MapPin, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTrips } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { formatMoney } from '../services/api';

export const ShareTripModal = ({ onClose }) => {
  const { currency } = useAuth();
  const { activeTrip, getBudgetBreakdown } = useTrips();
  const [copied, setCopied] = useState(false);

  if (!activeTrip) return null;

  const shareUrl = `${window.location.origin}/share/${activeTrip.shareSlug || activeTrip._id}`;
  const breakdown = getBudgetBreakdown(activeTrip);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (_) {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="share-title-row">
            <Share2 size={20} className="text-coral" />
            <h3 className="modal-heading">Share Itinerary & Travel Plan</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Share Link Box */}
          <div className="share-link-card glass-panel">
            <span className="share-label">Public Itinerary Link:</span>
            <div className="share-input-row">
              <input type="text" readOnly className="input-field share-url-input" value={shareUrl} />
              <button
                className={`btn ${copied ? 'btn-cyan' : 'btn-primary'} copy-btn`}
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            <p className="share-hint">
              Anyone with this link can view this multi-city itinerary, daily schedule, and destination highlights.
            </p>
          </div>

          {/* Read-Only Itinerary Preview */}
          <div className="itinerary-preview-container glass-panel">
            <div className="preview-top">
              <span className="badge badge-cyan">Itinerary Preview</span>
              <h2 className="preview-trip-title">{activeTrip.title}</h2>
              <p className="preview-trip-desc">{activeTrip.description || 'A custom multi-city journey crafted with Globe Trotter.'}</p>

              <div className="preview-meta-row">
                <div className="preview-meta-item">
                  <Calendar size={15} />
                  <span>
                    {activeTrip.startDate ? new Date(activeTrip.startDate).toLocaleDateString() : 'TBD'} -{' '}
                    {activeTrip.endDate ? new Date(activeTrip.endDate).toLocaleDateString() : 'TBD'}
                  </span>
                </div>
                <div className="preview-meta-item">
                  <Globe size={15} />
                  <span>{activeTrip.stops?.length || 0} Destinations</span>
                </div>
                <div className="preview-meta-item text-amber">
                  <span>Est: {formatMoney(breakdown.grandTotal, currency)}</span>
                </div>
              </div>
            </div>

            {/* Stops Preview */}
            <div className="preview-stops-list">
              {activeTrip.stops?.map((stop, i) => (
                <div key={stop._id || i} className="preview-stop-item">
                  <div className="preview-stop-badge">{i + 1}</div>
                  <div className="preview-stop-body">
                    <div className="preview-stop-header">
                      <h4 className="preview-stop-city">{stop.cityName}, {stop.country}</h4>
                      <span className="preview-stop-dates">
                        {stop.arrivalDate ? new Date(stop.arrivalDate).toLocaleDateString() : ''} -{' '}
                        {stop.departureDate ? new Date(stop.departureDate).toLocaleDateString() : ''}
                      </span>
                    </div>

                    {stop.activities && stop.activities.length > 0 && (
                      <div className="preview-activities-wrap">
                        {stop.activities.map((a, j) => (
                          <div key={j} className="preview-act-pill">
                            <span className="badge badge-violet">{a.category}</span>
                            <span>{a.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-glass" onClick={() => window.print()}>
            <Printer size={16} />
            <span>Print Itinerary</span>
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>

      <style>{`
        .share-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .share-link-card {
          padding: 20px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .share-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
        }
        .share-input-row {
          display: flex;
          gap: 10px;
        }
        .share-url-input {
          font-family: monospace;
          font-size: 0.9rem;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }
        .copy-btn {
          padding: 10px 20px;
        }
        .share-hint {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .itinerary-preview-container {
          padding: 24px;
          max-height: 380px;
          overflow-y: auto;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .preview-top {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 16px;
        }
        .preview-trip-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .preview-trip-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .preview-meta-row {
          display: flex;
          gap: 16px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          flex-wrap: wrap;
          margin-top: 4px;
        }
        .preview-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .preview-stops-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .preview-stop-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .preview-stop-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #0284c7;
          color: #ffffff;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .preview-stop-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .preview-stop-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 8px;
        }
        .preview-stop-city {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .preview-stop-dates {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .preview-activities-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .preview-act-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          padding: 4px 10px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
