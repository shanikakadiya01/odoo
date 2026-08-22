import React, { useState } from 'react';
import { Plus, Calendar, MapPin, DollarSign, Trash2, ArrowRight, Compass, Sparkles, Share2 } from 'lucide-react';
import { useTrips } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { formatMoney } from '../services/api';

export const MyTripsView = ({ onSelectTrip, onSwitchToBuilder, onOpenShare, onBrowseCities }) => {
  const { currency } = useAuth();
  const { trips, createNewTrip, removeTrip, selectTrip } = useTrips();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTripForm, setNewTripForm] = useState({
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    totalBudget: 4000,
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newTripForm.title.trim()) return;

    try {
      const created = await createNewTrip({
        ...newTripForm,
        totalBudget: Number(newTripForm.totalBudget) || 0
      });
      setCreateModalOpen(false);
      onSelectTrip(created);
      onSwitchToBuilder();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenTrip = (trip) => {
    selectTrip(trip);
    onSwitchToBuilder();
  };

  return (
    <section className="my-trips-section">
      <div className="container">
        {/* Header */}
        <div className="my-trips-header">
          <div>
            <div className="badge badge-coral mb-2">My Travel Portfolio</div>
            <h1 className="my-trips-title">
              Your Multi-City <span className="gradient-text">Adventures</span>
            </h1>
            <p className="my-trips-subtitle">
              Manage ongoing travel itineraries, review budget estimates, and customize destinations.
            </p>
          </div>

          <button className="btn btn-primary" onClick={() => setCreateModalOpen(true)}>
            <Plus size={18} />
            <span>Create New Trip</span>
          </button>
        </div>

        {/* Trips Grid */}
        <div className="trips-grid">
          {/* Create Trip Trigger Card */}
          <div
            className="create-trip-card glass-panel"
            onClick={() => setCreateModalOpen(true)}
            role="button"
            tabIndex={0}
          >
            <div className="create-trip-icon-wrap">
              <Plus size={28} className="text-cyan" />
            </div>
            <h3 className="create-card-title">Craft a New Journey</h3>
            <p className="create-card-desc">
              Choose destinations, set travel dates, budget targets, and generate automated packing checklists.
            </p>
            <span className="btn btn-outline btn-sm">Start Planning</span>
          </div>

          {/* Existing Trip Cards */}
          {trips.map((trip) => {
            const stopNames = trip.stops?.map((s) => s.cityName).join(' ➔ ') || 'No stops added';
            return (
              <div key={trip._id} className="trip-card glass-panel">
                {/* Trip Cover Image */}
                <div className="trip-card-image-wrap">
                  <img
                    src={trip.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                    alt={trip.title}
                    className="trip-card-image"
                  />
                  <div className="trip-card-overlay" />
                  <div className="trip-card-badge-top">
                    <span className="badge badge-cyan">{trip.stops?.length || 0} Cities</span>
                    {trip.isPublic && <span className="badge badge-emerald">Shared</span>}
                  </div>
                </div>

                {/* Card Body */}
                <div className="trip-card-body">
                  <h3 className="trip-name-title">{trip.title}</h3>
                  <p className="trip-route-line">
                    <MapPin size={13} className="text-coral" />
                    <span>{stopNames}</span>
                  </p>

                  <div className="trip-meta-tags">
                    <div className="trip-meta-pill">
                      <Calendar size={13} />
                      <span>
                        {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'Flexible'} -{' '}
                        {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : 'Flexible'}
                      </span>
                    </div>

                    <div className="trip-meta-pill text-amber">
                      <DollarSign size={13} />
                      <span>Budget: {formatMoney(trip.totalBudget, currency)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="trip-card-footer">
                    <button
                      className="btn btn-danger btn-icon btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTrip(trip._id);
                      }}
                      title="Delete Trip"
                    >
                      <Trash2 size={16} />
                    </button>

                    <button
                      className="btn btn-glass btn-sm"
                      onClick={() => {
                        selectTrip(trip);
                        onOpenShare();
                      }}
                    >
                      <Share2 size={14} />
                      <span>Share</span>
                    </button>

                    <button className="btn btn-primary btn-sm" onClick={() => handleOpenTrip(trip)}>
                      <span>Open Itinerary</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Trip Modal */}
        {createModalOpen && (
          <div className="modal-overlay" onClick={() => setCreateModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-heading">Create New Journey Plan</h3>
                <button className="modal-close-btn" onClick={() => setCreateModalOpen(false)}>
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateSubmit}>
                <div className="modal-body form-body">
                  <div className="input-group">
                    <label className="input-label">Trip Title *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Summer Mediterranean Tour, Tokyo to Bali Discovery..."
                      value={newTripForm.title}
                      onChange={(e) => setNewTripForm({ ...newTripForm, title: e.target.value })}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Trip Notes / Theme</label>
                    <textarea
                      className="textarea-field"
                      placeholder="What is the goal of this journey (relaxation, gastronomy, cultural wonders)?"
                      value={newTripForm.description}
                      onChange={(e) => setNewTripForm({ ...newTripForm, description: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div className="dates-row">
                    <div className="input-group">
                      <label className="input-label">Start Date *</label>
                      <input
                        type="date"
                        className="input-field"
                        value={newTripForm.startDate}
                        onChange={(e) => setNewTripForm({ ...newTripForm, startDate: e.target.value })}
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label">End Date *</label>
                      <input
                        type="date"
                        className="input-field"
                        value={newTripForm.endDate}
                        onChange={(e) => setNewTripForm({ ...newTripForm, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Target Budget ({currency})</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g. 5000"
                      value={newTripForm.totalBudget}
                      onChange={(e) => setNewTripForm({ ...newTripForm, totalBudget: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-glass"
                    onClick={() => setCreateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create & Open Builder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .my-trips-section {
          padding: 40px 0 80px 0;
        }
        .my-trips-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .my-trips-title {
          font-size: 2.4rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .my-trips-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .trips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }
        .create-trip-card {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
          gap: 14px;
          background: #ffffff;
          border: 2px dashed #cbd5e1;
          border-radius: var(--radius-lg);
          cursor: pointer;
          min-height: 320px;
          transition: all var(--transition-normal);
        }
        .create-trip-card:hover {
          border-color: #0284c7;
          background: #f0f9ff;
          transform: translateY(-4px);
        }
        .create-trip-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #e0f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .create-card-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .create-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .trip-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }
        .trip-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: var(--shadow-lg);
        }
        .trip-card-image-wrap {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
          background: #f1f5f9;
        }
        .trip-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .trip-card-badge-top {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }
        .trip-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 12px;
          background: #ffffff;
        }
        .trip-name-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .trip-route-line {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--text-secondary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .trip-meta-tags {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 10px 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }
        .trip-meta-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .trip-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          gap: 8px;
        }
        .form-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .dates-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
      `}</style>
    </section>
  );
};
