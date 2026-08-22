import { store } from '../store/dataStore.js';

export const getMyTrips = async (req, res) => {
  try {
    const userId = req.user?.id || 'user_demo_01';
    const trips = store.getTripsByUser(userId);
    res.status(200).json({ trips });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = store.getTripById(id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.status(200).json({ trip });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching trip details' });
  }
};

export const getSharedTrip = async (req, res) => {
  try {
    const { shareSlug } = req.params;
    const trip = store.getTripById(shareSlug);
    if (!trip) {
      return res.status(404).json({ error: 'Public trip not found' });
    }
    res.status(200).json({ trip });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shared trip' });
  }
};

export const createTrip = async (req, res) => {
  try {
    const userId = req.user?.id || 'user_demo_01';
    const { title, description, coverImage, startDate, endDate, totalBudget, stops, isPublic } = req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ error: 'Title, start date, and end date are required' });
    }

    const trip = store.createTrip({
      userId,
      title,
      description: description || '',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      startDate,
      endDate,
      totalBudget: Number(totalBudget) || 0,
      isPublic: isPublic !== undefined ? isPublic : true,
      stops: stops || []
    });

    res.status(201).json({ trip, message: 'Trip created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create trip' });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = store.updateTrip(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.status(200).json({ trip: updated, message: 'Trip updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update trip' });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const success = store.deleteTrip(id);
    if (!success) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trip' });
  }
};

export const addStopToTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { cityName, country, arrivalDate, departureDate, estimatedAccommodationCost, activities } = req.body;
    const trip = store.getTripById(id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const newStop = {
      _id: `stop_${Date.now()}`,
      cityName,
      country,
      arrivalDate: arrivalDate || trip.startDate,
      departureDate: departureDate || trip.endDate,
      orderIndex: trip.stops.length,
      estimatedAccommodationCost: Number(estimatedAccommodationCost) || 0,
      activities: activities || []
    };

    trip.stops.push(newStop);
    store.updateTrip(id, { stops: trip.stops });

    res.status(201).json({ trip, stop: newStop, message: 'Stop added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add stop' });
  }
};
