import React from 'react';
import { Search, Sparkles, SlidersHorizontal, MapPin, Heart, DollarSign, Award, ArrowDownUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const REGIONS = ['All', 'Europe', 'Asia', 'North America', 'Middle East', 'Africa', 'Oceania', 'South America'];
const BUDGET_TIERS = ['All', '$', '$$', '$$$', '$$$$'];

export const HeroSection = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedBudget,
  setSelectedBudget,
  sortBy,
  setSortBy,
  showBookmarksOnly,
  setShowBookmarksOnly,
  totalResults
}) => {
  const { bookmarks } = useAuth();

  return (
    <section className="hero-container">
      {/* Background ambient lighting effects */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="container hero-content">
        {/* Top Tag */}
        <div className="hero-tag animate-float">
          <Sparkles size={14} className="hero-tag-icon" />
          <span>Intelligent Multi-Destination Journey Orchestrator</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          Wander Without Limits. <br />
          Plan Multi-City Trips with <span className="gradient-text">Precision & Joy</span>.
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Discover world-renowned destinations, automate your route timeline, organize per-city activities, 
          and track daily expenses with our smart real-time budget calculator.
        </p>

        {/* Interactive Search & Filter Bar */}
        <div className="search-filter-card glass-panel">
          {/* Main Search Input */}
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search cities, countries, landmarks (e.g. Paris, Tokyo, Pyramids, Mount Fuji)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                ×
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="filter-row region-tabs">
            <span className="filter-label">Region:</span>
            <div className="chips-scroll">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  className={`filter-chip ${selectedRegion === region ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Controls: Budget, Sorting, Bookmarks */}
          <div className="filter-secondary-row">
            {/* Budget Tier Filter */}
            <div className="filter-group">
              <span className="filter-label">Cost Tier:</span>
              <div className="budget-chips">
                {BUDGET_TIERS.map((tier) => (
                  <button
                    key={tier}
                    className={`budget-chip ${selectedBudget === tier ? 'active' : ''}`}
                    onClick={() => setSelectedBudget(tier)}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting */}
            <div className="filter-group sort-group">
              <span className="filter-label">
                <ArrowDownUp size={14} />
                <span>Sort By:</span>
              </span>
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity">Most Popular</option>
                <option value="cost-asc">Budget: Low to High</option>
                <option value="cost-desc">Budget: High to Low</option>
                <option value="name">City Name (A-Z)</option>
              </select>
            </div>

            {/* Bookmarks Toggle */}
            <button
              className={`bookmark-toggle-btn ${showBookmarksOnly ? 'active' : ''}`}
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            >
              <Heart size={16} fill={showBookmarksOnly ? 'var(--accent-coral)' : 'none'} color={showBookmarksOnly ? 'var(--accent-coral)' : 'var(--text-secondary)'} />
              <span>Saved ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Dynamic Result Summary & Stats */}
        <div className="hero-stats-row">
          <div className="stat-pill">
            <span className="stat-value">{totalResults}</span>
            <span className="stat-label">Destinations Found</span>
          </div>
          <div className="stat-pill">
            <span className="stat-value">50+</span>
            <span className="stat-label">Curated Activities</span>
          </div>
          <div className="stat-pill">
            <span className="stat-value">100%</span>
            <span className="stat-label">Free Itinerary Sync</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-container {
          position: relative;
          padding: 60px 0 40px 0;
          overflow: hidden;
        }
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .hero-glow-1 {
          width: 500px;
          height: 500px;
          background: rgba(6, 182, 212, 0.12);
          top: -100px;
          left: -100px;
        }
        .hero-glow-2 {
          width: 450px;
          height: 450px;
          background: rgba(244, 63, 94, 0.1);
          top: 50px;
          right: -80px;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-cyan);
          margin-bottom: 24px;
          letter-spacing: 0.02em;
        }
        .hero-tag-icon {
          color: var(--accent-cyan);
        }
        .hero-title {
          font-size: 3.2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          max-width: 920px;
          line-height: 1.15;
        }
        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 740px;
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .search-filter-card {
          width: 100%;
          max-width: 960px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 18px;
          color: var(--accent-cyan);
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 16px 45px 16px 52px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--text-primary);
          outline: none;
          transition: all var(--transition-normal);
        }
        .search-input:focus {
          border-color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.09);
          box-shadow: 0 0 0 3px var(--accent-cyan-glow);
        }
        .search-clear-btn {
          position: absolute;
          right: 16px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 1.4rem;
          cursor: pointer;
          line-height: 1;
        }
        .search-clear-btn:hover {
          color: var(--text-primary);
        }
        .filter-row {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }
        .filter-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .chips-scroll {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          width: 100%;
          scrollbar-width: none;
        }
        .chips-scroll::-webkit-scrollbar {
          display: none;
        }
        .filter-chip {
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }
        .filter-chip:hover {
          background: rgba(255, 255, 255, 0.09);
          color: var(--text-primary);
        }
        .filter-chip.active {
          background: var(--grad-cyan);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 2px 10px var(--accent-cyan-glow);
        }
        .filter-secondary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .budget-chips {
          display: flex;
          gap: 4px;
        }
        .budget-chip {
          padding: 5px 12px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .budget-chip:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }
        .budget-chip.active {
          background: rgba(245, 158, 11, 0.2);
          border-color: var(--accent-amber);
          color: var(--accent-amber);
        }
        .sort-select {
          padding: 6px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.85rem;
          outline: none;
          cursor: pointer;
        }
        .bookmark-toggle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .bookmark-toggle-btn:hover {
          border-color: rgba(244, 63, 94, 0.4);
        }
        .bookmark-toggle-btn.active {
          background: rgba(244, 63, 94, 0.15);
          border-color: var(--accent-coral);
          color: var(--accent-coral);
        }
        .hero-stats-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 32px;
        }
        .stat-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--accent-cyan);
        }
        .stat-label {
          color: var(--text-muted);
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .filter-secondary-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-stats-row {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
};
