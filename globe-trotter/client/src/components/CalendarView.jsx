import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin, Plus, Sparkles } from 'lucide-react';
import { useTrips } from '../context/TripContext';

const pad = (value) => String(value).padStart(2, '0');
const toDateKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const parseDate = (value) => {
  if (!value) return null;
  const [year, month, day] = String(value).split('T')[0].split('-').map(Number);
  return year && month && day ? new Date(year, month - 1, day) : null;
};
const formatDay = (date) => date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
const formatTime = (activity) => activity.startTime || activity.endTime ? `${activity.startTime || ''}${activity.startTime && activity.endTime ? ' - ' : ''}${activity.endTime || ''}` : 'Any time';
const getMonthDays = (monthDate) => {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
};

export const CalendarView = ({ onSwitchToBuilder }) => {
  const { trips, activeTrip, selectTrip } = useTrips();
  const [calendarTripId, setCalendarTripId] = useState(activeTrip?._id || '');
  const [monthDate, setMonthDate] = useState(() => parseDate(activeTrip?.startDate) || new Date());
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(parseDate(activeTrip?.startDate) || new Date()));
  const calendarTrip = trips.find((trip) => trip._id === calendarTripId) || activeTrip;
  const monthDays = useMemo(() => getMonthDays(monthDate), [monthDate]);
  const tripEvents = useMemo(() => {
    const events = new Map();
    if (!calendarTrip) return events;
    const addEvent = (dateKey, event) => {
      if (dateKey) events.set(dateKey, [...(events.get(dateKey) || []), event]);
    };
    (calendarTrip.stops || []).forEach((stop) => {
      const arrival = parseDate(stop.arrivalDate || calendarTrip.startDate);
      const departure = parseDate(stop.departureDate || stop.arrivalDate || calendarTrip.endDate);
      if (arrival && departure) {
        const day = new Date(arrival);
        while (day <= departure) {
          addEvent(toDateKey(day), { type: 'stop', title: stop.cityName, stop });
          day.setDate(day.getDate() + 1);
        }
      }
      (stop.activities || []).forEach((activity) => addEvent(activity.scheduledDate || stop.arrivalDate || calendarTrip.startDate, {
        type: 'activity', title: activity.title, activity, stop
      }));
    });
    return events;
  }, [calendarTrip]);
  const selectedEvents = tripEvents.get(selectedDate) || [];
  const selectedDateObject = parseDate(selectedDate) || new Date();

  useEffect(() => {
    if (!activeTrip?._id) return;
    setCalendarTripId(activeTrip._id);
  }, [activeTrip?._id]);

  useEffect(() => {
    if (!calendarTrip) return;
    const startDate = parseDate(calendarTrip.startDate) || new Date();
    setMonthDate(startDate);
    setSelectedDate(toDateKey(startDate));
  }, [calendarTrip?._id]);

  const changeTrip = (event) => {
    const nextTrip = trips.find((trip) => trip._id === event.target.value);
    setCalendarTripId(event.target.value);
    if (nextTrip) selectTrip(nextTrip);
  };

  return (
    <section className="calendar-section">
      <div className="container">
        <div className="calendar-header">
          <div>
            <div className="badge badge-coral mb-2">Trip Calendar</div>
            <h1 className="calendar-title">See the journey <span className="gradient-text">unfold</span></h1>
            <p className="calendar-subtitle">Track city stays and daily plans in one clear monthly view.</p>
          </div>
          <div className="calendar-header-actions">
            <select className="select-field calendar-trip-select" value={calendarTrip?._id || ''} onChange={changeTrip} disabled={!trips.length} aria-label="Choose trip">
              {!trips.length && <option value="">No trips yet</option>}
              {trips.map((trip) => <option key={trip._id} value={trip._id}>{trip.title}</option>)}
            </select>
            <button className="btn btn-primary" onClick={onSwitchToBuilder} disabled={!calendarTrip}><Plus size={16} /><span>Edit itinerary</span></button>
          </div>
        </div>
        {!calendarTrip ? (
          <div className="calendar-empty glass-panel"><CalendarDays size={44} className="text-cyan" /><h2>Your calendar is waiting</h2><p>Create a trip and your dates, stops, and activities will appear here.</p><button className="btn btn-primary" onClick={onSwitchToBuilder}>Create a trip</button></div>
        ) : (
          <div className="calendar-layout">
            <div className="calendar-panel glass-panel">
              <div className="calendar-toolbar"><div><span className="calendar-month-kicker">Planning month</span><h2>{monthDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2></div><div className="calendar-nav-actions"><button className="btn btn-glass btn-icon btn-sm" onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))} title="Previous month" aria-label="Previous month"><ChevronLeft size={18} /></button><button className="btn btn-glass btn-sm" onClick={() => { const today = new Date(); setMonthDate(today); setSelectedDate(toDateKey(today)); }}>Today</button><button className="btn btn-glass btn-icon btn-sm" onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))} title="Next month" aria-label="Next month"><ChevronRight size={18} /></button></div></div>
              <div className="calendar-weekdays">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}</div>
              <div className="calendar-grid">{monthDays.map((day) => { const dateKey = toDateKey(day); const dayEvents = tripEvents.get(dateKey) || []; const isCurrentMonth = day.getMonth() === monthDate.getMonth(); const isSelected = selectedDate === dateKey; const isToday = toDateKey(new Date()) === dateKey; return <button key={dateKey} className={`calendar-day ${!isCurrentMonth ? 'outside-month' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`} onClick={() => setSelectedDate(dateKey)}><span className="calendar-day-number">{day.getDate()}</span>{dayEvents.length > 0 && <div className="calendar-event-list">{dayEvents.slice(0, 2).map((event, index) => <span key={`${event.title}-${index}`} className={`calendar-event ${event.type}`}>{event.title}</span>)}{dayEvents.length > 2 && <span className="calendar-more">+{dayEvents.length - 2} more</span>}</div>}</button>; })}</div>
              <div className="calendar-legend"><span><i className="legend-dot stop" /> City stay</span><span><i className="legend-dot activity" /> Activity</span><span><i className="legend-dot today-dot" /> Today</span></div>
            </div>
            <aside className="calendar-details glass-panel"><div className="calendar-details-heading"><span className="calendar-month-kicker">Selected day</span><h2>{formatDay(selectedDateObject)}</h2></div>{selectedEvents.length > 0 ? <div className="selected-events">{selectedEvents.map((event, index) => <article className={`selected-event ${event.type}`} key={`${event.title}-${index}`}><div className="selected-event-icon">{event.type === 'activity' ? <Sparkles size={16} /> : <MapPin size={16} />}</div><div><span className="selected-event-type">{event.type === 'activity' ? 'Activity' : 'City stay'}</span><h3>{event.title}</h3><p>{event.type === 'activity' ? <><Clock size={13} /> {formatTime(event.activity)} <span className="event-separator">·</span> {event.stop.cityName}</> : <>{event.stop.country || 'On your route'}</>}</p></div></article>)}</div> : <div className="calendar-no-events"><CalendarDays size={28} /><p>No itinerary items on this day.</p><button className="btn btn-outline btn-sm" onClick={onSwitchToBuilder}>Add an activity</button></div>}<div className="calendar-trip-summary"><span>Trip dates</span><strong>{calendarTrip.startDate ? parseDate(calendarTrip.startDate).toLocaleDateString() : 'Flexible'} <span>to</span> {calendarTrip.endDate ? parseDate(calendarTrip.endDate).toLocaleDateString() : 'Flexible'}</strong></div></aside>
          </div>
        )}
      </div>
      <style>{`
        .calendar-section { padding: 42px 0 80px; } .calendar-header { display:flex; justify-content:space-between; align-items:flex-end; gap:24px; margin-bottom:30px; } .calendar-title { font-size:2.5rem; font-weight:800; } .calendar-subtitle { color:var(--text-secondary); margin-top:6px; } .calendar-header-actions,.calendar-nav-actions { display:flex; align-items:center; gap:10px; } .calendar-trip-select { min-width:210px; width:auto; } .calendar-layout { display:grid; grid-template-columns:minmax(0,1fr) 320px; gap:22px; align-items:start; } .calendar-panel { padding:24px; } .calendar-toolbar { display:flex; justify-content:space-between; align-items:center; gap:16px; margin-bottom:24px; } .calendar-toolbar h2,.calendar-details h2 { font-size:1.75rem; font-weight:800; } .calendar-month-kicker { display:block; color:var(--accent-coral); font-size:.72rem; font-weight:800; letter-spacing:.09em; text-transform:uppercase; margin-bottom:4px; } .calendar-weekdays,.calendar-grid { display:grid; grid-template-columns:repeat(7,minmax(0,1fr)); } .calendar-weekdays { color:var(--text-muted); font-size:.75rem; font-weight:800; text-transform:uppercase; letter-spacing:.06em; padding:0 0 10px; } .calendar-weekdays span { padding-left:10px; } .calendar-grid { border-top:1px solid var(--border-subtle); border-left:1px solid var(--border-subtle); } .calendar-day { min-height:116px; padding:9px; text-align:left; vertical-align:top; background:var(--bg-card); border:0; border-right:1px solid var(--border-subtle); border-bottom:1px solid var(--border-subtle); color:var(--text-primary); cursor:pointer; transition:background var(--transition-fast); } .calendar-day:hover { background:#f0f9ff; } .calendar-day.outside-month { color:var(--text-muted); background:var(--bg-secondary); } .calendar-day.selected { background:#e0f2fe; box-shadow:inset 0 0 0 2px var(--accent-cyan); } .calendar-day-number { display:inline-flex; align-items:center; justify-content:center; width:25px; height:25px; font-family:var(--font-heading); font-size:1rem; font-weight:700; } .calendar-day.today .calendar-day-number { color:#fff; background:var(--accent-coral); border-radius:50%; } .calendar-event-list { display:flex; flex-direction:column; gap:4px; margin-top:7px; } .calendar-event { overflow:hidden; padding:3px 6px; border-radius:4px; font-size:.72rem; font-weight:700; line-height:1.2; text-overflow:ellipsis; white-space:nowrap; } .calendar-event.stop { color:#075985; background:#bae6fd; } .calendar-event.activity { color:#9f1239; background:#fecdd3; } .calendar-more { color:var(--text-muted); font-size:.7rem; padding-left:4px; } .calendar-legend { display:flex; flex-wrap:wrap; gap:18px; color:var(--text-secondary); font-size:.8rem; margin-top:18px; } .calendar-legend span { display:flex; align-items:center; gap:7px; } .legend-dot { width:9px; height:9px; display:inline-block; border-radius:50%; } .legend-dot.stop { background:#0284c7; } .legend-dot.activity { background:#e11d48; } .legend-dot.today-dot { background:#d97706; } .calendar-details { padding:24px; position:sticky; top:96px; } .calendar-details-heading { padding-bottom:18px; border-bottom:1px solid var(--border-subtle); } .selected-events { display:flex; flex-direction:column; gap:14px; padding:20px 0; } .selected-event { display:flex; gap:12px; padding:13px; border-left:3px solid var(--accent-cyan); background:var(--bg-secondary); } .selected-event.activity { border-left-color:var(--accent-coral); } .selected-event-icon { color:var(--accent-cyan); padding-top:2px; } .selected-event.activity .selected-event-icon { color:var(--accent-coral); } .selected-event-type { color:var(--text-muted); font-size:.7rem; font-weight:800; letter-spacing:.06em; text-transform:uppercase; } .selected-event h3 { font-size:1.05rem; font-weight:800; margin:3px 0; } .selected-event p { display:flex; align-items:center; gap:5px; color:var(--text-secondary); font-size:.8rem; } .event-separator { color:var(--text-muted); } .calendar-no-events { display:flex; flex-direction:column; align-items:center; gap:10px; color:var(--text-muted); text-align:center; padding:34px 0; } .calendar-no-events p { font-size:.9rem; } .calendar-trip-summary { display:flex; flex-direction:column; gap:4px; padding-top:16px; border-top:1px solid var(--border-subtle); color:var(--text-muted); font-size:.78rem; } .calendar-trip-summary strong { color:var(--text-primary); font-size:.85rem; } .calendar-trip-summary strong span { color:var(--text-muted); font-weight:400; } .calendar-empty { display:flex; flex-direction:column; align-items:center; gap:14px; padding:72px 24px; text-align:center; } .calendar-empty h2 { font-size:1.8rem; font-weight:800; } .calendar-empty p { color:var(--text-secondary); } @media (max-width:900px) { .calendar-layout { grid-template-columns:1fr; } .calendar-details { position:static; } } @media (max-width:650px) { .calendar-header { align-items:stretch; flex-direction:column; } .calendar-header-actions { flex-wrap:wrap; } .calendar-trip-select { flex:1; min-width:0; } .calendar-panel { padding:14px; } .calendar-day { min-height:84px; padding:5px; } .calendar-event { font-size:.62rem; } .calendar-weekdays span { padding-left:5px; font-size:.65rem; } .calendar-title { font-size:2rem; } }
      `}</style>
    </section>
  );
};