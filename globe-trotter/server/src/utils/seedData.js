export const sampleCities = [
  {
    _id: 'city_paris_01',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    costTier: '$$$',
    costIndex: '$$$',
    averageDailyBudget: 180,
    popularityScore: 98,
    matchPercent: 98,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Light dazzles with world-class art museums, iconic architecture, vibrant bistros, and romantic riverside promenades along the Seine.',
    climate: 'Temperate (Best: May - Oct)',
    currency: 'EUR',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Montmartre', 'Notre-Dame'],
    topHighlights: [
      'Eiffel Tower Sunset Summit Tour',
      'Louvre Museum Masterpieces Guided Walk'
    ],
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
    costTier: '$$$',
    costIndex: '$$$',
    averageDailyBudget: 160,
    popularityScore: 97,
    matchPercent: 97,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    description: 'An electrifying metropolis where neon-lit futuristic skyscrapers seamlessly blend with historic temples, cutting-edge cuisine, and tranquil gardens.',
    climate: 'Subtropical (Best: Mar - May, Oct - Nov)',
    currency: 'JPY',
    highlights: ['Shibuya Crossing', 'Sensō-ji Temple', 'Akihabara', 'Tsukiji Market'],
    topHighlights: [
      'Shibuya Crossing & Harajuku Hidden Alleyways',
      'Tsukiji Outer Market Culinary Tasting Experience'
    ],
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
    costTier: '$$',
    costIndex: '$$',
    averageDailyBudget: 140,
    popularityScore: 95,
    matchPercent: 95,
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    description: 'The Eternal City is an open-air museum filled with ancient Roman ruins, Renaissance masterpieces, bustling piazzas, and authentic trattorias.',
    climate: 'Mediterranean (Best: Apr - Jun, Sep - Oct)',
    currency: 'EUR',
    highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Pantheon'],
    topHighlights: [
      'Colosseum & Roman Forum Priority Tour',
      'Trastevere Sunset Pasta & Gelato Crawl'
    ],
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
    costTier: '$$$$',
    costIndex: '$$$$',
    averageDailyBudget: 230,
    popularityScore: 98,
    matchPercent: 98,
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    description: 'The vibrant cultural and financial hub that never sleeps, boasting iconic skylines, world-class Broadway theaters, and diverse ethnic neighborhoods.',
    climate: 'Humid Continental (Best: Sep - Nov, Apr - Jun)',
    currency: 'USD',
    highlights: ['Central Park', 'Times Square', 'Empire State Building', 'Statue of Liberty'],
    topHighlights: [
      'Broadway Musical Evening Tickets',
      'Central Park Scenic Bike & Walking Tour'
    ],
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
    costTier: '$',
    costIndex: '$',
    averageDailyBudget: 65,
    popularityScore: 94,
    matchPercent: 94,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'An island paradise famous for lush emerald volcanic mountains, serene Hindu temples, pristine beaches, and spiritual wellness sanctuaries.',
    climate: 'Tropical (Best: May - Sep)',
    currency: 'IDR',
    highlights: ['Ubud Rice Terraces', 'Uluwatu Temple', 'Mount Batur', 'Seminyak Beaches'],
    topHighlights: [
      'Ubud Sacred Monkey Forest Sanctuary',
      'Tegallalang Rice Terrace Trek & Jungle Swing'
    ],
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
    costTier: '$$',
    costIndex: '$$',
    averageDailyBudget: 135,
    popularityScore: 96,
    matchPercent: 96,
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    description: 'A sun-drenched coastal haven renowned for Gaudí architectural wonders, golden Mediterranean beaches, Gothic quarters, and mouthwatering tapas.',
    climate: 'Mediterranean (Best: May - Jul, Sep - Oct)',
    currency: 'EUR',
    highlights: ['Sagrada Família', 'Park Güell', 'Gothic Quarter', 'Barceloneta Beach'],
    topHighlights: [
      'Sagrada Família Fast-Track Guided Experience',
      'El Born Tapas & Wine Tasting Tour'
    ],
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
    costTier: '$$$$',
    costIndex: '$$$$',
    averageDailyBudget: 210,
    popularityScore: 97,
    matchPercent: 97,
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    description: 'A global metropolis steeped in royal heritage, world-class theaters, free national museums, and a cosmopolitan culinary revolution.',
    climate: 'Maritime (Best: May - Sep)',
    currency: 'GBP',
    highlights: ['Big Ben', 'Tower of London', 'British Museum', 'London Eye'],
    topHighlights: [
      'Tower of London & Crown Jewels Tour',
      'West End Musical Theatre Show'
    ],
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
    costTier: '$$$$',
    costIndex: '$$$$',
    averageDailyBudget: 240,
    popularityScore: 95,
    matchPercent: 95,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    description: 'A futuristic desert wonder of record-breaking architecture, luxury beach resorts, traditional spice souks, and thrilling desert safaris.',
    climate: 'Desert (Best: Nov - Mar)',
    currency: 'AED',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari'],
    topHighlights: [
      'Burj Khalifa 124th Floor Sky Observation Deck',
      'Red Dunes Desert Safari & BBQ Camp with Stargazing'
    ],
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
    costTier: '$$$',
    costIndex: '$$$',
    averageDailyBudget: 190,
    popularityScore: 93,
    matchPercent: 93,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    description: 'A dazzling harbor jewel framed by the iconic Opera House, Bondi surfing shores, emerald botanical gardens, and relaxed coastal lifestyle.',
    climate: 'Temperate (Best: Sep - Nov, Mar - May)',
    currency: 'AUD',
    highlights: ['Sydney Opera House', 'Bondi Beach', 'Harbour Bridge', 'Manly Ferry'],
    topHighlights: [
      'Sydney Opera House Behind-the-Scenes Tour',
      'Bondi to Coogee Coastal Clifftop Walk'
    ],
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
    costTier: '$',
    costIndex: '$',
    averageDailyBudget: 55,
    popularityScore: 91,
    matchPercent: 91,
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=80',
    description: 'The ancient cradle of civilization where majestic Great Pyramids and the Sphinx meet bustling Nile feluccas and historic Khan el-Khalili bazaar.',
    climate: 'Desert (Best: Oct - Apr)',
    currency: 'EGP',
    highlights: ['Pyramids of Giza', 'Grand Egyptian Museum', 'Nile River', 'Khan el-Khalili'],
    topHighlights: [
      'Giza Pyramids & Sphinx Camel Trek',
      'Grand Egyptian Museum Guided Discovery'
    ],
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
    costTier: '$$',
    costIndex: '$$',
    averageDailyBudget: 95,
    popularityScore: 92,
    matchPercent: 92,
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    description: 'A breathtaking coastal city dominated by Table Mountain, penguin beaches at Boulders Bay, dramatic ocean drives, and acclaimed Winelands.',
    climate: 'Mediterranean (Best: Dec - Mar)',
    currency: 'ZAR',
    highlights: ['Table Mountain', 'Cape of Good Hope', 'Boulders Beach', 'V&A Waterfront'],
    topHighlights: [
      'Table Mountain Cableway & Summit Hike',
      'Cape Peninsula & Boulders Beach Penguins Tour'
    ],
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
    costTier: '$$',
    costIndex: '$$',
    averageDailyBudget: 85,
    popularityScore: 93,
    matchPercent: 93,
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
    description: 'The marvelous city blessed with dramatic coastal granite peaks, Christ the Redeemer, legendary Copacabana sands, and pulsating Samba rhythms.',
    climate: 'Tropical (Best: Dec - Mar, May - Oct)',
    currency: 'BRL',
    highlights: ['Christ the Redeemer', 'Sugarloaf Mountain', 'Copacabana Beach', 'Ipanema'],
    topHighlights: [
      'Corcovado & Christ the Redeemer Train Tour',
      'Sugarloaf Mountain Cable Car Sunset'
    ],
    topActivities: [
      { id: 'act_rj1', title: 'Corcovado & Christ the Redeemer Train Tour', category: 'Sightseeing', estimatedCost: 32, durationHours: 3 },
      { id: 'act_rj2', title: 'Sugarloaf Mountain Cable Car Sunset', category: 'Sightseeing', estimatedCost: 30, durationHours: 2.5 },
      { id: 'act_rj3', title: 'Santa Teresa Bohemain Neighborhood & Selarón Steps', category: 'Culture', estimatedCost: 18, durationHours: 2 },
      { id: 'act_rj4', title: 'Tijuca National Rainforest Jeep Expedition', category: 'Adventure', estimatedCost: 48, durationHours: 4 }
    ]
  },
  {
    _id: 'city_delhi_13',
    name: 'Delhi',
    country: 'India',
    region: 'Asia',
    costTier: '$',
    costIndex: '$',
    avgPerDay: '₹3,758',
    averageDailyBudget: 45,
    popularityScore: 94,
    matchPercent: 94,
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    description: 'India’s historic capital where majestic Mughal monuments, bustling heritage bazaars, and mouthwatering culinary traditions converge with a vibrant modern metropolis.',
    climate: 'Semi-arid (Best: Oct - Mar)',
    currency: 'INR',
    highlights: ['Red Fort', 'India Gate', 'Qutub Minar', 'Chandni Chowk'],
    topHighlights: [
      'Old Delhi Heritage Walk & Rickshaw Ride',
      'Chandni Chowk Street Food & Spice Tasting'
    ],
    topActivities: [
      { id: 'act_del1', title: 'Old Delhi Heritage Walk & Rickshaw Ride', category: 'Culture', estimatedCost: 15, durationHours: 3 },
      { id: 'act_del2', title: 'Chandni Chowk Street Food & Spice Tasting', category: 'Food & Dining', estimatedCost: 20, durationHours: 2.5 },
      { id: 'act_del3', title: 'Qutub Minar & Mughal Monuments Guided Tour', category: 'Sightseeing', estimatedCost: 12, durationHours: 3 },
      { id: 'act_del4', title: 'Akshardham Temple Evening Light & Water Show', category: 'Culture', estimatedCost: 10, durationHours: 2.5 }
    ]
  },
  {
    _id: 'city_mumbai_14',
    name: 'Mumbai',
    country: 'India',
    region: 'Asia',
    costTier: '$$',
    costIndex: '$$',
    avgPerDay: '₹4,843',
    averageDailyBudget: 58,
    popularityScore: 96,
    matchPercent: 96,
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    description: 'The bustling financial and entertainment capital of India, famous for Victorian Gothic architecture, Arabian Sea promenades, Bollywood, and legendary coastal street food.',
    climate: 'Tropical (Best: Nov - Feb)',
    currency: 'INR',
    highlights: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Chhatrapati Shivaji Terminus'],
    topHighlights: [
      'Gateway of India & Colaba Heritage Promenade',
      'Marine Drive Sunset Walk & Street Chaat Trail'
    ],
    topActivities: [
      { id: 'act_mum1', title: 'Gateway of India & Colaba Heritage Promenade', category: 'Sightseeing', estimatedCost: 14, durationHours: 2.5 },
      { id: 'act_mum2', title: 'Marine Drive Sunset Walk & Street Chaat Trail', category: 'Food & Dining', estimatedCost: 16, durationHours: 2 },
      { id: 'act_mum3', title: 'Elephanta Caves Island Boat Excursion', category: 'Culture', estimatedCost: 22, durationHours: 4 },
      { id: 'act_mum4', title: 'Dharavi Artisans & Textile Industry Tour', category: 'Culture', estimatedCost: 18, durationHours: 2.5 }
    ]
  },
  {
    _id: 'city_jaipur_15',
    name: 'Jaipur',
    country: 'India',
    region: 'Asia',
    costTier: '$',
    costIndex: '$',
    avgPerDay: '₹3,173',
    averageDailyBudget: 38,
    popularityScore: 93,
    matchPercent: 93,
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'The Pink City of Rajasthan, renowned for its grand royal palaces, terracotta-hued avenues, astronomical observatories, and vibrant handicraft bazaars.',
    climate: 'Semi-arid (Best: Oct - Mar)',
    currency: 'INR',
    highlights: ['Hawa Mahal', 'Amber Fort', 'City Palace', 'Jantar Mantar'],
    topHighlights: [
      'Amber Fort Hilltop Palace & Mirror Gallery',
      'Hawa Mahal & Johari Bazaar Gem Shopping'
    ],
    topActivities: [
      { id: 'act_jai1', title: 'Amber Fort Hilltop Palace & Mirror Gallery', category: 'Sightseeing', estimatedCost: 16, durationHours: 3.5 },
      { id: 'act_jai2', title: 'Hawa Mahal & Johari Bazaar Gem Shopping', category: 'Culture', estimatedCost: 12, durationHours: 2.5 },
      { id: 'act_jai3', title: 'Nahargarh Fort Sunset Viewpoint Experience', category: 'Adventure', estimatedCost: 10, durationHours: 2 },
      { id: 'act_jai4', title: 'Rajasthani Royal Thali Culinary Dinner', category: 'Food & Dining', estimatedCost: 20, durationHours: 2 }
    ]
  },
  {
    _id: 'city_goa_16',
    name: 'Goa',
    country: 'India',
    region: 'Asia',
    costTier: '$$',
    costIndex: '$$',
    avgPerDay: '₹4,342',
    averageDailyBudget: 52,
    popularityScore: 95,
    matchPercent: 95,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'India’s premier coastal paradise boasting golden Arabian Sea shores, Portuguese colonial heritage, lively beach shacks, and lush spice plantations.',
    climate: 'Tropical Monsoon (Best: Nov - Mar)',
    currency: 'INR',
    highlights: ['Palolem Beach', 'Basilica of Bom Jesus', 'Dudhsagar Waterfalls', 'Fontainhas Latin Quarter'],
    topHighlights: [
      'Palolem Beach Kayaking & Sunset Dolphin Cruise',
      'Old Goa Portuguese Cathedrals & Spice Plantation Tour'
    ],
    topActivities: [
      { id: 'act_goa1', title: 'Palolem Beach Kayaking & Sunset Dolphin Cruise', category: 'Adventure', estimatedCost: 24, durationHours: 3 },
      { id: 'act_goa2', title: 'Old Goa Portuguese Cathedrals & Spice Plantation Tour', category: 'Culture', estimatedCost: 28, durationHours: 4 },
      { id: 'act_goa3', title: 'Dudhsagar Waterfalls Jeep Jungle Safari', category: 'Adventure', estimatedCost: 35, durationHours: 6 },
      { id: 'act_goa4', title: 'Fontainhas Heritage Walk & Goan Seafood Feast', category: 'Food & Dining', estimatedCost: 22, durationHours: 2.5 }
    ]
  },
  {
    _id: 'city_agra_17',
    name: 'Agra',
    country: 'India',
    region: 'Asia',
    costTier: '$',
    costIndex: '$',
    avgPerDay: '₹2,839',
    averageDailyBudget: 34,
    popularityScore: 92,
    matchPercent: 92,
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'Home to the world-renowned white marble Taj Mahal, showcasing exquisite Mughal architectural grandeur, royal palaces, and historic river gardens.',
    climate: 'Semi-arid (Best: Oct - Mar)',
    currency: 'INR',
    highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'],
    topHighlights: [
      'Taj Mahal Sunrise Guided Photography Tour',
      'Agra Fort Mughal Palaces & Mehtab Bagh Sunset'
    ],
    topActivities: [
      { id: 'act_agr1', title: 'Taj Mahal Sunrise Guided Photography Tour', category: 'Sightseeing', estimatedCost: 20, durationHours: 3 },
      { id: 'act_agr2', title: 'Agra Fort Mughal Palaces & Mehtab Bagh Sunset', category: 'Culture', estimatedCost: 15, durationHours: 3 },
      { id: 'act_agr3', title: 'Fatehpur Sikri Ghost City Day Excursion', category: 'Culture', estimatedCost: 18, durationHours: 4 },
      { id: 'act_agr4', title: 'Mughlai Cuisine & Petha Tasting Trail', category: 'Food & Dining', estimatedCost: 14, durationHours: 2 }
    ]
  },
  {
    _id: 'city_udaipur_18',
    name: 'Udaipur',
    country: 'India',
    region: 'Asia',
    costTier: '$$',
    costIndex: '$$',
    avgPerDay: '₹4,008',
    averageDailyBudget: 48,
    popularityScore: 91,
    matchPercent: 91,
    imageUrl: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
    description: 'The fairytale City of Lakes framed by the Aravalli hills, celebrated for floating marble palaces, royal courtyards, and tranquil sunsets over Lake Pichola.',
    climate: 'Semi-arid (Best: Sep - Mar)',
    currency: 'INR',
    highlights: ['Lake Pichola', 'City Palace', 'Jag Mandir', 'Saheliyon-ki-Bari'],
    topHighlights: [
      'Lake Pichola Luxury Boat Cruise to Jag Mandir',
      'City Palace Royal Courtyards & Heritage Museum'
    ],
    topActivities: [
      { id: 'act_uda1', title: 'Lake Pichola Luxury Boat Cruise to Jag Mandir', category: 'Sightseeing', estimatedCost: 22, durationHours: 2 },
      { id: 'act_uda2', title: 'City Palace Royal Courtyards & Heritage Museum', category: 'Culture', estimatedCost: 16, durationHours: 3 },
      { id: 'act_uda3', title: 'Bagore Ki Haveli Evening Folk Dance Performance', category: 'Culture', estimatedCost: 10, durationHours: 1.5 },
      { id: 'act_uda4', title: 'Monsoon Palace Sunset Clifftop Viewpoint', category: 'Adventure', estimatedCost: 12, durationHours: 2 }
    ]
  },
  {
    _id: 'city_varanasi_19',
    name: 'Varanasi',
    country: 'India',
    region: 'Asia',
    costTier: '$',
    costIndex: '$',
    avgPerDay: '₹2,505',
    averageDailyBudget: 30,
    popularityScore: 90,
    matchPercent: 90,
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'One of the world’s oldest continually inhabited cities and the spiritual heart of India, famed for sacred river ghats and mystical evening aarti ceremonies.',
    climate: 'Humid Subtropical (Best: Oct - Mar)',
    currency: 'INR',
    highlights: ['Kashi Vishwanath Temple', 'Dashashwamedh Ghat', 'Sarnath', 'Assi Ghat'],
    topHighlights: [
      'Dashashwamedh Ghat Evening Ganga Aarti Ceremony',
      'Sunrise Boat Ride Along Historic Holy Ghats'
    ],
    topActivities: [
      { id: 'act_var1', title: 'Dashashwamedh Ghat Evening Ganga Aarti Ceremony', category: 'Culture', estimatedCost: 8, durationHours: 2 },
      { id: 'act_var2', title: 'Sunrise Boat Ride Along Historic Holy Ghats', category: 'Sightseeing', estimatedCost: 12, durationHours: 2 },
      { id: 'act_var3', title: 'Sarnath Buddhist Stupa & Museum Pilgrimage', category: 'Culture', estimatedCost: 14, durationHours: 3.5 },
      { id: 'act_var4', title: 'Ancient Alleyways & Banarasi Chaat Tasting', category: 'Food & Dining', estimatedCost: 10, durationHours: 2 }
    ]
  },
  {
    _id: 'city_kerala_20',
    name: 'Kerala (Kochi/Backwaters)',
    country: 'India',
    region: 'Asia',
    costTier: '$$',
    costIndex: '$$',
    avgPerDay: '₹3,841',
    averageDailyBudget: 46,
    popularityScore: 94,
    matchPercent: 94,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'God’s Own Country, famed for tranquil labyrinthine backwaters, traditional houseboats, emerald spice hills, and colonial port heritage in Fort Kochi.',
    climate: 'Tropical (Best: Sep - Mar)',
    currency: 'INR',
    highlights: ['Alleppey Backwaters', 'Fort Kochi', 'Munnar Tea Hills', 'Mattancherry Palace'],
    topHighlights: [
      'Alleppey Traditional Houseboat Backwater Cruise',
      'Fort Kochi Chinese Fishing Nets & Kathakali Show'
    ],
    topActivities: [
      { id: 'act_ker1', title: 'Alleppey Traditional Houseboat Backwater Cruise', category: 'Adventure', estimatedCost: 38, durationHours: 5 },
      { id: 'act_ker2', title: 'Fort Kochi Chinese Fishing Nets & Kathakali Show', category: 'Culture', estimatedCost: 18, durationHours: 3 },
      { id: 'act_ker3', title: 'Munnar High-Altitude Tea Estate Tour', category: 'Sightseeing', estimatedCost: 25, durationHours: 4 },
      { id: 'act_ker4', title: 'Traditional Ayurvedic Massage & Wellness Session', category: 'Culture', estimatedCost: 32, durationHours: 1.5 }
    ]
  },
  {
    _id: 'city_rishikesh_21',
    name: 'Rishikesh',
    country: 'India',
    region: 'Asia',
    costTier: '$',
    costIndex: '$',
    avgPerDay: '₹2,672',
    averageDailyBudget: 32,
    popularityScore: 89,
    matchPercent: 89,
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f444f4d7?auto=format&fit=crop&w=1200&q=80',
    description: 'The Yoga Capital of the World nestled in Himalayan foothills along the crystal-clear emerald Ganges, celebrated for yoga, meditation, and rafting.',
    climate: 'Subtropical Highland (Best: Sep - Apr)',
    currency: 'INR',
    highlights: ['Laxman Jhula', 'Triveni Ghat', 'Beatles Ashram', 'Neer Garh Waterfall'],
    topHighlights: [
      'White Water River Rafting on the Holy Ganges',
      'Triveni Ghat Evening Aarti & Beatles Ashram Meditation'
    ],
    topActivities: [
      { id: 'act_rish1', title: 'White Water River Rafting on the Holy Ganges', category: 'Adventure', estimatedCost: 20, durationHours: 3 },
      { id: 'act_rish2', title: 'Triveni Ghat Evening Aarti & Beatles Ashram Meditation', category: 'Culture', estimatedCost: 10, durationHours: 2.5 },
      { id: 'act_rish3', title: 'Neer Garh Waterfall Forest Hike & Dip', category: 'Adventure', estimatedCost: 8, durationHours: 2.5 },
      { id: 'act_rish4', title: 'Sunrise Yoga & Ganga Beach Sound Healing', category: 'Culture', estimatedCost: 15, durationHours: 1.5 }
    ]
  },
  {
    _id: 'city_amritsar_22',
    name: 'Amritsar',
    country: 'India',
    region: 'Asia',
    costTier: '$',
    costIndex: '$',
    avgPerDay: '₹2,338',
    averageDailyBudget: 28,
    popularityScore: 88,
    matchPercent: 88,
    imageUrl: 'https://images.unsplash.com/photo-1588096344356-9b596206013a?auto=format&fit=crop&w=1200&q=80',
    description: 'The spiritual center of Sikhism, revered worldwide for the resplendent Golden Temple (Harmandir Sahib), patriotic Wagah Border ceremony, and rich Punjabi cuisine.',
    climate: 'Semi-arid (Best: Oct - Mar)',
    currency: 'INR',
    highlights: ['Golden Temple', 'Wagah Border', 'Jallianwala Bagh', 'Partition Museum'],
    topHighlights: [
      'Golden Temple Spiritual Evening Visit & Langar Experience',
      'Wagah Border Beating Retreat Ceremony Tour'
    ],
    topActivities: [
      { id: 'act_amr1', title: 'Golden Temple Spiritual Evening Visit & Langar Experience', category: 'Culture', estimatedCost: 5, durationHours: 3 },
      { id: 'act_amr2', title: 'Wagah Border Beating Retreat Ceremony Tour', category: 'Sightseeing', estimatedCost: 16, durationHours: 4 },
      { id: 'act_amr3', title: 'Jallianwala Bagh & Partition Museum Guided Tour', category: 'Culture', estimatedCost: 8, durationHours: 2.5 },
      { id: 'act_amr4', title: 'Authentic Amritsari Kulcha & Lassi Food Walk', category: 'Food & Dining', estimatedCost: 10, durationHours: 2 }
    ]
  }
];
