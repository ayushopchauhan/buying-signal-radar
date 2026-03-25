/**
 * BUYING SIGNAL RADAR - n8n Workflow Generator
 * Generates the complete workflow JSON for import into n8n
 *
 * Run: node generate-workflow.js > workflow.json
 */

const crypto = require('crypto');
const uid = () => crypto.randomUUID().split('-')[0];

// ============================================================
// LAYOUT CONSTANTS
// ============================================================
const TRIGGER_X = -100;
const CONFIG_X = 200;
const BRANCH_START_X = 560;
const BRANCH_STEP_X = 300;
const SCORE_X = 1760;
const FILTER_X = 2060;
const RESEARCH_X = 2360;
const EMAIL_X = RESEARCH_X + BRANCH_STEP_X;
const FORMAT_X = RESEARCH_X + BRANCH_STEP_X * 2;
const DIST_X = RESEARCH_X + BRANCH_STEP_X * 3;

const BRANCH_Y_START = -900;
const BRANCH_Y_STEP = 520;
const CENTER_Y = 660;

// Branch Y positions
const branchY = (i) => BRANCH_Y_START + (i * BRANCH_Y_STEP);

// ============================================================
// STICKY NOTES
// ============================================================
const stickyNotes = [
  // Title Banner
  {
    id: uid(),
    name: 'Note',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [-300, -1300],
    parameters: {
      content: "# \ud83c\udfaf BUYING SIGNAL RADAR v1.0\n\n**AI-powered intent detection across 6 data sources.** Finds people who are ready to buy RIGHT NOW, scores them by intent, and auto-reaches out before your competitors even know they exist.\n\n\u2022 6 Signal Branches \u2192 Intent Scoring Engine \u2192 AI Research \u2192 Personalized Outreach \u2192 Telegram Alert\n\n`Built by @ayushopchauhan` \u2502 `Free to use & customize` \u2502 `github.com/ayushopchauhan/buying-signal-radar`",
      height: 240,
      width: 3700,
      color: 5
    }
  },
  // Branch 1: Reddit
  {
    id: uid(),
    name: 'Note1',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [440, branchY(0) - 120],
    parameters: {
      content: "## \ud83d\udce1 Branch 1: Reddit Intent Monitor\n\nScans Reddit for posts where people are **actively asking** for your service. These are the warmest leads possible.\n\n`Signal Strength: 9/10` \u2502 `Source: Reddit JSON API (free)`",
      height: 340,
      width: 1180,
      color: 2
    }
  },
  // Branch 2: Reviews
  {
    id: uid(),
    name: 'Note2',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [440, branchY(1) - 120],
    parameters: {
      content: "## \u2b50 Branch 2: Competitor Review Monitor\n\nWatches competitors' Google Reviews. A 1-2 star review = an unhappy customer actively looking for an alternative. **Your warmest prospect.**\n\n`Signal Strength: 8/10` \u2502 `Source: Google Places API`",
      height: 340,
      width: 1180,
      color: 3
    }
  },
  // Branch 3: Jobs
  {
    id: uid(),
    name: 'Note3',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [440, branchY(2) - 120],
    parameters: {
      content: "## \ud83d\udcbc Branch 3: Hiring Signal Detector\n\nCompanies posting jobs in your service area = budget allocated RIGHT NOW. Hiring a Marketing Manager? They need marketing services.\n\n`Signal Strength: 7/10` \u2502 `Source: Google Jobs Search`",
      height: 340,
      width: 1180,
      color: 6
    }
  },
  // Branch 4: Website Changes
  {
    id: uid(),
    name: 'Note4',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [440, branchY(3) - 120],
    parameters: {
      content: "## \ud83d\udd04 Branch 4: Website Change Detector\n\nMonitors prospect websites for changes. A redesign or new content = they're investing in their web presence. **Perfect timing to reach out.**\n\n`Signal Strength: 5/10` \u2502 `Source: HTTP Hash Comparison`",
      height: 340,
      width: 1180,
      color: 4
    }
  },
  // Branch 5: News
  {
    id: uid(),
    name: 'Note5',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [440, branchY(4) - 120],
    parameters: {
      content: "## \ud83d\udcf0 Branch 5: Funding & News Monitor\n\nTracks when companies raise funding, launch products, or expand. **Money coming in = money going out** on services like yours.\n\n`Signal Strength: 7/10` \u2502 `Source: Google News RSS (free)`",
      height: 340,
      width: 1180,
      color: 1
    }
  },
  // Branch 6: Social
  {
    id: uid(),
    name: 'Note6',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [440, branchY(5) - 120],
    parameters: {
      content: "## \ud83d\udc26 Branch 6: Social Listening\n\nMonitors social platforms for buying intent: complaints about providers, questions about solutions, or expressions of need.\n\n`Signal Strength: 6/10` \u2502 `Source: Social Search API`",
      height: 340,
      width: 1180,
      color: 5
    }
  },
  // Scoring Engine
  {
    id: uid(),
    name: 'Note7',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [SCORE_X - 100, -200],
    parameters: {
      content: "## \ud83e\udde0 INTENT SCORING ENGINE\n\nAll 6 signal branches feed directly into the scoring engine.\n\nLeads above threshold get auto-researched and contacted.\n\n**Scoring weights:**\n\u2022 Reddit Intent = 9\n\u2022 Bad Review = 8\n\u2022 Hiring Signal = 7\n\u2022 Funding/News = 7\n\u2022 Social Intent = 6\n\u2022 Website Change = 5\n\n`Threshold: 5.0 (configurable)`",
      height: 560,
      width: 460,
      color: 2
    }
  },
  // Outreach
  {
    id: uid(),
    name: 'Note8',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [RESEARCH_X - 100, -200],
    parameters: {
      content: "## \ud83d\ude80 AI-POWERED OUTREACH\n\nOfficial OpenAI, Telegram, and Google Sheets nodes.\n\n**For every high-intent lead:**\n\n1\ufe0f\u20e3 AI researches their company + context (OpenAI node)\n2\ufe0f\u20e3 AI writes hyper-personalized email using the SPECIFIC signal (OpenAI node)\n3\ufe0f\u20e3 Telegram alert with full context (Telegram node)\n4\ufe0f\u20e3 Everything logged to Google Sheets (Sheets node)\n\n`The email references WHY you're reaching out - because you saw a real signal, not because they're on a list.`",
      height: 560,
      width: 900,
      color: 4
    }
  },
  // Trigger area
  {
    id: uid(),
    name: 'Note9',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [-220, -200],
    parameters: {
      content: "## \u23f0 TRIGGER & CONFIG\n\nRuns every 6 hours.\n\nEdit the **Configuration** node to set your:\n\u2022 Industry keywords\n\u2022 Competitor names\n\u2022 Target job titles\n\u2022 Prospect URLs to monitor\n\u2022 Telegram chat ID\n\u2022 Google Places API key\n\nAPI keys for OpenAI, Telegram, and Google Sheets are configured via **n8n credentials** (not in the config node).",
      height: 440,
      width: 520,
      color: 7
    }
  }
];

// ============================================================
// TRIGGER & CONFIG NODES
// ============================================================
const triggerNodes = [
  {
    id: uid(),
    name: 'Run Every 6 Hours',
    type: 'n8n-nodes-base.scheduleTrigger',
    typeVersion: 1.2,
    position: [TRIGGER_X, CENTER_Y],
    parameters: {
      rule: {
        interval: [{ field: 'hours', hoursInterval: 6 }]
      }
    }
  },
  {
    id: uid(),
    name: 'Configuration',
    type: 'n8n-nodes-base.set',
    typeVersion: 3.4,
    position: [CONFIG_X, CENTER_Y],
    parameters: {
      mode: 'raw',
      jsonOutput: JSON.stringify({
        // Industry & Keywords
        industry: "web design",
        service_keywords: ["web design", "web development", "website redesign", "WordPress", "Shopify", "UI/UX"],
        search_queries_reddit: [
          "looking for web designer",
          "need a new website",
          "recommend web developer",
          "website redesign help",
          "need help with my website"
        ],

        // Competitors to monitor reviews
        competitor_place_ids: [
          "REPLACE_WITH_GOOGLE_PLACE_ID_1",
          "REPLACE_WITH_GOOGLE_PLACE_ID_2",
          "REPLACE_WITH_GOOGLE_PLACE_ID_3"
        ],
        competitor_names: ["Competitor Agency 1", "Competitor Agency 2"],

        // Job titles that signal buying intent
        job_keywords: ["Marketing Manager", "Web Developer", "Digital Marketing", "E-commerce Manager", "Brand Manager"],

        // Prospect websites to monitor for changes
        prospect_urls: [
          "https://example-prospect-1.com",
          "https://example-prospect-2.com",
          "https://example-prospect-3.com"
        ],

        // News keywords
        news_keywords: ["web design agency funding", "digital agency acquisition", "ecommerce growth"],

        // Social listening keywords
        social_keywords: ["hate my website", "website is slow", "need new website", "web designer recommendations"],

        // Scoring threshold (0-10)
        score_threshold: 5.0,

        // Outreach settings
        from_name: "Your Name",
        from_email: "you@yourdomain.com",
        calendar_link: "https://cal.com/you/15min",

        // API Keys (only keys without official n8n nodes)
        google_places_api_key: "REPLACE_WITH_YOUR_GOOGLE_API_KEY",
        telegram_chat_id: "REPLACE_WITH_YOUR_CHAT_ID"
      }, null, 2),
      options: {}
    }
  }
];

// ============================================================
// BRANCH 1: REDDIT INTENT MONITOR
// ============================================================
const b1y = branchY(0);
const branch1 = [
  {
    id: uid(),
    name: 'Reddit Search',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.2,
    position: [BRANCH_START_X, b1y],
    parameters: {
      method: 'GET',
      url: '=https://www.reddit.com/search.json?q={{ encodeURIComponent($json.search_queries_reddit[0] + " OR " + $json.search_queries_reddit[1] + " OR " + $json.search_queries_reddit[2]) }}&sort=new&limit=25&t=day',
      options: {
        timeout: 15000
      },
      headerParameters: {
        parameters: [
          { name: 'User-Agent', value: 'BuyingSignalRadar/1.0' }
        ]
      }
    },
    continueOnFail: true
  },
  {
    id: uid(),
    name: 'Parse Reddit Results',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X, b1y],
    parameters: {
      jsCode: `// Parse Reddit search results into structured lead signals
const data = $input.first().json;
const posts = data?.data?.children || [];
const config = $('Configuration').first().json;

const signals = [];
const now = Math.floor(Date.now() / 1000);
const oneDayAgo = now - 86400;

for (const post of posts) {
  const p = post.data;

  // Skip old posts
  if (p.created_utc < oneDayAgo) continue;

  // Skip posts from bots or removed content
  if (p.author === '[deleted]' || p.author === 'AutoModerator') continue;
  if (p.removed_by_category) continue;

  // Calculate relevance score based on keyword matches
  const text = (p.title + ' ' + (p.selftext || '')).toLowerCase();
  const keywords = config.service_keywords || [];
  const matchCount = keywords.filter(kw => text.includes(kw.toLowerCase())).length;

  if (matchCount === 0) continue;

  signals.push({
    json: {
      signal_type: 'reddit_intent',
      signal_strength: 9,
      source: 'Reddit',

      // Lead info
      lead_name: p.author,
      lead_url: 'https://reddit.com/user/' + p.author,
      company_name: null,
      company_url: null,

      // Signal context
      title: p.title,
      body: (p.selftext || '').substring(0, 500),
      post_url: 'https://reddit.com' + p.permalink,
      subreddit: p.subreddit,
      upvotes: p.ups,
      comments: p.num_comments,
      posted_at: new Date(p.created_utc * 1000).toISOString(),

      // Scoring inputs
      keyword_matches: matchCount,
      has_budget_mention: /budget|price|cost|pay|afford|invest/i.test(text),
      is_urgent: /asap|urgent|quickly|fast|deadline|rush/i.test(text),

      // For email personalization
      signal_summary: 'Posted on r/' + p.subreddit + ': "' + p.title.substring(0, 100) + '"',
      reach_out_reason: 'They are actively looking for ' + config.industry + ' help on Reddit'
    }
  });
}

return signals.length > 0 ? signals : [{ json: { signal_type: 'reddit_intent', no_results: true } }];`
    }
  },
  {
    id: uid(),
    name: 'Filter Reddit Signals',
    type: 'n8n-nodes-base.filter',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X * 2, b1y],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [
          {
            id: uid(),
            leftValue: '={{ $json.no_results }}',
            rightValue: true,
            operator: { type: 'boolean', operation: 'notTrue' }
          }
        ],
        combinator: 'and'
      },
      options: {}
    }
  }
];

// ============================================================
// BRANCH 2: COMPETITOR REVIEW MONITOR
// ============================================================
const b2y = branchY(1);
const branch2 = [
  {
    id: uid(),
    name: 'Fetch Competitor Reviews',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.2,
    position: [BRANCH_START_X, b2y],
    parameters: {
      method: 'GET',
      url: '=https://maps.googleapis.com/maps/api/place/details/json?place_id={{ $json.competitor_place_ids[0] }}&fields=reviews,name,url&key={{ $json.google_places_api_key }}',
      options: { timeout: 15000 }
    },
    continueOnFail: true
  },
  {
    id: uid(),
    name: 'Parse Bad Reviews',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X, b2y],
    parameters: {
      jsCode: `// Extract 1-2 star reviews from competitors - these are your prospects
const data = $input.first().json;
const result = data?.result || {};
const reviews = result.reviews || [];
const competitorName = result.name || 'Unknown Competitor';

const signals = [];
const oneWeekAgo = Date.now() - (7 * 86400 * 1000);

for (const review of reviews) {
  // Only interested in unhappy customers (1-2 stars)
  if (review.rating > 2) continue;

  // Only recent reviews
  const reviewDate = new Date(review.time * 1000);
  if (reviewDate.getTime() < oneWeekAgo) continue;

  signals.push({
    json: {
      signal_type: 'bad_competitor_review',
      signal_strength: 8,
      source: 'Google Reviews',

      // Lead info
      lead_name: review.author_name,
      lead_url: review.author_url || null,
      company_name: null,
      company_url: null,

      // Signal context
      competitor_name: competitorName,
      review_rating: review.rating,
      review_text: review.text,
      review_date: reviewDate.toISOString(),

      // For email personalization
      signal_summary: review.rating + '-star review of ' + competitorName + ': "' + (review.text || '').substring(0, 100) + '"',
      reach_out_reason: 'They left a negative review on your competitor (' + competitorName + ') and may be looking for a better alternative'
    }
  });
}

return signals.length > 0 ? signals : [{ json: { signal_type: 'bad_competitor_review', no_results: true } }];`
    }
  },
  {
    id: uid(),
    name: 'Filter Review Signals',
    type: 'n8n-nodes-base.filter',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X * 2, b2y],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [
          {
            id: uid(),
            leftValue: '={{ $json.no_results }}',
            rightValue: true,
            operator: { type: 'boolean', operation: 'notTrue' }
          }
        ],
        combinator: 'and'
      },
      options: {}
    }
  }
];

// ============================================================
// BRANCH 3: HIRING SIGNAL DETECTOR
// ============================================================
const b3y = branchY(2);
const branch3 = [
  {
    id: uid(),
    name: 'Search Job Postings',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.2,
    position: [BRANCH_START_X, b3y],
    parameters: {
      method: 'GET',
      url: '=https://www.google.com/search?q={{ encodeURIComponent("site:linkedin.com/jobs " + $json.job_keywords.join(" OR ")) }}&tbs=qdr:d&num=20',
      options: { timeout: 15000 },
      headerParameters: {
        parameters: [
          { name: 'User-Agent', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        ]
      }
    },
    continueOnFail: true
  },
  {
    id: uid(),
    name: 'Parse Job Listings',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X, b3y],
    parameters: {
      jsCode: `// Parse job listing search results for hiring signals
// NOTE: For production, use LinkedIn API, Indeed API, or a job board aggregator
// This demo parses Google search results for job postings

const html = $input.first().json.data || '';
const config = $('Configuration').first().json;
const signals = [];

// Extract job listing snippets from search results
// Pattern: company name + job title + location
const jobPattern = /<a[^>]*href="([^"]*linkedin\\.com\\/jobs[^"]*)"[^>]*>([^<]*)<\\/a>/gi;
let match;
const seen = new Set();

while ((match = jobPattern.exec(html)) !== null) {
  const url = match[1];
  const title = match[2].replace(/<[^>]*>/g, '');

  if (seen.has(url)) continue;
  seen.add(url);

  // Extract company name from title (usually "Job Title at Company")
  const parts = title.split(/\\s+at\\s+|\\s+-\\s+|\\s+\\|\\s+/i);
  const jobTitle = parts[0]?.trim() || title;
  const companyName = parts[1]?.trim() || 'Unknown';

  // Check if job title relates to our service area
  const isRelevant = config.job_keywords.some(kw =>
    title.toLowerCase().includes(kw.toLowerCase())
  );

  if (!isRelevant) continue;

  signals.push({
    json: {
      signal_type: 'hiring_signal',
      signal_strength: 7,
      source: 'Job Board',

      lead_name: null,
      lead_url: null,
      company_name: companyName,
      company_url: null,

      job_title: jobTitle,
      job_url: url,

      signal_summary: companyName + ' is hiring: "' + jobTitle + '"',
      reach_out_reason: 'They are hiring for ' + jobTitle + ', which means they have budget allocated for ' + config.industry + ' and may need external help'
    }
  });
}

// If no results from HTML parsing, provide a demo signal structure
if (signals.length === 0) {
  return [{ json: { signal_type: 'hiring_signal', no_results: true } }];
}

return signals;`
    }
  },
  {
    id: uid(),
    name: 'Filter Job Signals',
    type: 'n8n-nodes-base.filter',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X * 2, b3y],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [
          {
            id: uid(),
            leftValue: '={{ $json.no_results }}',
            rightValue: true,
            operator: { type: 'boolean', operation: 'notTrue' }
          }
        ],
        combinator: 'and'
      },
      options: {}
    }
  }
];

// ============================================================
// BRANCH 4: WEBSITE CHANGE DETECTOR
// ============================================================
const b4y = branchY(3);
const branch4 = [
  {
    id: uid(),
    name: 'Load Prospect URLs',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [BRANCH_START_X, b4y],
    parameters: {
      jsCode: `// Load prospect URLs from configuration
// Each URL will be fetched and compared against its previous hash
const config = $('Configuration').first().json;
const urls = config.prospect_urls || [];

return urls.map(url => ({
  json: { url, signal_type: 'website_change' }
}));`
    }
  },
  {
    id: uid(),
    name: 'Fetch Website Content',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.2,
    position: [BRANCH_START_X + BRANCH_STEP_X, b4y],
    parameters: {
      method: 'GET',
      url: '={{ $json.url }}',
      options: {
        timeout: 10000,
        redirect: { redirect: { followRedirects: true, maxRedirects: 3 } }
      }
    },
    continueOnFail: true
  },
  {
    id: uid(),
    name: 'Detect Changes',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X * 2, b4y],
    parameters: {
      jsCode: `// Compare current page content hash with stored version
// Uses a simple hash to detect meaningful changes
// In production, store hashes in Supabase/database between runs

const items = $input.all();
const signals = [];

for (const item of items) {
  const html = item.json.data || item.json.body || '';
  const url = item.json.url || 'unknown';

  if (!html || html.length < 100) continue;

  // Extract meaningful content (strip scripts, styles, whitespace)
  const content = html
    .replace(/<script[^>]*>[\\s\\S]*?<\\/script>/gi, '')
    .replace(/<style[^>]*>[\\s\\S]*?<\\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\s+/g, ' ')
    .trim()
    .substring(0, 5000);

  // Simple hash for change detection
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Extract page title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].trim() : url;

  // NOTE: In production, compare this hash against stored value in database
  // For demo, we flag all sites as "checked" and provide the hash
  // To detect ACTUAL changes, store hashes between runs:
  //   1. Query Supabase for previous hash by URL
  //   2. Compare with current hash
  //   3. If different, flag as changed
  //   4. Update stored hash

  signals.push({
    json: {
      signal_type: 'website_change',
      signal_strength: 5,
      source: 'Website Monitor',

      lead_name: null,
      lead_url: null,
      company_name: pageTitle,
      company_url: url,

      page_title: pageTitle,
      content_hash: hash.toString(),
      content_length: content.length,
      checked_at: new Date().toISOString(),

      // This will be true when a change is detected
      // For demo purposes, set to false (no previous hash to compare)
      change_detected: false,

      signal_summary: 'Website monitored: ' + pageTitle,
      reach_out_reason: 'Their website recently changed, indicating active investment in their web presence'
    }
  });
}

// Only pass through items where change was detected
const changed = signals.filter(s => s.json.change_detected);
return changed.length > 0 ? changed : [{ json: { signal_type: 'website_change', no_results: true } }];`
    }
  }
];

// ============================================================
// BRANCH 5: NEWS & FUNDING MONITOR (RSS Read official node)
// ============================================================
const b5y = branchY(4);
const branch5 = [
  {
    id: uid(),
    name: 'Fetch Google News RSS',
    type: 'n8n-nodes-base.rssFeedRead',
    typeVersion: 1.2,
    position: [BRANCH_START_X, b5y],
    parameters: {
      url: '=https://news.google.com/rss/search?q={{ encodeURIComponent($json.news_keywords.join(\' OR \')) }}&hl=en-US&gl=US&ceid=US:en',
      options: {}
    },
    continueOnFail: true
  },
  {
    id: uid(),
    name: 'Parse News Articles',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X, b5y],
    parameters: {
      jsCode: `// Parse RSS Feed Read output for funding, acquisition, and growth signals
// RSS Read returns structured items with: title, link, pubDate, content, description
const items = $input.all();
const config = $('Configuration').first().json;
const signals = [];

for (const item of items) {
  const title = (item.json.title || '').trim();
  const link = (item.json.link || '').trim();
  const pubDate = item.json.pubDate ? new Date(item.json.pubDate) : new Date();
  const desc = (item.json.content || item.json.description || '').replace(/<[^>]*>/g, '').trim();

  // Skip if older than 48 hours
  if (Date.now() - pubDate.getTime() > 48 * 3600 * 1000) continue;

  // Skip empty items
  if (!title) continue;

  // Detect signal type from content
  const text = (title + ' ' + desc).toLowerCase();
  let newsType = 'general';
  if (/fund|raise|series [a-f]|seed|invest|venture|capital/i.test(text)) newsType = 'funding';
  else if (/acqui|merge|buy|purchase/i.test(text)) newsType = 'acquisition';
  else if (/launch|expand|grow|hire|open|new office/i.test(text)) newsType = 'expansion';
  else if (/partner|collaborat|deal|contract/i.test(text)) newsType = 'partnership';

  // Extract company name (first proper noun cluster in title)
  const companyMatch = title.match(/^([A-Z][a-zA-Z]+(\\s+[A-Z][a-zA-Z]+)*)/);
  const companyName = companyMatch ? companyMatch[0] : title.split(/[:\\-|]/)[0].trim();

  signals.push({
    json: {
      signal_type: 'news_signal',
      signal_strength: newsType === 'funding' ? 8 : 7,
      source: 'Google News',

      lead_name: null,
      lead_url: null,
      company_name: companyName,
      company_url: null,

      news_title: title,
      news_url: link,
      news_type: newsType,
      news_date: pubDate.toISOString(),
      news_snippet: desc.substring(0, 300),

      signal_summary: newsType.toUpperCase() + ': ' + title.substring(0, 100),
      reach_out_reason: newsType === 'funding'
        ? 'They just raised funding, meaning they have budget to invest in ' + config.industry
        : 'Recent news suggests they are actively growing and may need ' + config.industry + ' services'
    }
  });
}

return signals.length > 0 ? signals : [{ json: { signal_type: 'news_signal', no_results: true } }];`
    }
  },
  {
    id: uid(),
    name: 'Filter News Signals',
    type: 'n8n-nodes-base.filter',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X * 2, b5y],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [
          {
            id: uid(),
            leftValue: '={{ $json.no_results }}',
            rightValue: true,
            operator: { type: 'boolean', operation: 'notTrue' }
          }
        ],
        combinator: 'and'
      },
      options: {}
    }
  }
];

// ============================================================
// BRANCH 6: SOCIAL LISTENING
// ============================================================
const b6y = branchY(5);
const branch6 = [
  {
    id: uid(),
    name: 'Social Media Search',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.2,
    position: [BRANCH_START_X, b6y],
    parameters: {
      method: 'GET',
      url: '=https://www.reddit.com/search.json?q={{ encodeURIComponent($json.social_keywords.join(" OR ")) }}&sort=new&limit=25&t=day',
      options: { timeout: 15000 },
      headerParameters: {
        parameters: [
          { name: 'User-Agent', value: 'BuyingSignalRadar/1.0' }
        ]
      }
    },
    continueOnFail: true
  },
  {
    id: uid(),
    name: 'Parse Social Signals',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X, b6y],
    parameters: {
      jsCode: `// Parse social media posts for buying intent signals
// This branch searches Reddit + social platforms for complaints,
// questions, and expressions of need related to your service
const data = $input.first().json;
const posts = data?.data?.children || [];
const config = $('Configuration').first().json;

const signals = [];
const now = Math.floor(Date.now() / 1000);
const oneDayAgo = now - 86400;

for (const post of posts) {
  const p = post.data;

  if (p.created_utc < oneDayAgo) continue;
  if (p.author === '[deleted]' || p.author === 'AutoModerator') continue;

  const text = (p.title + ' ' + (p.selftext || '')).toLowerCase();

  // Detect complaint vs question vs need
  let intentType = 'general';
  if (/hate|terrible|awful|worst|frustrated|disappointed|broken/i.test(text)) intentType = 'complaint';
  else if (/recommend|suggest|looking for|need|help me find|anyone know/i.test(text)) intentType = 'seeking';
  else if (/switch|replace|alternative|better than|move away/i.test(text)) intentType = 'switching';

  // Higher strength for switching intent
  const strength = intentType === 'switching' ? 8 : intentType === 'complaint' ? 7 : 6;

  signals.push({
    json: {
      signal_type: 'social_intent',
      signal_strength: strength,
      source: 'Social Listening',

      lead_name: p.author,
      lead_url: 'https://reddit.com/user/' + p.author,
      company_name: null,
      company_url: null,

      intent_type: intentType,
      title: p.title,
      body: (p.selftext || '').substring(0, 500),
      post_url: 'https://reddit.com' + p.permalink,
      subreddit: p.subreddit,

      signal_summary: intentType.toUpperCase() + ' on r/' + p.subreddit + ': "' + p.title.substring(0, 100) + '"',
      reach_out_reason: intentType === 'switching'
        ? 'They are actively looking to switch from their current provider'
        : 'They expressed frustration or need related to ' + config.industry
    }
  });
}

return signals.length > 0 ? signals : [{ json: { signal_type: 'social_intent', no_results: true } }];`
    }
  },
  {
    id: uid(),
    name: 'Filter Social Signals',
    type: 'n8n-nodes-base.filter',
    typeVersion: 2,
    position: [BRANCH_START_X + BRANCH_STEP_X * 2, b6y],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [
          {
            id: uid(),
            leftValue: '={{ $json.no_results }}',
            rightValue: true,
            operator: { type: 'boolean', operation: 'notTrue' }
          }
        ],
        combinator: 'and'
      },
      options: {}
    }
  }
];

// ============================================================
// SCORING ENGINE (no merge node - all branches connect directly)
// ============================================================
const scoringNodes = [
  {
    id: uid(),
    name: 'Calculate Intent Score',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [SCORE_X, CENTER_Y],
    parameters: {
      jsCode: `// ============================================================
// INTENT SCORING ENGINE
// ============================================================
// Combines signals from all 6 branches into a unified intent score.
// All branch filter outputs connect directly to this node.
// n8n waits for all connected inputs before executing.
//
// Each signal has a base strength (0-10) which gets modified by
// bonus factors like urgency, budget mentions, and recency.
//
// Final score = base_strength + bonuses (capped at 10)
// Leads above the threshold proceed to AI outreach.
// ============================================================

const items = $input.all();
const config = $('Configuration').first().json;
const threshold = config.score_threshold || 5.0;
const scored = [];

for (const item of items) {
  const s = item.json;

  // Skip empty/no-result items
  if (s.no_results) continue;
  if (!s.signal_type) continue;

  let score = s.signal_strength || 5;
  const bonuses = [];

  // BONUS: Budget mention (+1.0)
  if (s.has_budget_mention) {
    score += 1.0;
    bonuses.push('budget_mention');
  }

  // BONUS: Urgency signals (+1.5)
  if (s.is_urgent) {
    score += 1.5;
    bonuses.push('urgent');
  }

  // BONUS: Multiple keyword matches (+0.5 per extra match)
  if (s.keyword_matches && s.keyword_matches > 1) {
    score += (s.keyword_matches - 1) * 0.5;
    bonuses.push('multi_keyword');
  }

  // BONUS: Switching intent (+1.0)
  if (s.intent_type === 'switching') {
    score += 1.0;
    bonuses.push('switching_intent');
  }

  // BONUS: Funding news (+1.5)
  if (s.news_type === 'funding') {
    score += 1.5;
    bonuses.push('funding_news');
  }

  // BONUS: Very negative review (1 star) (+0.5)
  if (s.review_rating === 1) {
    score += 0.5;
    bonuses.push('very_negative');
  }

  // Cap at 10
  score = Math.min(10, Math.round(score * 10) / 10);

  scored.push({
    json: {
      ...s,
      intent_score: score,
      score_bonuses: bonuses,
      above_threshold: score >= threshold,
      scored_at: new Date().toISOString()
    }
  });
}

// Sort by score descending
scored.sort((a, b) => b.json.intent_score - a.json.intent_score);

return scored.length > 0 ? scored : [{ json: { no_signals: true, message: 'No signals detected in this scan' } }];`
    }
  },
  {
    id: uid(),
    name: 'Filter High Intent',
    type: 'n8n-nodes-base.filter',
    typeVersion: 2,
    position: [FILTER_X, CENTER_Y],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [
          {
            id: uid(),
            leftValue: '={{ $json.above_threshold }}',
            rightValue: true,
            operator: { type: 'boolean', operation: 'true' }
          }
        ],
        combinator: 'and'
      },
      options: {}
    }
  }
];

// ============================================================
// AI RESEARCH & OUTREACH (Official OpenAI, Telegram, Google Sheets nodes)
// ============================================================
const outreachNodes = [
  // AI Research (OpenAI official node)
  {
    id: uid(),
    name: 'AI: Research Lead',
    type: '@n8n/n8n-nodes-langchain.openAi',
    typeVersion: 2.1,
    position: [RESEARCH_X, CENTER_Y],
    parameters: {
      resource: 'text',
      modelId: { __rl: true, mode: 'list', value: 'gpt-4o-mini', cachedResultName: 'GPT-4O-MINI' },
      messages: {
        values: [
          {
            role: 'system',
            content: 'You are a sales research assistant. Given a buying signal about a potential lead, research what you can infer about them and provide: 1) What they likely need 2) Their probable pain points 3) One specific observation to reference in outreach. Keep it under 150 words. Be specific, not generic.'
          },
          {
            content: "=Signal type: {{ $json.signal_type }}\nSignal source: {{ $json.source }}\nLead: {{ $json.lead_name || $json.company_name || 'Unknown' }}\nCompany: {{ $json.company_name || 'Unknown' }}\nSignal summary: {{ $json.signal_summary }}\nReason: {{ $json.reach_out_reason }}\nAdditional context: {{ $json.body || $json.review_text || $json.news_snippet || $json.title || '' }}"
          }
        ]
      },
      options: {
        temperature: 0.3,
        maxTokens: 500
      },
      simplify: true
    },
    credentials: {
      openAiApi: {
        id: 'REPLACE_WITH_YOUR_OPENAI_CREDENTIAL_ID',
        name: 'OpenAI account'
      }
    },
    continueOnFail: true
  },
  // AI Write Email (OpenAI official node)
  {
    id: uid(),
    name: 'AI: Write Personalized Email',
    type: '@n8n/n8n-nodes-langchain.openAi',
    typeVersion: 2.1,
    position: [EMAIL_X, CENTER_Y],
    parameters: {
      resource: 'text',
      modelId: { __rl: true, mode: 'list', value: 'gpt-4o-mini', cachedResultName: 'GPT-4O-MINI' },
      messages: {
        values: [
          {
            role: 'system',
            content: "You are a cold outreach expert. Write a short, personalized email (50-70 words max) that references a SPECIFIC buying signal. Rules:\n- First line references the signal (what you noticed)\n- Second line connects it to their likely need\n- Third line offers specific value\n- End with a question, not a pitch\n- No exclamation marks, no em-dashes\n- Sound like a human DM, not a sales email\n- Include subject line\n\nFormat:\nSUBJECT: [subject]\n\n[email body]"
          },
          {
            content: "=Write an outreach email for this lead:\n\nSignal: {{ $json.signal_summary }}\nReason for reaching out: {{ $json.reach_out_reason }}\nLead: {{ $json.lead_name || $json.company_name || 'Unknown' }}\nCompany: {{ $json.company_name || 'Unknown' }}\nResearch: {{ $('AI: Research Lead').first().json.output || $('AI: Research Lead').first().json.text || 'No additional research' }}\nMy service: {{ $('Configuration').first().json.industry }}\nMy calendar: {{ $('Configuration').first().json.calendar_link }}"
          }
        ]
      },
      options: {
        temperature: 0.7,
        maxTokens: 300
      },
      simplify: true
    },
    credentials: {
      openAiApi: {
        id: 'REPLACE_WITH_YOUR_OPENAI_CREDENTIAL_ID',
        name: 'OpenAI account'
      }
    },
    continueOnFail: true
  },
  // Format Output
  {
    id: uid(),
    name: 'Format Outreach Package',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [FORMAT_X, CENTER_Y],
    parameters: {
      jsCode: `// Assemble the final outreach package with all context
// Signal data flows through the AI nodes, so current item has signal fields
const signal = $input.first().json;
const config = $('Configuration').first().json;

// OpenAI official node with simplify=true outputs to .output or .text
// Fall back to raw API format just in case
const research = $('AI: Research Lead').first().json.output
  || $('AI: Research Lead').first().json.text
  || $('AI: Research Lead').first().json?.choices?.[0]?.message?.content
  || 'Research unavailable';

const emailContent = $('AI: Write Personalized Email').first().json.output
  || $('AI: Write Personalized Email').first().json.text
  || $('AI: Write Personalized Email').first().json?.choices?.[0]?.message?.content
  || 'Email generation failed';

// Parse subject and body from AI output
const subjectMatch = emailContent.match(/SUBJECT:\\s*(.+?)\\n/i);
const subject = subjectMatch ? subjectMatch[1].trim() : 'Quick question';
const body = emailContent.replace(/SUBJECT:\\s*.+?\\n/i, '').trim();

return [{
  json: {
    // Lead info
    lead_name: signal.lead_name || signal.company_name || 'Unknown',
    lead_email: signal.lead_email || null,
    company_name: signal.company_name || null,
    company_url: signal.company_url || null,

    // Signal context
    signal_type: signal.signal_type,
    signal_source: signal.source,
    signal_strength: signal.signal_strength,
    intent_score: signal.intent_score,
    score_bonuses: signal.score_bonuses,
    signal_summary: signal.signal_summary,
    reach_out_reason: signal.reach_out_reason,

    // AI outputs
    research_summary: research,
    email_subject: subject,
    email_body: body,

    // Metadata
    generated_at: new Date().toISOString(),
    from_name: config.from_name,
    from_email: config.from_email,
    calendar_link: config.calendar_link
  }
}];`
    }
  },
  // Send Email (placeholder - users configure their own email) - KEPT AS HTTP REQUEST (disabled)
  {
    id: uid(),
    name: 'Send Email via Gmail',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.2,
    position: [DIST_X, CENTER_Y + 200],
    parameters: {
      method: 'POST',
      url: '=https://your-n8n-instance.com/webhook/gmail-send',
      sendBody: true,
      specifyBody: 'json',
      jsonBody: `={
  "toEmail": "{{ $json.lead_email || 'MANUAL_LOOKUP_NEEDED' }}",
  "subject": {{ JSON.stringify($json.email_subject) }},
  "body": {{ JSON.stringify($json.email_body) }},
  "fromEmail": "{{ $json.from_email }}"
}`,
      options: { timeout: 15000 }
    },
    continueOnFail: true,
    disabled: true
  },
  // Telegram Alert (official Telegram node)
  {
    id: uid(),
    name: 'Telegram: High Intent Alert',
    type: 'n8n-nodes-base.telegram',
    typeVersion: 1.2,
    position: [DIST_X, CENTER_Y - 200],
    parameters: {
      resource: 'message',
      operation: 'sendMessage',
      chatId: "={{ $('Configuration').first().json.telegram_chat_id }}",
      text: "=\ud83d\udea8 HIGH-INTENT LEAD DETECTED\n\nScore: {{ $json.intent_score }}/10 {{ $json.score_bonuses?.length > 0 ? '(+' + $json.score_bonuses.join(', +') + ')' : '' }}\nSource: {{ $json.signal_source }}\nType: {{ $json.signal_type }}\n\nLead: {{ $json.lead_name }}\nCompany: {{ $json.company_name || 'Unknown' }}\n\nSignal:\n{{ $json.signal_summary }}\n\nWhy reach out:\n{{ $json.reach_out_reason }}\n\nAI Research:\n{{ ($json.research_summary || '').substring(0, 500) }}\n\nDraft Email:\nSubject: {{ $json.email_subject }}\n{{ ($json.email_body || '').substring(0, 500) }}\n\n\ud83d\udcca Generated at {{ $json.generated_at }}",
      additionalFields: {
        parse_mode: 'Markdown'
      }
    },
    credentials: {
      telegramApi: {
        id: 'REPLACE_WITH_YOUR_TELEGRAM_CREDENTIAL_ID',
        name: 'Telegram account'
      }
    },
    continueOnFail: true
  },
  // Log to Google Sheets (official node, disabled)
  {
    id: uid(),
    name: 'Log to Google Sheets',
    type: 'n8n-nodes-base.googleSheets',
    typeVersion: 4.7,
    position: [DIST_X, CENTER_Y + 400],
    parameters: {
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: 'YOUR_SHEET_ID' },
      sheetName: { __rl: true, mode: 'name', value: 'Signals' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'Date': '={{ $json.generated_at }}',
          'Signal Type': '={{ $json.signal_type }}',
          'Source': '={{ $json.signal_source }}',
          'Score': '={{ $json.intent_score }}',
          'Lead': '={{ $json.lead_name }}',
          'Company': '={{ $json.company_name }}',
          'Summary': '={{ $json.signal_summary }}',
          'Subject': '={{ $json.email_subject }}',
          'Body': '={{ $json.email_body }}',
          'Status': 'pending'
        },
        schema: [
          { id: 'Date', type: 'string', display: true, required: false, displayName: 'Date', defaultMatch: false, canBeUsedToMatch: true },
          { id: 'Signal Type', type: 'string', display: true, required: false, displayName: 'Signal Type', defaultMatch: false, canBeUsedToMatch: true },
          { id: 'Source', type: 'string', display: true, required: false, displayName: 'Source', defaultMatch: false, canBeUsedToMatch: true },
          { id: 'Score', type: 'number', display: true, required: false, displayName: 'Score', defaultMatch: false, canBeUsedToMatch: true },
          { id: 'Lead', type: 'string', display: true, required: false, displayName: 'Lead', defaultMatch: false, canBeUsedToMatch: true },
          { id: 'Company', type: 'string', display: true, required: false, displayName: 'Company', defaultMatch: false, canBeUsedToMatch: true },
          { id: 'Summary', type: 'string', display: true, required: false, displayName: 'Summary', defaultMatch: false, canBeUsedToMatch: true },
          { id: 'Subject', type: 'string', display: true, required: false, displayName: 'Subject', defaultMatch: false, canBeUsedToMatch: true },
          { id: 'Body', type: 'string', display: true, required: false, displayName: 'Body', defaultMatch: false, canBeUsedToMatch: true },
          { id: 'Status', type: 'string', display: true, required: false, displayName: 'Status', defaultMatch: false, canBeUsedToMatch: true }
        ]
      },
      options: {}
    },
    credentials: {
      googleSheetsOAuth2Api: {
        id: 'REPLACE_WITH_YOUR_GOOGLE_CREDENTIAL_ID',
        name: 'Google Sheets account'
      }
    },
    continueOnFail: true,
    disabled: true
  }
];

// ============================================================
// ASSEMBLE ALL NODES
// ============================================================
const allNodes = [
  ...stickyNotes,
  ...triggerNodes,
  ...branch1,
  ...branch2,
  ...branch3,
  ...branch4,
  ...branch5,
  ...branch6,
  ...scoringNodes,
  ...outreachNodes
];

// ============================================================
// CONNECTIONS
// ============================================================
const connections = {
  // Trigger -> Config
  'Run Every 6 Hours': {
    main: [[{ node: 'Configuration', type: 'main', index: 0 }]]
  },
  // Config -> All 6 branches (parallel)
  'Configuration': {
    main: [[
      { node: 'Reddit Search', type: 'main', index: 0 },
      { node: 'Fetch Competitor Reviews', type: 'main', index: 0 },
      { node: 'Search Job Postings', type: 'main', index: 0 },
      { node: 'Load Prospect URLs', type: 'main', index: 0 },
      { node: 'Fetch Google News RSS', type: 'main', index: 0 },
      { node: 'Social Media Search', type: 'main', index: 0 }
    ]]
  },

  // Branch 1: Reddit -> Calculate Intent Score (no merge)
  'Reddit Search': { main: [[{ node: 'Parse Reddit Results', type: 'main', index: 0 }]] },
  'Parse Reddit Results': { main: [[{ node: 'Filter Reddit Signals', type: 'main', index: 0 }]] },
  'Filter Reddit Signals': { main: [[{ node: 'Calculate Intent Score', type: 'main', index: 0 }]] },

  // Branch 2: Reviews -> Calculate Intent Score
  'Fetch Competitor Reviews': { main: [[{ node: 'Parse Bad Reviews', type: 'main', index: 0 }]] },
  'Parse Bad Reviews': { main: [[{ node: 'Filter Review Signals', type: 'main', index: 0 }]] },
  'Filter Review Signals': { main: [[{ node: 'Calculate Intent Score', type: 'main', index: 0 }]] },

  // Branch 3: Jobs -> Calculate Intent Score
  'Search Job Postings': { main: [[{ node: 'Parse Job Listings', type: 'main', index: 0 }]] },
  'Parse Job Listings': { main: [[{ node: 'Filter Job Signals', type: 'main', index: 0 }]] },
  'Filter Job Signals': { main: [[{ node: 'Calculate Intent Score', type: 'main', index: 0 }]] },

  // Branch 4: Website -> Calculate Intent Score
  'Load Prospect URLs': { main: [[{ node: 'Fetch Website Content', type: 'main', index: 0 }]] },
  'Fetch Website Content': { main: [[{ node: 'Detect Changes', type: 'main', index: 0 }]] },
  'Detect Changes': { main: [[{ node: 'Calculate Intent Score', type: 'main', index: 0 }]] },

  // Branch 5: News -> Calculate Intent Score
  'Fetch Google News RSS': { main: [[{ node: 'Parse News Articles', type: 'main', index: 0 }]] },
  'Parse News Articles': { main: [[{ node: 'Filter News Signals', type: 'main', index: 0 }]] },
  'Filter News Signals': { main: [[{ node: 'Calculate Intent Score', type: 'main', index: 0 }]] },

  // Branch 6: Social -> Calculate Intent Score
  'Social Media Search': { main: [[{ node: 'Parse Social Signals', type: 'main', index: 0 }]] },
  'Parse Social Signals': { main: [[{ node: 'Filter Social Signals', type: 'main', index: 0 }]] },
  'Filter Social Signals': { main: [[{ node: 'Calculate Intent Score', type: 'main', index: 0 }]] },

  // Scoring -> AI (sequential)
  'Calculate Intent Score': { main: [[{ node: 'Filter High Intent', type: 'main', index: 0 }]] },
  'Filter High Intent': { main: [[{ node: 'AI: Research Lead', type: 'main', index: 0 }]] },
  'AI: Research Lead': { main: [[{ node: 'AI: Write Personalized Email', type: 'main', index: 0 }]] },
  'AI: Write Personalized Email': { main: [[{ node: 'Format Outreach Package', type: 'main', index: 0 }]] },

  // Format -> Distribution (parallel)
  'Format Outreach Package': { main: [[
    { node: 'Send Email via Gmail', type: 'main', index: 0 },
    { node: 'Telegram: High Intent Alert', type: 'main', index: 0 },
    { node: 'Log to Google Sheets', type: 'main', index: 0 }
  ]] }
};

// ============================================================
// FINAL WORKFLOW
// ============================================================
const workflow = {
  name: 'Buying Signal Radar v1.0',
  nodes: allNodes,
  connections: connections,
  settings: {
    executionOrder: 'v1',
    saveDataErrorExecution: 'all',
    saveDataSuccessExecution: 'all',
    callerPolicy: 'workflowsFromSameOwner',
    availableInMCP: false
  },
  tags: [
    { name: 'sales' },
    { name: 'automation' },
    { name: 'ai' },
    { name: 'lead-generation' },
    { name: 'intent-detection' }
  ]
};

// Output
console.log(JSON.stringify(workflow, null, 2));
