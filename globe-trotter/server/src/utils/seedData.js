export const sampleCities = [
  {
    _id: 'city_paris_01',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    costIndex: '$$$',
    averageDailyBudget: 180,
    popularityScore: 98,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Light dazzles with world-class art museums, iconic architecture, vibrant bistros, and romantic riverside promenades along the Seine.',
    climate: 'Temperate (Best: May - Oct)',
    currency: 'EUR',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Montmartre', 'Notre-Dame'],
    topActivities: [
      { id: 'act_p1', title: 'Eiffel Tower Sunset Summit Tour', category: 'Sightseeing', estimatedCost: 38, durationHours: 2.5 },
      { id: 'act_p2', title: 'Louvre Museum Masterpieces Guided Walk', category: 'Culture', estimatedCost: 24, durationHours: 3.5 },
      { id: 'act_p3', title: 'Seine River Gourmet Dinner Cruise', category: 'Food & Dining', estimatedCost: 85, durationHours: 2 },
      { id: 'act_p4', title: 'Montmartre Artists & Vineyard Discovery', category: 'Culture', estimatedCost: 20, durationHours: 2 }
    ]
  },
  {
    _id: 'city_tokyo_02',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    costIndex: '$$$',
    averageDailyBudget: 160,
    popularityScore: 97,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    description: 'An electrifying metropolis where neon-lit futuristic skyscrapers seamlessly blend with historic temples, cutting-edge cuisine, and tranquil gardens.',
    climate: 'Subtropical (Best: Mar - May, Oct - Nov)',
    currency: 'JPY',
    highlights: ['Shibuya Crossing', 'Sensō-ji Temple', 'Akihabara', 'Tsukiji Market'],
    topActivities: [
      { id: 'act_t1', title: 'Shibuya Crossing & Harajuku Hidden Alleyways', category: 'Sightseeing', estimatedCost: 18, durationHours: 3 },
      { id: 'act_t2', title: 'Tsukiji Outer Market Culinary Tasting Experience', category: 'Food & Dining', estimatedCost: 45, durationHours: 2.5 },
      { id: 'act_t3', title: 'Mount Fuji & Lake Kawaguchiko Scenic Day Trip', category: 'Adventure', estimatedCost: 95, durationHours: 8 },
      { id: 'act_t4', title: 'TeamLab Planets Immersive Digital Art', category: 'Culture', estimatedCost: 32, durationHours: 2 }
    ]
  },
  {
    _id: 'city_rome_03',
    name: 'Rome',
    country: 'Italy',
    region: 'Europe',
    costIndex: '$$',
    averageDailyBudget: 140,
    popularityScore: 95,
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    description: 'The Eternal City is an open-air museum filled with ancient Roman ruins, Renaissance masterpieces, bustling piazzas, and authentic trattorias.',
    climate: 'Mediterranean (Best: Apr - Jun, Sep - Oct)',
    currency: 'EUR',
    highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Pantheon'],
    topActivities: [
      { id: 'act_r1', title: 'Colosseum & Roman Forum Priority Tour', category: 'Sightseeing', estimatedCost: 32, durationHours: 3 },
      { id: 'act_r2', title: 'Vatican Museums & Sistine Chapel Tour', category: 'Culture', estimatedCost: 28, durationHours: 3.5 },
      { id: 'act_r3', title: 'Trastevere Sunset Pasta & Gelato Crawl', category: 'Food & Dining', estimatedCost: 42, durationHours: 2.5 },
      { id: 'act_r4', title: 'Catacombs & Appian Way E-Bike Tour', category: 'Adventure', estimatedCost: 55, durationHours: 3 }
    ]
  },
  {
    _id: 'city_nyc_04',
    name: 'New York',
    country: 'United States',
    region: 'North America',
    costIndex: '$$$$',
    averageDailyBudget: 230,
    popularityScore: 98,
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    description: 'The vibrant cultural and financial hub that never sleeps, boasting iconic skylines, world-class Broadway theaters, and diverse ethnic neighborhoods.',
    climate: 'Humid Continental (Best: Sep - Nov, Apr - Jun)',
    currency: 'USD',
    highlights: ['Central Park', 'Times Square', 'Empire State Building', 'Statue of Liberty'],
    topActivities: [
      { id: 'act_n1', title: 'Broadway Musical Evening Tickets', category: 'Culture', estimatedCost: 125, durationHours: 3 },
      { id: 'act_n2', title: 'Central Park Scenic Bike & Walking Tour', category: 'Sightseeing', estimatedCost: 28, durationHours: 2 },
      { id: 'act_n3', title: 'Summit One Vanderbilt Glass Skydeck', category: 'Sightseeing', estimatedCost: 46, durationHours: 1.5 },
      { id: 'act_n4', title: 'Brooklyn Bridge & DUMBO Food Exploration', category: 'Food & Dining', estimatedCost: 38, durationHours: 2.5 }
    ]
  },
  {
    _id: 'city_bali_05',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    costIndex: '$',
    averageDailyBudget: 65,
    popularityScore: 94,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'An island paradise famous for lush emerald volcanic mountains, serene Hindu temples, pristine beaches, and spiritual wellness sanctuaries.',
    climate: 'Tropical (Best: May - Sep)',
    currency: 'IDR',
    highlights: ['Ubud Rice Terraces', 'Uluwatu Temple', 'Mount Batur', 'Seminyak Beaches'],
    topActivities: [
      { id: 'act_b1', title: 'Ubud Sacred Monkey Forest Sanctuary', category: 'Sightseeing', estimatedCost: 12, durationHours: 2 },
      { id: 'act_b2', title: 'Tegallalang Rice Terrace Trek & Jungle Swing', category: 'Adventure', estimatedCost: 18, durationHours: 3 },
      { id: 'act_b3', title: 'Uluwatu Sunset Temple & Fire Dance', category: 'Culture', estimatedCost: 22, durationHours: 2.5 },
      { id: 'act_b4', title: 'Mount Batur Sunrise Volcanic Hike & Breakfast', category: 'Adventure', estimatedCost: 45, durationHours: 5 }
    ]
  },
  {
    _id: 'city_barcelona_06',
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    costIndex: '$$',
    averageDailyBudget: 135,
    popularityScore: 96,
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    description: 'A sun-drenched coastal haven renowned for Gaudí architectural wonders, golden Mediterranean beaches, Gothic quarters, and mouthwatering tapas.',
    climate: 'Mediterranean (Best: May - Jul, Sep - Oct)',
    currency: 'EUR',
    highlights: ['Sagrada Família', 'Park Güell', 'Gothic Quarter', 'Barceloneta Beach'],
    topActivities: [
      { id: 'act_bc1', title: 'Sagrada Família Fast-Track Guided Experience', category: 'Culture', estimatedCost: 35, durationHours: 2 },
      { id: 'act_bc2', title: 'Park Güell Gaudí Monumental Zone Walk', category: 'Sightseeing', estimatedCost: 16, durationHours: 2 },
      { id: 'act_bc3', title: 'El Born Tapas & Wine Tasting Tour', category: 'Food & Dining', estimatedCost: 48, durationHours: 2.5 },
      { id: 'act_bc4', title: 'Montserrat Mountain Monastery Half-Day Trip', category: 'Adventure', estimatedCost: 55, durationHours: 5 }
    ]
  },
  {
    _id: 'city_london_07',
    name: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    costIndex: '$$$$',
    averageDailyBudget: 210,
    popularityScore: 97,
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    description: 'A global metropolis steeped in royal heritage, world-class theaters, free national museums, and a cosmopolitan culinary revolution.',
    climate: 'Maritime (Best: May - Sep)',
    currency: 'GBP',
    highlights: ['Big Ben', 'Tower of London', 'British Museum', 'London Eye'],
    topActivities: [
      { id: 'act_l1', title: 'Tower of London & Crown Jewels Tour', category: 'Culture', estimatedCost: 36, durationHours: 2.5 },
      { id: 'act_l2', title: 'West End Musical Theatre Show', category: 'Culture', estimatedCost: 75, durationHours: 2.5 },
      { id: 'act_l3', title: 'Borough Market Street Food Extravaganza', category: 'Food & Dining', estimatedCost: 35, durationHours: 2 },
      { id: 'act_l4', title: 'London Eye Panoramic River Capsule', category: 'Sightseeing', estimatedCost: 40, durationHours: 1 }
    ]
  },
  {
    _id: 'city_dubai_08',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    costIndex: '$$$$',
    averageDailyBudget: 240,
    popularityScore: 95,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    description: 'A futuristic desert wonder of record-breaking architecture, luxury beach resorts, traditional spice souks, and thrilling desert safaris.',
    climate: 'Desert (Best: Nov - Mar)',
    currency: 'AED',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari'],
    topActivities: [
      { id: 'act_d1', title: 'Burj Khalifa 124th Floor Sky Observation Deck', category: 'Sightseeing', estimatedCost: 52, durationHours: 2 },
      { id: 'act_d2', title: 'Red Dunes Desert Safari & BBQ Camp with Stargazing', category: 'Adventure', estimatedCost: 68, durationHours: 6 },
      { id: 'act_d3', title: 'Dubai Marina Luxury Yacht Cruise', category: 'Sightseeing', estimatedCost: 58, durationHours: 2 },
      { id: 'act_d4', title: 'Old Dubai Heritage & Gold Souk Walk', category: 'Culture', estimatedCost: 25, durationHours: 2.5 }
    ]
  },
  {
    _id: 'city_sydney_09',
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    costIndex: '$$$',
    averageDailyBudget: 190,
    popularityScore: 93,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    description: 'A dazzling harbor jewel framed by the iconic Opera House, Bondi surfing shores, emerald botanical gardens, and relaxed coastal lifestyle.',
    climate: 'Temperate (Best: Sep - Nov, Mar - May)',
    currency: 'AUD',
    highlights: ['Sydney Opera House', 'Bondi Beach', 'Harbour Bridge', 'Manly Ferry'],
    topActivities: [
      { id: 'act_s1', title: 'Sydney Opera House Behind-the-Scenes Tour', category: 'Culture', estimatedCost: 35, durationHours: 1.5 },
      { id: 'act_s2', title: 'Bondi to Coogee Coastal Clifftop Walk', category: 'Adventure', estimatedCost: 0, durationHours: 2.5 },
      { id: 'act_s3', title: 'Sydney Harbour Sunset Catamaran Cruise', category: 'Sightseeing', estimatedCost: 65, durationHours: 2 },
      { id: 'act_s4', title: 'Blue Mountains Day Excursion & Scenic Cableway', category: 'Adventure', estimatedCost: 88, durationHours: 8 }
    ]
  },
  {
    _id: 'city_cairo_10',
    name: 'Cairo',
    country: 'Egypt',
    region: 'Africa',
    costIndex: '$',
    averageDailyBudget: 55,
    popularityScore: 91,
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=80',
    description: 'The ancient cradle of civilization where majestic Great Pyramids and the Sphinx meet bustling Nile feluccas and historic Khan el-Khalili bazaar.',
    climate: 'Desert (Best: Oct - Apr)',
    currency: 'EGP',
    highlights: ['Pyramids of Giza', 'Grand Egyptian Museum', 'Nile River', 'Khan el-Khalili'],
    topActivities: [
      { id: 'act_c1', title: 'Giza Pyramids & Sphinx Camel Trek', category: 'Sightseeing', estimatedCost: 30, durationHours: 4 },
      { id: 'act_c2', title: 'Grand Egyptian Museum Guided Discovery', category: 'Culture', estimatedCost: 25, durationHours: 3 },
      { id: 'act_c3', title: 'Traditional Nile Felucca Sunset Sail', category: 'Sightseeing', estimatedCost: 20, durationHours: 1.5 },
      { id: 'act_c4', title: 'Historic Islamic Cairo & Khan el-Khalili Souk', category: 'Culture', estimatedCost: 15, durationHours: 3 }
    ]
  },
  {
    _id: 'city_cape_town_11',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    costIndex: '$$',
    averageDailyBudget: 95,
    popularityScore: 92,
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    description: 'A breathtaking coastal city dominated by Table Mountain, penguin beaches at Boulders Bay, dramatic ocean drives, and acclaimed Winelands.',
    climate: 'Mediterranean (Best: Dec - Mar)',
    currency: 'ZAR',
    highlights: ['Table Mountain', 'Cape of Good Hope', 'Boulders Beach', 'V&A Waterfront'],
    topActivities: [
      { id: 'act_ct1', title: 'Table Mountain Cableway & Summit Hike', category: 'Adventure', estimatedCost: 28, durationHours: 3 },
      { id: 'act_ct2', title: 'Cape Peninsula & Boulders Beach Penguins Tour', category: 'Sightseeing', estimatedCost: 55, durationHours: 7 },
      { id: 'act_ct3', title: 'Stellenbosch Wine Country Tasting Tour', category: 'Food & Dining', estimatedCost: 65, durationHours: 6 },
      { id: 'act_ct4', title: 'Robben Island Historic Ferry & Museum', category: 'Culture', estimatedCost: 30, durationHours: 3.5 }
    ]
  },
  {
    _id: 'city_rio_12',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    region: 'South America',
    costIndex: '$$',
    averageDailyBudget: 85,
    popularityScore: 93,
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
    description: 'The marvelous city blessed with dramatic coastal granite peaks, Christ the Redeemer, legendary Copacabana sands, and pulsating Samba rhythms.',
    climate: 'Tropical (Best: Dec - Mar, May - Oct)',
    currency: 'BRL',
    highlights: ['Christ the Redeemer', 'Sugarloaf Mountain', 'Copacabana Beach', 'Ipanema'],
    topActivities: [
      { id: 'act_rj1', title: 'Corcovado & Christ the Redeemer Train Tour', category: 'Sightseeing', estimatedCost: 32, durationHours: 3 },
      { id: 'act_rj2', title: 'Sugarloaf Mountain Cable Car Sunset', category: 'Sightseeing', estimatedCost: 30, durationHours: 2.5 },
      { id: 'act_rj3', title: 'Santa Teresa Bohemain Neighborhood & Selarón Steps', category: 'Culture', estimatedCost: 18, durationHours: 2 },
      { id: 'act_rj4', title: 'Tijuca National Rainforest Jeep Expedition', category: 'Adventure', estimatedCost: 48, durationHours: 4 }
    ]
  }
];
