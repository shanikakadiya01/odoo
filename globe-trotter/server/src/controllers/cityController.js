import { store } from '../store/dataStore.js';
import { sampleCities } from '../utils/seedData.js';

export const getCities = async (req, res) => {
  try {
    const { search, region, costIndex, sortBy } = req.query;
    const cities = store.getCities({ search, region, costIndex, sortBy });
    res.status(200).json({
      count: cities.length,
      cities
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch cities' });
  }
};

export const getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = store.getCityById(id);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(200).json({ city });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching city details' });
  }
};

export const getFeaturedCities = async (req, res) => {
  try {
    const cities = store.getCities({ sortBy: 'popularity' }).slice(0, 6);
    res.status(200).json({ cities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured cities' });
  }
};

export const seedCities = async (req, res) => {
  try {
    store.cities = [...sampleCities];
    res.status(200).json({ message: 'Cities seed refreshed', count: store.cities.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed cities' });
  }
};
