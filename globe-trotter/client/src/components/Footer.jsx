import React from 'react';
import { Globe, Heart, Compass, ShieldCheck, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        {/* Brand & Vision */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <div className="brand-icon-wrapper-small">
              <Globe size={18} className="text-white" />
            </div>
            <span className="brand-name">
              GLOBE<span className="gradient-text-sunset">TROTTER</span>
            </span>
          </div>
          <p className="footer-tagline">
            Empowering wanderlust with intelligent multi-city route sequencing, daily cost forecasting, and interactive travel itineraries.
          </p>
          <div className="footer-status-pill">
            <span className="live-dot" />
            <span>Multi-City Global Engine Active</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Top Regions</h4>
          <ul className="footer-links">
            <li><span>Western Europe (Paris, Rome, Barcelona)</span></li>
            <li><span>East Asia (Tokyo, Kyoto, Seoul)</span></li>
            <li><span>Southeast Asia (Bali, Bangkok, Singapore)</span></li>
            <li><span>North America (New York, San Francisco)</span></li>
            <li><span>Middle East & Africa (Dubai, Cairo, Cape Town)</span></li>
          </ul>
        </div>

        {/* Feature Highlights */}
        <div className="footer-col">
          <h4 className="footer-heading">Platform Features</h4>
          <ul className="footer-links">
            <li><span>Multi-City Timeline Orchestrator</span></li>
            <li><span>Automated Daily Budget Calculation</span></li>
            <li><span>AI Packing & Weather Advisor</span></li>
            <li><span>Live Multi-Currency Conversion</span></li>
            <li><span>Public Shareable URL Generator</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-bar-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} Globe Trotter Inc. Crafted for global explorers worldwide.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">
              <ShieldCheck size={13} /> Verified Rates
            </span>
            <span className="footer-badge">
              <Zap size={13} /> Real-Time Sync
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          padding-top: 60px;
          margin-top: 80px;
        }
        .footer-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 50px;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .brand-icon-wrapper-small {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #0284c7;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .text-white { color: #ffffff; }
        .brand-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--text-primary);
        }
        .footer-tagline {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
          max-width: 340px;
        }
        .footer-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px;
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          color: #15803d;
        }
        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #16a34a;
        }
        .footer-heading {
          font-size: 0.95rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-links li span {
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          transition: color var(--transition-fast);
        }
        .footer-links li span:hover {
          color: var(--text-primary);
        }
        .footer-bottom-bar {
          border-top: 1px solid var(--border-subtle);
          padding: 20px 0;
          background: var(--bg-primary);
        }
        .bottom-bar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .copyright-text {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .footer-badges {
          display: flex;
          gap: 12px;
        }
        .footer-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </footer>
  );
};
