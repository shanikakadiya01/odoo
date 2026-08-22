import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CityCard } from './components/CityCard';
import { CityDetailModal } from './components/CityDetailModal';
import { TripBuilder } from './components/TripBuilder';
import { BudgetCalculator } from './components/BudgetCalculator';
import { MyTripsView } from './components/MyTripsView';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ShareTripModal } from './components/ShareTripModal';
import { ThemeModal } from './components/ThemeModal';
import { AuthModal } from './components/AuthModal';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TripProvider, useTrips } from './context/TripContext';
import { ThemeProvider } from './context/ThemeContext';
import { getCities } from './services/api';
import { Compass, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

function MainApp() {
  const { bookmarks } = useAuth();
  const { activeTrip, selectTrip } = useTrips();

  // Navigation state
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'builder' | 'budget' | 'trips'

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Cities data
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);

  // Modals
  const [selectedCityDetail, setSelectedCityDetail] = useState(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const loadCitiesData = async () => {
    setLoadingCities(true);
    try {
      const data = await getCities({
        search: searchQuery,
        region: selectedRegion,
        costIndex: selectedBudget,
        sortBy
      });
      setCities(data);
    } catch (err) {
      console.error('Failed to fetch cities:', err);
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    loadCitiesData();
  }, [searchQuery, selectedRegion, selectedBudget, sortBy]);

  // Filter bookmarks if enabled
  const displayedCities = showBookmarksOnly
    ? cities.filter((c) => bookmarks.includes(c._id))
    : cities;

  return (
    <div className="app-root">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Tab 1: Explore Destinations */}
        {activeTab === 'explore' && (
          <>
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showBookmarksOnly={showBookmarksOnly}
              setShowBookmarksOnly={setShowBookmarksOnly}
              totalResults={displayedCities.length}
            />

            {/* Destinations Showcase Grid */}
            <section className="destinations-section">
              <div className="container">
                <div className="destinations-header-bar">
                  <div className="destinations-header-left">
                    <h2 className="destinations-title">
                      Featured Global <span className="gradient-text">Destinations</span>
                    </h2>
                    <p className="destinations-subtitle">
                      Curated top cities featuring daily budget averages, high-res photos, and top experiences.
                    </p>
                  </div>

                  <button className="btn btn-glass btn-sm" onClick={loadCitiesData} title="Refresh catalog">
                    <RefreshCw size={14} className={loadingCities ? 'animate-spin' : ''} />
                    <span>Refresh</span>
                  </button>
                </div>

                {loadingCities ? (
                  <div className="catalog-loading-grid">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div key={n} className="skeleton-card glass-panel" />
                    ))}
                  </div>
                ) : displayedCities.length > 0 ? (
                  <div className="destinations-grid">
                    {displayedCities.map((city) => (
                      <CityCard
                        key={city._id}
                        city={city}
                        onOpenDetail={(c) => setSelectedCityDetail(c)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-destinations-box glass-panel">
                    <AlertCircle size={40} className="text-coral" />
                    <h3>No Destinations Match Your Filter</h3>
                    <p>Try clearing your search query or switching the region and cost tier filters.</p>
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedRegion('All');
                        setSelectedBudget('All');
                        setShowBookmarksOnly(false);
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Tab 2: Multi-City Itinerary Builder */}
        {activeTab === 'builder' && (
          <TripBuilder
            onOpenShare={() => setShareModalOpen(true)}
            onOpenAIAssistant={() => setAiAssistantOpen(true)}
            onBrowseCities={() => setActiveTab('explore')}
          />
        )}

        {/* Tab 3: Budget & Expense Analyzer */}
        {activeTab === 'budget' && (
          <BudgetCalculator
            onSwitchToBuilder={() => setActiveTab('builder')}
            onBrowseCities={() => setActiveTab('explore')}
          />
        )}

        {/* Tab 4: My Trips Dashboard */}
        {activeTab === 'trips' && (
          <MyTripsView
            onSelectTrip={(t) => selectTrip(t)}
            onSwitchToBuilder={() => setActiveTab('builder')}
            onOpenShare={() => setShareModalOpen(true)}
            onBrowseCities={() => setActiveTab('explore')}
          />
        )}
      </main>

      {/* Global Modals */}
      {selectedCityDetail && (
        <CityDetailModal
          city={selectedCityDetail}
          onClose={() => setSelectedCityDetail(null)}
        />
      )}

      {aiAssistantOpen && (
        <AIAssistantModal onClose={() => setAiAssistantOpen(false)} />
      )}

      {shareModalOpen && (
        <ShareTripModal onClose={() => setShareModalOpen(false)} />
      )}

      <ThemeModal />
      <AuthModal />

      <FAQSection />

      {/* Footer */}
      <Footer />

      <style>{`
        .app-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .main-content {
          flex: 1;
        }
        .destinations-section {
          padding: 20px 0 80px 0;
        }
        .destinations-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .destinations-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .destinations-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
        .catalog-loading-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
        .skeleton-card {
          height: 380px;
          border-radius: var(--radius-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          animation: pulseSkeleton 1.5s ease-in-out infinite;
        }
        @keyframes pulseSkeleton {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        .no-destinations-box {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
        }
        .no-destinations-box h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .no-destinations-box p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TripProvider>
          <MainApp />
        </TripProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
