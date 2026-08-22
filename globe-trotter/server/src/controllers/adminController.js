export const getPlatformStats = async (req, res) => {
  try {
    // Generate realistic mock data for the dashboard charts

    // Top line metrics
    const topMetrics = {
      totalUsers: 12453,
      totalTrips: 8741,
      totalRevenueProcessed: 420500, // in USD
      activeSessions: 342
    };

    // Monthly user growth for line chart
    const userGrowth = [
      { name: 'Jan', users: 4000 },
      { name: 'Feb', users: 5500 },
      { name: 'Mar', users: 7000 },
      { name: 'Apr', users: 8200 },
      { name: 'May', users: 10500 },
      { name: 'Jun', users: 12453 }
    ];

    // Popular destinations for pie chart
    const popularDestinations = [
      { name: 'Paris', value: 1200 },
      { name: 'Tokyo', value: 950 },
      { name: 'New York', value: 800 },
      { name: 'Bali', value: 650 },
      { name: 'Rome', value: 500 }
    ];

    // Weekly activity for bar chart
    const weeklyActivity = [
      { day: 'Mon', logins: 1200, posts: 300, trips: 150 },
      { day: 'Tue', logins: 1300, posts: 350, trips: 180 },
      { day: 'Wed', logins: 1100, posts: 280, trips: 120 },
      { day: 'Thu', logins: 1400, posts: 400, trips: 200 },
      { day: 'Fri', logins: 1800, posts: 550, trips: 350 },
      { day: 'Sat', logins: 2200, posts: 700, trips: 450 },
      { day: 'Sun', logins: 2100, posts: 650, trips: 400 }
    ];

    res.status(200).json({
      topMetrics,
      userGrowth,
      popularDestinations,
      weeklyActivity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
};
