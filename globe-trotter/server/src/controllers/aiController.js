
export const getTravelSuggestions = async (req, res) => {
  try {
    const { destination, budget, travelStyle, durationDays } = req.body;
    
    // Smart heuristic travel advice engine
    const suggestions = {
      overview: `Personalized ${durationDays || 5}-day itinerary for ${destination || 'Global Adventure'} tailored for a ${travelStyle || 'Balanced'} journey.`,
      recommendedPace: durationDays > 7 ? 'Relaxed & Immersive' : 'Action-Packed High Energy',
      dailyBudgetEstimate: budget ? Math.round(budget / (durationDays || 5)) : 150,
      mustDoHighlights: [
        'Sunrise exploration at top landmark to beat crowds',
        'Local culinary immersion in authentic historic district',
        'Scenic sunset viewpoint with panoramic photo ops',
        'Cultural walking tour guided by resident storytellers'
      ],
      packingRecommendations: [
        { item: 'Universal Travel Adapter with USB-C PD', category: 'Electronics', essential: true },
        { item: 'Comfortable Waterproof Walking Shoes', category: 'Clothing', essential: true },
        { item: 'RFID-blocking Passport & Card Wallet', category: 'Security', essential: true },
        { item: 'Portable Power Bank (10,000mAh+)', category: 'Electronics', essential: true },
        { item: 'Lightweight Weather-Resistant Windbreaker', category: 'Clothing', essential: false },
        { item: 'Compact Quick-Dry Microfiber Towel', category: 'Gear', essential: false },
        { item: 'Personal First-Aid & Electrolyte Packets', category: 'Health', essential: true }
      ],
      budgetSavingTips: [
        'Purchase regional transit tourist passes for unlimited subway and bus rides',
        'Book museum & landmark tickets online in advance to bypass surge pricing',
        'Enjoy main hot meals during lunch set menu specials at authentic bistros'
      ]
    };

    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate travel suggestions' });
  }
};
