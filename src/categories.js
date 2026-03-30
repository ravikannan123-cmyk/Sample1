export const CATEGORIES = [
  'Mortgage Payment',
  'Groceries',
  'Restaurants',
  'Travel',
  'Utilities',
  'Car Maintenance',
];

// Keyword rules for auto-categorization
// Each rule: { keywords: [...], category }
// Keywords are matched case-insensitively against the transaction description
const RULES = [
  {
    category: 'Mortgage Payment',
    keywords: [
      'mortgage', 'home loan', 'homeloan', 'housing loan',
      'wells fargo home', 'chase mortgage', 'bank of america mortgage',
      'quicken loans', 'rocket mortgage', 'pennymac', 'loancare',
      'mr. cooper', 'mrcooper', 'nationstar', 'caliber home',
    ],
  },
  {
    category: 'Groceries',
    keywords: [
      'kroger', 'safeway', 'publix', 'whole foods', 'trader joe',
      'aldi', 'costco', 'sam\'s club', 'walmart grocery', 'walmart supercenter',
      'target grocery', 'h-e-b', 'heb', 'food lion', 'giant food',
      'stop & shop', 'stop and shop', 'meijer', 'sprouts', 'fresh market',
      'wegmans', 'winn-dixie', 'winndixie', 'harris teeter', 'market basket',
      'smart & final', 'smart and final', 'grocery', 'supermarket', 'super market',
      'fresh thyme', 'natural grocers', 'piggly wiggly', 'ingles market',
      'food 4 less', 'save a lot', 'lidl', 'shoprite', 'acme market',
    ],
  },
  {
    category: 'Restaurants',
    keywords: [
      'mcdonald', 'burger king', 'wendy\'s', 'wendys', 'taco bell',
      'chick-fil-a', 'chickfila', 'subway', 'domino\'s', 'dominoes',
      'pizza hut', 'papa john', 'chipotle', 'panera', 'starbucks',
      'dunkin', 'dunkin donuts', 'tim horton', 'popeyes', 'kfc',
      'olive garden', 'applebee', 'chili\'s', 'chilies', 'ihop',
      'denny\'s', 'dennys', 'waffle house', 'red lobster', 'outback',
      'longhorn steakhouse', 'texas roadhouse', 'cracker barrel',
      'panda express', 'five guys', 'in-n-out', 'shake shack',
      'whataburger', 'jack in the box', 'sonic drive', 'dairy queen',
      'doordash', 'ubereats', 'uber eats', 'grubhub', 'postmates',
      'seamless', 'instacart restaurant', 'restaurant', 'eatery',
      'diner', 'bistro', 'steakhouse', 'sushi', 'ramen', 'noodle',
      'thai kitchen', 'pho', 'taqueria', 'trattoria', 'pizzeria',
      'cafe', 'bakery', 'deli',
    ],
  },
  {
    category: 'Travel',
    keywords: [
      'delta air', 'united airlines', 'american airlines', 'southwest airlines',
      'jetblue', 'alaska airlines', 'spirit airlines', 'frontier airlines',
      'air canada', 'british airways', 'lufthansa', 'emirates',
      'expedia', 'hotels.com', 'booking.com', 'airbnb', 'vrbo',
      'marriott', 'hilton', 'hyatt', 'ihg', 'holiday inn', 'hampton inn',
      'best western', 'motel 6', 'courtyard', 'sheraton', 'westin',
      'hertz', 'enterprise rent', 'avis', 'budget rent', 'national car',
      'dollar rent', 'thrifty car', 'alamo rent',
      'uber', 'lyft', 'taxi', 'amtrak', 'greyhound',
      'tripadvisor', 'kayak', 'priceline', 'travelocity',
      'airport', 'airlines', 'airline', 'hotel', 'resort', 'motel',
      'toll', 'parking', 'transit',
    ],
  },
  {
    category: 'Utilities',
    keywords: [
      'at&t', 'att bill', 'verizon', 't-mobile', 'tmobile', 'sprint',
      'comcast', 'xfinity', 'spectrum', 'cox communication', 'cox cable',
      'directv', 'dish network',
      'electric', 'electricity', 'pge', 'pg&e', 'duke energy', 'dominion energy',
      'con edison', 'conedison', 'national grid', 'entergy', 'fpl',
      'water bill', 'water service', 'sewer', 'natural gas', 'gas bill',
      'atmos energy', 'nicor gas', 'laclede gas', 'piedmont natural gas',
      'waste management', 'republic services', 'trash', 'garbage',
      'internet', 'broadband', 'wifi', 'cable bill',
      'phone bill', 'wireless bill', 'utility', 'utilities',
      'netflix', 'hulu', 'disney+', 'disneyplus', 'hbo max', 'amazon prime',
      'spotify', 'apple subscription', 'google one',
    ],
  },
  {
    category: 'Car Maintenance',
    keywords: [
      'jiffy lube', 'jiflube', 'valvoline', 'oil change', 'lube',
      'autozone', 'o\'reilly auto', 'oreilly auto', 'napa auto',
      'advance auto', 'pep boys', 'firestone', 'goodyear tire',
      'discount tire', 'belle tire', 'mavis tire', 'ntb tire',
      'midas', 'meineke', 'monro muffler', 'christian brothers auto',
      'take 5 oil', 'speedee oil',
      'car wash', 'carwash', 'auto detail', 'auto detailing',
      'auto repair', 'auto service', 'auto shop', 'mechanic',
      'tire rotation', 'tire change', 'wheel alignment', 'brake service',
      'transmission', 'towing', 'aaa roadside', 'roadside',
      'smog check', 'emissions test', 'inspection station',
      'parking ticket', 'dmv', 'vehicle registration',
    ],
  },
];

/**
 * Attempts to auto-categorize a transaction description.
 * Returns the matched category string, or null if unknown.
 */
export function autoCategory(description) {
  if (!description) return null;
  const lower = description.toLowerCase();
  for (const rule of RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return rule.category;
      }
    }
  }
  return null;
}
