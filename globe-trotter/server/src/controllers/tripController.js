import { Trip } from '../models/Trip.js';

export const getMyTrips = async (req, res) => {
  try {
    const userId = req.user?.id || 'user_demo_01';
    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ trips });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
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
    const trip = await Trip.findOne({ shareSlug });
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

    const trip = await Trip.create({
      _id: `trip_${Date.now()}`,
      userId,
      title,
      description: description || '',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      startDate,
      endDate,
      totalBudget: Number(totalBudget) || 0,
      isPublic: isPublic !== undefined ? isPublic : true,
      shareSlug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6),
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
    const updated = await Trip.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
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
    const success = await Trip.findByIdAndDelete(id);
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
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const newStop = {
      cityName,
      country,
      arrivalDate: arrivalDate || trip.startDate,
      departureDate: departureDate || trip.endDate,
      orderIndex: trip.stops.length,
      estimatedAccommodationCost: Number(estimatedAccommodationCost) || 0,
      activities: activities || []
    };

    trip.stops.push(newStop);
    await trip.save();

    res.status(201).json({ trip, stop: trip.stops[trip.stops.length - 1], message: 'Stop added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add stop' });
  }
};
