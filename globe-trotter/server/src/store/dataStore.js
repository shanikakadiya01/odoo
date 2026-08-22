import { sampleCities } from '../utils/seedData.js';

// In-Memory fallback store populated with sample cities and demo trips
class DataStore {
  constructor() {
    this.cities = [...sampleCities];
    this.users = [
      {
        _id: 'user_demo_01',
        name: 'Alex Explorer',
        email: 'alex@globetrotter.io',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        preferredCurrency: 'USD',
        savedDestinations: ['city_paris_01', 'city_tokyo_02', 'city_bali_05']
      }
    ];
    this.trips = [
      {
        _id: 'trip_demo_grand_tour',
        userId: 'user_demo_01',
        title: 'Euro-Asian Grand Odyssey 2026',
        description: 'An unforgettable 3-week adventure discovering timeless European landmarks and electric Tokyo nightlife.',
        coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
        startDate: '2026-09-10',
        endDate: '2026-10-01',
        totalBudget: 4500,
        isPublic: true,
        shareSlug: 'grand-odyssey-2026',
        stops: [
          {
            _id: 'stop_1',
            cityName: 'Paris',
            country: 'France',
            arrivalDate: '2026-09-10',
            departureDate: '2026-09-15',
            orderIndex: 0,
            estimatedAccommodationCost: 750,
            activities: [
              {
                _id: 'act_1_1',
                title: 'Eiffel Tower Sunset Summit Tour',
                category: 'Sightseeing',
                cost: 38,
                currency: 'USD',
                scheduledDate: '2026-09-11',
                startTime: '18:00',
                endTime: '20:30'
              },
              {
                _id: 'act_1_2',
                title: 'Louvre Museum Guided Walk',
                category: 'Culture',
                cost: 24,
                currency: 'USD',
                scheduledDate: '2026-09-12',
                startTime: '10:00',
                endTime: '13:30'
              },
              {
                _id: 'act_1_3',
                title: 'Seine River Gourmet Dinner Cruise',
                category: 'Food & Dining',
                cost: 85,
                currency: 'USD',
                scheduledDate: '2026-09-13',
                startTime: '19:30',
                endTime: '21:30'
              }
            ]
          },
          {
            _id: 'stop_2',
            cityName: 'Rome',
            country: 'Italy',
            arrivalDate: '2026-09-15',
            departureDate: '2026-09-20',
            orderIndex: 1,
            estimatedAccommodationCost: 600,
            activities: [
              {
                _id: 'act_2_1',
                title: 'Colosseum & Roman Forum Priority Tour',
                category: 'Sightseeing',
                cost: 32,
                currency: 'USD',
                scheduledDate: '2026-09-16',
                startTime: '09:00',
                endTime: '12:00'
              },
              {
                _id: 'act_2_2',
                title: 'Trastevere Sunset Pasta & Gelato Crawl',
                category: 'Food & Dining',
                cost: 42,
                currency: 'USD',
                scheduledDate: '2026-09-17',
                startTime: '17:30',
                endTime: '20:00'
              }
            ]
          },
          {
            _id: 'stop_3',
            cityName: 'Tokyo',
            country: 'Japan',
            arrivalDate: '2026-09-21',
            departureDate: '2026-10-01',
            orderIndex: 2,
            estimatedAccommodationCost: 1100,
            activities: [
              {
                _id: 'act_3_1',
                title: 'Shibuya Crossing & Harajuku Hidden Alleyways',
                category: 'Sightseeing',
                cost: 18,
                currency: 'USD',
                scheduledDate: '2026-09-22',
                startTime: '14:00',
                endTime: '17:00'
              },
              {
                _id: 'act_3_2',
                title: 'Mount Fuji & Lake Kawaguchiko Scenic Day Trip',
                category: 'Adventure',
                cost: 95,
                currency: 'USD',
                scheduledDate: '2026-09-25',
                startTime: '08:00',
                endTime: '16:00'
              }
            ]
          }
        ]
      }
    ];
  }

  // City Helpers
  getCities({ search, region, costIndex, sortBy }) {
    let result = [...this.cities];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          (c.highlights && c.highlights.some((h) => h.toLowerCase().includes(q)))
      );
    }
    if (region && region !== 'All') {
      result = result.filter((c) => c.region.toLowerCase() === region.toLowerCase());
    }
    if (costIndex && costIndex !== 'All') {
      result = result.filter((c) => c.costIndex === costIndex);
    }
    if (sortBy === 'popularity') {
      result.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
    } else if (sortBy === 'cost-asc') {
      result.sort((a, b) => a.averageDailyBudget - b.averageDailyBudget);
    } else if (sortBy === 'cost-desc') {
      result.sort((a, b) => b.averageDailyBudget - a.averageDailyBudget);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }

  getCityById(id) {
    return this.cities.find((c) => c._id === id || c.name.toLowerCase() === id.toLowerCase());
  }

  // Trip Helpers
  getTripsByUser(userId) {
    return this.trips.filter((t) => t.userId === userId);
  }

  getTripById(id) {
    return this.trips.find((t) => t._id === id || t.shareSlug === id);
  }

  createTrip(tripData) {
    const newTrip = {
      _id: `trip_${Date.now()}`,
      shareSlug: tripData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6),
      stops: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...tripData
    };
    this.trips.unshift(newTrip);
    return newTrip;
  }

  updateTrip(id, updateData) {
    const idx = this.trips.findIndex((t) => t._id === id);
    if (idx === -1) return null;
    this.trips[idx] = {
      ...this.trips[idx],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return this.trips[idx];
  }

  deleteTrip(id) {
    const idx = this.trips.findIndex((t) => t._id === id);
    if (idx === -1) return false;
    this.trips.splice(idx, 1);
    return true;
  }

  // User Helpers
  getUserByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    return this.users.find((u) => u._id === id);
  }

  createUser(userData) {
    const newUser = {
      _id: `user_${Date.now()}`,
      savedDestinations: [],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      preferredCurrency: 'USD',
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  toggleBookmark(userId, cityId) {
    const user = this.getUserById(userId);
    if (!user) return null;
    if (!user.savedDestinations) user.savedDestinations = [];
    const exists = user.savedDestinations.includes(cityId);
    if (exists) {
      user.savedDestinations = user.savedDestinations.filter((id) => id !== cityId);
    } else {
      user.savedDestinations.push(cityId);
    }
    return user.savedDestinations;
  }
}

export const store = new DataStore();
