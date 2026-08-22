import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Share2,
  Sparkles,
  Printer,
  ChevronRight,
  Clock,
  Tag,
  CheckCircle2,
  Compass,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useTrips } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { formatMoney } from '../services/api';

export const TripBuilder = ({ onOpenShare, onOpenAIAssistant, onBrowseCities }) => {
  const { currency } = useAuth();
  const { activeTrip, saveActiveTrip, removeStop, updateStop, addActivity, removeActivity, getBudgetBreakdown } = useTrips();

  const [activeStopIdForActivity, setActiveStopIdForActivity] = useState(null);
  const [newActivityForm, setNewActivityForm] = useState({
    title: '',
    category: 'Sightseeing',
    cost: '',
    startTime: '10:00',
    endTime: '12:30'
  });

  if (!activeTrip) {
    return (
      <div className="trip-builder-empty glass-panel container">
        <Compass size={48} className="text-cyan animate-float" />
        <h2>No Active Trip Selected</h2>
        <p>Start planning a multi-city adventure or explore destinations to build your itinerary.</p>
        <button className="btn btn-primary" onClick={onBrowseCities}>
          Explore Destinations
        </button>
      </div>
    );
  }

  const breakdown = getBudgetBreakdown(activeTrip);

  const handleUpdateTripField = (field, value) => {
    saveActiveTrip({ [field]: value });
  };

  const handleAddActivitySubmit = (stopId, e) => {
    e.preventDefault();
    if (!newActivityForm.title.trim()) return;

    addActivity(stopId, {
      title: newActivityForm.title,
      category: newActivityForm.category,
      cost: Number(newActivityForm.cost) || 0,
      startTime: newActivityForm.startTime,
      endTime: newActivityForm.endTime
    });

    setNewActivityForm({
      title: '',
      category: 'Sightseeing',
      cost: '',
      startTime: '10:00',
      endTime: '12:30'
    });
    setActiveStopIdForActivity(null);
  };

  return (
    <section className="trip-builder-section">
      <div className="container">
        {/* Trip Header Banner Card */}
        <div className="trip-header-card glass-panel">
          <div className="trip-header-top">
            <div className="trip-title-wrapper">
              <input
                type="text"
                className="trip-title-input"
                value={activeTrip.title}
                onChange={(e) => handleUpdateTripField('title', e.target.value)}
                placeholder="Name your journey (e.g. European Odyssey 2026)..."
              />
              <textarea
                className="trip-desc-input"
                value={activeTrip.description || ''}
                onChange={(e) => handleUpdateTripField('description', e.target.value)}
                placeholder="Add a travel theme, packing reminders, or group notes..."
                rows={2}
              />
            </div>

            {/* Quick Actions */}
            <div className="trip-actions-row">
              <button className="btn btn-glass btn-sm" onClick={onOpenAIAssistant} title="Get AI Travel Optimization">
                <Sparkles size={16} className="text-cyan" />
                <span>AI Tips & Packing</span>
              </button>

              <button className="btn btn-glass btn-sm" onClick={onOpenShare} title="Share Public Itinerary Link">
                <Share2 size={16} className="text-coral" />
                <span>Share Trip</span>
              </button>

              <button className="btn btn-glass btn-sm" onClick={() => window.print()} title="Print or Save PDF">
                <Printer size={16} />
                <span>Print PDF</span>
              </button>
            </div>
          </div>

          {/* Trip Meta Configuration Grid */}
          <div className="trip-meta-grid">
            <div className="meta-input-group">
              <span className="meta-label">
                <Calendar size={14} /> Start Date
              </span>
              <input
                type="date"
                className="input-field meta-date-input"
                value={activeTrip.startDate ? activeTrip.startDate.split('T')[0] : ''}
                onChange={(e) => handleUpdateTripField('startDate', e.target.value)}
              />
            </div>

            <div className="meta-input-group">
              <span className="meta-label">
                <Calendar size={14} /> End Date
              </span>
              <input
                type="date"
                className="input-field meta-date-input"
                value={activeTrip.endDate ? activeTrip.endDate.split('T')[0] : ''}
                onChange={(e) => handleUpdateTripField('endDate', e.target.value)}
              />
            </div>

            <div className="meta-input-group">
              <span className="meta-label">
                <DollarSign size={14} /> Target Budget ({currency})
              </span>
              <input
                type="number"
                className="input-field meta-budget-input"
                value={activeTrip.totalBudget || ''}
                onChange={(e) => handleUpdateTripField('totalBudget', Number(e.target.value))}
                placeholder="e.g. 5000"
              />
            </div>

            <div className="meta-badge-box">
              <span className="meta-label">Duration & Stops</span>
              <div className="duration-pill-group">
                <span className="badge badge-cyan">{breakdown.daysCount} Days Total</span>
                <span className="badge badge-coral">{activeTrip.stops?.length || 0} Cities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-City Stops Timeline */}
        <div className="itinerary-timeline-wrapper">
          <div className="timeline-header-row">
            <div>
              <h2 className="timeline-section-title">
                Multi-City Route <span className="gradient-text">Timeline</span>
              </h2>
              <p className="timeline-section-subtitle">
                Organize stops chronologically, customize accommodation costs, and schedule per-city activities.
              </p>
            </div>

            <button className="btn btn-primary btn-sm" onClick={onBrowseCities}>
              <Plus size={16} />
              <span>Add Destination</span>
            </button>
          </div>

          {/* Stops List */}
          {activeTrip.stops && activeTrip.stops.length > 0 ? (
            <div className="stops-container">
              {activeTrip.stops.map((stop, index) => {
                const isAddingActivity = activeStopIdForActivity === stop._id;
                const stopActivitiesCost = (stop.activities || []).reduce((acc, a) => acc + (Number(a.cost) || 0), 0);
                const totalStopEstimated = (Number(stop.estimatedAccommodationCost) || 0) + stopActivitiesCost;

                return (
                  <div key={stop._id || index} className="stop-card glass-panel">
                    {/* Visual Route Connector */}
                    <div className="stop-route-indicator">
                      <div className="stop-number-badge">{index + 1}</div>
                      {index < activeTrip.stops.length - 1 && <div className="route-connecting-line" />}
                    </div>

                    {/* Stop Details */}
                    <div className="stop-content-body">
                      {/* Stop Top Row */}
                      <div className="stop-header-row">
                        <div className="stop-location-info">
                          <h3 className="stop-city-name">{stop.cityName}</h3>
                          <span className="stop-country-badge">
                            <MapPin size={13} /> {stop.country}
                          </span>
                        </div>

                        <div className="stop-header-actions">
                          <div className="stop-total-cost-pill">
                            <span className="stop-cost-label">Stop Est:</span>
                            <span className="stop-cost-val text-amber">
                              {formatMoney(totalStopEstimated, currency)}
                            </span>
                          </div>

                          <button
                            className="btn btn-danger btn-icon btn-sm"
                            onClick={() => removeStop(stop._id)}
                            title="Remove Stop"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Stop Stay & Accommodation Controls */}
                      <div className="stop-controls-row">
                        <div className="stop-field">
                          <label className="stop-field-label">Arrival Date</label>
                          <input
                            type="date"
                            className="input-field stop-date-input"
                            value={stop.arrivalDate ? stop.arrivalDate.split('T')[0] : ''}
                            onChange={(e) => updateStop(stop._id, { arrivalDate: e.target.value })}
                          />
                        </div>

                        <div className="stop-field">
                          <label className="stop-field-label">Departure Date</label>
                          <input
                            type="date"
                            className="input-field stop-date-input"
                            value={stop.departureDate ? stop.departureDate.split('T')[0] : ''}
                            onChange={(e) => updateStop(stop._id, { departureDate: e.target.value })}
                          />
                        </div>

                        <div className="stop-field">
                          <label className="stop-field-label">Accommodation Budget ({currency})</label>
                          <input
                            type="number"
                            className="input-field stop-cost-input"
                            value={stop.estimatedAccommodationCost || ''}
                            onChange={(e) =>
                              updateStop(stop._id, { estimatedAccommodationCost: Number(e.target.value) })
                            }
                            placeholder="e.g. 400"
                          />
                        </div>
                      </div>

                      {/* Activities Section */}
                      <div className="stop-activities-section">
                        <div className="activities-header">
                          <h4 className="activities-title">
                            Activities & Schedule ({stop.activities?.length || 0})
                          </h4>
                          <button
                            className="btn btn-glass btn-sm"
                            onClick={() =>
                              setActiveStopIdForActivity(isAddingActivity ? null : stop._id)
                            }
                          >
                            <Plus size={14} />
                            <span>{isAddingActivity ? 'Cancel' : 'Add Activity'}</span>
                          </button>
                        </div>

                        {/* Add Activity Inline Form */}
                        {isAddingActivity && (
                          <form
                            className="add-activity-form glass-panel"
                            onSubmit={(e) => handleAddActivitySubmit(stop._id, e)}
                          >
                            <div className="form-row">
                              <input
                                type="text"
                                className="input-field"
                                placeholder="Activity title (e.g. Louvre Guided Walk, Sushi Class)..."
                                value={newActivityForm.title}
                                onChange={(e) =>
                                  setNewActivityForm({ ...newActivityForm, title: e.target.value })
                                }
                                autoFocus
                                required
                              />

                              <select
                                className="select-field"
                                value={newActivityForm.category}
                                onChange={(e) =>
                                  setNewActivityForm({ ...newActivityForm, category: e.target.value })
                                }
                              >
                                <option value="Sightseeing">Sightseeing</option>
                                <option value="Culture">Culture</option>
                                <option value="Food & Dining">Food & Dining</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Transport">Transport</option>
                                <option value="Other">Other</option>
                              </select>

                              <input
                                type="number"
                                className="input-field cost-input"
                                placeholder="Cost (USD)"
                                value={newActivityForm.cost}
                                onChange={(e) =>
                                  setNewActivityForm({ ...newActivityForm, cost: e.target.value })
                                }
                              />

                              <button type="submit" className="btn btn-primary btn-sm">
                                Save Activity
                              </button>
                            </div>
                          </form>
                        )}

                        {/* Activities List */}
                        {stop.activities && stop.activities.length > 0 ? (
                          <div className="activities-list-grid">
                            {stop.activities.map((act) => (
                              <div key={act._id} className="activity-item-pill">
                                <div className="activity-item-left">
                                  <span className="badge badge-cyan">{act.category}</span>
                                  <span className="activity-item-name">{act.title}</span>
                                </div>

                                <div className="activity-item-right">
                                  <span className="activity-item-price text-amber">
                                    {formatMoney(act.cost, currency)}
                                  </span>
                                  <button
                                    className="activity-del-btn"
                                    onClick={() => removeActivity(stop._id, act._id)}
                                    title="Delete activity"
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="no-activities-hint">
                            No activities scheduled for this stop yet. Click "+ Add Activity" or explore catalog highlights.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-stops-box glass-panel">
              <Compass size={40} className="text-cyan animate-float" />
              <h3>Your Itinerary is Empty</h3>
              <p>Add destinations from our global catalog to plan stops and schedule activities.</p>
              <button className="btn btn-primary" onClick={onBrowseCities}>
                Browse Top Destinations
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .trip-builder-section {
          padding: 40px 0 80px 0;
        }
        .trip-header-card {
          padding: 32px;
          margin-bottom: 40px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .trip-header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .trip-title-wrapper {
          flex: 1;
          min-width: 320px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .trip-title-input {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          outline: none;
          transition: all var(--transition-fast);
          padding: 4px 0;
        }
        .trip-title-input:focus {
          border-bottom-color: var(--accent-cyan);
        }
        .trip-desc-input {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          outline: none;
          resize: vertical;
        }
        .trip-desc-input:focus {
          border-color: var(--accent-cyan);
        }
        .trip-actions-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .trip-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }
        .meta-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .meta-label {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .meta-badge-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          justify-content: center;
        }
        .duration-pill-group {
          display: flex;
          gap: 8px;
        }
        .timeline-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .timeline-section-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .timeline-section-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .stops-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .stop-card {
          display: flex;
          padding: 24px;
          gap: 20px;
          position: relative;
          transition: all var(--transition-normal);
        }
        .stop-card:hover {
          border-color: rgba(6, 182, 212, 0.3);
        }
        .stop-route-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 40px;
        }
        .stop-number-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--grad-sunset);
          color: #ffffff;
          font-weight: 800;
          font-family: var(--font-heading);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          box-shadow: 0 4px 12px var(--accent-coral-glow);
          z-index: 2;
        }
        .route-connecting-line {
          width: 3px;
          flex: 1;
          background: linear-gradient(180deg, var(--accent-coral) 0%, var(--accent-cyan) 100%);
          margin-top: 8px;
          border-radius: 2px;
        }
        .stop-content-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .stop-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .stop-city-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .stop-country-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .stop-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .stop-total-cost-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.04);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
        }
        .stop-cost-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .stop-cost-val {
          font-weight: 700;
          font-size: 0.95rem;
        }
        .stop-controls-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          background: rgba(255, 255, 255, 0.02);
          padding: 14px;
          border-radius: var(--radius-md);
        }
        .stop-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stop-field-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .stop-activities-section {
          margin-top: 8px;
        }
        .activities-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .activities-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .add-activity-form {
          padding: 14px;
          margin-bottom: 14px;
          background: rgba(255, 255, 255, 0.04);
        }
        .form-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .cost-input {
          max-width: 140px;
        }
        .activities-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 10px;
        }
        .activity-item-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .activity-item-left {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
        }
        .activity-item-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .activity-item-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .activity-item-price {
          font-size: 0.85rem;
          font-weight: 700;
        }
        .activity-del-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 1.2rem;
          cursor: pointer;
        }
        .activity-del-btn:hover {
          color: var(--accent-coral);
        }
        .no-activities-hint {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
        }
        .empty-stops-box, .trip-builder-empty {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .stop-card {
            flex-direction: column;
          }
          .stop-route-indicator {
            flex-direction: row;
            width: 100%;
            gap: 12px;
          }
          .route-connecting-line {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
