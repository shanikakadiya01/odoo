import React from 'react';
import { Search, Sparkles, SlidersHorizontal, MapPin, Heart, DollarSign, Award, ArrowDownUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const REGIONS = ['All', 'Europe', 'Asia', 'North America', 'Middle East', 'Africa', 'Oceania', 'South America'];
const BUDGET_TIERS = [
  { id: 'All', label: 'All' },
  { id: '$', label: 'Budget (< ₹6k)' },
  { id: '$$', label: 'Moderate (₹6k-₹12k)' },
  { id: '$$$', label: 'Premium (₹12k-₹18k)' },
  { id: '$$$$', label: 'Luxury (₹18k+)' }
];

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

          {/* Region Filter */}
          <div className="filter-row region-filter">
            <span className="filter-label">Region:</span>
            <select
              className="filter-select region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              aria-label="Filter by region"
            >
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Secondary Controls: Budget, Sorting, Bookmarks */}
          <div className="filter-secondary-row">
            {/* Budget Tier Filter */}
            <div className="filter-group">
              <span className="filter-label">Cost Tier:</span>
              <select
                className="filter-select cost-tier-select"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                aria-label="Filter by cost tier"
              >
                {BUDGET_TIERS.map((tier) => (
                  <option
                    key={tier.id}
                    value={tier.id}
                  >
                    {tier.label}
                  </option>
                ))}
              </select>
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
          padding: 50px 0 36px 0;
          overflow: hidden;
              background-image: url('https://www.timmo.co.in/trendybg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
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
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 700;
          color: #0369a1;
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }
        .hero-tag-icon {
          color: #0284c7;
        }
        .hero-title {
          font-size: 3.2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 18px;
          max-width: 920px;
          line-height: 1.15;
          color: var(--text-primary);
        }
        .hero-subtitle {
          font-size: 1.08rem;
          color: var(--text-secondary);
          max-width: 740px;
          margin-bottom: 36px;
          line-height: 1.6;
        }
        .search-filter-card {
          width: 100%;
          max-width: 960px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          background: #ffffff;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
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
          color: #0284c7;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 15px 45px 15px 52px;
          background: var(--bg-secondary);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 1.02rem;
          color: var(--text-primary);
          outline: none;
          transition: all var(--transition-normal);
        }
        .search-input:focus {
          border-color: #0284c7;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
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
        .filter-select,
        .sort-select {
          padding: 7px 34px 7px 12px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .filter-select:focus,
        .sort-select:focus {
          border-color: #0284c7;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
        }
        .region-select {
          flex: 1;
          min-width: 0;
        }
        .cost-tier-select {
          min-width: 205px;
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
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }
        .filter-chip:hover {
          background: #ffffff;
          border-color: #cbd5e1;
          color: var(--text-primary);
        }
        .filter-chip.active {
          background: #0284c7;
          border-color: #0284c7;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
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
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .budget-chip:hover {
          background: #ffffff;
          border-color: #cbd5e1;
          color: var(--text-primary);
        }
        .budget-chip.active {
          background: #fef3c7;
          border-color: #f59e0b;
          color: #b45309;
        }
        .bookmark-toggle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .bookmark-toggle-btn:hover {
          border-color: #fca5a5;
        }
        .bookmark-toggle-btn.active {
          background: #ffe4e6;
          border-color: #fecdd3;
          color: #e11d48;
        }
        .hero-stats-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 28px;
        }
        .stat-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          background: #ffffff;
          padding: 6px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }
        .stat-value {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          color: #0284c7;
        }
        .stat-label {
          color: var(--text-secondary);
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .filter-secondary-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .filter-group,
          .region-filter {
            width: 100%;
          }
          .cost-tier-select,
          .sort-select {
            flex: 1;
            min-width: 0;
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
