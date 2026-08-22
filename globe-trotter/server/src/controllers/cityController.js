import { City } from '../models/City.js';

export const getCities = async (req, res) => {
  try {
    const { search, region, costIndex, sortBy } = req.query;
    
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { highlights: { $regex: search, $options: 'i' } }
      ];
    }
    if (region && region !== 'All') query.region = region;
    if (costIndex && costIndex !== 'All') query.costIndex = costIndex;

    let sort = {};
    if (sortBy === 'popularity') sort = { popularityScore: -1 };
    else if (sortBy === 'cost-asc') sort = { averageDailyBudget: 1 };
    else if (sortBy === 'cost-desc') sort = { averageDailyBudget: -1 };
    else if (sortBy === 'name') sort = { name: 1 };

    const cities = await City.find(query).sort(sort);
    
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
    let city = await City.findById(id);
    if (!city) {
      // Try searching by name as a fallback for some routes
      city = await City.findOne({ name: { $regex: new RegExp(`^${id}$`, 'i') } });
    }
    
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
    const cities = await City.find({}).sort({ popularityScore: -1 }).limit(6);
    res.status(200).json({ cities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured cities' });
  }
};

export const seedCities = async (req, res) => {
  try {
    res.status(400).json({ error: 'Please use the dedicated seed script to reset cities.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed cities' });
  }
};
