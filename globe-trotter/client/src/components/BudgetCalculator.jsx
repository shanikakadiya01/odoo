import React from 'react';
import {
  PieChart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Building,
  Ticket,
  Utensils,
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useTrips } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { formatMoney } from '../services/api';

export const BudgetCalculator = ({ onSwitchToBuilder, onBrowseCities }) => {
  const { currency } = useAuth();
  const { activeTrip, getBudgetBreakdown } = useTrips();

  if (!activeTrip) {
    return (
      <div className="budget-empty-state glass-panel container">
        <PieChart size={48} className="text-cyan animate-float" />
        <h2>No Active Trip Found</h2>
        <p>Create or select an itinerary to calculate and analyze your travel budget.</p>
        <button className="btn btn-primary" onClick={onBrowseCities}>
          Explore Destinations
        </button>
      </div>
    );
  }

  const breakdown = getBudgetBreakdown(activeTrip);
  const targetBudget = breakdown.targetBudget || 0;
  const isOverBudget = targetBudget > 0 && breakdown.grandTotal > targetBudget;
  const percentUsed = targetBudget > 0 ? Math.min(100, Math.round((breakdown.grandTotal / targetBudget) * 100)) : 0;
  const dailyAverage = breakdown.daysCount > 0 ? Math.round(breakdown.grandTotal / breakdown.daysCount) : 0;

  return (
    <section className="budget-calculator-section">
      <div className="container">
        {/* Title Header */}
        <div className="budget-header">
          <div>
            <div className="badge badge-cyan mb-2">Smart Financial Intelligence</div>
            <h1 className="budget-main-title">
              Trip Budget & Expense <span className="gradient-text">Analyzer</span>
            </h1>
            <p className="budget-subtitle">
              Live financial breakdown for <strong>{activeTrip.title}</strong> across {breakdown.daysCount} days and {activeTrip.stops?.length || 0} destinations.
            </p>
          </div>

          <button className="btn btn-glass" onClick={onSwitchToBuilder}>
            <span>Edit Stops in Builder</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Primary Budget Overview Cards */}
        <div className="budget-cards-grid">
          {/* Total Estimated Cost */}
          <div className="glass-panel metric-box">
            <div className="metric-box-header">
              <span className="metric-box-title">Total Estimated Cost</span>
              <div className="metric-icon-wrap bg-cyan">
                <DollarSign size={20} className="text-cyan" />
              </div>
            </div>
            <div className="metric-box-number gradient-text-cyan">
              {formatMoney(breakdown.grandTotal, currency)}
            </div>
            <p className="metric-box-hint">
              Avg. {formatMoney(dailyAverage, currency)} / day across {breakdown.daysCount} days
            </p>
          </div>

          {/* Target Budget & Status */}
          <div className="glass-panel metric-box">
            <div className="metric-box-header">
              <span className="metric-box-title">Target Budget</span>
              <div className="metric-icon-wrap bg-amber">
                <TrendingUp size={20} className="text-amber" />
              </div>
            </div>
            <div className="metric-box-number">
              {targetBudget > 0 ? formatMoney(targetBudget, currency) : 'Not Set'}
            </div>
            <div className="budget-status-row">
              {targetBudget > 0 ? (
                isOverBudget ? (
                  <span className="status-badge status-over">
                    <AlertTriangle size={14} /> Over budget by {formatMoney(breakdown.grandTotal - targetBudget, currency)}
                  </span>
                ) : (
                  <span className="status-badge status-ok">
                    <CheckCircle size={14} /> Remaining: {formatMoney(breakdown.remaining, currency)}
                  </span>
                )
              ) : (
                <span className="status-badge status-neutral">Set in builder to compare</span>
              )}
            </div>
          </div>

          {/* Accommodation Total */}
          <div className="glass-panel metric-box">
            <div className="metric-box-header">
              <span className="metric-box-title">Accommodations</span>
              <div className="metric-icon-wrap bg-violet">
                <Building size={20} className="text-violet" />
              </div>
            </div>
            <div className="metric-box-number text-violet">
              {formatMoney(breakdown.accommodationTotal, currency)}
            </div>
            <p className="metric-box-hint">
              {breakdown.grandTotal > 0 ? Math.round((breakdown.accommodationTotal / breakdown.grandTotal) * 100) : 0}% of overall trip expense
            </p>
          </div>

          {/* Activities Total */}
          <div className="glass-panel metric-box">
            <div className="metric-box-header">
              <span className="metric-box-title">Tours & Activities</span>
              <div className="metric-icon-wrap bg-coral">
                <Ticket size={20} className="text-coral" />
              </div>
            </div>
            <div className="metric-box-number text-coral">
              {formatMoney(breakdown.activitiesTotal, currency)}
            </div>
            <p className="metric-box-hint">
              {breakdown.grandTotal > 0 ? Math.round((breakdown.activitiesTotal / breakdown.grandTotal) * 100) : 0}% of overall trip expense
            </p>
          </div>
        </div>

        {/* Budget Progress Bar */}
        {targetBudget > 0 && (
          <div className="glass-panel progress-panel">
            <div className="progress-label-row">
              <span className="progress-title">Budget Utilization</span>
              <span className={`progress-percent ${isOverBudget ? 'text-coral' : 'text-cyan'}`}>
                {percentUsed}% ({formatMoney(breakdown.grandTotal, currency)} of {formatMoney(targetBudget, currency)})
              </span>
            </div>
            <div className="progress-track">
              <div
                className={`progress-fill ${isOverBudget ? 'fill-over' : 'fill-ok'}`}
                style={{ width: `${percentUsed}%` }}
              />
            </div>
          </div>
        )}

        {/* Category Breakdown & Stop Analysis Grid */}
        <div className="breakdown-details-grid">
          {/* Category Distribution */}
          <div className="glass-panel detail-card">
            <h3 className="card-heading">
              <PieChart size={18} className="text-cyan" /> Expense Distribution
            </h3>

            <div className="category-bars-list">
              <div className="cat-bar-item">
                <div className="cat-bar-header">
                  <span className="cat-name">
                    <Building size={14} className="text-violet" /> Stays & Hotels
                  </span>
                  <span className="cat-amount text-violet">
                    {formatMoney(breakdown.accommodationTotal, currency)}
                  </span>
                </div>
                <div className="mini-track">
                  <div
                    className="mini-fill bg-violet"
                    style={{
                      width: `${breakdown.grandTotal > 0 ? (breakdown.accommodationTotal / breakdown.grandTotal) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>

              <div className="cat-bar-item">
                <div className="cat-bar-header">
                  <span className="cat-name">
                    <Ticket size={14} className="text-coral" /> Sightseeing & Tours
                  </span>
                  <span className="cat-amount text-coral">
                    {formatMoney(breakdown.activitiesTotal, currency)}
                  </span>
                </div>
                <div className="mini-track">
                  <div
                    className="mini-fill bg-coral"
                    style={{
                      width: `${breakdown.grandTotal > 0 ? (breakdown.activitiesTotal / breakdown.grandTotal) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>

              <div className="cat-bar-item">
                <div className="cat-bar-header">
                  <span className="cat-name">
                    <Utensils size={14} className="text-amber" /> Dining & Local Transport (Est.)
                  </span>
                  <span className="cat-amount text-amber">
                    {formatMoney(breakdown.estimatedDailyLiving, currency)}
                  </span>
                </div>
                <div className="mini-track">
                  <div
                    className="mini-fill bg-amber"
                    style={{
                      width: `${breakdown.grandTotal > 0 ? (breakdown.estimatedDailyLiving / breakdown.grandTotal) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Per-Stop Cost Table */}
          <div className="glass-panel detail-card">
            <h3 className="card-heading">
              <Building size={18} className="text-amber" /> City-by-City Expense Breakdown
            </h3>

            <div className="stops-table-wrap">
              {activeTrip.stops && activeTrip.stops.length > 0 ? (
                <div className="stops-table">
                  {activeTrip.stops.map((stop, i) => {
                    const actCost = (stop.activities || []).reduce((sum, a) => sum + (Number(a.cost) || 0), 0);
                    const stopTotal = (Number(stop.estimatedAccommodationCost) || 0) + actCost;
                    return (
                      <div key={stop._id || i} className="stop-table-row">
                        <div className="stop-table-name">
                          <span className="stop-num">{i + 1}</span>
                          <div>
                            <strong>{stop.cityName}</strong>
                            <small className="text-muted block">{stop.country}</small>
                          </div>
                        </div>

                        <div className="stop-table-breakdown">
                          <span className="breakdown-subtext">
                            Stay: {formatMoney(stop.estimatedAccommodationCost, currency)} | Acts: {formatMoney(actCost, currency)}
                          </span>
                          <span className="stop-table-total text-amber">
                            {formatMoney(stopTotal, currency)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="no-data-text">No stops configured yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Smart Travel Tips & Savings Recommendations */}
        <div className="glass-panel tips-panel">
          <div className="tips-header">
            <Sparkles size={20} className="text-cyan" />
            <h3 className="tips-title">Smart Cost-Saving Insights & Advice</h3>
          </div>

          <div className="tips-grid">
            <div className="tip-card">
              <h4 className="tip-title">⚡ Multi-City Transit Passes</h4>
              <p className="tip-text">
                Consider Eurail, Japan Rail Pass, or unified city metro passes. Booking regional rail 60 days in advance saves up to 45% compared to on-the-day tickets.
              </p>
            </div>

            <div className="tip-card">
              <h4 className="tip-title">🍽️ Lunch Specials & Local Markets</h4>
              <p className="tip-text">
                Michelin-starred & authentic bistros often offer 2-course lunch menus at 1/3 the price of dinner seatings. Sample street food markets for authentic flavours.
              </p>
            </div>

            <div className="tip-card">
              <h4 className="tip-title">🏛️ Free Museum Days</h4>
              <p className="tip-text">
                Many world-class European & Asian museums offer free admission on the first Sunday of every month or discounted entry during evening twilight hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .budget-calculator-section {
          padding: 40px 0 80px 0;
        }
        .budget-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .mb-2 {
          margin-bottom: 8px;
        }
        .budget-main-title {
          font-size: 2.4rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 6px;
        }
        .budget-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .budget-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        .metric-box {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .metric-box-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .metric-box-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--text-muted);
        }
        .metric-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-cyan { background: rgba(6, 182, 212, 0.15); }
        .bg-amber { background: rgba(245, 158, 11, 0.15); }
        .bg-violet { background: rgba(139, 92, 246, 0.15); }
        .bg-coral { background: rgba(244, 63, 94, 0.15); }
        .text-violet { color: var(--accent-violet); }
        .metric-box-number {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 900;
        }
        .metric-box-hint {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .budget-status-row {
          margin-top: 4px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .status-ok { color: var(--accent-emerald); }
        .status-over { color: var(--accent-coral); }
        .status-neutral { color: var(--text-muted); }
        .progress-panel {
          padding: 20px 24px;
          margin-bottom: 24px;
        }
        .progress-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .progress-track {
          width: 100%;
          height: 12px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 600ms ease;
        }
        .fill-ok { background: var(--grad-cyan); }
        .fill-over { background: var(--grad-sunset); }
        .breakdown-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }
        .detail-card {
          padding: 24px;
        }
        .card-heading {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .category-bars-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .cat-bar-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cat-bar-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .cat-name {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mini-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .mini-fill {
          height: 100%;
          border-radius: var(--radius-full);
        }
        .stops-table {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stop-table-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
        }
        .stop-table-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .stop-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(6, 182, 212, 0.2);
          color: var(--accent-cyan);
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .block { display: block; }
        .stop-table-breakdown {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .breakdown-subtext {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .stop-table-total {
          font-weight: 800;
          font-size: 1rem;
        }
        .tips-panel {
          padding: 28px;
        }
        .tips-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .tips-title {
          font-size: 1.2rem;
          font-weight: 800;
        }
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .tip-card {
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .tip-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .tip-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .budget-empty-state {
          padding: 60px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
      `}</style>
    </section>
  );
};
