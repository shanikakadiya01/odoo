import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMyTrips, createTrip, updateTrip, deleteTrip } from '../services/api';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const data = await getMyTrips();
      setTrips(data);
      if (data.length > 0 && !activeTrip) {
        setActiveTrip(data[0]);
      }
    } catch (err) {
      console.error('Failed to load trips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const selectTrip = (trip) => {
    setActiveTrip(trip);
  };

  const createNewTrip = async (tripData) => {
    try {
      const created = await createTrip(tripData);
      setTrips((prev) => [created, ...prev]);
      setActiveTrip(created);
      return created;
    } catch (err) {
      console.error('Create trip error:', err);
      throw err;
    }
  };

  const saveActiveTrip = async (updatedData) => {
    if (!activeTrip) return;
    try {
      const updated = await updateTrip(activeTrip._id, { ...activeTrip, ...updatedData });
      if (updated) {
        setActiveTrip(updated);
        setTrips((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      }
    } catch (err) {
      console.error('Update trip error:', err);
    }
  };

  const removeTrip = async (tripId) => {
    try {
      await deleteTrip(tripId);
      setTrips((prev) => prev.filter((t) => t._id !== tripId));
      if (activeTrip && activeTrip._id === tripId) {
        const remaining = trips.filter((t) => t._id !== tripId);
        setActiveTrip(remaining.length > 0 ? remaining[0] : null);
      }
    } catch (err) {
      console.error('Delete trip error:', err);
    }
  };

  // Stop & Activity helpers for activeTrip
  const addStop = (city) => {
    if (!activeTrip) return;
    const newStop = {
      _id: `stop_${Date.now()}`,
      cityName: city.name,
      country: city.country,
      arrivalDate: activeTrip.startDate || new Date().toISOString().split('T')[0],
      departureDate: activeTrip.endDate || new Date().toISOString().split('T')[0],
      orderIndex: activeTrip.stops ? activeTrip.stops.length : 0,
      estimatedAccommodationCost: city.averageDailyBudget ? city.averageDailyBudget * 3 : 300,
      activities: city.topActivities
        ? city.topActivities.map((a, i) => ({
            _id: `act_${Date.now()}_${i}`,
            title: a.title,
            category: a.category || 'Sightseeing',
            cost: a.estimatedCost || 0,
            currency: 'USD',
            scheduledDate: activeTrip.startDate || new Date().toISOString().split('T')[0],
            startTime: '10:00',
            endTime: '13:00'
          }))
        : []
    };

    const newStops = [...(activeTrip.stops || []), newStop];
    saveActiveTrip({ stops: newStops });
  };

  const updateStop = (stopId, stopFields) => {
    if (!activeTrip || !activeTrip.stops) return;
    const newStops = activeTrip.stops.map((s) => (s._id === stopId ? { ...s, ...stopFields } : s));
    saveActiveTrip({ stops: newStops });
  };

  const removeStop = (stopId) => {
    if (!activeTrip || !activeTrip.stops) return;
    const newStops = activeTrip.stops.filter((s) => s._id !== stopId);
    saveActiveTrip({ stops: newStops });
  };

  const addActivity = (stopId, activity) => {
    if (!activeTrip || !activeTrip.stops) return;
    const newStops = activeTrip.stops.map((s) => {
      if (s._id === stopId) {
        return {
          ...s,
          activities: [
            ...(s.activities || []),
            {
              _id: `act_${Date.now()}`,
              currency: 'USD',
              cost: Number(activity.cost) || 0,
              ...activity
            }
          ]
        };
      }
      return s;
    });
    saveActiveTrip({ stops: newStops });
  };

  const removeActivity = (stopId, activityId) => {
    if (!activeTrip || !activeTrip.stops) return;
    const newStops = activeTrip.stops.map((s) => {
      if (s._id === stopId) {
        return {
          ...s,
          activities: (s.activities || []).filter((a) => a._id !== activityId)
        };
      }
      return s;
    });
    saveActiveTrip({ stops: newStops });
  };

  // Financial Breakdown calculations
  const getBudgetBreakdown = (trip = activeTrip) => {
    if (!trip || !trip.stops) {
      return { accommodationTotal: 0, activitiesTotal: 0, estimatedDailyLiving: 0, grandTotal: 0, daysCount: 0 };
    }

    let accommodationTotal = 0;
    let activitiesTotal = 0;
    let daysCount = 0;

    if (trip.startDate && trip.endDate) {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      const diffTime = Math.abs(end - start);
      daysCount = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    } else {
      daysCount = trip.stops.length * 3 || 1;
    }

    trip.stops.forEach((stop) => {
      accommodationTotal += Number(stop.estimatedAccommodationCost) || 0;
      if (stop.activities) {
        stop.activities.forEach((act) => {
          activitiesTotal += Number(act.cost) || 0;
        });
      }
    });

    // Heuristic estimated daily food & local transport: ~$60/day
    const estimatedDailyLiving = daysCount * 60;
    const grandTotal = accommodationTotal + activitiesTotal + estimatedDailyLiving;

    return {
      accommodationTotal,
      activitiesTotal,
      estimatedDailyLiving,
      grandTotal,
      daysCount,
      targetBudget: Number(trip.totalBudget) || 0,
      remaining: (Number(trip.totalBudget) || 0) - grandTotal
    };
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        activeTrip,
        loading,
        selectTrip,
        createNewTrip,
        saveActiveTrip,
        removeTrip,
        addStop,
        updateStop,
        removeStop,
        addActivity,
        removeActivity,
        getBudgetBreakdown,
        refreshTrips: fetchTrips
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => useContext(TripContext);
