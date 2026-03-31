export const CATEGORIES = [
  'Walmart',
  'Amazon',
  'Indian Groceries',
  'American Groceries',
  'TX Utilities',
  'UT Utilities',
  'Network',
  'Car Maintenance',
  'Medical',
  'Shopping',
  'Miscellaneous',
  'Restaurants',
  'Mortgage Payment',
];

const RULES = [
  {
    category: 'Walmart',
    keywords: ['wal-mart', 'walmart'],
  },
  {
    category: 'Amazon',
    keywords: ['amazon', 'amzn.com'],
  },
  {
    category: 'Indian Groceries',
    keywords: ['india bazaar', 'patel brothers', 'desi grocery', 'indian grocery'],
  },
  {
    category: 'American Groceries',
    keywords: [
      'kroger', 'safeway', 'publix', 'whole foods', 'trader joe',
      'aldi', 'sprouts', 'tom thumb', '365 market', 'braums', "braum's",
      'food lion', 'giant food', 'stop & shop', 'stop and shop', 'meijer',
      'fresh market', 'wegmans', 'winn-dixie', 'harris teeter', 'market basket',
      'smart & final', 'piggly wiggly', 'ingles market', 'save a lot', 'lidl',
      'shoprite', 'acme market',
    ],
  },
  {
    category: 'TX Utilities',
    keywords: [
      'atmos energy', 'txu', 'city of frisco', 'oncor', 'reliant energy',
      'direct energy', 'green mountain energy',
    ],
  },
  {
    category: 'UT Utilities',
    keywords: [
      'city of south jo', 'jordan basin', 'jordan valley', 'provo city util',
      'salt lake city util', 'rocky mountain power',
    ],
  },
  {
    category: 'Network',
    keywords: [
      'netflix', 'hulu', 'sling tv', 'sling', 'disney+', 'disneyplus',
      'hbo max', 'hbomax', 'spotify', 'youtube premium', 'apple tv',
      'peacock', 'paramount+', 'fubo', 'philo',
    ],
  },
  {
    category: 'Car Maintenance',
    keywords: [
      'hctra', 'ez tag', 'murphy express', 'exxon', 'shell gas', 'chevron',
      'bp gas', 'sunoco', 'valero', 'conoco', 'citgo', 'texaco',
      'jiffy lube', 'valvoline', 'oil change', 'autozone', "o'reilly auto",
      'napa auto', 'advance auto', 'pep boys', 'firestone', 'goodyear tire',
      'discount tire', 'midas', 'meineke', 'car wash', 'auto repair',
      'auto service', 'parking', 'towing', 'smog check', 'vehicle registration',
      'take 5 oil',
    ],
  },
  {
    category: 'Medical',
    keywords: [
      'clarkson', 'drug crafters', 'cvs pharmacy', 'walgreens', 'rite aid',
      'compounding pharmacy', 'hospital', 'urgent care', 'dental', 'vision',
      'optometrist', 'eyecare', 'eye care',
    ],
  },
  {
    category: 'Shopping',
    keywords: [
      'hobby lobby', 'staples', 'fedex offic', 'nikepos', 'nike pos',
      'best buy', 'home depot', "lowe's", 'lowes', 'ross dress',
      'marshalls', 'tj maxx', 'old navy', 'gap ', 'h&m',
      'macy', 'nordstrom', 'kohl', 'jcpenney',
    ],
  },
  {
    category: 'Restaurants',
    keywords: [
      "mcdonald's", 'mcdonalds', 'domino', 'pizza hut', 'papa john',
      "wendy's", 'wendys', 'taco bell', 'chipotle', 'subway',
      'chick-fil-a', 'chickfila', 'kfc', 'popeyes', 'burger king',
      'five guys', 'in-n-out', 'shake shack', 'whataburger',
      'panda express', 'panera', 'starbucks', 'dunkin',
      "applebee's", "chili's", 'ihop', "denny's", 'waffle house',
      'red lobster', 'olive garden', 'outback', 'texas roadhouse',
      'doordash', 'ubereats', 'uber eats', 'grubhub', 'postmates',
      'tst*', 'creamery & cafe', 'creamery and cafe',
    ],
  },
  {
    category: 'Mortgage Payment',
    keywords: [
      'mortgage', 'home loan', 'homeloan', 'rocket mortgage',
      'pennymac', 'loancare', 'mr. cooper', 'mrcooper', 'nationstar',
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
