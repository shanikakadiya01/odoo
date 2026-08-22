const fs = require('fs');
const path = require('path');

const cities = [
  'Mumbai', 'Bengaluru', 'Jaipur', 'Goa', 'Agra', 'Udaipur', 'Kochi', 'Varanasi',
  'Rishikesh', 'Hampi', 'Khajuraho', 'Mahabalipuram', 'Aurangabad', 'Mysuru',
  'Amritsar', 'Bodh Gaya', 'Madurai', 'Shimla', 'Manali', 'Darjeeling',
  'Pondicherry', 'Leh', 'Kolkata'
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
  } catch (e) {
    console.error(`Failed to fetch image for ${title}`);
  }
  return `https://source.unsplash.com/1200x800/?${encodeURIComponent(title)},india`; // fallback
}

async function run() {
  const newCities = [];
  let idCounter = 16;
  
  for (const city of cities) {
    console.log(`Processing ${city}...`);
    // 'Goa' is a state, Wikipedia might have 'Goa'
    let wikiTitle = city;
    if (city === 'Mysuru') wikiTitle = 'Mysore';
    
    const imageUrl = await fetchWikiImage(wikiTitle);
    
    newCities.push({
      _id: `city_${city.toLowerCase()}_${idCounter++}`,
      name: city,
      country: 'India',
      region: 'Asia',
      costIndex: '$',
      averageDailyBudget: 40,
      popularityScore: 80,
      imageUrl: imageUrl,
      description: `Experience the vibrant culture, rich history, and stunning landscapes of ${city}, one of India's most fascinating destinations.`,
      climate: 'Tropical (Best: Oct - Mar)',
      currency: 'INR',
      highlights: ['Local Markets', 'Historical Monuments', 'Cultural Hubs', 'Famous Eateries'],
      topActivities: [
        { id: `act_${city.substring(0,3).toLowerCase()}1`, title: `${city} Heritage Tour`, category: 'Culture', estimatedCost: 15, durationHours: 3 },
        { id: `act_${city.substring(0,3).toLowerCase()}2`, title: `Taste of ${city} Food Walk`, category: 'Food & Dining', estimatedCost: 12, durationHours: 2 }
      ]
    });
  }

  // Update Delhi and Ahmedabad URLs
  const delhiUrl = await fetchWikiImage('Delhi');
  const ahmedabadUrl = await fetchWikiImage('Ahmedabad');

  const apiPath = path.join(__dirname, 'src', 'services', 'api.js');
  let content = fs.readFileSync(apiPath, 'utf8');

  // Replace cache keys
  content = content.replace(/gt_cached_cities_v4/g, 'gt_cached_cities_v5');
  content = content.replace(/gt_local_trips_v4/g, 'gt_local_trips_v5');

  // Update Delhi Image
  content = content.replace(/imageUrl: 'https:\/\/images\.unsplash\.com\/photo-1587474260584-136574528ed5\?auto=format&fit=crop&w=1200&q=80',/g, `imageUrl: '${delhiUrl}',`);
  
  // Update Ahmedabad Image
  content = content.replace(/imageUrl: 'https:\/\/images\.unsplash\.com\/photo-1627885741300-344c207904b7\?auto=format&fit=crop&w=1200&q=80',/g, `imageUrl: '${ahmedabadUrl}',`);

  // Remove the trailing `  ];\n}`
  const ending = "  ];\n}";
  const index = content.lastIndexOf(ending);
  if (index !== -1) {
    const start = content.slice(0, index);
    const newCitiesStr = newCities.map(c => JSON.stringify(c, null, 2)).join(',\n    ');
    content = start + '    },\n    ' + newCitiesStr + '\n' + ending + content.slice(index + ending.length);
  } else {
    console.error("Could not find the end of the cities array!");
  }

  fs.writeFileSync(apiPath, content);
  console.log('Done modifying api.js');
}

run();
