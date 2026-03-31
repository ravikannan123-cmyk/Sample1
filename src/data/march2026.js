/**
 * Pre-loaded transactions from the credit card statement (March 1, 2026).
 * Billing period: Jan 31 – Mar 1, 2026.
 * AUTOMATIC PAYMENT is excluded (it is not a spending transaction).
 */
const raw = [
  // ── Restaurants ────────────────────────────────────────────────────────────
  { date: '01/31', expense: "DOMINO'S 6860",               amount:  25.30, category: 'Restaurants'        },

  // ── Walmart ────────────────────────────────────────────────────────────────
  { date: '02/01', expense: 'WAL-MART #5866',               amount:  28.99, category: 'Walmart'            },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/01', expense: 'AMAZON MKTPL*101F61MB3',        amount:   4.32, category: 'Amazon'             },
  { date: '02/01', expense: 'AMAZON MKTPL*BC26Z3NH3',        amount:  10.26, category: 'Amazon'             },

  // ── Car Maintenance (tolls) ────────────────────────────────────────────────
  { date: '02/01', expense: 'HCTRA EZ TAG REBILL',           amount:  10.68, category: 'Car Maintenance'    },

  // ── Network ────────────────────────────────────────────────────────────────
  { date: '02/02', expense: 'Netflix',                        amount:   8.65, category: 'Network'            },

  // ── Shopping ───────────────────────────────────────────────────────────────
  { date: '02/02', expense: 'HOBBY LOBBY #390',               amount:   4.31, category: 'Shopping'           },

  // ── American Groceries ─────────────────────────────────────────────────────
  { date: '02/03', expense: '086 BRAUMS STORE MCKINNEY',      amount:   7.28, category: 'American Groceries' },

  // ── Indian Groceries ───────────────────────────────────────────────────────
  { date: '02/03', expense: 'INDIA BAZAAR FRISCO 2',          amount:  12.12, category: 'Indian Groceries'   },

  // ── American Groceries ─────────────────────────────────────────────────────
  { date: '02/03', expense: '076 BRAUMS STORE FRISCO',        amount:   4.79, category: 'American Groceries' },

  // ── Network ────────────────────────────────────────────────────────────────
  { date: '02/04', expense: 'HLU*HULUPLUS',                   amount:  12.98, category: 'Network'            },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/04', expense: 'Amazon.com*T831A8AX3',           amount:  16.64, category: 'Amazon'             },
  { date: '02/05', expense: 'AMAZON MKTPL*IH7F03YE3',         amount:   6.48, category: 'Amazon'             },

  // ── Walmart ────────────────────────────────────────────────────────────────
  { date: '02/06', expense: 'WAL-MART #5866',                 amount:  25.56, category: 'Walmart'            },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/06', expense: 'AMAZON MKTPL*546IF0M63',         amount:  10.81, category: 'Amazon'             },

  // ── American Groceries ─────────────────────────────────────────────────────
  { date: '02/06', expense: 'TOM THUMB #0011',                amount:   2.72, category: 'American Groceries' },
  { date: '02/06', expense: 'TOM THUMB #0011',                amount:  11.04, category: 'American Groceries' },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/07', expense: 'AMAZON MKTPL*UI5EA5OA3',         amount:   4.32, category: 'Amazon'             },

  // ── American Groceries ─────────────────────────────────────────────────────
  { date: '02/07', expense: '365 MARKET',                     amount:   2.26, category: 'American Groceries' },
  { date: '02/07', expense: 'SPROUTS FARMERS MARKET',         amount:  55.97, category: 'American Groceries' },

  // ── Indian Groceries ───────────────────────────────────────────────────────
  { date: '02/07', expense: 'PATEL BROTHERS FRISCO',          amount:  85.67, category: 'Indian Groceries'   },

  // ── TX Utilities ───────────────────────────────────────────────────────────
  { date: '02/10', expense: 'ATMOS ENERGY',                   amount: 291.99, category: 'TX Utilities'       },

  // ── Shopping ───────────────────────────────────────────────────────────────
  { date: '02/11', expense: 'STAPLES 00111021',               amount:  77.94, category: 'Shopping'           },
  { date: '02/12', expense: 'FEDEX OFFIC16800016840 MCKINNEY', amount: 11.90, category: 'Shopping'           },

  // ── American Groceries ─────────────────────────────────────────────────────
  { date: '02/12', expense: '086 BRAUMS STORE MCKINNEY',      amount:   7.28, category: 'American Groceries' },

  // ── Car Maintenance (gas) ──────────────────────────────────────────────────
  { date: '02/12', expense: 'MURPHY EXPRESS 8888',            amount:  36.69, category: 'Car Maintenance'    },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/15', expense: 'AMAZON MKTPL*U12DR8FI3',         amount:  14.71, category: 'Amazon'             },

  // ── Network ────────────────────────────────────────────────────────────────
  { date: '02/14', expense: 'Sling TV',                       amount:  10.83, category: 'Network'            },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/15', expense: 'AMAZON MKTPL*ZN15C8MY3',         amount: 108.24, category: 'Amazon'             },

  // ── American Groceries ─────────────────────────────────────────────────────
  { date: '02/14', expense: 'TOM THUMB #0011',                amount:  17.98, category: 'American Groceries' },

  // ── Indian Groceries ───────────────────────────────────────────────────────
  { date: '02/14', expense: 'PATEL BROTHERS FRISCO',          amount:  96.00, category: 'Indian Groceries'   },

  // ── Restaurants ────────────────────────────────────────────────────────────
  { date: '02/14', expense: 'DUMONT CREAMERY & CAFE',         amount:  25.37, category: 'Restaurants'        },

  // ── Miscellaneous ──────────────────────────────────────────────────────────
  { date: '02/15', expense: 'THE COURTS OF MCKINNEY',         amount:  36.00, category: 'Miscellaneous'      },

  // ── Amazon (refunds — negative) ────────────────────────────────────────────
  { date: '02/16', expense: 'AMAZON MKTPLACE PMTS (Refund)',  amount:  -4.32, category: 'Amazon'             },

  // ── Restaurants ────────────────────────────────────────────────────────────
  { date: '02/16', expense: 'TST* HONEST KITCHEN - MCKINNEY', amount:  54.62, category: 'Restaurants'        },

  // ── Miscellaneous ──────────────────────────────────────────────────────────
  { date: '02/16', expense: 'HP *INSTANT INK',                amount:   5.19, category: 'Miscellaneous'      },

  // ── American Groceries ─────────────────────────────────────────────────────
  { date: '02/16', expense: 'SPROUTS FARMERS MARKET',         amount:  38.97, category: 'American Groceries' },

  // ── Amazon (refunds — negative) ────────────────────────────────────────────
  { date: '02/17', expense: 'AMAZON MKTPLACE PMTS (Refund)',  amount: -15.14, category: 'Amazon'             },
  { date: '02/17', expense: 'AMAZON MKTPLACE PMTS (Refund)',  amount: -16.23, category: 'Amazon'             },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/17', expense: 'AMAZON MKTPL*4T3H94913',         amount:  23.99, category: 'Amazon'             },

  // ── Car Maintenance (gas) ──────────────────────────────────────────────────
  { date: '02/17', expense: 'MURPHY EXPRESS 8888',            amount:   0.06, category: 'Car Maintenance'    },
  { date: '02/17', expense: 'MURPHY EXPRESS 8888',            amount:  22.20, category: 'Car Maintenance'    },

  // ── Medical ────────────────────────────────────────────────────────────────
  { date: '02/17', expense: 'DRUG CRAFTERS - FRISCO',         amount:  75.00, category: 'Medical'            },

  // ── Indian Groceries ───────────────────────────────────────────────────────
  { date: '02/18', expense: 'INDIA BAZAAR FRISCO 2',          amount:   4.99, category: 'Indian Groceries'   },

  // ── Miscellaneous ──────────────────────────────────────────────────────────
  { date: '02/18', expense: 'USPS KIOSK',                     amount:   1.56, category: 'Miscellaneous'      },
  { date: '02/19', expense: 'SQ *BLUSH BEAUTY BAR',           amount:   7.99, category: 'Miscellaneous'      },
  { date: '02/20', expense: 'TX DPS DL OFFICE',               amount:  33.00, category: 'Miscellaneous'      },
  { date: '02/20', expense: 'TX DPS DL OFFICE',               amount:  33.00, category: 'Miscellaneous'      },

  // ── UT Utilities ───────────────────────────────────────────────────────────
  { date: '02/20', expense: 'CITY OF SOUTH JO N UTIL',        amount:  68.39, category: 'UT Utilities'       },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/20', expense: 'Amazon.com*B96SV3VV2',           amount:  64.94, category: 'Amazon'             },

  // ── Car Maintenance (tolls) ────────────────────────────────────────────────
  { date: '02/20', expense: 'HCTRA EZ TAG REBILL',            amount:  10.00, category: 'Car Maintenance'    },

  // ── Miscellaneous ──────────────────────────────────────────────────────────
  { date: '02/20', expense: 'PARKER UNIVERSITY',              amount:   2.48, category: 'Miscellaneous'      },
  { date: '02/20', expense: 'PARKER UNIVERSITY',              amount:   4.59, category: 'Miscellaneous'      },

  // ── Restaurants ────────────────────────────────────────────────────────────
  { date: '02/20', expense: 'TST*A2B - FRISCO',               amount:  37.84, category: 'Restaurants'        },

  // ── American Groceries ─────────────────────────────────────────────────────
  { date: '02/21', expense: '086 BRAUMS STORE MCKINNEY',      amount:   9.38, category: 'American Groceries' },
  { date: '02/21', expense: '086 BRAUMS STORE MCKINNEY',      amount:   5.87, category: 'American Groceries' },

  // ── Miscellaneous ──────────────────────────────────────────────────────────
  { date: '02/21', expense: 'PARKER UNIVERSITY',              amount:   8.16, category: 'Miscellaneous'      },

  // ── Restaurants ────────────────────────────────────────────────────────────
  { date: '02/22', expense: 'DD *DOORDASH CHIPOTLEM',         amount:  12.53, category: 'Restaurants'        },

  // ── Indian Groceries ───────────────────────────────────────────────────────
  { date: '02/22', expense: 'PATEL BROTHERS FRISCO',          amount:  22.89, category: 'Indian Groceries'   },

  // ── American Groceries ─────────────────────────────────────────────────────
  { date: '02/22', expense: 'SPROUTS FARMERS MARKET',         amount:  41.04, category: 'American Groceries' },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/23', expense: 'AMAZON MKTPL*KX5MD73E3',         amount:  19.47, category: 'Amazon'             },

  // ── TX Utilities ───────────────────────────────────────────────────────────
  { date: '02/23', expense: 'TXU*BILL PAYMENT',               amount: 108.43, category: 'TX Utilities'       },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/23', expense: 'Amazon.com*B90LG2R32',           amount:  13.49, category: 'Amazon'             },
  { date: '02/23', expense: 'Amazon.com*B97F13CC1',           amount:   9.82, category: 'Amazon'             },

  // ── TX Utilities ───────────────────────────────────────────────────────────
  { date: '02/25', expense: 'CITY OF FRISCO CNP',             amount:  51.00, category: 'TX Utilities'       },

  // ── UT Utilities ───────────────────────────────────────────────────────────
  { date: '02/25', expense: 'JORDAN BASIN IMPROVEME',         amount:  35.00, category: 'UT Utilities'       },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/27', expense: 'Amazon.com*BE2143XU2',           amount:  10.81, category: 'Amazon'             },
  { date: '02/27', expense: 'Amazon.com*BE48Q1GJ2',           amount:  10.81, category: 'Amazon'             },

  // ── Shopping ───────────────────────────────────────────────────────────────
  { date: '02/27', expense: 'FEDEX OFFIC16800016840 MCKINNEY', amount: 11.90, category: 'Shopping'           },

  // ── Miscellaneous ──────────────────────────────────────────────────────────
  { date: '02/27', expense: 'PAYPAL *HIGHOCTAVEZ ECHI5',      amount:  60.00, category: 'Miscellaneous'      },

  // ── Medical ────────────────────────────────────────────────────────────────
  { date: '02/27', expense: 'CLARKSON LEGACY FRISCO',         amount: 712.00, category: 'Medical'            },

  // ── Amazon ─────────────────────────────────────────────────────────────────
  { date: '02/28', expense: 'AMAZON MKTPL*BE3SS1QV2',         amount:  25.33, category: 'Amazon'             },

  // ── Restaurants ────────────────────────────────────────────────────────────
  { date: '02/28', expense: "MCDONALD'S F6161",               amount:  13.27, category: 'Restaurants'        },

  // ── Shopping ───────────────────────────────────────────────────────────────
  { date: '02/28', expense: 'NikePOS_US',                     amount: 108.24, category: 'Shopping'           },

  // ── Restaurants ────────────────────────────────────────────────────────────
  { date: '02/28', expense: "MCDONALD'S F6161",               amount:   1.40, category: 'Restaurants'        },

  // ── Car Maintenance (parking) ──────────────────────────────────────────────
  { date: '02/28', expense: 'JACK BOLES PARKING DALLAS',      amount:   7.00, category: 'Car Maintenance'    },

  // ── Car Maintenance (gas) ──────────────────────────────────────────────────
  { date: '02/28', expense: 'EXXON 7-ELEVEN 33119',           amount:  31.12, category: 'Car Maintenance'    },

  // ── Amazon (Prime subscription) ────────────────────────────────────────────
  { date: '03/01', expense: 'AMAZON PRIME*IE4TO9BO3',         amount:  16.23, category: 'Amazon'             },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parseDate(dateStr) {
  const [mm, dd] = dateStr.split('/').map(Number);
  // Statement is for the billing period ending March 1, 2026
  const year = 2026;
  return { month: MONTHS[mm - 1], year: String(year) };
}

export const march2026Transactions = raw.map(t => ({
  id: crypto.randomUUID(),
  ...parseDate(t.date),
  expense: t.expense,
  amount: t.amount.toFixed(2),
  category: t.category,
}));
