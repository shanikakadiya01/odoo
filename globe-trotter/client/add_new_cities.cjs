const fs = require('fs');
const path = require('path');

const cityData = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Goa', state: 'Goa', lat: 15.2993, lng: 74.1240 },
  { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081 },
  { name: 'Udaipur', state: 'Rajasthan', lat: 24.5854, lng: 73.7125 },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { name: 'Rishikesh', state: 'Uttarakhand', lat: 30.0869, lng: 78.2676 },
  { name: 'Hampi', state: 'Karnataka', lat: 15.3350, lng: 76.4600 },
  { name: 'Khajuraho', state: 'Madhya Pradesh', lat: 24.8318, lng: 79.9199 },
  { name: 'Mahabalipuram', state: 'Tamil Nadu', lat: 12.6208, lng: 80.1945 },
  { name: 'Aurangabad', state: 'Maharashtra', lat: 19.8762, lng: 75.3433 },
  { name: 'Mysuru', state: 'Karnataka', lat: 12.2958, lng: 76.6394 },
  { name: 'Amritsar', state: 'Punjab', lat: 31.6340, lng: 74.8723 },
  { name: 'Bodh Gaya', state: 'Bihar', lat: 24.6959, lng: 84.9914 },
  { name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198 },
  { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
  { name: 'Manali', state: 'Himachal Pradesh', lat: 32.2396, lng: 77.1887 },
  { name: 'Darjeeling', state: 'West Bengal', lat: 27.0410, lng: 88.2663 },
  { name: 'Pondicherry', state: 'Puducherry', lat: 11.9416, lng: 79.8083 },
  { name: 'Leh', state: 'Ladakh', lat: 34.1526, lng: 77.5771 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 }
];

async function fetchWikiImage(title) {
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1200`);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch (e) {}
  return `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80`;
}

async function run() {
  const newCities = [];
  let idCounter = 40;
  
  for (const c of cityData) {
    let wikiTitle = c.name;
    if (wikiTitle === 'Bengaluru') wikiTitle = 'Bangalore';
    if (wikiTitle === 'Mysuru') wikiTitle = 'Mysore';
    
    let imageUrl = await fetchWikiImage(wikiTitle);
    
    newCities.push({
      _id: `city_${c.name.toLowerCase().replace(/\s+/g, '')}_${idCounter++}`,
      name: c.name,
      state: c.state,
      country: 'India',
      region: 'India',
      coordinates: {
        lat: c.lat,
        lng: c.lng
      },
      costIndex: '$',
      averageDailyBudget: 40,
      popularityScore: 85,
      imageUrl: imageUrl,
      description: `Experience the vibrant culture and stunning landscapes of ${c.name}, ${c.state}.`,
      climate: 'Tropical',
      currency: 'INR',
      highlights: ['Local Markets', 'Historical Monuments', 'Cultural Hubs'],
      topActivities: [
        { id: `act_${c.name.substring(0,3).toLowerCase()}1`, title: `${c.name} Heritage Tour`, category: 'Culture', estimatedCost: 15, durationHours: 3 }
      ]
    });
  }

  const apiPath = path.join(__dirname, 'src', 'services', 'api.js');
  let content = fs.readFileSync(apiPath, 'utf8');

  // Replace cache keys to _v6 to force refresh
  content = content.replace(/gt_cached_cities_v5/g, 'gt_cached_cities_v6');
  content = content.replace(/gt_cached_cities_v4/g, 'gt_cached_cities_v6');
  content = content.replace(/gt_cached_cities_v3/g, 'gt_cached_cities_v6');
  
  content = content.replace(/gt_local_trips_v5/g, 'gt_local_trips_v6');
  content = content.replace(/gt_local_trips_v4/g, 'gt_local_trips_v6');
  content = content.replace(/gt_local_trips_v3/g, 'gt_local_trips_v6');

  // We need to inject these cities into getDefaultCities array
  // We'll replace the closing bracket
  const parts = content.split('  ];\n}');
  if (parts.length > 1) {
    const start = parts.slice(0, -1).join('  ];\n}');
    const end = parts[parts.length - 1];
    
    const stringToAppend = ',\n' + newCities.map(c => '    ' + JSON.stringify(c, null, 2).replace(/\n/g, '\n    ')).join(',\n') + '\n  ];\n}';
    
    fs.writeFileSync(apiPath, start + stringToAppend + end);
    console.log('Successfully updated api.js with new cities');
  } else {
    // Regex fallback
    content = content.replace(/\s*\];\s*}\s*$/, ',\n' + newCities.map(c => '    ' + JSON.stringify(c, null, 2).replace(/\n/g, '\n    ')).join(',\n') + '\n  ];\n}\n');
    fs.writeFileSync(apiPath, content);
    console.log('Successfully updated api.js using regex fallback');
  }
}

run();
