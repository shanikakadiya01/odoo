import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Map, 
  Activity, 
  DollarSign, 
  TrendingUp, 
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { getAdminStats, formatMoney } from '../services/api';
import { useAuth } from '../context/AuthContext';

const COLORS = ['#0ea5e9', '#8b5cf6', '#f43f5e', '#f59e0b', '#10b981'];

export const AdminPanel = () => {
  const { currency } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getAdminStats();
        if (data) setStats(data);
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading-state">
        <div className="skeleton-card glass-panel" style={{ height: '120px', gridColumn: '1 / -1' }} />
        <div className="skeleton-card glass-panel" style={{ height: '300px' }} />
        <div className="skeleton-card glass-panel" style={{ height: '300px' }} />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="admin-empty-state glass-panel container">
        <AlertCircle size={48} className="text-coral animate-float" />
        <h2>Failed to Load Dashboard</h2>
        <p>Could not retrieve platform statistics from the server.</p>
      </div>
    );
  }

  const { topMetrics, userGrowth, popularDestinations, weeklyActivity } = stats;

  return (
    <section className="admin-dashboard-section">
      <div className="container">
        
        {/* Header */}
        <div className="admin-header">
          <div>
            <div className="badge badge-coral mb-2">Restricted Access</div>
            <h1 className="admin-main-title">
              Platform <span className="gradient-text">Command Center</span>
            </h1>
            <p className="admin-subtitle">
              Real-time analytics and telemetry for the Globe Trotter platform.
            </p>
          </div>
          <div className="admin-status">
            <span className="status-indicator online"></span>
            System Online
          </div>
        </div>

        {/* Top KPIs Row */}
        <div className="admin-kpis-grid">
          <div className="glass-panel metric-box">
            <div className="metric-box-header">
              <span className="metric-box-title">Total Users</span>
              <div className="metric-icon-wrap bg-cyan">
                <Users size={20} className="text-cyan" />
              </div>
            </div>
            <div className="metric-box-number">
              {topMetrics.totalUsers.toLocaleString()}
            </div>
            <p className="metric-box-hint text-cyan">
              <TrendingUp size={12} /> +12% this month
            </p>
          </div>

          <div className="glass-panel metric-box">
            <div className="metric-box-header">
              <span className="metric-box-title">Active Trips Planned</span>
              <div className="metric-icon-wrap bg-violet">
                <Map size={20} className="text-violet" />
              </div>
            </div>
            <div className="metric-box-number text-violet">
              {topMetrics.totalTrips.toLocaleString()}
            </div>
            <p className="metric-box-hint text-violet">
              <TrendingUp size={12} /> +8% this month
            </p>
          </div>

          <div className="glass-panel metric-box">
            <div className="metric-box-header">
              <span className="metric-box-title">Budget Volume</span>
              <div className="metric-icon-wrap bg-amber">
                <DollarSign size={20} className="text-amber" />
              </div>
            </div>
            <div className="metric-box-number">
              {formatMoney(topMetrics.totalRevenueProcessed, currency)}
            </div>
            <p className="metric-box-hint text-amber">
              Total estimated budget across all trips
            </p>
          </div>

          <div className="glass-panel metric-box">
            <div className="metric-box-header">
              <span className="metric-box-title">Live Sessions</span>
              <div className="metric-icon-wrap bg-coral">
                <Activity size={20} className="text-coral" />
              </div>
            </div>
            <div className="metric-box-number text-coral">
              {topMetrics.activeSessions}
            </div>
            <p className="metric-box-hint text-coral">
              Users currently online
            </p>
          </div>
        </div>

        {/* Charts Layout */}
        <div className="admin-charts-layout">
          
          {/* Main Growth Chart */}
          <div className="glass-panel chart-card full-width">
            <h3 className="chart-title">User Growth Trajectory (6 Months)</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#0ea5e9" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Charts Row */}
          <div className="admin-charts-row">
            
            {/* Pie Chart: Destinations */}
            <div className="glass-panel chart-card">
              <h3 className="chart-title">Top 5 Saved Destinations</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={popularDestinations}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {popularDestinations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart: Weekly Activity */}
            <div className="glass-panel chart-card">
              <h3 className="chart-title">Weekly Engagement Metrics</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={weeklyActivity} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <Tooltip 
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" />
                    <Bar dataKey="logins" name="User Logins" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="trips" name="Trips Saved" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .admin-dashboard-section {
          padding: 40px 0 80px 0;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .admin-main-title {
          font-size: 2.4rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .admin-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .admin-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #059669;
          background: #d1fae5;
          padding: 8px 16px;
          border-radius: var(--radius-full);
        }
        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-status 2s infinite;
        }
        @keyframes pulse-status {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .admin-kpis-grid {
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
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
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
        .bg-cyan { background: #e0f2fe; }
        .text-cyan { color: #0284c7; }
        .bg-amber { background: #fef3c7; }
        .text-amber { color: #d97706; }
        .bg-violet { background: #ede9fe; }
        .text-violet { color: #7c3aed; }
        .bg-coral { background: #ffe4e6; }
        .text-coral { color: #e11d48; }
        
        .metric-box-number {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 900;
          color: var(--text-primary);
        }
        .metric-box-hint {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .admin-charts-layout {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .chart-card {
          padding: 24px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }
        .full-width {
          width: 100%;
        }
        .admin-charts-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .chart-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 20px;
        }
        .chart-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .admin-loading-state {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .admin-empty-state {
          padding: 80px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          margin-top: 40px;
        }
        
        @media (max-width: 900px) {
          .admin-charts-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
